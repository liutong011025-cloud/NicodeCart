# NicodeCart

中英雙語像素小車編程實驗室。純 HTML、CSS 與 JavaScript，無需 API 金鑰或後端。

## 本地使用
直接用瀏覽器開啟 index.html 即可。

## GitHub → Vercel
1. 在 GitHub 建立新倉庫，把本資料夾內的檔案上傳至倉庫根目錄（index.html 應位於根目錄）。
2. 在 Vercel 匯入該 GitHub 倉庫。
3. Framework Preset 選 Other，Root Directory 保持根目錄；Build Command 留空，Output Directory 留空或使用預設。
4. 按 Deploy，分享 Vercel 提供的網址。如需匿名訪問，在專案 Deployment Protection 檢查正式環境的訪問限制。

## 編程
初始只有底盤，沒有預選馬達、零件或程式。加入積木後自行填寫數值及選項。數字輪速以百分比表示。
超音波使用 cm；輪速編碼器使用左右輪平均絕對速度 cm/s；陀螺儀朝向以車頭朝上為 0°、順時針增加。顏色對應無標記／黃／藍。
條件行駛積木持續給定左右輪速度，條件成立時停止並執行下一積木。碰撞積木在邊界接觸時讀取開關。機械臂、舵機與繼電器均有對應積木，需要安裝對應硬體。

## 檔案
engine.js：確定性物理與指令執行。app.js：介面及積木編輯。i18n.js：中英翻譯。style.css：樣式。
本包不含教師解答、帳號、憑證或 Sites 專屬設定。
