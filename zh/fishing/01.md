# 钓鱼技能（Fishing）核心参考指南

这份文档总结了《Melvor Idle》中**钓鱼（Fishing）**技能的核心机制，用于捕获鱼类、特殊物品和垃圾。鱼类可通过 Cooking 烹饪为食物，部分鱼可用于 Herblore 药水或 Summoning 石板的材料。旨在为大语言模型（LLM）提供结构化的参考资料。

- 基础等级上限：99（Base Game）
- 扩展等级上限：120（Throne of the Herald）
- 深渊等级上限：60（Into the Abyss）

## 核心机制

- Fishing 没有固定的动作时间，而是有一个**最小间隔（Min Interval）**和**最大间隔（Max Interval）**，每次动作在两者之间随机取值。间隔减少加成同时作用于最小和最大值。
- Fishing Skillcape 提供保底双倍鱼获取；鱼的 Mastery 达到 99 级也提供保底双倍。两者同时激活时，每次动作保底获得至少 4 条鱼，配合双倍概率最多可获得 8 条。
- 拥有 Throne of the Herald 扩展时，购买 Corundum Fishing Rod 或装备 Superior Fishing Skillcape 后，任何钓鱼区域都可能额外掉落 **Lost Chest**（含高级宝石、Runestone、Fishing Hook、Golden Reel、Burning Reel）。
- Into the Abyss 扩展钓鱼时有概率掉落 **Abyssal Fishing Chest**（不掉垃圾，可开出矿锭、宝石、戒指、Luminous Lure 及 4 种稀有物品）。

## 钓鱼区域

共 15 个钓鱼区域，每个区域有不同的鱼类、垃圾概率和特殊物品概率。

- **Barbarian Fishing**：装备 Barbarian Gloves 解锁，捕鱼同时获得 Strength 经验。
- **Secret Area**：阅读银行中的 Message in a Bottle 解锁。
- **Fisherman's Enclave**：通过 Cartography 发现后解锁。

### Melvor 钓鱼区域

| 区域 | 鱼类 | 鱼概率 | 垃圾概率 | 特殊概率 |
|------|------|--------|----------|----------|
| Shallow Shores | Raw Shrimp, Raw Lobster, Raw Crab | 75% | 25% | 0% |
| Shrapnel River | Raw Sardine, Raw Herring, Raw Carp | 80% | 20% | 0% |
| Trench of Despair | Raw Blowfish, Raw Poison Fish, Raw Anglerfish, Raw Cave Fish | 70% | 28% | 2% |
| Lemvor Pier | Raw Trout, Raw Salmon, Raw Fanfish | 70% | 29% | 1% |
| Open Waters | Raw Swordfish, Raw Manta Ray | 69% | 29% | 2% |
| Barren Ocean | Raw Shark, Raw Whale | 90% | 10% | 0% |
| Barbarian Fishing | Leaping Trout, Leaping Salmon, Leaping Broad Fish | 95% | 5% | 0% |
| Secret Area | Raw Seahorse, Raw Skeleton Fish, Raw Magic Fish | 95% | 0% | 5% |
| Magma Lake | Raw Lava Fish, Raw Magma Fish, Raw Magma Eel | 80% | 15% | 5% |
| Jungle Waters | Raw Spike Fish, Raw Blue Crab, Raw Large Blowfish | 79% | 20% | 1% |
| Static Valley | Raw Rockfish, Raw Static Jellyfish | 85% | 14% | 1% |
| Frozen Sea | Raw Frost Crab, Raw Frozen Manta Ray | 90% | 10% | 0% |
| Midnight Lagoon | Raw Ghost Fish, Raw Terrorfish | 66% | 31% | 3% |
| Mystic Pond | Raw Mystic Seahorse, Raw Mystic Shark | 84% | 15% | 1% |
| Fisherman's Enclave | Raw Mackerel, Raw Halibut, Raw Tilapia | 80% | 17% | 3% |

### Abyssal 钓鱼区域

