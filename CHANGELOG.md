# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- 新增樣板：角色/裝備/卡牌
- 樣板實例化時，隨機產生稀有度，依稀有度初始化數值
- 新增 useSoundEffect，用 composable 方式呼叫音效

### Changed

- 優化素材取得方式：`CloudStorage`
- 重構底層邏輯
- 優化稀有度系統/裝備系統
- 建立 factory，優化產生玩家與物品方式
- 重構樣式：配色/按鈕/卡片/裝備/卡牌/玩家狀態/系統提示框
- 重構 layout：主畫面/排行榜/選角/背包/商店/選擇敵人
- 重構戰鬥流程與邏輯

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
