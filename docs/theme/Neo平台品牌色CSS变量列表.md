# Neo 平台品牌色 CSS 变量列表

本文档列出了 Neo 平台主题换肤系统中所有可用的品牌色 CSS 变量，包含默认色值、变量说明及使用示例。

> **说明**：以下为 `ThemHelper.setBaseColor('#0564f5')` 时的默认值。实际运行时由 ThemeHelper 动态计算并注入，不同主题下取值不同。
>
> **核心设计**：每个 Hex 主变量均配有 `-rgb` 伴侣变量（纯数值格式如 `5, 100, 245`），专用于 `rgba()` 半透明场景。

## 一、品牌核心变量

| CSS 变量 | -rgb 伴侣变量 | 默认色值 | 说明 |
|:--|:--|:--|:--|
| `--brand-color` | `--brand-color-rgb` | `#0564f5` | 品牌主色，所有品牌色体系的根源 |
| `--brand-color-hover` | `--brand-color-hover-rgb` | `#1a7aff` | 品牌 Hover 色，各元素 hover 交互态 |
| `--brand-color-shade` | `--brand-color-shade-rgb` | `#004ccf` | 品牌深色变体，active / 按下 / 选中态 |
| `--brand-color-tint` | `--brand-color-tint-rgb` | `#e6f4ff` | 品牌最浅变体，大面积背景底色 |
| `--brand-color-tint-light` | `--brand-color-tint-light-rgb` | `#a8d7ff` | 品牌次浅变体，浅色背景 / hover 背景 |
| `--brand-color-disabled` | `--brand-color-disabled-rgb` | `#80bfff` | 品牌禁用态 |

### 使用示例

```scss
/* 直接使用品牌主色 */
.page-title {
  color: var(--brand-color);
}

/* 选中/激活态（左侧竖线标识） */
.menu-item.active {
  border-left: 3px solid var(--brand-color);
  color: var(--color-text-brand);
  background-color: var(--color-bg-brand-tint);
}

/* hover 交互态 */
.menu-item:hover {
  background-color: var(--color-bg-brand-tint-light);
  color: var(--color-text-brand-hover);
}

/* 半透明覆盖层（使用 -rgb 伴侣变量） */
.overlay {
  background: rgba(var(--brand-color-rgb), 0.72);
  backdrop-filter: blur(10px);
}

/* 半透明 hover 背景 */
.item:hover {
  background: rgba(var(--brand-color-rgb), 0.08);
}
```

---

## 二、背景 Background

| CSS 变量 | -rgb 伴侣变量 | 级联自 | 说明 |
|:--|:--|:--|:--|
| `--color-bg-brand` | `--color-bg-brand-rgb` | `var(--brand-color)` | 品牌主色背景，强品牌感区块底色 |
| `--color-bg-brand-hover` | `--color-bg-brand-hover-rgb` | `var(--brand-color-hover)` | 品牌 Hover 背景 |
| `--color-bg-brand-shade` | `--color-bg-brand-shade-rgb` | `var(--brand-color-shade)` | 品牌深色背景，重点强调区域 |
| `--color-bg-brand-tint` | `--color-bg-brand-tint-rgb` | `var(--brand-color-tint)` | 品牌浅色背景，卡片 / 选中行轻量底色 |
| `--color-bg-brand-tint-light` | `--color-bg-brand-tint-light-rgb` | `var(--brand-color-tint-light)` | 品牌次浅色背景 |
| `--color-bg-brand-disabled` | `--color-bg-brand-disabled-rgb` | `var(--brand-color-disabled)` | 品牌禁用态背景 |

> 每个变量均有对应的 `-rgb` 伴侣变量（如 `--color-bg-brand-rgb`）。

### 使用示例

```scss
/* 强品牌感 Banner 区域 */
.banner {
  background: var(--color-bg-brand);
  color: #ffffff;
}

/* 浅色背景卡片 */
.stat-card {
  background: var(--color-bg-brand-tint);
  border: 1px solid var(--color-border-brand-tint);
  border-radius: 12px;
  padding: 20px;

  &:hover {
    background: var(--color-bg-brand-hover);
    color: #ffffff; /* 深色背景上文字变白 */
  }
}

/* 禁用态背景 */
.card.disabled {
  background: var(--color-bg-brand-disabled);
  cursor: not-allowed;
}
```

---

## 三、边框 Border

