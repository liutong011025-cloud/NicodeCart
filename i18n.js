/* Presentation-only translation: robot state and program identifiers never change. */
const EN = {'如果':'If',
 '請填寫所有參數。':'Fill in all parameters.','參數必須是有效數字。':'Enter valid numbers.','請安裝對應感測器。':'Install the matching sensor.','自行填寫':'Enter a value','請選擇':'Choose','右光電規則':'Right sensor rule','左光電規則':'Left sensor rule','超音波條件行駛':'Drive until distance','顏色條件行駛':'Drive until color','輪速條件行駛':'Drive until speed','朝向條件行駛':'Drive until heading','碰撞條件行駛':'Drive until contact','直到':'Until',

 '未安裝馬達':'No motor installed','請選擇馬達規格':'Choose a motor type','請先選擇馬達。':'Choose a motor first.','請先選擇馬達規格。':'Choose a motor type first.',
 '兩輪連動':'Linked wheels','不設上限':'No limit','無需實體小車':'No physical rover needed','小車結構':'Rover structure','即時俯視圖':'Live top view',
 '請調整延時，容許誤差 ±5 cm。':'Adjust the delay; allowed error is ±5 cm.', '容許誤差 ±5 cm。':'Allowed error: ±5 cm.',
 '每個零件，每一秒，都有意義。':'Every part. Every second. Every choice.',
 '組裝小車、編排積木，挑戰用更少的花費完成運送任務。':'Build a rover, arrange blocks, and deliver the cargo for less.',
 '選擇零件，查看小車結構與總花費。金幣不設上限，卸下零件會退還費用。':'Choose parts and check your build and total cost. Coins are unlimited; removing parts refunds their cost.',
 '點選或拖入積木，調整順序與選項。可使用的積木會隨小車配置改變。':'Click or drag blocks into your program, then change their order and options. Available blocks depend on your hardware.',
 '執行程式，觀察小車。你可以暫停查看，或重置後重新嘗試。':'Run your program and watch your rover. Pause to take a closer look, or reset and try again.',
 '讓小車沿黑線完成取物並送達終點。成功後，與同學比較誰花得更少！':'Follow the black line, collect the cargo, and deliver it to the finish. Then compare costs with your classmates!',
 '左右以車頭方向為準。光電感測器朝下讀取地面，攝像頭朝前辨識站點。':'Left and right are relative to the rover. Reflectance sensors look down; the camera looks ahead.',
 '完成任務後，比一比誰的花費更少。':'Complete the mission, then compare costs.',
 '卸下零件會全額退還金幣。':'Removing a part refunds its full cost.',
 '拖曳或使用 ↑ ↓ 排序，按 × 移除積木。':'Drag or use ↑ ↓ to reorder. Press × to remove.',
 '選好硬體，再編寫控制邏輯。':'Choose your hardware, then write your program.',
 '每一次偏離，都是新的發現。':'Every wrong turn is a new discovery.',
 '簡化物理與圖像辨識模擬 · 無需實體小車':'A simplified simulation · No physical rover needed',
 '小車結構 · 即時俯視圖':'Rover structure · Live top view',
 '小車俯視結構圖：車頭最前方攝像頭、左右光電感測器、獨立馬達與機械臂':'Rover diagram: front camera, left and right reflectance sensors, motors, and arm',
 '小車循線場地，從左下起點沿黑線經過取物站到右下終點':'Track from the lower-left start past the pickup station to the lower-right finish',
 '放大的小車結構與各零件即時狀態':'Enlarged rover structure with live component states',
 '前置攝像頭的模擬影像與站點辨識框':'Simulated front camera image with station detection',
 '精準取物挑戰':'Precision pickup challenge','本次組裝成本':'Build cost','金幣 · 不設上限':'coins · no limit',
 '玩法說明':'How to play','創客教室':'Maker classroom','小車工坊':'Rover workshop','積木程式':'Block program','試煉場':'Test track','放大結構':'Enlarge',
 '組裝小車':'Build your rover','編排積木':'Arrange blocks','進入試煉場':'Test your program','挑戰目標':'Your mission','開始探索':'Start exploring',
 '底盤':'Chassis','已花費':'Spent','動力配置':'Drive system','馬達規格':'Motor type','感測器與執行裝置':'Sensors & actuators','金幣':'coins','枚':'',
 '兩輪連動；需舵機才能轉向':'Linked wheels; add a servo to steer','左右輪獨立控制':'Independent wheel control','四輪分組差速':'Four-wheel differential drive',
 '單馬達':'Single motor','雙馬達':'Dual motors','四馬達':'Four motors','減速馬達':'Geared motor','高速馬達':'Fast motor','精密馬達':'Precision motor','只可直行':'Straight only','差速轉向':'Differential drive',
 '左光電感測器':'Left reflectance sensor','右光電感測器':'Right reflectance sensor','前置攝像頭':'Front camera','超音波感測器':'Ultrasonic sensor','顏色感測器':'Color sensor','輪速編碼器':'Wheel encoder','陀螺儀':'Gyroscope','碰撞開關':'Bumper switch','機械臂與夾爪':'Arm & gripper','轉向舵機':'Steering servo','時間繼電器':'Timer relay',
 '車頭左側，讀取黑 / 白':'Front left: detects black or white','車頭右側，讀取黑 / 白':'Front right: detects black or white','辨識取物站及終點標誌':'Recognizes pickup and finish markers','讀取前方邊界距離':'Measures distance to the boundary','讀取腳下站點顏色':'Reads the station color below','顯示左右輪的即時速度':'Reads each wheel’s speed','讀取小車朝向':'Reads the rover’s heading','讀取邊界碰撞狀態':'Detects contact with the boundary','固定伸距 14 cm，需準確停車':'14 cm reach; needs an accurate stop','改變前輪角度，兩輪同速轉向':'Steers the front wheels at equal speed','解鎖定時轉向序列與停車抓取':'Enables timed steering and pickup',
 '轉向舵機支援單馬達或雙馬達底盤。':'The steering servo supports single- or dual-motor chassis.',
 '光電差速循環需卸下轉向舵機，或改用舵機積木。':'Remove the steering servo to use this differential loop, or use servo blocks.',
 '左右輪差速積木需要至少兩個獨立馬達。':'This block requires two independent motors.',
 '需要安裝程式使用的左右光電感測器。':'Install the reflectance sensors used by this program.',
 '等待站點辨識需要前置攝像頭。':'Station detection requires a front camera.',
 '抓放積木需要機械臂。':'Pickup and drop blocks require an arm.',
 '獨立輪速積木需要差速雙馬達配置。':'Independent wheel control requires a dual-motor differential drive.',
 '此積木需要轉向舵機。':'Requires a steering servo.','此積木需要時間繼電器。':'Requires a timer relay.','此積木需要前置攝像頭。':'Requires a front camera.','此積木需要機械臂。':'Requires an arm.',
 '光電判斷循環':'Reflectance loop','兩輪前進':'Drive forward','兩輪停止':'Stop both wheels','機械臂抓取':'Pick up cargo','機械臂放下':'Drop cargo','獨立輪速':'Wheel control','舵機轉向':'Servo steering','繼電器轉向序列':'Timed steering sequence','繼電器定時抓放':'Timed pickup / drop','結束程式':'End program',
 '重複，直到攝像頭辨識':'Repeat until the camera detects','如果右光電 = 黑色':'If right sensor = black','如果左光電 = 黑色':'If left sensor = black','右輪停止、左輪繼續':'Stop right wheel; keep left moving','左輪停止、右輪繼續':'Stop left wheel; keep right moving','未觸發 → 兩輪直行':'Otherwise → drive forward','秒，再繼續':'s, then continue','回正，直行直到辨識':'Straighten, then drive until detecting','自動抓取 / 放下':'auto pick up / drop','秒（保留輪速）':'s (keep current wheel state)',
 '加入入門積木':'Add starter blocks','載入方案':'Load build','清空':'Clear','當按下執行':'When Run is pressed','將積木加入這裡':'Add blocks here','指令積木':'Block library','點選或拖入':'Click or drag',
 '左輪暫停':'Left wheel paused','右輪暫停':'Right wheel paused','左光電':'Left sensor','右光電':'Right sensor','左輪':'Left wheel','右輪':'Right wheel','左轉':'Turn left','右轉':'Turn right','直行':'Straight','轉向':'Direction','前進':'Forward','停止':'Stop','持續':'For','等待':'Wait','停車':'stop','暫停':'Pause','繼續':'Resume','取物站':'Pickup','終點':'Finish','起點':'Start',
 '執行程式':'Run program','重置':'Reset','模擬速度':'Playback speed','車輪狀態':'Wheels','未取物':'No cargo','貨物':'Cargo','白色':'White','黑色':'Black','攝像頭畫面':'Camera view','觀察小車前方的畫面。':'See what is ahead of your rover.','搜尋站點標誌…':'Looking for a marker…','搜尋站點':'Searching','辨識：':'Detected: ','準備就緒':'Ready','執行中':'Running','已暫停':'Paused','已停止':'Stopped','任務完成':'Mission complete','程式結束':'Program finished','需要調整':'Try again',
 '已安裝獨立馬達':'Independent motors installed','已安裝舵機':'Servo installed','尚未安裝攝像頭':'No camera installed','已安裝':'Installed','未安裝':'Not installed','未裝':'Not installed','個已裝':'installed','車頭朝上':'Front faces up','機械臂':'Arm','夾爪：':'Gripper: ','收起':'Retracted','伸出':'Extended','落空':'Missed','持有貨物':'Holding cargo','已放下':'Released','已送達':'Delivered','觀察車輪、光電與攝像頭':'Watch the wheels, sensors, and camera','關閉':'Close',
 '準備就緒。組合感測器、馬達與指令，再開始實驗。':'Ready. Combine hardware and blocks, then start your experiment.',
 '請先加入程式積木。':'Add some blocks first.','依照你的程式控制小車。':'Your program is controlling the rover.','程式啟動':'Program started','成功送達！感測、停車時機與機械臂配合完成。':'Delivered! Your sensors, timing, and arm worked together.','程式結束，貨物尚未送達。':'The program ended before the cargo was delivered.',
 '沒有前置攝像頭，無法辨識站點。請用金幣安裝攝像頭。':'No front camera installed. Add one to detect stations.',
 '程式使用了尚未安裝的光電感測器。請安裝對應零件或停用該判斷。':'A required reflectance sensor is missing. Install it or disable its condition.',
 '單馬達連動兩輪，不能設定不同輪速。':'A single motor links both wheels; independent wheel control is unavailable.',
 '尚未安裝機械臂與夾爪。':'No arm and gripper installed.','請先停止兩輪，再操作機械臂。':'Stop both wheels before moving the arm.','夾爪中已經有貨物。':'The gripper is already holding cargo.','夾爪已有貨物':'The gripper is already holding cargo.','夾爪沒有貨物，請先完成抓取。':'The gripper is empty. Pick up the cargo first.','沒有貨物可放下':'No cargo to drop.',
 '抓取成功！繼續循線前往終點。':'Pickup successful! Continue to the finish.',
 '停得太早，試著增加行駛秒數。':'Stopped too early. Try a longer drive time.','停得太晚，試著減少行駛秒數。':'Stopped too late. Try a shorter drive time.',
 '定時抓放失敗：夾爪誤差 ':'Timed action missed: gripper error ', ' cm。請調整延時，容許誤差 ±5 cm。':' cm. Adjust the delay; allowed error is ±5 cm.',
 '失敗：夾爪距離目標 ':' failed: distance from gripper to target ', ' cm，容許誤差 ±5 cm。':' cm; allowed error is ±5 cm. ',
 '碰到場地邊界。檢查感測器判斷、輪速及等待時間。':'The rover hit the boundary. Check your conditions and timing.',
 '單馬達無法差速转向，小車已偏離黑線。':'The linked wheels cannot steer by speed difference. The rover left the line.',
 '小車偏離黑線。檢查左右判斷，縮短暫停時間，或降低輪速。':'The rover left the line. Check the sensor conditions or pause duration.',
 '未在時間內辨識站點。請檢查攝像頭、循線規則與前進方向。':'Station detection timed out. Check your camera, rules, and direction.',
 '無效的方案檔案':'Invalid build file','硬體配置無效':'Invalid hardware configuration','舵機不支援四馬達底盤':'The servo does not support the four-motor chassis','未知積木':'Unknown block','積木數值超出範圍':'A block value is out of range','無效站點':'Invalid station','判斷設定無效':'Invalid condition','檔案太大':'File is too large','未載入：':'Not loaded: ',
 '配置已更新，總花費 ':'Build updated. Total cost: ',' 枚金幣。挑戰用更少的零件完成任務！':' coins. Try completing the mission with fewer parts!','已載入方案；花費 ':'Build loaded. Cost: ',
 '辨識後經過':'Time since detection','夾爪距目標':'Gripper distance','抓取容許誤差':'Allowed error','實驗事件紀錄':'Experiment log','等待執行感測規則':'Waiting for sensor rules','攝像頭辨識到':'Camera detected ','已辨識':'Detected ','，開始執行後續計時積木。':'; running the next timed blocks.',
 '繼電器：定時直行':'Relay: timed drive','繼電器：辨識後延時直行':'Relay: drive after detection','繼電器：停車並操作機械臂':'Relay: stop and move arm','繼電器：舵機轉向':'Relay: servo steering','繼電器停止車輪':'Relay stopped the wheels','直行，等待攝像頭辨識':'Drive until camera detection','兩輪直行':'Drive both wheels','自訂左右輪速':'Custom wheel control','等待（保留當前輪速）':'Wait (keep wheel state)','停止車輪':'Wheels stopped','抓取成功':'Pickup successful','貨物送達':'Cargo delivered','程式停止':'Program stopped','右側黑色 → 右輪暫停':'Right black → pause right','左側黑色 → 左輪暫停':'Left black → pause left',
 '無標記':'No marker','前方边界':'Boundary ahead','朝向':'Heading','輪速 L/R':'Wheels L/R','碰撞':'Collision','觸發':'Contact','顏色':'Color','黃':'Yellow','藍':'Blue','無':'None','目標站':'Target station','上移':'Move up','下移':'Move down','刪除':'Remove','抓取':'Pick up','放置':'Drop','轉彎':'Turn','秒':'s','在':'At ',
 '自由組裝小車，挑戰最低完成成本，以光電感測器控制車輪、攝像頭辨識站點，再精準計時抓取貨物。':'Build a rover, program its sensors and motors, and complete the delivery challenge at the lowest cost.'
};
const phrasePattern=new RegExp(Object.keys(EN).sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
let uiLanguage='zh';try{if(localStorage.getItem('rover-language')==='en')uiLanguage='en'}catch{}
function translate(text){if(uiLanguage!=='en')return String(text);return String(text).replace(/第(\d+)步/g,'Step $1 ').replace(phrasePattern,m=>EN[m]);}
const originals=new WeakMap();
function updateText(node){const current=node.nodeValue;let saved=originals.get(node);if(!saved||current!==saved.output)saved={source:current};const output=translate(saved.source);saved.output=output;originals.set(node,saved);if(current!==output)node.nodeValue=output;}
const attributeOriginals=new WeakMap();
function translateTree(root){if(root.nodeType===3){updateText(root);return}if(root.nodeType!==1||root.matches('script,style,[data-no-i18n]'))return;for(const name of ['aria-label','title','placeholder'])if(root.hasAttribute(name)){let map=attributeOriginals.get(root)||{};let v=root.getAttribute(name),entry=map[name];if(!entry||entry.output!==v)entry={source:v};entry.output=translate(entry.source);map[name]=entry;attributeOriginals.set(root,map);if(entry.output!==v)root.setAttribute(name,entry.output)}for(const child of root.childNodes)translateTree(child);}
let translatorObserver;
function setLanguage(language){if(!['zh','en'].includes(language))return;uiLanguage=language;try{localStorage.setItem('rover-language',language)}catch{}document.documentElement.lang=language==='en'?'en':'zh-Hant';translatorObserver?.disconnect();translateTree(document.body);document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));const meta=document.querySelector('meta[name="description"]');meta.content=language==='en'?EN['自由組裝小車，挑戰最低完成成本，以光電感測器控制車輪、攝像頭辨識站點，再精準計時抓取貨物。']:'自由組裝小車，挑戰最低完成成本，以光電感測器控制車輪、攝像頭辨識站點，再精準計時抓取貨物。';observe();}
function observe(){translatorObserver?.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']})}
document.addEventListener('DOMContentLoaded',()=>{translatorObserver=new MutationObserver(records=>{translatorObserver.disconnect();for(const r of records){if(r.type==='characterData')updateText(r.target);else if(r.type==='attributes')translateTree(r.target);else for(const n of r.addedNodes)translateTree(n)}observe()});document.querySelectorAll('[data-language]').forEach(b=>b.onclick=()=>setLanguage(b.dataset.language));setLanguage(uiLanguage)});
// These canvases are functional diagrams. Translate the same labels as the DOM.
const originalFillText=CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText=function(text,x,y,maxWidth){const result=translate(text);const limit=maxWidth??(this.canvas.id.startsWith('structure')?190:260);return originalFillText.call(this,result,x,y,limit)};
window.RoverI18n={translate,setLanguage,get language(){return uiLanguage},dictionary:EN};
