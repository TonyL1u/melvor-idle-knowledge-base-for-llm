# 召唤技能（Summoning）核心参考指南

这份文档总结了《Melvor Idle》中**召唤（Summoning）**技能的核心机制，用于制作召唤石板（Summoning Tablets）为各种任务提供加成。玩家可同时装备两种石板，部分组合可激活协同效应（Synergy）提供额外加成。旨在为大语言模型（LLM）提供结构化的参考资料。

- 基础等级上限：99（Base Game）
- 扩展等级上限：120（Throne of the Herald）
- 深渊等级上限：60（Into the Abyss）

## 核心机制

### 召唤印记（Summoning Marks）获取

印记是解锁幻兽的基础，通过执行除召唤外的其他技能动作（获得 XP 时，即使 XP 因上限被作废也算）有概率发现。

- 必须达到对应幻兽的召唤等级才能发现印记
- 1级时可发现两种印记：Golbin Thief（战斗中获得 Attack/Strength/Defence XP 时）和 Ent（Woodcutting 时）
- 发现某幻兽的首个印记后，必须先获得至少一个该幻兽的石板才能继续发现后续印记（石板必须进入银行，满银行导致石板消失不算；Township Tasks 等其他来源获得的石板也算）
- 印记不是物品，不会进入银行，而是填充对应幻兽的印记等级进度条

#### 特殊规则

- 战斗技能（含 Slayer）的印记在每次命中时判定，而非击杀时
- Slayer 印记只能从当前 Slayer 任务怪物获得
- Prayer 印记只能在使用消耗祈祷点数的祈祷时获得
- Magic 印记可在 Alt. Magic 中获得
- Strength 印记不能在 Barbarian Fishing 区域捕鱼时获得

### 印记等级表

| 等级 | 本级所需印记数 | 累计印记数 | 解锁效果 |
|------|--------------|-----------|----------|
| 1 | 1 | 1 | 解锁制作该幻兽的石板 |
| 2 | 5 | 6 | 解锁与 Tier 1 幻兽的协同 |
| 3 | 10 | 16 | 解锁与 Tier 2 幻兽的协同 |
| 4 | 15 | 31 | 解锁与 Tier 3 幻兽的协同 |
| 5 | 15 | 46 | 解锁与 Tier 4 幻兽的协同 |
| 6 | 15 | 61 | 解锁与 Tier 5 幻兽的协同 |

### 印记发现概率（Mark Discovery Chance）

每次动作发现印记的概率公式：

```
Mark Chance = A / ((T + 1)² × 200) × E
```

- **T**: 幻兽的 Tier 等级
- **E**: 装备修正值
  - 未装备该幻兽: E = 1
  - 已装备该幻兽（非战斗技能）: E = 2.5
  - 已装备该幻兽（战斗技能）: E = 2
- **A**: 动作时间（秒），规则如下：
  - 战斗技能: 等于玩家攻击速度
  - 特定技能使用标准化时间（见下表）
  - 其他技能: 实际动作时间（应用间隔缩减修正后）

#### 标准化动作时间表

| 技能 | 每次动作秒数 |
|------|------------|
| Firemaking | 基础燃烧间隔的 60% |
| Cooking | 基础烹饪间隔的 85% |
| Smithing | 1.7 |
| Fletching | 1.3 |
| Crafting | 1.65 |
| Runecrafting | 1.7 |
| Herblore | 1.7 |
| Summoning | 4.85 |

#### 置信度计算公式

计算在一定置信度下需要多少次动作才能获得至少一个印记：

```
动作次数 = ⌈ log(1 - c) / log(1 - m) ⌉
```

- **m**: 上述印记概率
- **c**: 期望置信度（如 0.5 = 50%）

#### 示例

装备 Salamander（Tier 3）时，50% 置信度：
- m = 1.7 / ((3+1)² × 200) × 2.5 = 0.001328
- 动作次数 = ⌈ log(0.5) / log(0.998672) ⌉ = 522 次