| CSS 变量 | -rgb 伴侣变量 | 级联自 | 说明 |
|:--|:--|:--|:--|
| `--color-border-brand` | `--color-border-brand-rgb` | `var(--brand-color)` | 品牌主色边框，input focus / 选中边框 |
| `--color-border-brand-hover` | `--color-border-brand-hover-rgb` | `var(--brand-color-hover)` | 品牌 Hover 边框 |
| `--color-border-brand-shade` | `--color-border-brand-shade-rgb` | `var(--brand-color-shade)` | 品牌深色边框 |
| `--color-border-brand-tint` | `--color-border-brand-tint-rgb` | `var(--brand-color-tint)` | 品牌浅色边框 |
| `--color-border-brand-tint-light` | `--color-border-brand-tint-light-rgb` | `var(--brand-color-tint-light)` | 品牌次浅色边框 |
| `--color-border-brand-disabled` | `--color-border-brand-disabled-rgb` | `var(--brand-color-disabled)` | 品牌禁用态边框 |

### 使用示例

```scss
/* 输入框聚焦 */
.input:focus,
.select-open {
  border-color: var(--color-border-brand);
  box-shadow: 0 0 0 2px rgba(var(--color-border-brand-rgb), 0.15);
  outline: none;
}

/* 虚线分割线 */
.divider {
  border-top: 1px dashed var(--color-border-brand-tint);
}

/* hover 边框加深 */
.card:hover {
  border-color: var(--color-border-brand-hover);
  box-shadow: 0 4px 16px rgba(var(--color-border-brand-hover-rgb), 0.2);
}
```

---

## 四、图标 Icon

| CSS 变量 | -rgb 伴侣变量 | 级联自 | 说明 |
|:--|:--|:--|:--|
| `--color-icon-brand` | `--color-icon-brand-rgb` | `var(--brand-color)` | 图标主色，功能图标正常态 |
| `--color-icon-brand-hover` | `--color-icon-brand-hover-rgb` | `var(--brand-color-hover)` | 图标 Hover 色 |
| `--color-icon-brand-shade` | `--color-icon-brand-shade-rgb` | `var(--brand-color-shade)` | 图标深色，active 态 |
| `--color-icon-brand-tint` | `--color-icon-brand-tint-rgb` | `var(--brand-color-tint)` | 图标浅色 |
| `--color-icon-brand-tint-light` | `--color-icon-brand-tint-light-rgb` | `var(--brand-color-tint-light)` | 图标次浅色 |
| `--color-icon-fill-brand-link` | `--color-icon-fill-brand-link-rgb` | `var(--brand-color-shade)` | 图标链接色，可点击图标 hover 交互色 |
| `--color-icon-brand-disabled` | `--color-icon-brand-disabled-rgb` | `var(--brand-color-disabled)` | 图标禁用色 |

### 使用示例

```scss
/* 实心图标 */
.icon-solid {
  background: var(--color-icon-brand);
  color: #ffffff;

  &:hover {
    background: var(--color-icon-brand-hover);
    box-shadow: 0 4px 12px rgba(var(--color-icon-brand-hover-rgb), 0.35);
  }
}

/* 线框图标 */
.icon-outline {
  background: transparent;
  color: var(--color-icon-brand);
  border: 2px solid var(--color-border-brand);

  &:hover {
    color: var(--color-icon-brand-hover);
    border-color: var(--color-border-brand-hover);
    background: rgba(var(--color-icon-brand-hover-rgb), 0.06);
  }
}

/* 可点击链接图标 */
.icon-link:hover {
  color: var(--color-icon-fill-brand-link);
  transform: scale(1.15);
}

/* 浅底图标 */
.icon-tint {
  background: var(--color-icon-brand-tint);
  color: var(--color-icon-brand);
  border-color: var(--color-border-brand-tint);
}

/* 禁用图标 */
.icon-disabled {
  color: var(--color-icon-brand-disabled);
  cursor: not-allowed;
}
```

---

## 五、文本 & 文字链接 Text