| 区域 | 鱼类 | 鱼概率 | 垃圾概率 | 特殊概率 |
|------|------|--------|----------|----------|
| Crimson River | Raw Crimson Biter, Raw Crimson Bream | 99% | 0% | 1% |
| Mistveil Swamp | Raw Veilhunter, Raw Mistjaw, Raw Steamswimmer | 99% | 0% | 1% |
| Toxic Pools | Raw Toxic Pufferfish, Raw Toxic Crab, Raw Toxic Octopus | 99% | 0% | 1% |
| Petrified Channel | Raw Stoneskin Pike, Raw Stoneskin Garfish | 99% | 0% | 1% |
| Whisper Cove | Raw Whisperfish, Raw Murmurclaw, Raw Hushscale | 99% | 0% | 1% |
| Tendril Depths | Raw Depthlurker, Raw Deep Squid | 99% | 0% | 1% |
| Void Lagoon | Raw Voidfish, Raw Void Jelly, Raw Void Ray | 99% | 0% | 1% |

## 鱼类

随着 Fishing 等级提升，可捕获更高经验的鱼。特殊说明：

- Leaping Trout / Leaping Salmon / Leaping Broad Fish 捕获时分别给予 10 / 15 / 25 点 Strength 经验。
- Raw Skeleton Fish 可埋葬获得 3 Prayer 点数。
- Raw Magic Fish 可直接食用恢复生命值，无需烹饪。
- Raw Poison Fish 用于 Performance Enhancing Potion；Raw Ghost Fish 用于 Reaper Potion。
- Summoning 用途：等级 ≤99 的鱼用于 Octopus；等级 ≥100 的鱼用于 Siren（Raw Magic Fish 两者皆可）。

### Melvor 鱼类

