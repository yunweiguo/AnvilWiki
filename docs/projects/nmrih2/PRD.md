# No More Room in Hell 2 — 项目 PRD

## 1. 项目背景

`No More Room in Hell 2` 在 2026-08-11 1.0 发布后搜索热度显著上升。现阶段需求集中在 crossplay、Xbox、PS5、Game Pass、solo、tips、Steam/PC、review、characters、update 等高意图查询。

项目目标不是复制 Fandom，而是利用 AnvilWiki 现有 SEO 与内容基础设施，在搜索窗口期快速建立一个**搜索意图驱动的 NMRiH2 垂直站**。

## 2. 产品定位

> **No More Room in Hell 2 Guides, Crossplay, Platforms & Gameplay Hub**

核心价值：

1. 对搜索问题给出直接、最新、可验证的答案。
2. 用 1.0 / `lastModified` / `gameVersion` 建立 freshness 优势。
3. 用更清晰的页面结构和内部链接覆盖长尾，而不是追求百科条目数量。
4. 后续只有在 GSC 验证后才扩展动态工具与更深内容。

## 3. 目标与非目标

### 3.1 MVP 目标

| ID | 目标 | 验收标准 |
|---|---|---|
| G1 | 快速上线 | 首批 10 个内容页可索引 |
| G2 | 搜索意图匹配 | ≥80% 首批页来自已验证 Trends 需求 |
| G3 | SEO 完整 | TDH、canonical、sitemap、JSON-LD、内链正常 |
| G4 | 内容可信 | 所有硬事实有可靠来源；不生成 fake facts |
| G5 | 架构轻量 | 保持 Astro Static + Cloudflare Pages |
| G6 | 可持续迭代 | 后续以 GSC Query 驱动扩页 |

### 3.2 MVP 非目标

- 用户账户 / 登录
- 数据库 / CMS
- SSR
- 实时 Player Count
- Codes / Redeem
- Boss 攻略集
- Interactive Map
- Build Planner
- 多语言
- 大规模 Weapons DB

## 4. 用户与核心场景

### P1：跨平台玩家

问题：

- PC、PS5、Xbox 是否能一起玩？
- 怎么打开 crossplay？
- 为什么组队失败？

主页面：`/guides/crossplay`

### P2：平台购买用户

问题：

- Xbox / PS5 有没有？
- Xbox One / PS4 支持吗？
- Game Pass 有吗？
- Steam 价格 / PC 支持如何？

主页面：`/platforms/*`

### P3：新玩家

问题：

- 怎么玩？
- solo 怎么开？
- 感染、死亡、资源怎么处理？

主页面：`/guides/beginner-tips`、`/guides/solo-mode`

### P4：购买决策用户

问题：

- 1.0 后值不值得买？
- 当前主要问题是什么？
- 价格如何？

主页面：`/guides/is-it-worth-it`

## 5. 信息架构

```text
/
├── guides/
│   ├── crossplay
│   ├── beginner-tips
│   ├── solo-mode
│   └── is-it-worth-it
├── platforms/
│   ├── xbox
│   ├── ps5
│   ├── game-pass
│   └── steam-pc
├── gameplay/
│   └── characters
└── updates/
    └── armageddon-1-0
```

导航：

```text
Guides
Platforms
Gameplay
Updates
```

## 6. 首批 10 页

| Priority | URL | Primary Intent |
|---|---|---|
| P0 | `/guides/crossplay` | crossplay |
| P0 | `/platforms/xbox` | Xbox |
| P0 | `/platforms/ps5` | PS5 / PlayStation |
| P0 | `/platforms/game-pass` | Game Pass |
| P0 | `/guides/solo-mode` | solo |
| P0 | `/guides/beginner-tips` | tips / beginner |
| P1 | `/platforms/steam-pc` | Steam / PC |
| P1 | `/guides/is-it-worth-it` | review / price |
| P1 | `/gameplay/characters` | characters / responders |
| P1 | `/updates/armageddon-1-0` | update / 1.0 |

