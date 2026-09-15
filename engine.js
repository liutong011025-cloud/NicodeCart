/* Deterministic teaching model. No route-following oracle: wheel commands use
   only the two sampled reflectance sensors; station detection uses camera geometry. */
const PARTS = [
  {id:'left',name:'左光電感測器',price:8,desc:'車頭左側，讀取黑 / 白',icon:'L'},
  {id:'right',name:'右光電感測器',price:8,desc:'車頭右側，讀取黑 / 白',icon:'R'},
  {id:'camera',name:'前置攝像頭',price:24,desc:'辨識取物站及終點標誌',icon:'▣'},
  {id:'ultra',name:'超音波感測器',price:12,desc:'讀取前方邊界距離',icon:'◖'},
  {id:'color',name:'顏色感測器',price:10,desc:'讀取腳下站點顏色',icon:'◈'},
  {id:'encoder',name:'輪速編碼器',price:12,desc:'顯示左右輪的即時速度',icon:'⊙'},
  {id:'gyro',name:'陀螺儀',price:10,desc:'讀取小車朝向',icon:'↻'},
  {id:'touch',name:'碰撞開關',price:6,desc:'讀取邊界碰撞狀態',icon:'⊥'},
  {id:'arm',name:'機械臂與夾爪',price:24,desc:'固定伸距 14 cm，需準確停車',icon:'⊏⊐'}
];
PARTS.forEach(p=>p.price=({left:3,right:3,camera:12,arm:10})[p.id]??p.price);
PARTS.push({id:'servo',name:'轉向舵機',price:38,desc:'改變前輪角度，兩輪同速轉向',icon:'↱'},{id:'relay',name:'時間繼電器',price:42,desc:'解鎖定時轉向序列與停車抓取',icon:'◷'});