#### 装备印记时各技能置信度动作次数表

| 技能 | 幻兽 | Tier | 50% | 75% | 90% | 95% |
|------|------|------|-----|-----|-----|-----|
| Crafting | Monkey | 3 | 538 | 1,075 | 1,786 | 2,323 |
| Fletching | Beaver | 5 | 1,536 | 3,071 | 5,100 | 6,636 |
| Herblore | Bear | 3 | 522 | 1,044 | 1,733 | 2,255 |
| Runecrafting | Crow | 2 | 294 | 587 | 975 | 1,268 |
| Smithing | Salamander | 3 | 522 | 1,044 | 1,733 | 2,255 |
| Summoning | Fox | 5 | 412 | 823 | 1,367 | 1,778 |

### 最大化印记发现概率

- 装备对应幻兽的石板（非战斗 2.5x，战斗 2x）
- Firemaking: 燃烧精通等级最高的原木（最高精通 = 最短相对燃烧间隔 = 最大印记概率）
- 资源消耗技能（Cooking/Smithing/Fletching/Crafting/Runecrafting/Herblore）: 最小化动作时间可提高印记获取速率
- 其他技能: 动作时间变化不影响印记获取速率，但较长动作可减少石板消耗
- 战斗特别注意：
  - 最大化命中率（印记只在命中时判定，未命中不判定）
  - 多段攻击的特殊攻击不会增加印记概率（后续攻击使用的是距上次命中的时间而非基础攻击间隔）

## 获取召唤经验（Gaining Summoning XP）

有两种方式获取召唤 XP：制作石板和使用石板。注意只有制作石板才能获得精通 XP（Mastery XP）。

### 制作召唤石板

- 默认每次动作耗时 5 秒，产出 25 块石板
- 无论产出多少石板，每次动作获得的 XP 相同
- 各扩展的间隔缩减和产量加成：

| DLC | 间隔缩减 | 时间减少 | 产量增加 |
|-----|---------|---------|---------|
| 扩展1 | -10% | -1s | +31 |
| 扩展2 | -45% | 0s | +41 |
| 扩展3 | -6% | -0.5s | +3 |
| 扩展4 | -5% | -0.6s | +32 |
| 合计 | -66% | -2.1s | +107 |

部分加成仅适用于特定领域，不同扩展的加成可能占用相同装备槽位。

#### 制作 XP 公式

```
XP = 5 + 2 × ⌊召唤等级需求 × 0.2⌋
```

示例：制作 Pig 石板（需要25级）：XP = 5 + 2 × ⌊25 × 0.2⌋ = 15 xp

### 使用幻兽获取 XP

使用石板获取 XP 的速度远快于制作。每消耗一次石板充能即获得 XP。
- 非战斗石板：玩家在相关技能中执行动作时消耗
- 战斗石板：幻兽攻击条填满时消耗（基础间隔 3 秒）
- Occultist 和 Witch 石板只在战斗中消耗并提供 XP，不在 Alt. Magic 中消耗

#### Melvor 领域 XP 公式

```
XP = (动作时间 × 石板等级 × 10) / (石板等级 + 10) × XP加成
```

- XP加成包括所有适用于 Summoning 的乘法 XP 修正（全局、非战斗、召唤专属）

示例：使用 Pig 石板（25级），25% XP 加成，动作时间 2.55 秒：
- XP = (2.55 × 25 × 10) / (25 + 10) × 1.25 = 22.7625 xp
- 协同效果中两块石板各自获得 XP，使用相同动作时间

#### 深渊领域 AXP 公式

深渊石板不使用动作间隔，公式基于深渊等级：

```
AXP = ((石板深渊等级 + 120) × 石板深渊等级) / 2 × AXP加成
```

- AXP加成 = 全局AXP + 召唤技能AXP + 非战斗技能AXP + 其他适用AXP修正