| 鱼 | 等级 | 捕获时间(Min) | 捕获时间(Max) | 捕获时间(Avg) | XP | XP/s | 价值(GP) | GP/s |
|-----|------|--------------|--------------|--------------|-----|------|----------|------|
| Raw Shrimp | 1 | 4.0s | 8.0s | 6.0s | 5 | 0.83 | 1 | 0.17 |
| Raw Sardine | 5 | 4.0s | 8.0s | 6.0s | 10 | 1.67 | 3 | 0.50 |
| Raw Blowfish | 8 | 3.0s | 8.0s | 5.5s | 12 | 2.18 | 5 | 0.91 |
| Raw Herring | 10 | 4.0s | 8.0s | 6.0s | 15 | 2.50 | 8 | 1.33 |
| Raw Seahorse | 15 | 3.0s | 10.0s | 6.5s | 25 | 3.85 | 40 | 6.15 |
| Leaping Trout | 20 | 3.0s | 10.0s | 6.5s | 20 | 3.08 | 10 | 1.54 |
| Raw Mackerel | 20 | 4.0s | 10.0s | 7.0s | 22 | 3.14 | 19 | 2.71 |
| Raw Trout | 20 | 4.0s | 10.0s | 7.0s | 20 | 2.86 | 16 | 2.29 |
| Raw Poison Fish | 30 | 3.0s | 10.0s | 6.5s | 25 | 3.85 | 40 | 6.15 |
| Raw Salmon | 35 | 4.0s | 10.0s | 7.0s | 40 | 5.71 | 35 | 5.00 |
| Leaping Salmon | 35 | 3.0s | 12.0s | 7.5s | 40 | 5.33 | 20 | 2.67 |
| Raw Lobster | 40 | 4.0s | 11.0s | 7.5s | 50 | 6.67 | 65 | 8.67 |
| Raw Halibut | 40 | 4.0s | 11.0s | 7.5s | 55 | 7.33 | 78 | 10.40 |
| Raw Skeleton Fish | 45 | 7.0s | 15.0s | 11.0s | 100 | 9.09 | 175 | 15.91 |
| Raw Swordfish | 50 | 5.0s | 12.0s | 8.5s | 80 | 9.41 | 80 | 9.41 |
| Raw Anglerfish | 50 | 5.0s | 12.0s | 8.5s | 100 | 11.76 | 50 | 5.88 |
| Raw Fanfish | 55 | 4.0s | 10.0s | 7.0s | 120 | 17.14 | 120 | 17.14 |
| Raw Crab | 60 | 5.0s | 12.0s | 8.5s | 120 | 14.12 | 135 | 15.88 |
| Raw Carp | 65 | 6.0s | 15.0s | 10.5s | 130 | 12.38 | 190 | 18.10 |
| Raw Shark | 70 | 7.0s | 15.0s | 11.0s | 150 | 13.64 | 270 | 24.55 |
| Leaping Broad Fish | 70 | 4.0s | 12.0s | 8.0s | 100 | 12.50 | 50 | 6.25 |
| Raw Cave Fish | 75 | 8.0s | 15.0s | 11.5s | 300 | 26.09 | 215 | 18.70 |
| Raw Tilapia | 75 | 8.0s | 15.0s | 11.5s | 330 | 28.70 | 258 | 22.43 |
| Raw Magic Fish | 80 | 12.0s | 30.0s | 21.0s | 325 | 15.48 | 960 | 45.71 |
| Raw Manta Ray | 85 | 9.0s | 25.0s | 17.0s | 495 | 29.12 | 650 | 38.24 |
| Raw Whale | 95 | 10.0s | 25.0s | 17.5s | 575 | 32.86 | 750 | 42.86 |
| Raw Lava Fish | 100 | 7.0s | 15.0s | 11.0s | 459 | 41.73 | 300 | 27.27 |
| Raw Spike Fish | 101 | 6.0s | 16.0s | 11.0s | 524 | 47.64 | 100 | 9.09 |
| Raw Rockfish | 102 | 8.0s | 15.0s | 11.5s | 288 | 25.04 | 555 | 48.26 |
| Raw Blue Crab | 104 | 10.0s | 24.0s | 17.0s | 891 | 52.41 | 255 | 15.00 |
| Raw Magma Fish | 105 | 4.0s | 10.0s | 7.0s | 368 | 52.57 | 75 | 10.71 |
| Raw Large Blowfish | 106 | 6.0s | 16.0s | 11.0s | 646 | 58.73 | 222 | 20.18 |
| Raw Static Jellyfish | 108 | 15.0s | 30.0s | 22.5s | 729 | 32.40 | 1,350 | 60.00 |
| Raw Frost Crab | 110 | 8.0s | 20.0s | 14.0s | 886 | 63.29 | 300 | 21.43 |
| Raw Magma Eel | 112 | 10.0s | 25.0s | 17.5s | 1,099 | 62.80 | 650 | 37.14 |
| Raw Frozen Manta Ray | 113 | 15.0s | 30.0s | 22.5s | 1,030 | 45.78 | 1,500 | 66.67 |
| Raw Ghost Fish | 115 | 15.0s | 35.0s | 25.0s | 1,785 | 71.40 | 1,000 | 40.00 |
| Raw Mystic Seahorse | 116 | 25.0s | 40.0s | 32.5s | 1,226 | 37.72 | 3,000 | 92.31 |
| Raw Terrorfish | 118 | 20.0s | 40.0s | 30.0s | 2,183 | 72.77 | 1,750 | 58.33 |
| Raw Mystic Shark | 120 | 15.0s | 40.0s | 27.5s | 1,596 | 58.04 | 2,250 | 81.82 |

### Abyssal 鱼类

