# logicard-duel

此為練習用 `Vue3` 開發的純前端專案，採用 `Composition API` coding style，部分資料儲存串接 `Google App Scripts`，以 `Google Spreadsheets` 作為資料儲存。

試玩連結：[https://logicard-duel.pages.dev](https://logicard-duel.pages.dev)

## 技術棧
- `Vue3`：前端框架
- `Vue3 Composition API`：Component 描述語法
- `TypeScript`：型別語法
- `Vite`：本地開發工具
- `Vuex`：狀態管理
- `Google App Scripts`：遊玩紀錄資料儲存
- `Cloudflare`：靜態網站 hosting，`master` 分支進度更新觸發自動化部署

## 版本更新

#### `v0.2.3`
- 導入套件 `unplugin-vue-components`：減少程式碼中 import component 部分，於編譯時執行
- 導入套件 `vitest`：單元測試
- 導入套件 `eslint`：依 Airbnb Guide 寫作風格規範程式碼開發（[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)）
- 商店與背包現在可以篩選【裝備】與【技術牌】了
- 裝備與技術牌增加稀有度，商店出現頻率依稀有度自動生成
- 增加機器人出牌行為真實性
- 離開畫面時音效暫停
##### `v0.2.2`
- 新增喃喃自語文本
- 修復細微錯誤
##### `v0.2.1`
- 新增角色，及角色喃喃自語文本
- 修復細微錯誤
##### `v0.2.0`
- 引入 `Vite` 提升開發速度
- 取消卡牌保存機制，改為每回合發牌，戰鬥結束只保留技術牌
- 增加裝備系統，商店可購買裝備
- 增加物品詳細說明
##### `v0.1.0`
- 初始化專案
- 機器人出牌邏輯
- 玩家擊敗機器人後，可獲得卡牌
- 機器人與玩家碎碎念系統
- 商店可購買卡牌
- 串接 Google Sheet 紀錄遊玩資料

## 作者
- GK｜全端工程師｜gkgkdesign@gmail.com