示例：使用 Abyssal Pig 石板（深渊20级），25% AXP 加成：
- AXP = ((20 + 120) × 20) / 2 × 1.25 = 1,750 axp
- 协同效果中两块石板各自获得 AXP

## 协同效果（Synergies）

部分幻兽同时装备时会产生额外效果，称为协同效果。需要双方印记等级都达到要求才能解锁。

- 协同所需印记等级 = 1 + 对方幻兽的 Tier 等级
- 示例：Golbin Thief (Tier 1) 与 Minotaur (Tier 2) 的协同需要 Golbin Thief 印记等级3、Minotaur 印记等级2

### 协同效果的石板消耗

- 使用协同时，每块石板都会消耗充能（在正常消耗之外额外消耗）
- 示例：Ent-Mole 协同（伐木时 +2% 概率获得随机宝石）每次动作消耗 2 块 Ent 石板 + 1 块 Mole 石板
- 战斗协同：每种石板消耗 2 块。几乎所有战斗召唤在攻击时消耗，例外如 Fox-Unicorn 协同（+150 生命恢复）在玩家恢复生命时消耗
- 协同效果因消耗更多石板而获得更多 XP；选择最长动作时间可减少石板消耗

## 召唤印记列表（Summoning Marks）

印记通过在对应技能中执行动作时发现。

### Melvor 领域印记

| 印记名称 | 等级 | Tier | 发现技能 |
|----------|------|------|---------|
| Mark of the Golbin Thief | 1 | 1 | Attack, Strength, Defence |
| Mark of the Ent | 1 | 1 | Woodcutting |
| Mark of the Mole | 5 | 1 | Mining |
| Mark of the Occultist | 5 | 1 | Magic |
| Mark of the Wolf | 15 | 1 | Attack, Ranged |
| Mark of the Octopus | 15 | 1 | Fishing |
| Mark of the Minotaur | 25 | 2 | Strength |
| Mark of the Pig | 25 | 2 | Cooking |
| Mark of the Crow | 35 | 2 | Runecrafting |
| Mark of the Centaur | 35 | 2 | Ranged |
| Mark of the Witch | 45 | 2 | Magic |
| Mark of the Leprechaun | 45 | 2 | Thieving |
| Mark of the Monkey | 55 | 3 | Crafting |
| Mark of the Cyclops | 55 | 3 | Slayer |
| Mark of the Yak | 65 | 3 | Defence |
| Mark of the Salamander | 65 | 3 | Smithing |
| Mark of the Tortoise | 70 | 1 | Attack, Ranged, Magic |
| Mark of the Unicorn | 80 | 3 | Prayer |
| Mark of the Bear | 80 | 3 | Herblore |
| Mark of the Devil | 90 | 3 | Firemaking |
| Mark of the Dragon | 90 | 3 | Hitpoints |
| Mark of the Lightning Spirit | 100 | 4 | Attack, Ranged, Magic |
| Mark of the Eagle | 100 | 4 | Agility |
| Mark of the Owl | 105 | 4 | Astrology |
| Mark of the Siren | 105 | 4 | Strength, Ranged, Magic |
| Mark of the Spider | 110 | 5 | Defence, Ranged, Magic |
| Mark of the Beaver | 110 | 5 | Fletching |
| Mark of the Fox | 115 | 5 | Summoning |
| Mark of the Spectre | 115 | 5 | Prayer |

### Abyssal（深渊）领域印记