| 鱼 | 等级 | 捕获时间(Min) | 捕获时间(Max) | 捕获时间(Avg) | XP | XP/s | 价值(GP) | GP/s |
|-----|------|--------------|--------------|--------------|-----|------|----------|------|
| Raw Crimson Biter | 1 | 3.0s | 13.0s | 8.0s | 1,376 | 172.00 | 20 | 2.50 |
| Raw Crimson Bream | 5 | 7.0s | 17.0s | 12.0s | 2,868 | 239.00 | 41 | 3.42 |
| Raw Veilhunter | 10 | 5.0s | 15.0s | 10.0s | 2,409 | 240.90 | 48 | 4.80 |
| Raw Mistjaw | 12 | 8.0s | 18.0s | 13.0s | 3,718 | 286.00 | 78 | 6.00 |
| Raw Steamswimmer | 16 | 15.0s | 29.0s | 22.0s | 7,684 | 349.27 | 158 | 7.18 |
| Raw Toxic Pufferfish | 19 | 4.0s | 12.0s | 8.0s | 3,640 | 455.00 | 89 | 11.12 |
| Raw Toxic Crab | 22 | 8.0s | 14.0s | 11.0s | 4,810 | 437.27 | 200 | 18.18 |
| Raw Stoneskin Pike | 25 | 12.0s | 26.0s | 19.0s | 9,111 | 479.53 | 400 | 21.05 |
| Raw Toxic Octopus | 28 | 22.0s | 36.0s | 29.0s | 18,171 | 626.59 | 725 | 25.00 |
| Raw Stoneskin Garfish | 30 | 15.0s | 33.0s | 24.0s | 13,705 | 571.04 | 820 | 34.17 |
| Raw Whisperfish | 33 | 2.0s | 8.0s | 5.0s | 3,031 | 606.20 | 180 | 36.00 |
| Raw Murmurclaw | 36 | 9.0s | 17.0s | 13.0s | 9,462 | 727.85 | 520 | 40.00 |
| Raw Depthlurker | 40 | 13.0s | 27.0s | 20.0s | 16,520 | 826.00 | 950 | 47.50 |
| Raw Hushscale | 44 | 10.0s | 28.0s | 19.0s | 21,422 | 1,127.47 | 1,850 | 97.37 |
| Raw Deep Squid | 48 | 20.0s | 38.0s | 29.0s | 47,107 | 1,624.38 | 3,850 | 132.76 |
| Raw Voidfish | 52 | 12.0s | 30.0s | 21.0s | 35,538 | 1,692.29 | 3,900 | 185.71 |
| Raw Void Jelly | 54 | 17.0s | 39.0s | 28.0s | 56,754 | 2,026.93 | 6,900 | 246.43 |
| Raw Void Ray | 57 | 14.0s | 40.0s | 27.0s | 51,233 | 1,897.52 | 8,100 | 300.00 |

## 精通解锁（Mastery Unlocks）

### 单项精通等级解锁

| 等级 | 解锁效果 |
|------|----------|
| 1+ | 每级增加 +0.4% 获得双倍鱼的概率 |
| 50 | +3% 获得特殊物品的概率 |
| 65 | 不再捕获垃圾 |
| 99 | 每次捕获保底至少 2 条鱼 |

### 精通池检查点（Melvor Realm）

| 池比例 | 所需 XP | 加成 |
|--------|---------|------|
| 10% | 2,000,000 | +5% Fishing Mastery XP（仅 Melvor Realm） |
| 25% | 5,000,000 | 钓鱼不再获得垃圾（仅 Melvor Realm） |
| 50% | 10,000,000 | +5% 双倍物品概率（仅 Melvor Realm） |
| 95% | 19,000,000 | 获得特殊物品时 +25% 概率额外获得一个随机特殊物品（仅 Melvor Realm） |

总精通池 XP：20,000,000

### 精通池检查点（Abyssal Realm）

| 池比例 | 所需 XP | 加成 |
|--------|---------|------|
| 10% | 900,000 | +6% Fishing Mastery XP（仅 Abyssal Realm） |
| 25% | 2,250,000 | +10% 生鱼出售 AP |
| 50% | 4,500,000 | +10% 钓鱼时获得 1 份熟鱼的概率 |
| 95% | 8,550,000 | 获得特殊物品时 +25% 概率额外获得一个随机特殊物品（仅 Abyssal Realm） |

总精通池 XP：9,000,000

## 技能披风（Skillcapes）

### 普通技能披风

Fishing Skillcape 在 Fishing 达到 99 级后可从商店以 1,000,000 GP 购买。效果：

- x2 Fishing 获得的主要资源

### 高级技能披风

Superior Fishing Skillcape 在 Fishing 达到 120 级后可从商店以 10,000,000 GP 购买（需拥有 Throne of the Herald 扩展）。效果：

- x2 Fishing 获得的主要资源
- +100% 概率额外获得 +1 资源（不可被双倍）
- +1% 概率从 Fishing 获得 1 个 Lost Chest（仅 Melvor Realm，不可被双倍）

## 宠物（Pet）

| 宠物名称 | 效果 |
|----------|------|
| Pudding Duckie | +5% Fishing 双倍物品概率 |

通过执行任何 Fishing 动作均有概率解锁。

## 商店购买

### 钓鱼竿（Fishing Rods）

钓鱼竿为永久升级，购买后自动生效，无需装备。

