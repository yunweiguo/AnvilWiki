# No More Room in Hell 2 — 内容计划

## 1. 内容策略

首期内容由已验证搜索意图驱动，不按 Wiki 百科目录机械铺页。

页面优先级：

1. 明确窗口词
2. 高意图平台词
3. Evergreen 新手需求
4. 购买决策
5. 版本 / 更新

## 2. 首批 10 页素材清单

| 页面 | 必需素材 | 可选增强素材 | 状态 |
|---|---|---|---|
| Crossplay | 官方跨平台支持说明、平台矩阵、组队方式、known issues | 实际截图、官方 FAQ | 待补充 |
| Xbox | Xbox Store、支持机型、价格、联机要求 | Xbox 截图 | 待补充 |
| PS5 | PS Store、PS5/PS4 状态、价格、PS Plus要求 | PS5 截图 | 待补充 |
| Game Pass | 当前 Game Pass 状态、官方或商店依据 | 历史加入/离开信息 | 待补充 |
| Solo | 官方 Solo 规则、进入方式、与 co-op 差异 | 实玩经验 | 待补充 |
| Beginner Tips | 感染、死亡、资源、武器、撤离等可靠玩法资料 | 实玩笔记、优质视频 | 待补充 |
| Steam/PC | Steam 商店、价格、系统要求、controller、crossplay | Steam Deck 实测 | 待补充 |
| Review | Steam 评价、1.0 现状、known issues、价格、核心优缺点 | 第一手试玩体验 | 待补充 |
| Characters | Responders 机制、progression、loadout、差异 | 截图/角色表 | 待补充 |
| 1.0 Update | 官方 1.0 / Armageddon patch notes | 对比 EA 前后差异 | 待补充 |

## 3. 内容来源优先级

1. NMRiH2 官方站 / patch notes
2. Steam / Xbox / PlayStation 官方商店
3. 开发团队公告
4. 游戏客户端或真实试玩
5. Steam Community / Reddit / YouTube 作为补充

涉及以下事实时必须优先官方来源：

- crossplay
- platform support
- Game Pass
- price
- release/update
- progression rules
- paid/free status

## 4. 每页写作模板

```text
Frontmatter
  title
  description
  category
  date
  lastModified
  gameVersion
  summary
  tags

H2: Primary user question
Direct answer
Details / table

H2: Secondary question
Direct answer
Details

H2: Troubleshooting / edge case

H2: Related question
Internal link to canonical page
```

正文禁止 H1。

## 5. 内链策略

### Crossplay canonical

以下页面提 crossplay 时统一内链：

`/guides/crossplay`

包括：Xbox、PS5、Steam、Game Pass。

### Platform canonical

- Xbox → `/platforms/xbox`
- PS5 → `/platforms/ps5`
- Game Pass → `/platforms/game-pass`
- Steam → `/platforms/steam-pc`

### Gameplay canonical

- Solo → `/guides/solo-mode`
- Beginner → `/guides/beginner-tips`
- Characters → `/gameplay/characters`

### Review canonical

价格、免费状态可以在平台页短答，但“值不值得买”的结论归 `/guides/is-it-worth-it`。

## 6. Tags 初始词表

统一复用，避免 tag 碎片化：

```text
crossplay
multiplayer
xbox
ps5
playstation
steam
pc
game-pass
solo
beginner
survival
responders
progression
update
1.0
```

不要创建同义重复：

```text
xbox-series
xbox-series-xs
xbox-console
```

除非后续 tag 聚合确实有价值。

## 7. Freshness 规则

### 高频复核

每 7 天检查：

- Game Pass
- Crossplay known issues
- Review / current issues
- Platform price / availability

### Patch 后立即检查

- Solo
- Beginner Tips
- Characters / progression
- 1.0 Update

更新时同步：

```yaml
lastModified:
gameVersion:
```

## 8. 首批发布顺序

建议：

```text
1. Crossplay
2. Xbox
3. PS5
4. Game Pass
5. Solo
6. Beginner Tips
7. Steam/PC
8. Review
9. Characters
10. 1.0 Update
```

如果素材不足，宁可页面保持 `draft: true`，也不要为了顺序发布未经验证的内容。

## 9. 第二批候选页

只有 GSC 或新的 Trends 支撑后再做：

- `/guides/weapon-tier-list`
- `/guides/crossplay-not-working`
- `/gameplay/weapons`
- `/gameplay/infection`
- `/gameplay/progression`
- `/maps/*`
- `/stats/player-count`

## 10. 不做清单

首期禁止：

- fake codes
- how-to-redeem
- 为凑数创建 boss pages
- 无依据的 Steam Deck 兼容结论
- 无依据的 Game Pass 预测
- 把社区猜测写成官方事实

## 11. 内容 QA

每页发布前：

- [ ] Primary Keyword 唯一
- [ ] TDH 与专项文档一致
- [ ] summary 直接回答意图
- [ ] 所有硬事实已核对
- [ ] H1 不在正文
- [ ] H2/H3 层级正确
- [ ] 内链指向 canonical page
- [ ] 不存在 placeholder
- [ ] `pnpm check-content` 通过
- [ ] `pnpm build` 通过