| 印记名称 | 等级 | Tier | 发现技能 |
|----------|------|------|---------|
| Mark of the Imp | 1 | 1 | Corruption |
| Mark of the Golem | 1 | 1 | Harvesting |
| Mark of the Abyssal Ent | 5 | 1 | Woodcutting |
| Mark of the Abyssal Golbin Thief | 5 | 1 | Attack, Strength, Defence |
| Mark of the Abyssal Occultist | 10 | 1 | Magic |
| Mark of the Abyssal Mole | 10 | 1 | Mining |
| Mark of the Abyssal Wolf | 15 | 1 | Attack, Ranged |
| Mark of the Abyssal Octopus | 15 | 1 | Fishing |
| Mark of the Abyssal Pig | 20 | 2 | Cooking |
| Mark of the Abyssal Minotaur | 20 | 2 | Strength |
| Mark of the Abyssal Centaur | 25 | 2 | Ranged |
| Mark of the Abyssal Crow | 25 | 2 | Runecrafting |
| Mark of the Abyssal Witch | 30 | 2 | Magic |
| Mark of the Abyssal Leprechaun | 30 | 2 | Thieving |
| Mark of the Abyssal Monkey | 35 | 3 | Crafting |
| Mark of the Abyssal Cyclops | 35 | 3 | Slayer |
| Mark of the Abyssal Yak | 40 | 3 | Defence |
| Mark of the Abyssal Salamander | 40 | 3 | Smithing |
| Mark of the Abyssal Unicorn | 45 | 3 | Prayer |
| Mark of the Abyssal Bear | 45 | 3 | Herblore |
| Mark of the Abyssal Devil | 50 | 3 | Firemaking |
| Mark of the Abyssal Dragon | 50 | 3 | Hitpoints |
| Mark of the Eldritch Eyeball | 55 | 3 | Attack, Ranged, Magic |
| Mark of the Void Wisp | 55 | 3 | Summoning |

## 石板列表（Tablets）

### 非战斗召唤 - Melvor 领域

| 名称 | 等级 | Tier | 制作XP | 碎片数 | 碎片费用 |
|------|------|------|--------|--------|---------|
| Ent | 1 | 1 | 5 | 6x | 1,200 |
| Mole | 5 | 1 | 7 | 6x | 1,200 |
| Octopus | 15 | 1 | 11 | 6x | 1,200 |
| Pig | 25 | 2 | 15 | 8x, 6x | 4,000 |
| Crow | 35 | 2 | 19 | 8x, 6x | 4,000 |
| Leprechaun | 45 | 2 | 23 | 8x, 6x | 4,000 |
| Monkey | 55 | 3 | 27 | 10x, 8x, 6x | 8,800 |
| Salamander | 65 | 3 | 31 | 10x, 8x, 6x | 8,800 |
| Bear | 80 | 3 | 37 | 10x, 8x, 6x | 8,800 |
| Devil | 90 | 3 | 41 | 10x, 8x, 6x | 8,800 |
| Eagle | 100 | 4 | 45 | 12x, 10x, 8x | 11,200 |
| Owl | 105 | 4 | 47 | 12x, 10x, 8x | 11,200 |
| Beaver | 110 | 5 | 49 | 14x, 10x, 8x | 11,600 |
| Fox | 115 | 5 | 51 | 14x, 10x, 8x | 11,600 |

### 非战斗召唤 - Abyssal 领域

| 名称 | 等级 | Tier | 制作XP | 碎片数 | 碎片费用 |
|------|------|------|--------|--------|---------|
| Golem | 1 | 1 | 688 | 12x | 12,000 |
| Abyssal Ent | 5 | 1 | 709 | 12x | 12,000 |
| Abyssal Mole | 10 | 1 | 936 | 12x | 12,000 |
| Abyssal Octopus | 15 | 1 | 1,215 | 12x | 12,000 |
| Abyssal Pig | 20 | 2 | 1,559 | 16x | 16,000 |
| Abyssal Crow | 25 | 2 | 2,443 | 16x | 16,000 |
| Abyssal Leprechaun | 30 | 2 | 3,089 | 16x | 16,000 |
| Abyssal Monkey | 35 | 3 | 3,811 | 20x | 20,000 |
| Abyssal Salamander | 40 | 3 | 4,557 | 20x | 20,000 |
| Abyssal Bear | 45 | 3 | 5,089 | 20x | 20,000 |
| Abyssal Devil | 50 | 3 | 5,065 | 20x | 20,000 |
| Void Wisp | 55 | 3 | 8,021 | 24x | 24,000 |

