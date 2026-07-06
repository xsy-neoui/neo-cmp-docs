# Neo 主题换肤 Skill 安装与使用

:::: warning Beta 状态
本「Neo 主题换肤 Skill」目前处于 **Beta** 阶段，功能和使用方式仍在持续打磨中。试用过程中发现任何问题，或有改进建议，欢迎随时反馈到 [neo-cmp-docs Issues](https://github.com/xsy-neoui/neo-cmp-docs/issues)。
::::

## 什么是 Neo 主题换肤 Skill

一套 AI 辅助工具，帮助你将 Neo 平台历史项目快速升级为支持运行时主题换肤的版本。AI 会自动识别项目中的硬编码色值、旧版 CSS 变量和按钮样式，并按规范替换为支持换肤的 CSS 变量写法。

**核心能力**：

- 🔍 **硬编码色值替换**：自动识别 40 种品牌相关硬编码色值，替换为 `var(--brand-color)` 等 CSS 变量
- 🔄 **旧 CSS 变量迁移**：将带 `-bg` 后缀的旧版按钮色变量名自动迁移为新版命名
- 🎨 **按钮色改造**：遍历所有 primary 模式按钮，按背景色区分规则改造为按钮色 CSS 变量
- 📊 **生成替换报告**：汇总所有改动到 `Neo主题换肤功能升级报告.md`

## 环境准备

| 依赖 | 说明 |
|:---|:---|
| AI 编辑器 | CodeBuddy、Kiro、Cursor 等支持 Skills 的 AI 编辑器 |
| 项目 | 待升级的 Neo 平台历史项目 |

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

- "项目支持 Neo 主题换肤功能升级"
- "项目主题换肤升级"
- "Neo 主题换肤功能升级"

### AI 会做什么

1. **扫描项目源码**：搜索所有匹配的硬编码色值、旧 CSS 变量、primary 按钮样式
2. **执行替换**：按规范逐一替换
   - 硬编码色值 → CSS 变量（自动跳过五类不适用的场景）
   - 旧 CSS 变量 → 新 CSS 变量
   - 按钮样式 → 按钮色 CSS 变量
3. **保留原有写法**：SCSS 文件用 `//` 注释保留原行，CSS 文件用 `/* */` 保留
4. **生成升级报告**：输出 `Neo主题换肤功能升级报告.md`，包含汇总信息和详细改动记录

### 替换规则概要

| 步骤 | 内容 | 涉及数量 |
|:--|:--|:--|
| 硬编码替换 | 主品牌色 16 种 + 次品牌色 24 种 → CSS 变量 | 40 种色值 |
| 旧变量迁移 | `-bg` 后缀旧变量名 → 新变量名 | 7 对映射 |
| 按钮色改造 | primary 按钮背景色/边框色/文字色 → 按钮色变量 | 3 组规则 |

### 智能跳过规则

AI 在执行替换时会智能跳过以下场景，确保不会破坏代码：

| 跳过场景 | 说明 |
|:--|:--|
| 类名/变量名含色值 | 如 `text-[#0564f5]` |
| ECharts 属性 | 图表配置中的色值 |
| 颜色数组 | 数组字面量中的色值 |
| `var()` 默认值 | 如 `var(--custom, #0564f5)` |
| class 含 `blue` | class 名包含 blue 关键字 |
| 注释行 | 已注释的代码行 |
| 测试文件 | `*.test.*`、`*.spec.*` 等 |

## 典型使用场景

### 场景：将老项目升级为支持主题换肤

> 你的项目中有大量硬编码的 `#0564f5`、`#4e80f5` 等品牌蓝颜色值，菜单、按钮、链接等都写死了颜色，每次换主题都需要手动改。

**使用 Skill 后**：

1. 对 AI 说："让这个项目支持 Neo 主题换肤功能"
2. AI 自动扫描和替换所有硬编码色值
3. AI 自动迁移旧版 CSS 变量
4. AI 自动改造 primary 按钮样式
5. 生成 `Neo主题换肤功能升级报告.md`，你可以逐条核对

**改造前后对比**：

```scss
/* ========== 改造前：硬编码 ========== */
.btn-primary {
  background-color: #0564f5;
  color: #fff;

  &:hover {
    background-color: #4e80f5;
  }
}

/* ========== 改造后：支持换肤 ========== */
.btn-primary {
  // background-color: #0564f5;  // [*] 已替换为 var(--brand-color)
  background-color: var(--color-button-filled-primary);
  color: var(--color-button-filled-primary-color);

  &:hover {
    // background-color: #4e80f5;  // [*] 已替换为 var(--brand-color-hover)
    background-color: var(--color-button-filled-primary-hover);
    color: var(--color-button-filled-primary-color-hover);
  }
}
```

**价值**：传统方式需要开发者逐文件手动查找和替换，一个中型项目可能需要 1-2 天。使用 Skill 后一次对话完成，约 10-15 分钟。

## 可用的品牌色 CSS 变量

Skill 使用的全部 CSS 变量请参阅 **[Neo 平台品牌色 CSS 变量列表](./Neo平台品牌色CSS变量列表.md)**，包含：

- 品牌核心变量（6 对 hex + -rgb）
- 语义化 Brand Token（背景、边框、图标、文本共 26 个）
- 按钮色变量（11 个 + -rgb 伴侣）
- 导航 Banner 色变量（11 个）
- 各类场景的完整使用示例

## 常见问题

**Q: AI 替换后会不会破坏原来的代码逻辑？**

Skill 内置了多项保护机制：自动跳过测试文件、注释行、类名中的色值、ECharts 属性等场景。每次替换后还会检查语法是否正确。SCSS/CSS 文件中会保留原有的写法（用注释保留）。

**Q: 如果有些色值我不想替换怎么办？**

AI 在执行替换前会展示扫描结果，你可以告知 AI 哪些文件或色值需要跳过。Skill 也会智能跳过一些不适用替换的场景。

**Q: 升级后项目构建会不会报错？**

替换后的代码仍保留原有 CSS 属性和选择器结构，仅将颜色值替换为 `var()` 写法。建议升级完成后执行 `npm run build` 验证。

**Q: ECharts 图表的颜色为什么没有被替换？**

ECharts 不支持 `var(--css-variable)` 写法，因此 Skill 会跳过图表配置中的色值。如需图表也响应主题换肤，请使用 `getCssVarHex()` 方法将 CSS 变量转为 hex 值后传入。详见 [Neo 平台品牌色 CSS 变量列表 — 第十节](./Neo平台品牌色CSS变量列表.md#十echarts-场景使用规范)。

**Q: 这个 Skill 和「历史项目主题换肤升级指南」文档的关系？**

该文档是 Skill 的参考手册，详细描述了替换规则和要求；Skill 则是该手册的 AI 自动化实现，可以在项目中自动执行替换操作。

## 反馈与改进

使用过程中遇到问题或有优化建议，欢迎提交到 [neo-cmp-docs Issues](https://github.com/xsy-neoui/neo-cmp-docs/issues)。