const MOTOR_COST={1:8,2:14,4:28}, SPEC_COST={steady:0,fast:8,precise:14};
const STATIONS={pickup:{x:420,y:110,name:'取物站'},finish:{x:690,y:450,name:'終點'}};
function configCost(config){return 6+(MOTOR_COST[config.motor]??0)+(SPEC_COST[config.spec]??0)+PARTS.filter(p=>config.parts.has(p.id)).reduce((n,p)=>n+p.price,0)}
function defaultConfig(){return {motor:0,spec:'',parts:new Set()}}
function defaultProgram(){return []}
const TRACK=[];for(let y=450;y>=170;y-=2)TRACK.push({x:110,y});for(let a=Math.PI;a<=Math.PI*1.5;a+=.025)TRACK.push({x:170+60*Math.cos(a),y:170+60*Math.sin(a)});for(let x=170;x<=630;x+=2)TRACK.push({x,y:110});for(let a=Math.PI*1.5;a<=Math.PI*2;a+=.025)TRACK.push({x:630+60*Math.cos(a),y:170+60*Math.sin(a)});for(let y=170;y<=470;y+=2)TRACK.push({x:690,y});
function blackAt(x,y){let d=Infinity;for(const p of TRACK){const dx=x-p.x,dy=y-p.y;d=Math.min(d,dx*dx+dy*dy)}return d<=49}
class RoverEngine{
  constructor(config=defaultConfig(),program=defaultProgram()){this.config=config;this.program=program;this.reset()}
  reset(){Object.assign(this,{x:110,y:450,a:-Math.PI/2,left:0,right:0,steer:0,distance:0,time:0,pc:0,elapsed:0,running:false,paused:false,holding:false,delivered:false,detected:false,armState:'收起',message:'準備就緒。組合感測器、馬達與指令，再開始實驗。',status:'準備就緒',pulseLeft:0,pulseRight:0,rule:'直行',eventTime:null,stopTime:null,grabError:null,trace:[],trail:[],detectionTarget:null});}
  get speed(){return this.config.motor?({steady:36,fast:55,precise:30}[this.config.spec]??0):0}
  point(forward,side=0){return {x:this.x+Math.cos(this.a)*forward-Math.sin(this.a)*side,y:this.y+Math.sin(this.a)*forward+Math.cos(this.a)*side}}
  sensor(side){if(!this.config.parts.has(side))return null;const p=this.point(18,side==='left'?-10:10);return blackAt(p.x,p.y)}
  camera(target){if(!this.config.parts.has('camera'))return false;const s=STATIONS[target],p=this.point(20);const dx=s.x-p.x,dy=s.y-p.y;const ahead=dx*Math.cos(this.a)+dy*Math.sin(this.a),cross=-dx*Math.sin(this.a)+dy*Math.cos(this.a);return ahead>=0&&ahead<=100&&Math.abs(cross)<=Math.max(10,ahead*.3)}
  clawError(target){const p=this.point(28),s=STATIONS[target];return Math.hypot(p.x-s.x,p.y-s.y)}
  readSensor(id){
    if(id==='ultra'){let d=0;while(d<1000){const p=this.point(d);if(p.x<=20||p.x>=780||p.y<=20||p.y>=540)break;d+=2}return d/2}
    if(id==='gyro')return (this.a*180/Math.PI+90+3600)%360;
    if(id==='encoder')return (Math.abs(this.left)+Math.abs(this.right))/4;
    if(id==='touch')return this.x<=20||this.x>=780||this.y<=20||this.y>=540?1:0;
    if(id==='color')return Math.hypot(this.x-420,this.y-110)<32?1:Math.hypot(this.x-690,this.y-450)<32?2:0;
  }
  record(text){this.trace.push({time:this.time,text});if(this.trace.length>18)this.trace.shift()}
  start(){this.reset();if(!this.program.length){this.fail('請先加入程式積木。');return}const error=this.program.map(b=>blockRequirement(b,this.config)||parameterError(b)).find(Boolean);if(error){this.fail(error);return}this.running=true;this.status='執行中';this.message='依照你的程式控制小車。';this.record('程式啟動')}
  fail(text){this.left=this.right=0;this.running=false;this.status='需要調整';this.message=text;this.record(text)}
  advance(){this.pc++;this.elapsed=0;this.pulseLeft=this.pulseRight=0;}
  tick(dt){if(!this.running||this.paused)return;this.time+=dt;let b=this.program[this.pc];if(!b){this.left=this.right=0;this.running=false;this.status=this.delivered?'任務完成':'程式結束';this.message=this.delivered?'成功送達！感測、停車時機與機械臂配合完成。':'程式結束，貨物尚未送達。';this.record(this.message);return}this.elapsed+=dt;
    if(b.type.endsWith('Until')){
      const id=b.type.slice(0,-5);this.left=this.speed*b.left/100;this.right=this.speed*b.right/100;
      const value=this.readSensor(id),matched=b.compare===0?value<=b.threshold:b.compare===1?Math.abs(value-b.threshold)<.5:value>=b.threshold;
      this.rule=namesForSensors[id]+': '+value.toFixed(1);
      if(matched){this.left=this.right=0;this.advance();return}
    }else if(b.type==='relayRoute'){
      const speed=this.speed*b.power/100;this.left=this.right=speed;
      if(this.elapsed<=b.straight){this.steer=0;this.rule='繼電器：定時直行'}
      else if(this.elapsed<=b.straight+b.turnTime){this.steer=b.angle;this.rule='繼電器：舵機轉向 '+b.angle+'°'}
      else{this.steer=0;this.rule='直行，等待攝像頭辨識';if(this.camera(b.target)){this.detectionTarget=b.target;this.detected=true;this.eventTime=this.time;this.stopTime=null;this.record('攝像頭辨識到'+STATIONS[b.target].name);this.advance();return}}
    }else if(b.type==='relayGrab'){
      this.steer=0;
      if(this.elapsed<=b.seconds){this.left=this.right=this.speed*b.power/100;this.rule='繼電器：辨識後延時直行'}
      else{this.left=this.right=0;this.rule='繼電器：停車並操作機械臂';if(this.stopTime===null){this.stopTime=this.time;this.record('繼電器停止車輪')}this.armState='伸出';this.grabError=this.clawError(b.target);if(this.elapsed>b.seconds+.7){if(this.grabError>10){this.armState='落空';this.fail('定時抓放失敗：夾爪誤差 '+(this.grabError/2).toFixed(1)+' cm。請調整延時，容許誤差 ±5 cm。');return}if(b.target==='pickup'){if(this.holding){this.fail('夾爪已有貨物');return}this.holding=true;this.armState='持有貨物';this.record('抓取成功')}else{if(!this.holding){this.fail('沒有貨物可放下');return}this.holding=false;this.delivered=true;this.armState='已放下';this.record('貨物送達')}this.advance();return}}
    }else if(b.type==='servoTime'){
      this.steer=b.angle;this.left=this.right=this.speed*b.power/100;this.rule='舵機轉向 '+b.angle+'°';if(this.elapsed>=b.seconds)this.advance();
    }else if(b.type==='senseLoop'){
      if(!this.config.parts.has('camera')){this.fail('沒有前置攝像頭，無法辨識站點。請用金幣安裝攝像頭。');return}
      if((b.leftRule&&!this.config.parts.has(b.leftSensor===1?'right':'left'))||(b.rightRule&&!this.config.parts.has(b.rightSensor===0?'left':'right'))){this.fail('程式使用了尚未安裝的光電感測器。請安裝對應零件或停用該判斷。');return}
      if(this.camera(b.target)){this.detectionTarget=b.target;this.detected=true;this.eventTime=this.time;this.stopTime=null;this.record('攝像頭辨識到'+STATIONS[b.target].name);this.message='已辨識'+STATIONS[b.target].name+'，開始執行後續計時積木。';this.advance();return}
      this.pulseLeft=Math.max(0,this.pulseLeft-dt);this.pulseRight=Math.max(0,this.pulseRight-dt);
      if(this.pulseRight===0&&this.pulseLeft===0){if(b.rightRule&&this.sensor(b.rightSensor===0?'left':'right')===(b.rightBlack!==false))this.pulseRight=b.pulse;else if(b.leftRule&&this.sensor(b.leftSensor===1?'right':'left')===(b.leftBlack!==false))this.pulseLeft=b.pulse}
      const speed=this.speed*b.power/100;
      this.left=this.pulseLeft>0?speed*(b.leftThenLeft??0)/100:this.pulseRight>0?speed*(b.rightThenLeft??100)/100:speed*(b.idleLeft??100)/100;
      this.right=this.pulseLeft>0?speed*(b.leftThenRight??100)/100:this.pulseRight>0?speed*(b.rightThenRight??0)/100:speed*(b.idleRight??100)/100;
      this.rule=this.pulseRight>0?'規則 1':this.pulseLeft>0?'規則 2':'未觸發規則';
      if(this.config.motor===1){this.left=this.right=(this.left+this.right)/2}
    }else if(b.type==='driveTime'){
      this.left=this.right=this.speed*b.power/100;this.rule='兩輪直行';if(this.elapsed>=b.seconds){this.advance()}
    }else if(b.type==='wheelTime'){
      if(this.config.motor===1&&b.left!==b.right){this.fail('單馬達連動兩輪，不能設定不同輪速。');return}
      this.left=this.speed*b.left/100;this.right=this.speed*b.right/100;this.rule='自訂左右輪速';if(this.elapsed>=b.seconds)this.advance();
    }else if(b.type==='halt'){this.left=this.right=0;this.stopTime=this.time;this.rule='兩輪停止';this.record('停止車輪');this.advance();return;
    }else if(b.type==='wait'){this.rule='等待（保留當前輪速）';if(this.elapsed>=b.seconds)this.advance();
    }else if(b.type==='grab'||b.type==='drop'){
      if(!this.config.parts.has('arm')){this.fail('尚未安裝機械臂與夾爪。');return}
      if(this.left!==0||this.right!==0){this.fail('請先停止兩輪，再操作機械臂。');return}
      if(b.type==='grab'&&this.holding){this.fail('夾爪中已經有貨物。');return}if(b.type==='drop'&&!this.holding){this.fail('夾爪沒有貨物，請先完成抓取。');return}
      const target=b.type==='grab'?'pickup':'finish';this.grabError=this.clawError(target);this.armState='伸出';
      if(this.elapsed<.7)return;
      if(this.grabError>10){this.armState='落空';const s=STATIONS[target],p=this.point(28);const along=(s.x-p.x)*Math.cos(this.a)+(s.y-p.y)*Math.sin(this.a);this.fail((b.type==='grab'?'抓取':'放置')+'失敗：夾爪距離目標 '+(this.grabError/2).toFixed(1)+' cm，容許誤差 ±5 cm。'+(along>0?'停得太早，試著增加行駛秒數。':'停得太晚，試著減少行駛秒數。'));return}
      if(b.type==='grab'){this.holding=true;this.armState='持有貨物';this.record('抓取成功');this.message='抓取成功！繼續循線前往終點。'}else{this.holding=false;this.delivered=true;this.armState='已放下';this.record('貨物送達')}this.advance();return;
    }else if(b.type==='stop'){this.left=this.right=0;this.running=false;this.status='已停止';this.record('程式停止');return}
    const v=(this.left+this.right)/2,w=this.config.parts.has('servo')?v*Math.tan(this.steer*Math.PI/180)/34:(this.left-this.right)/34;
    this.a+=w*dt;this.x+=Math.cos(this.a)*v*dt;this.y+=Math.sin(this.a)*v*dt;this.distance+=Math.abs(v)*dt;
    if(v&&this.trail.length<8000)this.trail.push([this.x,this.y]);
    if(this.x<20||this.x>780||this.y<20||this.y>540){if(b.type==='touchUntil'){this.x=Math.max(20,Math.min(780,this.x));this.y=Math.max(20,Math.min(540,this.y));this.left=this.right=0;return}this.fail('碰到場地邊界。檢查感測器判斷、輪速及等待時間。');return}
    if(b.type==='senseLoop'&&!blackAt(this.x,this.y)&&!blackAt(this.point(0,-18).x,this.point(0,-18).y)&&!blackAt(this.point(0,18).x,this.point(0,18).y)){let nearest=Infinity;for(const p of TRACK)nearest=Math.min(nearest,Math.hypot(p.x-this.x,p.y-this.y));if(nearest>45)this.fail(this.config.motor===1?'單馬達無法差速转向，小車已偏離黑線。':'小車偏離黑線。檢查左右判斷，縮短暫停時間，或降低輪速。')}
    if(this.time>140)this.fail('未在時間內辨識站點。請檢查攝像頭、循線規則與前進方向。');
  }
}
const namesForSensors={ultra:'超音波',color:'顏色',encoder:'輪速',gyro:'朝向',touch:'碰撞'};
function parameterError(b){for(const [k,v] of Object.entries(b)){if(v===null||v==='')return '請填寫所有參數。';if(typeof v==='number'&&!Number.isFinite(v))return '參數必須是有效數字。'}return ''}
function blockRequirement(b,c){const has=id=>c.parts.has(id);if(b.type.endsWith('Until')){if(!has(b.type.slice(0,-5)))return '請安裝對應感測器。';if(!c.motor||!c.spec)return '請先選擇馬達規格。';if((c.motor===1||has('servo'))&&b.left!==b.right)return '獨立輪速積木需要差速雙馬達配置。';}if(['senseLoop','driveTime','wheelTime','servoTime','relayRoute','relayGrab'].includes(b.type)){if(!c.motor)return '請先選擇馬達。';if(!c.spec)return '請先選擇馬達規格。';}if(b.type==='senseLoop'){if(has('servo'))return '光電差速循環需卸下轉向舵機，或改用舵機積木。';if(c.motor===1)return '左右輪差速積木需要至少兩個獨立馬達。';if((b.leftRule&&!has(b.leftSensor===1?'right':'left'))||(b.rightRule&&!has(b.rightSensor===0?'left':'right')))return '需要安裝程式使用的左右光電感測器。';if(!has('camera'))return '等待站點辨識需要前置攝像頭。'}if(['grab','drop'].includes(b.type)&&!has('arm'))return '抓放積木需要機械臂。';if(b.type==='wheelTime'&&(c.motor===1||has('servo'))&&b.left!==b.right)return '獨立輪速積木需要差速雙馬達配置。';if(['relayRoute','servoTime'].includes(b.type)&&!has('servo'))return '此積木需要轉向舵機。';if(['relayRoute','relayGrab'].includes(b.type)&&!has('relay'))return '此積木需要時間繼電器。';if(['relayRoute','relayGrab'].includes(b.type)&&!has('camera'))return '此積木需要前置攝像頭。';if(b.type==='relayGrab'&&!has('arm'))return '此積木需要機械臂。';return ''}
if(typeof module!=='undefined')module.exports={RoverEngine,defaultConfig,defaultProgram,configCost,PARTS,blockRequirement};