### 战斗召唤 - Melvor 领域

| 名称 | 等级 | Tier | 制作XP | 碎片数 | 碎片费用 | 最大生命 |
|------|------|------|--------|--------|---------|---------|
| Golbin Thief | 1 | 1 | 5 | 6x | 1,200 | 21 |
| Occultist | 5 | 1 | 7 | 6x | 1,200 | 40 |
| Wolf | 15 | 1 | 11 | 6x | 1,200 | 59 |
| Minotaur | 25 | 2 | 15 | 8x, 6x | 4,000 | 78 |
| Centaur | 35 | 2 | 19 | 8x, 6x | 4,000 | 97 |
| Witch | 45 | 2 | 23 | 8x, 6x | 4,000 | 116 |
| Cyclops | 55 | 3 | 27 | 10x, 8x, 6x | 8,800 | 135 |
| Yak | 65 | 3 | 31 | 10x, 8x, 6x | 8,800 | 154 |
| Tortoise | 70 | 1 | 33 | 14x, 6x | 5,200 | 160 |
| Unicorn | 80 | 3 | 37 | 10x, 8x, 6x | 8,800 | 173 |
| Dragon | 90 | 3 | 41 | 10x, 8x, 6x | 8,800 | 192 |
| Lightning Spirit | 100 | 4 | 45 | 12x, 10x, 8x | 11,200 | 202 |
| Siren | 105 | 4 | 47 | 12x, 10x, 8x | 11,200 | 207 |
| Spider | 110 | 5 | 49 | 14x, 12x, 10x | 13,600 | 212 |
| Spectre | 115 | 5 | 51 | 14x, 12x, 10x | 13,600 | 217 |

### 战斗召唤 - Abyssal 领域

| 名称 | 等级 | Tier | 制作XP | 碎片数 | 碎片费用 | 最大生命 |
|------|------|------|--------|--------|---------|---------|
| Imp | 1 | 1 | 688 | 12x | 12,000 | 100 |
| Abyssal Golbin Thief | 5 | 1 | 709 | 12x | 12,000 | 200 |
| Abyssal Occultist | 10 | 1 | 936 | 12x | 12,000 | 400 |
| Abyssal Wolf | 15 | 1 | 1,215 | 12x | 12,000 | 500 |
| Abyssal Minotaur | 20 | 2 | 1,559 | 16x | 16,000 | 700 |
| Abyssal Centaur | 25 | 2 | 2,443 | 16x | 16,000 | 900 |
| Abyssal Witch | 30 | 2 | 3,089 | 16x | 16,000 | 1,100 |
| Abyssal Cyclops | 35 | 3 | 3,811 | 20x | 20,000 | 1,300 |
| Abyssal Yak | 40 | 3 | 4,557 | 20x | 20,000 | 1,500 |
| Abyssal Unicorn | 45 | 3 | 5,089 | 20x | 20,000 | 1,700 |
| Abyssal Dragon | 50 | 3 | 5,065 | 20x | 20,000 | 1,900 |
| Eldritch Eyeball | 55 | 3 | 8,021 | 24x | 24,000 | 2,200 |

## 精通解锁（Mastery Unlocks）

### 物品精通等级解锁

| 精通等级 | 解锁效果 |
|---------|---------|
| 10 | +5% 该石板费用减免（不含碎片） |
| 20 | +5% 该石板费用减免（不含碎片） |
| 30 | +5% 该石板费用减免（不含碎片） |
| 40 | +5% 该石板费用减免（不含碎片） |
| 50 | +5% 该石板费用减免（不含碎片） |
| 50 | +1 碎片费用减免（仅该石板） |
| 60 | +5% 该石板费用减免（不含碎片） |
| 70 | +5% 该石板费用减免（不含碎片） |
| 80 | +5% 该石板费用减免（不含碎片） |
| 90 | +5% 该石板费用减免（不含碎片） |
| 99 | +5% 该石板费用减免（不含碎片） |
| 99 | +1 碎片费用减免（仅该石板） |
| 99 | +10 该石板基础产量 |