| 名称 | 等级 | 价格 | 捕获时间减少(本级) | 捕获时间减少(累计) | +1鱼概率(本级) | +1鱼概率(累计) | 获得熟鱼概率(本级) | 获得熟鱼概率(累计) |
|------|------|------|-------------------|-------------------|---------------|---------------|-------------------|-------------------|
| Iron Fishing Rod | 1 | 100 | -5% | -5% | 0% | 0% | 0% | 0% |
| Steel Fishing Rod | 10 | 1,000 | -5% | -10% | 0% | 0% | 0% | 0% |
| Black Fishing Rod | 20 | 5,000 | -5% | -15% | 0% | 0% | 0% | 0% |
| Mithril Fishing Rod | 35 | 20,000 | -5% | -20% | 0% | 0% | 0% | 0% |
| Adamant Fishing Rod | 50 | 75,000 | -5% | -25% | 0% | 0% | 0% | 0% |
| Rune Fishing Rod | 60 | 300,000 | -5% | -30% | 0% | 0% | 0% | 0% |
| Dragon Fishing Rod | 80 | 2,000,000 | -10% | -40% | 0% | 0% | 0% | 0% |
| Corundum Fishing Rod | 100 | 50,000,000 + 1,000 | 0% | -40% | +20% | +20% | 0% | 0% |
| Augite Fishing Rod | 108 | 100,000,000 + 1,500 | 0% | -40% | +20% | +40% | 0% | 0% |
| Meteorite Fishing Rod | 112 | 150,000,000 + 2,000 | 0% | -40% | 0% | +40% | +10% | +10% |
| Divine Fishing Rod | 115 | 200,000,000 + 2,500 | 0% | -40% | +20% | +60% | 0% | +10% |

### 钓竿涂层（Rod Coatings）

| 名称 | 等级 | 价格 | AXP增加(本级) | AXP增加(累计) | 鱼数量增加(本级) | 鱼数量增加(累计) | 获得熟鱼概率(本级) | 获得熟鱼概率(累计) |
|------|------|------|--------------|--------------|----------------|----------------|-------------------|-------------------|
| Abyssium Fishing Rod Coating | 1 | 50,000 + 5,000 | +5% | +5% | 0 | 0 | 0% | 0% |
| Brumite Fishing Rod Coating | 15 | 500,000 + 5,000 | 0% | +5% | +1 | +1 | 0% | 0% |
| Gloomite Fishing Rod Coating | 25 | 5,000,000 + 10,000 | 0% | +5% | 0 | +1 | +5% | +5% |
| Witherite Fishing Rod Coating | 35 | 25,000,000 + 20,000 | 0% | +5% | 0 | +1 | +5% | +10% |
| Netherite Fishing Rod Coating | 50 | 250,000,000 + 25,000 | 0% | +5% | +1 | +2 | 0% | +10% |

## 特殊掉落（Special Loot）

特殊物品在钓鱼时随机替代鱼类获得，概率取决于钓鱼区域，可通过 Special Chance 加成提高。获得的 XP 与目标鱼相同。

### Melvor Realm 特殊掉落

| 物品 | 价值(GP) | 概率 |
|------|----------|------|
| Topaz | 225 | 1,000/3,361 (29.75%) |
| Sapphire | 335 | 800/3,361 (23.80%) |
| Ruby | 555 | 700/3,361 (20.83%) |
| Emerald | 555 | 500/3,361 (14.88%) |
| Diamond | 1,150 | 200/3,361 (5.95%) |
| Treasure Chest | 500 | 125/3,361 (3.72%) |
| Barbarian Gloves | 7,500 | 25/3,361 (0.74%) |
| Pirates Lost Ring | 17,500 | 5/3,361 (0.15%) |
| Message in a Bottle | 250 | 5/3,361 (0.15%) |
| Ancient Ring of Skills | 38,250 | 1/6,722 (0.015%) |
| Ancient Ring of Mastery | 26,500 | 1/6,722 (0.015%) |

特殊掉落平均价值：523.69 GP

Ancient Ring of Skills 和 Ancient Ring of Mastery 是游戏中最稀有的物品之一，分别为所有非战斗技能提供技能经验和 Mastery 经验加成。

