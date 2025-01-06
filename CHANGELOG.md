# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- 調整字體為 [俐方體 11](https://github.com/ACh-K/Cubic-11)

## [v0.3.7] - 2025-01-03

### Changed

- 調整 UI
- 增加天地 bar, 側邊欄, 作者資訊

## [v0.3.6] - 2025-01-02

### Fixed

- 建立 server, 使用 cloudflare worker 串接 D1 database

## [v0.3.5] - 2024-12-10

### Fixed

- Database 改為使用 Supabase

## [v0.3.4] - 2024-10-31

### Added

- 增加治療類卡牌
- 增加使用治療類卡牌機制
- 依照稀有度權重生成道具機制
- 增加等級系統

### Changed

- 填滿機器人池調整為 5 隻
- 調整遊戲性：機器人血量、攻擊力與卡牌數值

### Fixed

- 修正機率產生器，現在會包含 max 值
- 修正戰鬥結束時敵人會多打一下的問題


## [v0.3.3] - 2024-10-28

### Changed

- 調整遊戲節奏

### Fixed

- 修正 mobile 版播放音效權限問題
- 修正賣東西 bug
- 修正戰利品丟棄道具 bug

## [v0.3.2] - 2024-10-25

### Fixed

- 發牌邏輯

## [v0.3.1] - 2024-10-03

### Fixed

- API url

## [v0.3.0] - 2024-10-03

### Added

- 新增樣板：角色/裝備/卡牌
- 樣板實例化時，隨機產生稀有度，依稀有度初始化數值
- 新增 useSoundEffect，用 composable 方式呼叫音效
- 新增初始化遊戲載入動畫
- Google App Scripts 新增 post 方法，現在可以儲存玩家細節資料了
- 現在商店每 10 分鐘會更新一次商品了
- 現在會紀錄戰鬥結果了

### Changed

- 優化素材取得方式：`CloudStorage`
- 重構底層邏輯
- 優化稀有度系統/裝備系統
- 建立 factory，優化產生玩家與物品方式
- 重構樣式：配色/按鈕/卡牌/裝備/卡牌/玩家狀態/系統提示框
- 重構 layout：主畫面/排行榜/選角/背包/商店/選擇敵人/戰鬥/戰鬥結束
- 邏輯牌功能修改為攻擊型/防禦型

## [v0.2.3] - 2023-08-25

### Added

- 導入套件 `unplugin-vue-components`：減少程式碼中 import component 部分，於編譯時執行
- 導入套件 `vitest`：單元測試
- 導入套件 `i18n`：多語系
- 導入套件 `eslint`：依 Airbnb Guide 寫作風格規範程式碼開發（[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)）

### Changed

- 商店與背包現在可以篩選【裝備】與【技術牌】了
- 裝備與技術牌增加稀有度，商店出現頻率依稀有度自動生成
- 增加機器人出牌行為真實性
- 離開畫面時音效暫停

## [v0.2.2] - 2023-08-22

### Changed

- 新增喃喃自語文本

### Fixed

- 修復細微錯誤

## [v0.2.1] - 2023-08-21

### Added

- 新增角色，及角色喃喃自語文本

### Fixed

- 修復細微錯誤

## [v0.2.0] - 2023-08-20

### Added

- 導入 `Vite` 提升開發速度
- 增加裝備系統，商店可購買裝備
- 增加物品詳細說明

### Changed

- 取消卡牌保存機制，改為每回合發牌，戰鬥結束只保留技術牌

## [v0.1.0] - 2023-08-07

### Added

- 初始化專案
- 機器人出牌邏輯
- 玩家擊敗機器人後，可獲得卡牌
- 機器人與玩家碎碎念系統
- 商店可購買卡牌
- 串接 Google Sheet 紀錄遊玩資料