### 精通池检查点（Melvor Realm）

| 池百分比 | 池XP | 加成 |
|---------|------|------|
| 10% | 1,450,000 xp | +5% 召唤精通 XP（仅 Melvor 领域） |
| 25% | 3,625,000 xp | Tier 1 幻兽 -1 碎片费用；Tier 2 幻兽 -1 碎片费用 |
| 50% | 7,250,000 xp | +10% 召唤资源保存概率（仅 Melvor 领域） |
| 95% | 13,775,000 xp | +10 基础主要资源产量（仅 Melvor 领域）；Tier 3 幻兽 -1 碎片费用 |
| 总精通池XP | 14,500,000 | - |

### 精通池检查点（Abyssal Realm）

| 池百分比 | 池XP | 加成 |
|---------|------|------|
| 10% | 1,200,000 xp | +6% 召唤精通 XP（仅深渊领域） |
| 25% | 3,000,000 xp | 深渊领域幻兽 -3 碎片费用 |
| 50% | 6,000,000 xp | +10% 召唤资源保存概率（仅深渊领域） |
| 95% | 11,400,000 xp | +5 基础主要资源产量（仅深渊领域） |
| 总精通池XP | 12,000,000 | - |

## 技能披风（Skillcapes）

### 普通技能披风

- 购买条件: 召唤等级达到 99
- 价格: 1,000,000 金币
- 效果:
  - +20% 召唤资源保存概率
  - +10% 召唤充能保存概率
  - +10 召唤基础主要资源产量

### 高级技能披风

- 购买条件: 召唤等级达到 120（需要 Throne of the Herald 扩展）
- 价格: 10,000,000 金币
- 效果:
  - +25% 召唤资源保存概率
  - +15% 召唤充能保存概率
  - +10 召唤基础主要资源产量（仅 Melvor 领域）
  - +10% 召唤最大伤害
  - -10% 召唤间隔

## 宠物（Pet）

| 宠物名称 | 效果 | 获取方式 |
|---------|------|---------|
| Tim the Wolf | Melvor 领域幻兽 -1 碎片费用 | 制作石板时解锁（使用石板不算） |
| Mark | +10% 召唤充能保存概率 | 基础游戏所有召唤印记达到等级4时解锁 |

## 药水（Potion）

### 死灵药水（Necromancer Potion）

增加每次动作制作的石板数量。

| 等级 | 充能次数 | 效果 |
|------|---------|------|
| I | 15 | +1 召唤基础主要资源产量 |
| II | 30 | +2 召唤基础主要资源产量 |
| III | 45 | +3 召唤基础主要资源产量 |
| IV | 60 | +5 召唤基础主要资源产量 |

### 暗黑仪式药水（Dark Ritual Potion）

减少深渊领域石板的物品费用。

| 等级 | 充能次数 | 效果 |
|------|---------|------|
| I | 1 | +5% 召唤费用减免（不含碎片，仅深渊领域） |
| II | 2 | +10% 召唤费用减免（不含碎片，仅深渊领域） |
| III | 3 | +15% 召唤费用减免（不含碎片，仅深渊领域） |
| IV | 4 | +25% 召唤费用减免（不含碎片，仅深渊领域） |

## 技能加成（Skill Boosts）

技能加成来源包括装备、药水、宠物和精通等。常见加成类型：

- 增加技能 XP: 提高经验获取量
- 减少技能间隔: 缩短动作时间，单位时间内执行更多动作
- 资源保存概率: 提高动作中不消耗资源的概率
- 双倍物品概率: 提高获得双倍产出的概率
- 增加精通 XP: 提高精通经验获取速率

全局加成适用于所有技能。详细信息参见 Skill Boosts 页面。