### Abyssal Realm 特殊掉落

| 物品 | 价值(GP) | 概率 |
|------|----------|------|
| Abyssal Fishing Chest | 500 | 1/1 (100%) |

### 最大化特殊物品获取策略

- 选择高特殊概率区域中捕获时间短的鱼（推荐 Raw Seahorse、Raw Skeleton Fish；Abyssal 推荐 Raw Whisperfish）
- 目标鱼 Mastery 达到 50 级（+3% 特殊概率）
- 使用所有可用的间隔减少加成
- 达到 95% Mastery Pool 检查点
- 装备 Octopus + Ent Summoning 协同（+6% 特殊概率）
- Ameria 星座 Mastery 达到 20（最多 +5% 特殊概率）

### 减少特殊物品获取

- 装备 Sailor's Top（-100% 特殊概率），可从 Dock Hand 扒窃获得

## 垃圾（Junk）

垃圾物品在钓鱼时随机替代鱼类获得，也可从 Treasure Chest 中开出。大部分仅用于 Rags to Riches I，Rope 还可升级为 Bowstring。捕获垃圾仅获得 1 XP。

| 物品 | 价值(GP) |
|------|----------|
| Glass Bottle | 8 |
| Old Boot | 8 |
| Old Hat | 8 |
| Rope | 8 |
| Rubber Ducky | 69 |
| Rusty Key | 8 |
| Seaweed | 8 |
| Shell | 8 |

防止垃圾的方式：目标鱼 Mastery 达到 65 级（单鱼）或达到 25% Fishing Mastery Pool 检查点（全局）。Treasure Chest 中的垃圾不受此影响。

## 药水（Potions）

### 渔夫药水（Fishermans Potion）

增加钓鱼双倍鱼概率。

| 等级 | 充能次数 | 效果 |
|------|----------|------|
| I | 5 | +3% Fishing 双倍物品概率 |
| II | 10 | +5% Fishing 双倍物品概率 |
| III | 15 | +8% Fishing 双倍物品概率 |
| IV | 20 | +12% Fishing 双倍物品概率 |

### 回声诱饵药水（Echoing Lure Potion）

增加从同一钓鱼区域额外捕获 +1 随机鱼的概率（不可被双倍）。

| 等级 | 充能次数 | 效果 |
|------|----------|------|
| I | 1 | +5% 概率额外捕获 +1 随机鱼（不可被双倍） |
| II | 2 | +10% 概率额外捕获 +1 随机鱼（不可被双倍） |
| III | 3 | +15% 概率额外捕获 +1 随机鱼（不可被双倍） |
| IV | 4 | +20% 概率额外捕获 +1 随机鱼（不可被双倍） |

## 召唤加成（Summoning Boosts）

以下 Summoning 召唤物和协同效果为 Fishing 提供加成：

| 召唤物 1 | 召唤物 2 | 效果 |
|----------|----------|------|
| Octopus | - | +3% 概率额外获得 +1 Fishing 资源（不可被双倍） |
| Abyssal Octopus | - | +3% 概率额外获得 +1 Fishing 资源（不可被双倍） |
| Octopus | Eagle | -0.5s Fishing 间隔（仅 Melvor Realm） |
| Octopus | Owl | +1.5% Fishing Mastery XP / Ameria 星座中每个满级星 |
| Abyssal Octopus | Abyssal Devil | +6% Fishing Mastery XP（仅 Abyssal Realm），-4% Fishing Abyssal XP |
| Golem | Abyssal Octopus | -1s Fishing 间隔（仅 Abyssal Realm） |
| Void Wisp | Abyssal Octopus | -50% Fishing Abyssal XP，+1 Fishing 主要资源数量（仅 Abyssal Realm，不可被双倍） |

## 技能加成（Skill Boosts）

Fishing 可获得以下类型的技能加成（来源包括装备、药水、宠物、Mastery 等）：

- **增加技能 XP**：提高获得的经验值
- **减少技能间隔**：缩短钓鱼动作时间，单位时间内执行更多动作
- **保存概率（Preservation Chance）**：增加资源/物品不被消耗的概率
- **双倍物品概率**：提高获得双倍资源的概率
- **增加 Mastery XP**：加快 Mastery 经验获取速度