| CSS 变量 | -rgb 伴侣变量 | 级联自 | 说明 |
|:--|:--|:--|:--|
| `--color-text-brand` | `--color-text-brand-rgb` | `var(--brand-color)` | 品牌色文字，关键数据 / 主标题 / 链接基础色 |
| `--color-text-brand-hover` | `--color-text-brand-hover-rgb` | `var(--brand-color-hover)` | 品牌 Hover 文字色 |
| `--color-text-brand-shade` | `--color-text-brand-shade-rgb` | `var(--brand-color-shade)` | 品牌深色文字，链接 active 态 |
| `--color-text-brand-tint` | `--color-text-brand-tint-rgb` | `var(--brand-color-tint)` | 品牌浅色文字底 |
| `--color-text-brand-tint-light` | `--color-text-brand-tint-light-rgb` | `var(--brand-color-tint-light)` | 品牌次浅色文字 |
| `--color-text-brand-disabled` | `--color-text-brand-disabled-rgb` | `var(--brand-color-disabled)` | 品牌禁用态文字色 |
| `--color-text-brand-link` | `--color-text-brand-link-rgb` | `var(--brand-color-shade)` | 文字链接色，hover 加深效果 |

### 使用示例

```scss
/* 关键数据指标 */
.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-text-brand);

  &:hover {
    color: var(--color-text-brand-hover);
  }
}

/* 文字链接 */
.text-link {
  color: var(--color-text-brand-link);
  cursor: pointer;

  &:hover {
    color: var(--color-text-brand-hover);
    text-decoration: underline;
  }
}

/* 浅底高亮文本 */
.highlight {
  background: var(--color-bg-brand-tint);
  color: var(--color-text-brand);
  border-radius: 8px;
  padding: 12px 16px;
}

/* 禁用态文字 */
.text-disabled {
  color: var(--color-text-brand-disabled);
  cursor: not-allowed;
}

/* 带图标箭头的链接文本 */
.link-item {
  color: var(--color-text-brand-link);
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: var(--color-text-brand-hover);
    background: var(--color-bg-brand-tint);
  }
}
```

---

## 六、按钮色变量

> ★ **核心说明**：`--color-button-filled-primary-*` 系列变量用于实心底色按钮背景色，同时可复用于白色背景按钮的 **border 边框**、**outline 描边**、**text 文字**的颜色。即 fill / border / outline / text 四种按钮形态共用这一套变量。

### 6.1 背景色

| CSS 变量 | -rgb 伴侣变量 | 级联自 | 说明 |
|:--|:--|:--|:--|
| `--color-button-filled-primary` | `--color-button-filled-primary-rgb` | `var(--color-bg-brand)` | 正常态背景色（★ 同时可用于 border/outline/text 颜色） |
| `--color-button-filled-primary-hover` | `--color-button-filled-primary-hover-rgb` | `var(--color-bg-brand-hover)` | 鼠标悬停背景色 |
| `--color-button-filled-primary-active` | `--color-button-filled-primary-active-rgb` | `var(--color-bg-brand-shade)` | 点击按下背景色 |
| `--color-button-filled-primary-tint` | `--color-button-filled-primary-tint-rgb` | `var(--color-bg-brand-tint)` | 浅色背景 |
| `--color-button-filled-primary-disabled` | `--color-button-filled-primary-disabled-rgb` | `var(--color-bg-brand-disabled)` | 禁用态背景色 |

> 均配有对应 `-rgb` 伴侣变量，如 `--color-button-filled-primary-rgb`。

### 6.2 文字色

| CSS 变量 | 级联自 | 说明 |
|:--|:--|:--|
| `--color-button-filled-primary-color` | `var(--color-neutral-0)` | 正常态文字色（自动对比色） |
| `--color-button-filled-primary-color-hover` | `var(--color-neutral-0)` | 悬停文字色 |
| `--color-button-filled-primary-color-disabled` | `var(--color-text-aid)` | 禁用文字色 |

### 6.3 次按钮变量

| CSS 变量 | -rgb 伴侣变量 | 说明 |
|:--|:--|:--|
| `--color-button-filled-primary-secondary` | `--color-button-filled-primary-secondary-rgb` | ★ 次按钮 — 正常态背景（降一级变浅，colors[4]） |
| `--color-button-filled-primary-secondary-hover` | `--color-button-filled-primary-secondary-hover-rgb` | ★ 次按钮 — 悬停态背景（比 hover 降一级变浅） |
| `--color-button-filled-primary-secondary-disable` | `--color-button-filled-primary-secondary-disable-rgb` | ★ 次按钮 — 禁用态背景（比 disable 降一级变浅） |

> 均配有对应 `-rgb` 伴侣变量。

### 使用示例

#### 填充主按钮

