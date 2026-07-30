# Neo 主题换肤 Skill 安装与使用

:::: warning Beta 状态
本「Neo 主题换肤 Skill」目前处于 **Beta** 阶段，功能和使用方式仍在持续打磨中。试用过程中发现任何问题，或有改进建议，欢迎随时反馈到 [neo-cmp-docs Issues](https://github.com/xsy-neoui/neo-cmp-docs/issues)。
::::

## 什么是 Neo 主题换肤 Skill

一套 AI 辅助工具，帮助你将 Neo 平台历史项目快速升级为支持运行时主题换肤的版本。AI 会自动识别项目中的硬编码色值（蓝色 + 浅蓝背景色）、旧版 CSS 变量和按钮样式，并按规范替换为支持换肤的 CSS 变量写法。

**核心能力**：

- 🔍 **蓝色硬编码色值替换**：识别 48 组品牌相关蓝色硬编码色值（主品牌色 33 组 + 次品牌色 15 组，含 6 位 hex、8 位 hex、`rgb()`、`rgba()` 各格式变形），支持完全匹配与仅以 `#0564f5` 为基准的 1-2 色阶近似匹配，替换为 `var(--brand-color)` / `var(--brand-color-hover)`。**执行后自动进行遗漏检测，有遗漏则自动重试直到全部替换完毕**
- 🎨 **浅蓝背景色替换**：识别 11 组浅蓝硬编码色值（`#e6f0fe` 等），只在 `background` / `background-color` 属性上替换为 `var(--brand-color-tint)`，其他属性上的浅蓝一律保留。同样带遗漏检测与自动重试
- 🔄 **旧 CSS 变量迁移**：两类迁移——① 带 `-bg` 后缀的旧版按钮色变量名迁移为新版命名（7 对映射）；② 旧版导航色变量 `--dayone-theme-header-*` 迁移为新版 `--brand-nav-header-*`（9 对映射）
- 🔘 **Primary 按钮色改造**：遍历所有 primary 模式按钮（`ant-btn-primary` / `button-primary` / `btn-primary` / `a-Button--primary` / `btn-conform` / `add_button` / `confirm_button` / `cancel_button` 等），按背景色白/非白区分规则改造背景色、文字色与边框色为按钮色变量。**执行后自动进行遗漏检测，有遗漏则自动重试直到全部改造完毕**
- 📊 **生成升级报告**：**依据当前项目代码的实际改动（`git diff`）**汇总所有改动到 `Neo主题换肤功能升级报告.md`，包含完全匹配详情、近似匹配详情（需人工复核）、跳过详情

## 环境准备

| 依赖 | 说明 |
|:---|:---|
| AI 编辑器 | CodeBuddy、Kiro、Cursor 等支持 Skills 的 AI 编辑器 |
| 项目 | 待升级的 Neo 平台历史项目（建议已纳入 git 管理，报告生成依赖 `git diff`） |

> 无需额外安装 Node.js 或 neo-cmp-cli。本 Skill 直接在 AI 编辑器中运行，通过对源码的分析和替换完成改造。

## 安装

### 手动安装步骤

1. **下载技能包**：[neo-theme-skill.zip](/neo-theme-skill.zip)

2. **解压并导入**：将 `neo-theme-skill.zip` 解压，得到 `neo-theme-skill` 目录。

3. 根据你使用的 AI 编辑器，将 skill 添加到对应编辑器中。

#### CodeBuddy 安装步骤

1. 在「技能」页面，点击右上角的「+ 添加技能」按钮，选择「上传技能」
2. 选择解压得到的 `neo-theme-skill` 目录，点击「确定」
3. 安装完成后，在技能列表中可看到「Neo 平台主题换肤功能升级」技能

#### Kiro 安装步骤

1. 将 `neo-theme-skill` 目录放入 Kiro 的 skills 目录中
2. 重启 Kiro 或重新加载技能列表

#### Cursor 安装步骤

1. 将 `neo-theme-skill` 目录放入项目的 `.cursor/skills/` 目录下
2. 重启 Cursor 或重新加载窗口

::: tip 覆盖说明
若目标目录中已有同名 skill，覆盖式写入即可。
:::

## 使用方式

### 触发方式

在 AI 编辑器中打开待升级的 Neo 项目，然后对 AI 说：

```
"让这个项目支持 Neo 主题换肤功能"
```

或使用以下触发短语：

- "项目支持 Neo 主题换肤功能"
- "项目支持主题换肤"
- "Neo 主题换肤功能升级"
- "Neo 主题换肤升级"
- "主题换肤功能升级"
- "主题换肤升级"
- "项目换肤升级"

### AI 会做什么

AI 会按照以下五个任务**严格顺序**执行：

| 步骤 | 任务 | 说明 |
|:--|:--|:--|
| **1** | 蓝色硬编码色值 → 品牌色 CSS 变量 | 48 组色值，完全匹配 + 近似匹配；带遗漏检测与自动重试 |
| **2** | 浅蓝硬编码色值 → `var(--brand-color-tint)` | 11 组色值，只改 `background` / `background-color`；带遗漏检测与自动重试 |
| **3** | 旧 CSS 变量 → 新 CSS 变量迁移 | 按钮变量 7 对 + 导航色变量 9 对 |
| **4** | Primary 按钮色改造 | 按背景白/非白区分规则改造背景、文字、边框；带遗漏检测与自动重试 |
| **5** | 生成升级报告 | 依据 `git diff` 实际改动生成 `Neo主题换肤功能升级报告.md` |

#### 任务 1：蓝色硬编码色值 → CSS 变量替换

1. 扫描项目源码，搜索所有匹配的硬编码品牌蓝色（含 6 位 hex、8 位 hex、`rgb()`、`rgba()` 格式）
2. 按照匹配规则进行替换：
   - **完全匹配**：色值与对照表完全一致（大小写不敏感）→ 直接替换。主品牌色 33 组 → `var(--brand-color)`；次品牌色 15 组 → `var(--brand-color-hover)`
   - **近似匹配**：色值仅与主品牌基准色 `#0564f5` 差异在 1-2 色阶内（单通道差 ≤ 32 且欧氏距离 ≤ 50）→ 自动推断替换为 `var(--brand-color)`，并在报告中标记 `[近似匹配·N色阶]` 供人工复核（不与对照表其他色值做近似比较，次品牌色只能由完全匹配命中）
   - **超阈值**：与 `#0564f5` 差异超过 2 色阶 → 保留原样不替换
   - **禁止色名扩展**：不基于色名/变量名（含 `primary`、`blue`）推断，替换由色值本身匹配结果驱动
3. **全量色值普查**：固定 grep 只能捞出完全匹配表内的色值，近似色永远不会被 grep 命中。因此 AI 会额外抽取源码中所有 hex / rgb(a) 色值逐一送入匹配器判定，补齐近似色执行缺口
4. 8 位 hex 色值（`#RRGGBBAA`）按前 6 位判断归属，后 2 位换算 alpha 值，替换为 `rgba(var(--xxx-rgb), alpha)`；`AA=FF` 直接用主变量
5. `rgba()` 色值使用 `-rgb` 伴侣变量保留原有透明度；`rgba(r, g, b, 1)` 直接用主变量
6. **执行遗漏检测**：替换完成后自动搜索残留色值，存在遗漏则**自动重试**直到全部替换

#### 任务 2：浅蓝硬编码色值 → `var(--brand-color-tint)` 替换

本任务与任务 1 是同构的两条独立规则线，匹配总则、跳过检查、注释保留方式全部复用任务 1，差异只在色值清单与目标变量。

1. **只改背景属性**：仅 `background` / `background-color`（JSX 为 `backgroundColor`）上的浅蓝色值参与替换；`background` 简写只替换其中的色值部分，其余值（`url()`、`no-repeat` 等）原样保留
2. **11 组浅蓝色值**：`#e6f0fe`、`#e6f7ff`、`#e8f0fe`、`#e8f1ff`、`#e7f7ff`、`#eff6ff`、`#eef2ff`、`#dcf4ff`、`#d9f3fb`、`#eceff8`、`#edeff2`
3. 含透明度写法按规则换算：`#edeff280` → `rgba(var(--brand-color-tint-rgb), 0.5)`；`rgba(230, 247, 255, 0.2)` → `rgba(var(--brand-color-tint-rgb), 0.2)`
4. **浅蓝不参与近似匹配**：近似匹配的唯一基准 `#0564f5` 只服务任务 1；清单外的浅色（`#f0f8ff`、`#fafcff` 等）一律保留原样，避免误伤中性浅灰底色
5. `color`、`border-color`、`box-shadow`、`fill`、`stroke` 等非背景属性上的浅蓝色值 → 保留原样
6. **执行遗漏检测**：完成后自动检测残留，存在遗漏则自动重试

#### 任务 3：旧 CSS 变量 → 新 CSS 变量迁移

包含两类迁移，均会执行。定义处（`--xxx: value`）与引用处（`var(--xxx)`）都会覆盖。

**① 按钮色变量（去掉 `-bg` 后缀，7 对）**

```
--color-button-filled-primary-bg            → --color-button-filled-primary
--color-button-filled-primary-bg-hover      → --color-button-filled-primary-hover
--color-button-filled-primary-bg-tint       → --color-button-filled-primary-tint
--color-button-filled-primary-bg-disabled   → --color-button-filled-primary-disabled
--color-button-filled-secondary-bg          → --color-button-filled-primary-secondary
--color-button-filled-secondary-bg-hover    → --color-button-filled-primary-secondary-hover
--color-button-filled-secondary-bg-disabled → --color-button-filled-primary-secondary-disabled
```

**② 导航色变量（`--dayone-theme-header-*` → `--brand-nav-header-*`，9 对）**

```
--dayone-theme-header-back          → --brand-nav-header-bg
--dayone-theme-header-icon          → --brand-nav-header-icon
--dayone-theme-header-lanucher-icon → --brand-nav-header-launcher-icon
--dayone-theme-header-placeholder   → --brand-nav-header-placeholder
--dayone-theme-header-select        → --brand-nav-header-select
--dayone-theme-header-select-black  → --brand-nav-header-select-bg
--dayone-theme-header-font          → --brand-nav-header-font
--dayone-theme-header-back-opacity  → --brand-nav-header-elem-opacity
--dayone-theme-header-back-hover    → --brand-nav-header-elem-hover
```

> 说明：旧变量名中的 `lanucher` 是历史 typo，新变量名已修正为 `launcher`。`--dayone-theme-header-font` 只迁移变量名，保留原有取值（如 `white`）。部分旧变量名互为前缀，AI 会按「长名先替换、短名后替换」的顺序执行（先 `-back-opacity` / `-back-hover` 再 `-back`；先 `-select-black` 再 `-select`），避免误伤。

#### 任务 4：Primary 按钮色改造

1. 搜索所有 primary 模式按钮样式块：`button-primary` / `ant-btn-primary` / `btn-primary` / `a-Button--primary`、含 `btn-conform` 的类名，以及业务语义按钮 `add_button`（新增）/ `confirm_button`（确认）/ `cancel_button`（取消），加上其他含 `primary` 关键词的按钮类名

   > `btn-conform`、`add_button`、`confirm_button`、`cancel_button` 都不含 `primary` 字样，但属于 Primary 按钮语义，AI 会一并识别与改造，不会因缺少关键词而漏掉。

2. 按背景色区分规则改造，每类分「非 hover/active」「hover」「active」三种状态：

   **规则 A — 白色背景 primary 按钮 / 空心（轮廓）按钮**（含 `cancel_button`，无论其背景为何色）：只改 `color` 与 `border-color`，背景保持原样

   | 状态 | `color` + `border-color` |
   |:--|:--|
   | 非 hover / active | `var(--color-button-filled-primary)` |
   | hover | `var(--color-button-filled-primary-hover)` |
   | active | `var(--color-button-filled-primary-active)` |

   **规则 B — 非白色背景 primary 按钮**（含 `add_button`、`confirm_button` 等实心按钮）：

   | 状态 | `background` / `background-color` | `color`（字体色变量） | `border-color` / `border` 中色值 |
   |:--|:--|:--|:--|
   | 非 hover / active | `var(--color-button-filled-primary)` | `var(--color-button-filled-primary-color)` | `var(--color-button-filled-primary)` |
   | hover | `var(--color-button-filled-primary-hover)` | `var(--color-button-filled-primary-color-hover)` | `var(--color-button-filled-primary-hover)` |
   | active | `var(--color-button-filled-primary-active)` | `var(--color-button-filled-primary-color-hover)` | `var(--color-button-filled-primary-active)` |

3. **边框替换细则**：单独的 `border-color` 属性按状态整体替换；`border` 简写只替换其中的色值部分，`border-width` / `border-style` 保持原样；`border: none` / `border: 0` / 无 `border` 属性时不处理、不新增

4. **执行遗漏检测**：改造完成后自动搜索残留硬编码按钮色（背景、文字、边框），存在遗漏则**自动重试**直到全部改造

::: tip 为什么文字色用字体色变量、边框色用背景色变量？
填充型 primary 按钮的文字直接叠在按钮背景色上，若 `color` 写死为 `#fff`，一旦运行时换成浅色按钮就会出现文字模糊。按钮字体色变量是随按钮背景色**自动计算的对比色**，任意按钮色下文字都清晰可读。

而边框与背景是同一块色面，应随背景色一起变化，所以 `border-color` / `border` 中的色值与 `background` **共用同一套变量**，而不是用字体色变量。
:::

#### 任务 5：生成升级报告

前四项任务全部完成、且各自的遗漏检测通过后，AI 会**先通过 `git status` / `git diff` 读取当前项目代码的真实改动**，再据此汇总生成 `Neo主题换肤功能升级报告.md`（项目根目录）。

报告包含七大章节：

1. 总体汇总（改动文件数、替换次数、近似匹配数、跳过次数）
2. 任务 1 明细（跳过详情、完全匹配详情、近似匹配详情）
3. 任务 2 明细（浅蓝背景色替换）
4. 任务 3 明细（按钮变量与导航变量分开列出）
5. 任务 4 明细（Primary 按钮改造）
6. 改动文件清单
7. 校验结果

> ⚠️ **报告以实际 diff 为准**：执行过程中的临时记录只作辅助，若与 `git diff` 结果不符，一律以实际代码改动为准，确保报告与仓库真实状态一致。

### 替换规则概要

| 步骤 | 内容 | 涉及数量 |
|:--|:--|:--|
| 蓝色硬编码替换 | 主品牌色 33 组 → `var(--brand-color)`；次品牌色 15 组 → `var(--brand-color-hover)`（含 6 位 hex、8 位 hex、rgb、rgba 格式） | 48 组基准色值 |
| 近似匹配 | 仅以 `#0564f5` 为基准，1-2 色阶差自动推断替换为 `var(--brand-color)`，报告标记 `[近似匹配]` 供人工复核 | ≤ 2 色阶 |
| 浅蓝背景色替换 | `background` / `background-color` 上的浅蓝 → `var(--brand-color-tint)`（不做近似匹配） | 11 组色值 |
| 8 位 hex 替换 | `#RRGGBBAA` → `rgba(var(--xxx-rgb), alpha)`，`AA=FF` 则直接替换为主变量 | — |
| rgba 替换 | `rgba()` 色值 → `rgba(var(--xxx-rgb), alpha)`，保留原透明度；alpha=1 直接用主变量 | — |
| 旧变量迁移 | 按钮色变量去 `-bg` 后缀 7 对 + 导航色变量 `--dayone-theme-header-*` → `--brand-nav-header-*` 9 对 | 16 对映射 |
| 按钮色改造 | primary 按钮背景色 / 边框色 / 文字色 → 按钮色变量，区分白/非白背景与三种状态 | 2 类规则 × 3 状态 |

### 智能跳过规则

AI 在替换每一行前，都会**按固定顺序跑完 6 项跳过检查**（顺序不可打乱、不可跳步），任一命中即判为「合法跳过」，立即终止该行处理并记录到报告「跳过详情」：

```
匹配行
  ↓ 检查 1：类名 / 变量名含色值？（如 text-[#0564f5]）→ 跳过
  ↓ 检查 2：测试文件？（*.test.* / *.spec.* / __tests__/）→ 跳过
  ↓ 检查 3：已注释行？（5 类注释形态）→ 跳过
  ↓ 检查 4：blue 类选择器回溯？→ 跳过
  ↓ 检查 5：ECharts option / 颜色数组 / var() 备用值 / 取色器对象？→ 跳过
  ↓ 检查 6：SASS / Less 变量名含 blue？→ 跳过
✅ 全部通过 → 才允许替换
```

各项检查的具体场景：

| 跳过场景 | 说明 |
|:--|:--|
| ① 类名/变量名中含色值 | 如 `text-[#0564f5]`、`bg-[#4e80f5]` |
| ② 测试文件 | `*.test.*`、`*.spec.*`、`__tests__/` 目录 |
| ③ 已注释代码（5 类形态） | 单行 `//`；行内 `//` 之后；单行块注释 `/* ... */`；**多行块注释中间行**（含以 `*` 起首的续行，由状态机跟踪 `/*` / `*/` 开合）；JSX 注释 `{/* ... */}` |
| ④ blue 类选择器（含回溯） | class 名含 `blue` 关键字；所属 CSS 规则块向上回溯（含多行、嵌套、`&` 拼接）后祖先选择器含 `blue` 也跳过 |
| ⑤ ECharts 属性 | 图表配置中的色值（ECharts 不支持 `var()`，需用 `getCssVarHex()` 方案）。**判定必须读取完整文件上下文向上回溯到最外层 option 对象**，不能只看单行属性名 |
| ⑥ 颜色数组中 | 色值位于数组字面量内，如 `['#0564f5', '#4e80f5']` |
| ⑦ **`var()` 中备用（回退）色值** | 如 `var(--custom-color, #0564f5)`、`background: var(--card-bg, #e6f0fe)`。该色值只在变量缺失时兜底，替换会破坏 `var()` 语法且无换肤收益 → **一律跳过**，蓝色与浅蓝同等适用 |
| ⑧ 取色器对象 | 色值作为对象属性值，且该对象**所有属性值都是色值**（hex/rgb/rgba）→ 认定为调色板对象，其中色值整体跳过 |
| ⑨ SASS/Less 变量名含 `blue` | 变量名含 `blue`（如 `$blue-base`、`@blue-6`），对应色值也跳过 |

> **注意**：块内已存在的 `// var(...)` 注释仅跳过其自身，不构成对同块其他活跃行的替换许可——每一行都独立走完上述 6 项检查。遗漏检测阶段同样会重跑这 6 项检查。

### 替换后自动校验

全部替换完成后，AI 会执行两类校验：

1. **CSS 属性名完整性校验**：检测批量替换可能造成的「属性名撕裂」（如 `border-// color:`），预期结果为无任何匹配；若发现则立即修复
2. **残留硬编码色值校验**：复用任务 1、任务 2 的遗漏检测命令，确认只剩合法跳过项

合法残留项（无需处理）示例：

- `$变量名: #2065CF;` — SCSS 变量定义
- `.xxx-blue { color: #1890ff; }` — class 含 blue 关键字
- `var(--xxx, #0564f5)` / `var(--card-bg, #e6f0fe)` — `var()` 备用值
- `color: #e6f0fe` — 浅蓝出现在非背景属性上
- `path[fill='#1890ff']` / `stroke: #1890ff` — SVG 属性
- `mix(#0564f5, ...)` — SCSS 函数参数

## 典型使用场景

### 场景：将老项目升级为支持主题换肤

> 你的项目中有大量硬编码的 `#0564f5`、`#4e80f5` 等品牌蓝，卡片背景写死了 `#e6f0fe` 浅蓝，导航还在用旧的 `--dayone-theme-header-*` 变量，按钮颜色也是写死的，每次换主题都要手动改一遍。

**使用 Skill 后**：

1. 对 AI 说："让这个项目支持 Neo 主题换肤功能"
2. AI 自动按顺序执行五个任务：
   - 任务 1：扫描并替换所有硬编码蓝色（完全匹配 + 全量普查捞近似色），遗漏检测与自动重试
   - 任务 2：替换背景属性上的浅蓝为 `var(--brand-color-tint)`，遗漏检测与自动重试
   - 任务 3：迁移按钮 `-bg` 后缀变量与 `--dayone-theme-header-*` 导航色变量
   - 任务 4：改造所有 primary 按钮（含 `btn-conform` / `add_button` / `confirm_button` / `cancel_button`），遗漏检测与自动重试
   - 任务 5：读取 `git diff` 生成 `Neo主题换肤功能升级报告.md`，你可逐条核对（特别关注近似匹配项）

**改造前后对比**：

```scss
/* ========== 改造前：硬编码 ========== */
.btn-primary {
  background-color: #0564f5;
  color: #fff;
  border-color: #0564f5;

  &:hover {
    background-color: #4e80f5;
  }
}

.card {
  background: #e6f0fe;
}

/* ========== 改造后：支持换肤 ========== */
.btn-primary {
  // background-color: #0564f5;
  background-color: var(--color-button-filled-primary);
  color: var(--color-button-filled-primary-color);
  // border-color: #0564f5;
  border-color: var(--color-button-filled-primary);

  &:hover {
    // background-color: #4e80f5;
    background-color: var(--color-button-filled-primary-hover);
    color: var(--color-button-filled-primary-color-hover);
  }
}

.card {
  // background: #e6f0fe;
  background: var(--brand-color-tint);
}
```

> SCSS / Less 文件用 `//` 注释原行并在下方新增替换行，CSS 文件用 `/* */` 注释原行，TSX / JSX / TS / JS 直接替换不保留原写法。

**价值**：传统方式需要开发者逐文件手动查找和替换，一个中型项目可能需要 1-2 天。使用 Skill 后一次对话完成，约 10-15 分钟。

## 可用的品牌色 CSS 变量

Skill 使用的全部 CSS 变量请参阅 **[Neo 平台品牌色 CSS 变量列表](./Neo平台品牌色CSS变量列表.md)**，包含：

- 品牌核心变量（6 对 hex + -rgb）：`--brand-color` / `--brand-color-hover` / `--brand-color-shade` / `--brand-color-tint` 等
- 语义化 Brand Token（背景 6 个、边框 6 个、图标 7 个、文本 7 个，共 26 个）
- 按钮色变量（18 个 + -rgb 伴侣变量）
- 导航 Banner 色变量（11 个）
- 各类场景的完整使用示例

> 每个 Hex 主变量都配有 `-rgb` 伴侣变量（纯数值），用于 `rgba(var(--xxx-rgb), alpha)` 半透明场景。

## 常见问题

**Q: AI 替换后会不会破坏原来的代码逻辑？**

Skill 内置了多项保护机制：替换每一行前按固定顺序跑完 6 项跳过检查（测试文件、5 类注释形态、类名中的色值、blue 选择器回溯、ECharts 属性、`var()` 备用值、取色器对象、SASS blue 变量）。每次替换后会检查 `var()` 语法与属性键是否完好。SCSS/CSS 文件中会用注释保留原有写法。全部替换完成后还会执行 CSS 属性名完整性校验，确保不出现属性名撕裂等问题。

**Q: 什么是近似匹配？会不会把不该替换的颜色也替换了？**

近似匹配是 Skill 的智能推断能力：当源码中的色值与**唯一基准色 `#0564f5`** 差异在 1-2 色阶内（单通道差 ≤ 32 且欧氏距离 ≤ 50）时，推断为主品牌色变体并替换为 `var(--brand-color)`。近似匹配**只与 `#0564f5` 比较**，不与对照表其他色值（含次品牌色）比较；超出阈值的色值不会被替换。所有近似匹配都会在报告中单独列出并标记 `[近似匹配·N色阶]`，方便人工复核。

**Q: 为什么浅蓝色值不参与近似匹配？**

浅蓝清单外的浅色（如 `#f0f8ff`、`#fafcff`）常常是中性浅灰底色，做近似推断容易误伤。所以浅蓝一律只做完全匹配，清单外的浅色保留原样。

**Q: 为什么 `var()` 里的色值没被替换？**

`var(--brand-color, #0564f5)` 中逗号后的色值是**备用（回退）值**，只在 CSS 变量未定义时兜底，不是运行时生效的主题色。替换它既没有换肤收益，还会造成 `var()` 语法嵌套错误。所以这类色值一律跳过，蓝色和浅蓝同等适用。

**Q: 为什么有些 8 位色值（如 `#0564f533`）被替换了？**

8 位十六进制色值（`#RRGGBBAA`）表示带透明度的颜色。Skill 会取前 6 位匹配品牌色，后 2 位换算 alpha 后替换为 `rgba(var(--xxx-rgb), alpha)`。如果 alpha 为 `FF`（完全不透明），则直接替换为主变量 `var(--xxx)`。

**Q: 遗漏检测和自动重试是什么意思？**

任务 1（蓝色替换）、任务 2（浅蓝替换）、任务 4（按钮色改造）各自完成后，Skill 会自动搜索项目源码检查是否有遗漏。若发现遗漏，会自动重新执行该任务，并再次检测，循环直到只剩合法跳过项才进入下一任务——不需要你手动干预。另外由于近似色无法用固定 grep 命中，Skill 还会额外做一次「全量色值普查」补齐近似色的执行缺口。

**Q: 为什么 `add_button`、`cancel_button` 这种名字也被当成 primary 按钮？**

`btn-conform`、`add_button`、`confirm_button`、`cancel_button` 都不含 `primary` 字样，但在业务上就是 Primary 按钮语义，历史项目里最容易被漏改。其中 `add_button` / `confirm_button` 按实心按钮处理（改背景 + 文字 + 边框），`cancel_button` 按空心轮廓按钮处理（只改 `color` / `border-color`，背景保持原样）。

**Q: 如果有些色值我不想替换怎么办？**

AI 在执行替换前会展示扫描结果，你可以告知 AI 哪些文件或色值需要跳过。Skill 本身也会智能跳过上述 9 类不适用替换的场景。

**Q: 升级后项目构建会不会报错？**

替换后的代码仍保留原有 CSS 属性和选择器结构，仅将颜色值替换为 `var()` 写法。建议升级完成后执行 `npm run build` 验证。

**Q: ECharts 图表的颜色为什么没有被替换？**

ECharts 不支持 `var(--css-variable)` 写法，因此 Skill 会跳过图表配置中的色值。判定时会读取完整文件上下文向上回溯到最外层 option 对象确认（不只看单行属性名）。如需图表也响应主题换肤，请使用 `getCssVarHex()` 方法将 CSS 变量转为 hex 后传入：

```tsx
import { getCssVarHex } from 'neo-ui-common/tokenHelper';

const brandColor = getCssVarHex('--brand-color');
const option = { color: [brandColor], series: [{ itemStyle: { color: brandColor } }] };
```

详见 [Neo 平台品牌色 CSS 变量列表 — 第十节](./Neo平台品牌色CSS变量列表.md#十echarts-场景使用规范)。

**Q: 项目没用 git 能生成报告吗？**

可以，但准确度会下降。任务 5 的报告以 `git diff` / `git status` 为唯一数据来源；若项目未启用 git，AI 会退化为按本次会话中实际执行的文件写入操作逐一核对。建议先纳入 git 管理再执行升级。

**Q: 这个 Skill 和「历史项目主题换肤升级指南」文档的关系？**

该文档是 Skill 的参考手册，详细描述了替换规则和要求；Skill 则是该手册的 AI 自动化实现，可以在项目中自动执行替换操作。

**Q: 想先摸清项目现状再动手改造怎么办？**

用「[Neo 主题换肤支持情况分析 Skill](./主题换肤支持情况分析Skill安装使用.md)」做只读盘点，产出《当前项目主题换肤支持情况.md》评估工作量，再用本 Skill 改造，最后再跑一次分析 Skill 做验收复盘。

## 验证主题换肤效果

升级完成后，可通过浏览器控制台手动切换品牌色和按钮色，验证主题换肤是否生效：

```js
// 切换到紫色品牌色
NeoThemeHelper.setBaseColor("#923dda")

// 切换到橙色按钮色
NeoThemeHelper.setButtonPrimaryColor("#ff6b35")

// 切换导航 Banner 色
NeoThemeHelper.setNavBannerColor("#1f2d3d")
```

执行后页面中所有使用 CSS 变量的品牌色元素（按钮、链接、图标、边框、浅蓝底色、导航栏等）应同步变化为对应颜色。

> **提示**：[主题换肤在线 Demo](/theme-switch-demo.html) 也提供了交互式控制面板，可直观预览七种预设主题和自定义颜色的效果。

## 反馈与改进

使用过程中遇到问题或有优化建议，欢迎提交到 [neo-cmp-docs Issues](https://github.com/xsy-neoui/neo-cmp-docs/issues)。