TDH、H1/H2/H3、Secondary Keywords 与关键词归属详见 `../nmrih2-mvp.md`。

## 7. 首页需求

### 7.1 Hero

H1：`No More Room in Hell 2 Wiki & Guides`

首屏价值表达：

- Crossplay
- Platform availability
- Beginner tips
- Solo
- 1.0 updates

CTA：

- Crossplay Guide
- Beginner Guide

### 7.2 Start Here

4 个入口：

1. Crossplay
2. Platforms
3. Beginner Tips
4. Solo Mode

### 7.3 Trending / Popular

首期基于已验证搜索趋势人工配置，不宣称为站内真实阅读排行。

推荐：

- Crossplay
- Xbox
- Game Pass
- Solo Mode

### 7.4 Explore

- Crossplay
- Platforms
- Getting Started
- Latest Updates

## 8. 内容产品规范

### 8.1 Answer-first

每页必须：

- Primary Intent 清晰
- `summary` 给直接答案
- 正文从 H2 开始
- H2 用用户问题表达
- 每个 H2 后先直答，再展开

### 8.2 Freshness

时效页面必须维护：

```yaml
lastModified:
gameVersion:
```

适用：

- Game Pass
- Crossplay / known issues
- Review
- Update
- Platform availability

### 8.3 来源要求

优先级：

1. 官方网站 / Patch notes
2. Steam / Xbox / PlayStation 商店
3. Developer announcement
4. 实际游戏验证
5. Steam Community / Reddit（仅辅助）

未验证事实不得写入正式页；必要时 `draft: true`。

## 9. SEO 策略

### 9.1 Keyword ownership

每个 Primary Keyword 只对应一个 canonical page。

例如：

- crossplay → `/guides/crossplay`
- game pass → `/platforms/game-pass`
- solo → `/guides/solo-mode`

其他页面可以提及，但只给摘要并内链 canonical page。

### 9.2 首页不抢所有词

首页主攻：

`no more room in hell 2 wiki`

其他 query 由内页承接。

### 9.3 TDH

完整 TDH 与 Heading 规范见：

`docs/projects/nmrih2-mvp.md`

## 10. 数据与动态能力

### MVP

全部静态内容。

### Phase 2：Player Count

触发条件：GSC 中 `player count / steam charts / steamdb` 有持续 impression。

架构建议：

```text
Browser
  ↓
Cloudflare Worker API
  ↓
1-5 min cache
  ↓
verified data source
```

不将整个 Astro 站改为 SSR。

### Phase 2：Crossplay Checker

触发条件：crossplay 页获得明显 impression / click。

做成通用 `CompatibilityChecker.astro`，不是 NMRiH2 专属组件。

## 11. 多语言

MVP：English only。

第二语言由 GSC 决定，不提前翻译。

## 12. 商业化

MVP 不以商业化为阻塞项。

AnvilWiki 已有 AdSense 基础设施；站点达到内容与流量门槛后再启用。

Review / platform / price 页面可在后期考虑合规 affiliate CTA，但不能影响内容可信度。

## 13. 成功指标

### T+1 天

- 10 个页面部署完成
- sitemap / robots 正常
- 无 demo 残留

### T+3–7 天

重点观察：

- Indexed pages
- Impressions
- Query coverage
- Country distribution

### T+7–14 天

若出现明显 Query：

- 扩对应长尾
- 补深度内容
- 评估 Crossplay Checker / Player Count

若无 impression：

- 不继续大规模铺页
- 检查选词 / index / SERP competition

## 14. MVP Definition of Done

- [ ] 完成 NMRiH2 配置实例化
- [ ] 首页完成
- [ ] 10 个正式 MDX 页面完成
- [ ] TDH 符合专项文档
- [ ] 无 fake codes / fake facts
- [ ] 所有 config/content checks 通过
- [ ] build 成功
- [ ] Cloudflare Pages 上线
- [ ] Search Console 提交 sitemap