```scss
.btn-primary {
  background-color: var(--color-button-filled-primary);
  color: var(--color-button-filled-primary-color);
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-button-filled-primary-hover);
    color: var(--color-button-filled-primary-color-hover);
    box-shadow: 0 4px 14px rgba(var(--color-button-filled-primary-rgb), 0.25);
  }

  &:active {
    background-color: var(--color-button-filled-primary-active);
  }

  &:disabled {
    background-color: var(--color-button-filled-primary-disabled);
    color: var(--color-button-filled-primary-color-disabled);
    cursor: not-allowed;
    box-shadow: none;
  }
}
```

#### 轮廓按钮（白色背景，border + text 复用主色）

```scss
.btn-outline-primary {
  background: transparent;
  color: var(--color-button-filled-primary);
  border: 2px solid var(--color-button-filled-primary);
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--color-button-filled-primary-rgb), 0.08);
    border-color: var(--color-button-filled-primary-hover);
    color: var(--color-button-filled-primary-hover);
  }

  &:active {
    border-color: var(--color-button-filled-primary-active);
    color: var(--color-button-filled-primary-active);
  }
}
```

#### 文字按钮

```scss
.btn-text-primary {
  background: transparent;
  color: var(--color-button-filled-primary);
  border: 1px solid transparent;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--color-button-filled-primary-rgb), 0.08);
    color: var(--color-button-filled-primary-hover);
  }
}
```

#### 次按钮

```scss
.btn-secondary {
  background-color: var(--color-button-filled-primary-secondary);
  color: var(--color-button-filled-primary-color);
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-button-filled-primary-secondary-hover);
    box-shadow: 0 2px 8px rgba(var(--color-button-filled-primary-secondary-rgb), 0.25);
  }

  &:disabled {
    background-color: var(--color-button-filled-primary-secondary-disable);
    color: var(--color-button-filled-primary-color-disabled);
    cursor: not-allowed;
  }
}
```

---

## 七、导航 Banner 色变量

| CSS 变量 | -rgb 伴侣变量 | 说明 |
|:--|:--|:--|
| `--brand-nav-header-bg` | `--brand-nav-header-bg-rgb` | 导航栏背景色 |
| `--brand-nav-header-font` | `--brand-nav-header-font-rgb` | 导航栏标题 / 正文文字色（自动识别深浅色） |
| `--brand-nav-header-font-hover` | `--brand-nav-header-font-hover-rgb` | 导航栏文字 Hover 态 |
| `--brand-nav-header-icon` | `--brand-nav-header-icon-rgb` | 导航栏图标色（返回 / 关闭等） |
| `--brand-nav-header-icon-hover` | `--brand-nav-header-icon-hover-rgb` | 导航栏图标 Hover 态 |
| `--brand-nav-header-launcher-icon` | `--brand-nav-header-launcher-icon-rgb` | 启动器图标色（使用品牌色） |
| `--brand-nav-header-select` | `--brand-nav-header-select-rgb` | 选中项高亮色（使用品牌深色变体） |
| `--brand-nav-header-select-bg` | `--brand-nav-header-select-bg-rgb` | 导航栏选中项背景色 |
| `--brand-nav-header-elem-opacity` | `--brand-nav-header-elem-opacity-rgb` | 导航元素半透明层 |
| `--brand-nav-header-elem-hover` | `--brand-nav-header-elem-hover-rgb` | 导航元素悬停背景色 |
| `--brand-nav-header-placeholder` | `--brand-nav-header-placeholder-rgb` | 导航栏输入框占位符色 |

### 使用示例

```scss
/* 导航栏整体 */
.nav-bar {
  background-color: var(--brand-nav-header-bg);
  color: var(--brand-nav-header-font);
  display: flex;
  align-items: center;
  padding: 12px 20px;
}

/* 返回/关闭图标 */
.nav-bar .back-icon {
  color: var(--brand-nav-header-icon);

  &:hover {
    color: var(--brand-nav-header-icon-hover);
  }
}

/* 导航栏标题 */
.nav-bar .title {
  color: var(--brand-nav-header-font);
  font-size: 17px;
  font-weight: 600;

  &:hover {
    color: var(--brand-nav-header-font-hover);
  }
}

/* 导航菜单项悬停 */
.nav-bar .menu-item:hover {
  background: var(--brand-nav-header-elem-hover);
}

/* 当前选中项 */
.nav-bar .menu-item.active {
  color: var(--brand-nav-header-select);
  background: var(--brand-nav-header-select-bg);
}
```

---

## 八、-rgb 伴侣变量使用规范

