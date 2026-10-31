# Echo Bloom《良辰美景・婚禮計劃書》PWA 電商銷售與部署指南

本專案為根據《Echo Bloom 良辰美景_婚禮計劃書_手機版.pdf》（共 264 頁、13 大章節）100% 完整數位化與升級打造的漸進式網頁應用程式（PWA）。

## 1. 檔案結構
- `index.html`：主應用程式（內嵌完整 13 章節互動介面、Echo Bloom 品牌高解析度 Logo、離線儲存、列印匯出樣式）
- `manifest.json`：PWA 安裝設定檔（支援 iOS Safari / Android Chrome「加入主畫面」獨立全螢幕開啟）
- `service-worker.js`：離線快取服務，確保買家在婚宴現場或無網路環境下也能流暢查閱與編輯
- `icons/icon-192.png` & `icons/icon-512.png`：從原版手冊提取之高解析度 Echo Bloom 官方品牌圖示

## 2. 電商授權與通行碼（序號）設定方式
本系統預設提供「**免費試閱模式**」（開放首頁、給準新人的一封信、使用說明、第 01 章《婚禮總覽》全功能試用，以及四大核心模組的介面預覽）。當買家點擊第 02～13 章或進階功能時，會自動彈出「啟動完整版／前往購買」視窗。

### 內建預設啟動碼（Passcodes）：
- 通用 VIP 啟動碼：`ECHOBLOOM2026`、`BLOOM888`、`WEDDING520`、`VIP2026`
- 智慧前綴驗證：任何以 `EB-` 開頭且長度大於等於 7 碼的序號（例如 `EB-9527`、`EB-202610`），皆可自動通過驗證！您可以在電商後台自動發送 `EB-訂單後四碼` 給買家作為專屬啟動碼。

### 如何修改啟動碼與電商賣場連結：
打開 `index.html`，搜尋 `CONFIG_ECOMMERCE`，即可直接修改：
```javascript
const CONFIG_ECOMMERCE = {
  shopUrl: 'https://echobloom.shop/wedding-planner', // 替換為您的電商商品頁網址
  validCodes: ['ECHOBLOOM2026', 'BLOOM888', 'WEDDING520', 'VIP2026'],
  prefixRule: 'EB-' // 支援動態訂單序號前綴
};
```

## 3. 資料儲存與跨裝置備份
- 買家填寫的所有文字、勾選項目、預算表格、賓客名單、桌次安排、拍立得照片與手繪塗鴉，皆即時自動儲存於瀏覽器本機（`localStorage` key: `echobloom_wedding_v1`）。
- 支援右上角「**備份／管理**」一鍵匯出 `.json` 備份檔，新郎與新娘可透過傳送備份檔或匯入功能輕鬆同步資料，換手機也不怕遺失。

## 4. 免費雲端部署教學（零伺服器成本）
您只需將本資料夾上傳至以下任一免費靜態網站託管服務（皆內建免費 HTTPS，符合 PWA 標準）：
1. **Cloudflare Pages** / **Vercel** / **Netlify**：直接拖曳整個資料夾上傳，1 分鐘內即可獲得專屬網址並綁定您的自有網域（如 `planner.echobloom.com`）。
2. **GitHub Pages**：建立 Repository 上傳這四個檔案，於 Settings -> Pages 開啟即可。