每个 Hex 主变量都配有对应的 `-rgb` 伴侣变量（纯数值，如 `5, 100, 245`），专用于 `rgba()` 半透明场景。

### 格式

```
rgba(var(--xxx-rgb), <alpha>)
```

### 使用场景

```scss
/* 场景 1：半透明背景覆盖层 */
.overlay {
  background: rgba(var(--brand-color-rgb), 0.72);
  backdrop-filter: blur(10px);
}

/* 场景 2：hover 态半透明背景 */
.card:hover {
  background: rgba(var(--color-bg-brand-rgb), 0.08);
}

/* 场景 3：按钮 hover 半透明叠加 */
.btn:hover {
  background: rgba(var(--color-button-filled-primary-rgb), 0.08);
}

/* 场景 4：阴影色 */
.shadow {
  box-shadow: 0 4px 16px rgba(var(--brand-color-rgb), 0.25);
}

/* 场景 5：边框发光 */
.glow {
  box-shadow: 0 0 0 3px rgba(var(--color-border-brand-rgb), 0.15);
}
```

---

## 九、Fallback 默认值使用规范

建议为所有 CSS 变量添加 fallback 值，确保变量未加载时也有默认表现：

```scss
/* ✅ 推荐：提供 fallback 默认值 */
.button {
  background-color: var(--color-button-filled-primary, #0564f5);
  border-color: var(--color-border-brand, #0564f5);
  color: var(--color-text-brand, #0564f5);
}

.link {
  color: var(--color-text-brand-link, #004ccf);
}
```

---

## 十、ECharts 场景使用规范

ECharts 不支持 `var(--css-variable)` 写法，需通过 `getCssVarHex()` 转换：

```tsx
import { getCssVarHex } from 'neo-ui-common/ThemeHelper';

const MyChart: React.FC = () => {
  const brandColor = getCssVarHex('--brand-color');
  const brandColorShade = getCssVarHex('--brand-color-shade');
  const brandColorTint = getCssVarHex('--color-bg-brand-tint');

  const option = {
    color: [brandColor, brandColorShade],
    series: [{
      type: 'bar',
      itemStyle: { color: brandColor },
      emphasis: { itemStyle: { color: brandColorShade } },
    }],
    backgroundColor: brandColorTint,
  };

  return <ReactECharts option={option} />;
};
```

---

## 变量速查索引

### 品牌核心（6 个）

`--brand-color` · `--brand-color-hover` · `--brand-color-shade` · `--brand-color-tint` · `--brand-color-tint-light` · `--brand-color-disabled`

### 背景（6 个）

`--color-bg-brand` · `--color-bg-brand-hover` · `--color-bg-brand-shade` · `--color-bg-brand-tint` · `--color-bg-brand-tint-light` · `--color-bg-brand-disabled`

### 边框（6 个）

`--color-border-brand` · `--color-border-brand-hover` · `--color-border-brand-shade` · `--color-border-brand-tint` · `--color-border-brand-tint-light` · `--color-border-brand-disabled`

### 图标（7 个）

`--color-icon-brand` · `--color-icon-brand-hover` · `--color-icon-brand-shade` · `--color-icon-brand-tint` · `--color-icon-brand-tint-light` · `--color-icon-fill-brand-link` · `--color-icon-brand-disabled`

### 文本（7 个）

`--color-text-brand` · `--color-text-brand-hover` · `--color-text-brand-shade` · `--color-text-brand-tint` · `--color-text-brand-tint-light` · `--color-text-brand-disabled` · `--color-text-brand-link`

### 按钮色（11 个）

`--color-button-filled-primary` · `--color-button-filled-primary-hover` · `--color-button-filled-primary-active` · `--color-button-filled-primary-tint` · `--color-button-filled-primary-disabled` · `--color-button-filled-primary-color` · `--color-button-filled-primary-color-hover` · `--color-button-filled-primary-color-disabled` · `--color-button-filled-primary-secondary` · `--color-button-filled-primary-secondary-hover` · `--color-button-filled-primary-secondary-disable`

### 导航色（11 个）

`--brand-nav-header-bg` · `--brand-nav-header-font` · `--brand-nav-header-font-hover` · `--brand-nav-header-icon` · `--brand-nav-header-icon-hover` · `--brand-nav-header-launcher-icon` · `--brand-nav-header-select` · `--brand-nav-header-select-bg` · `--brand-nav-header-elem-opacity` · `--brand-nav-header-elem-hover` · `--brand-nav-header-placeholder`
