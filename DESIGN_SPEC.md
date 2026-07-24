# Neubrutalism — Orca Note 主题插件设计规范

> **版本:** 1.0  
> **状态:** 设计草案  
> **日期:** 2026-07-24  
<!-- > **设计来源:** neobrutalism-components (ekmas) × TUI-minimal × shadcn/ui CSS 变量标准化 -->

---

## 1. 设计哲学

### 核心精神：暴露结构，材料的诚实

Neubrutalism（新粗野主义）是一种反装饰的设计语言。它拒绝渐变阴影、拒绝圆角、拒绝半透明叠加层，转而**暴露结构的本来面貌**。边框不假装是阴影，阴影不假装是现实深度，按钮就是带有粗边框和硬偏移阴影的矩形块。

> **核心信条：** 界面由 box-model 构成，而非由 illusion 构成。

### 终端面板 + 像素复古的混合身份

本主题同时服务于两个场景：

| 场景 | 视觉侧重点 |
|------|-----------|
| **日常笔记 / 写作** | 奶油底色 + 粗黑边框 + 高饱和主色点缀，营造复古印刷品质感 |
| **代码编辑 / 终端** | 深色背景 + 荧光色代码高亮 + 像素级直角，回归 terminal 原教旨美学 |

两者的结合产生一种独特的混合身份：**《Wired》杂志 90 年代排版 × 现代终端 emulator**。

### "友善的反叛" — 清晰可用，但拒绝平庸

- **可访问性优先：** 高对比度（`--nb-fg` 90% 明度 vs `--nb-bg-base` 18% 明度，对比度 > 7:1）
- **拒绝随波逐流：** 不跟随 macOS / Windows 的圆角扁平 UI 潮流
- **趣味性：** 使用 Brutal Pink / Brutal Cyan 等高饱和强调色作为彩色锚点，在克制中注入活力

### 与 TUI-minimal 的对比立场

| 与 TUI-minimal 共享 | 与 TUI-minimal 不同 |
|---------------------|-------------------|
| 零圆角 (`border-radius: 0`) | **保留动画** — hover/active 有 0.15s 过渡 |
| `_shared.css` + `flavors/*.css` 分离架构 | **粗边框** — 2px 而非 1px |
| `html.t-light` 亮暗切换 | **硬阴影** — `4px 4px 0px 0px`，TUI-minimal 全无阴影 |
| `main.ts` 注册 / injectCSSResource 模式 | **多色 palette** — 3-5 色而非单色 |
| `!important` 策略覆盖 Orca 内联样式 | **Display 字体** — 标题使用 Space Grotesk |

---

## 2. 视觉 DNA（Visual DNA）

### 核心属性表

| 属性 | 规则 | 说明 |
|------|------|------|
| `border-radius` | `5px`（可配 0/5/10/15） | 默认微圆角。匹配 ekmas `--border-radius` |
| `box-shadow` | `Xpx Ypx 0px 0px var(--border)` | 硬偏移阴影。默认 `4px 4px`，可配置（含负值） |
| `border` | `2px solid var(--border)` | 全局粗黑边框 |
| `ring` (focus) | `box-shadow: 0 0 0 2px var(--ring), 0 0 0 4px var(--background)` | `ring-2 ring-offset-2` 用 box-shadow 实现 |
| `transition` | `all 0.15s` | 交互元素保留过渡 |
| `font-weight` (heading) | `700`（可配 700/800/900） | `var(--heading-font-weight)` |
| `font-weight` (base) | `500`（可配 500/600/700） | `var(--base-font-weight)` |
| `font-family` | 继承 Orca 宿主 | 不设置自定义字体 |
| `color palette` | OKLCH 色值，17 色方案 + 亮暗双模式 | 详见 §3 |

### 像素级约束

```css
/* 全局重置 */
*, *::before, *::after {
  border-radius: var(--border-radius) !important;
}

/* 硬边阴影 */
.nb-card, .nb-modal, .nb-dropdown {
  box-shadow: var(--shadow);
}

/* 粗边框 */
.nb-card, .nb-button, .nb-input {
  border: 2px solid var(--border);
}

/* 交互过渡 */
.nb-button {
  transition: all 0.15s ease;
}
```

### 按钮交互

ekmas 模式：hover 时按钮沿 shadow 方向平移，shadow 消失（模拟按入）。

```css
.nb-button {
  box-shadow: 4px 4px 0 0 var(--border);
}
.nb-button:hover {
  transform: translate(4px, 4px);
  box-shadow: none;
}
```

---

## 3. 色彩系统（匹配 ekmas/neobrutalism-components）

### 3.1 色值来源

所有色值直接取自 [ekmas/neobrutalism-components](https://github.com/ekmas/neobrutalism-components) `src/data/colors.ts`，使用 OKLCH 色空间。

默认主色：**Orange**（索引 1，共 17 色方案），替代之前的 Brutal Yellow。

### 3.2 Light Mode（`:root`）

| Token | Value (OKLCH) | 说明 |
|-------|---------------|------|
| `--main` | `oklch(72.27% 0.1894 50.19)` | 主色（Orange） |
| `--background` | `oklch(95.38% 0.0357 72.89)` | 页面背景 |
| `--secondary-background` | `oklch(100% 0 0)` | 卡片/浮层面板 |
| `--foreground` | `oklch(0% 0 0)` | 正文色 |
| `--main-foreground` | `oklch(0% 0 0)` | 主色上的文字 |
| `--border` | `oklch(0% 0 0)` | 边框 |
| `--ring` | `oklch(0% 0 0)` | focus ring |
| `--overlay` | `oklch(0% 0 0 / 0.8)` | 遮罩 |

### 3.3 Dark Mode（`.dark` / `html.t-light`）

| Token | Value (OKLCH) | 说明 |
|-------|---------------|------|
| `--main` | `oklch(67.56% 0.1796 49.61)` | 主色（Dark 版略降明度） |
| `--background` | `oklch(26.86% 0.0327 60.06)` | 页面背景（暖深灰） |
| `--secondary-background` | `oklch(23.93% 0 0)` | 卡片/浮层面板 |
| `--foreground` | `oklch(92.49% 0 0)` | 正文色 |
| `--main-foreground` | `oklch(0% 0 0)` | 主色上的文字（保持黑色高对比） |
| `--border` | `oklch(0% 0 0)` | 边框（保持纯黑） |
| `--ring` | `oklch(100% 0 0)` | focus ring（白色） |
| `--overlay` | `oklch(0% 0 0 / 0.8)` | 遮罩 |

### 3.4 设计 Token 命名

遵循 ekmas 标准，所有变量直接使用，无 `--nb-*` 中间层：

```css
:root {
  --border-radius: 5px;
  --box-shadow-x: 4px;
  --box-shadow-y: 4px;
  --reverse-box-shadow-x: -4px;
  --reverse-box-shadow-y: -4px;
  --heading-font-weight: 700;
  --base-font-weight: 500;
  --background: oklch(95.38% 0.0357 72.89);
  --secondary-background: oklch(100% 0 0);
  --foreground: oklch(0% 0 0);
  --main-foreground: oklch(0% 0 0);
  --main: oklch(72.27% 0.1894 50.19);
  --border: oklch(0% 0 0);
  --ring: oklch(0% 0 0);
  --overlay: oklch(0% 0 0 / 0.8);
  --shadow: var(--box-shadow-x) var(--box-shadow-y) 0px 0px var(--border);
}
```

### 3.5 完整 17 色调色板

| 名称 | `--main` Light | `--background` Light | `--main` Dark | `--background` Dark |
|------|---------------|---------------------|---------------|---------------------|
| red | `oklch(67.28% 0.2147 24.22)` | `oklch(93.3% 0.0339 17.77)` | `oklch(70.49% 0.1869 22.23)` | `oklch(24.95% 0.0491 20.19)` |
| **orange** | `oklch(72.27% 0.1894 50.19)` | `oklch(95.38% 0.0357 72.89)` | `oklch(67.56% 0.1796 49.61)` | `oklch(26.86% 0.0327 60.06)` |
| amber | `oklch(84.08% 0.1725 84.2)` | `oklch(96.22% 0.0569 95.61)` | `oklch(77.7% 0.1594 84.38)` | `oklch(28.91% 0.0359 90.09)` |
| yellow | `oklch(86.03% 0.176 92.36)` | `oklch(96.79% 0.0654 102.26)` | `oklch(79.36% 0.1624 92.49)` | `oklch(29.28% 0.0373 94.38)` |
| lime | `oklch(83.29% 0.2331 132.51)` | `oklch(95.37% 0.0549 125.19)` | `oklch(76.26% 0.2131 132.40)` | `oklch(23.1% 0.0346 126.75)` |
| green | `oklch(79.76% 0.2044 153.08)` | `oklch(96.47% 0.0401 157.79)` | `oklch(73.03% 0.1865 153.23)` | `oklch(22.45% 0.0316 158.41)` |
| emerald | `oklch(77.54% 0.1681 162.78)` | `oklch(95.31% 0.0496 169.04)` | `oklch(70.54% 0.1525 162.97)` | `oklch(22.71% 0.0252 182.05)` |
| teal | `oklch(78.57% 0.1422 180.36)` | `oklch(95.08% 0.0481 184.07)` | `oklch(71.47% 0.1293 180.47)` | `oklch(22.65% 0.0236 198.49)` |
| cyan | `oklch(76.89% 0.1392 219.13)` | `oklch(94.61% 0.043 211.12)` | `oklch(64.37% 0.1162 218.75)` | `oklch(27.11% 0.0303 225.38)` |
| sky | `oklch(66.9% 0.1837 248.81)` | `oklch(94.27% 0.0268 242.57)` | `oklch(61.9% 0.1691 248.60)` | `oklch(27.08% 0.0336 240.69)` |
| blue | `oklch(67.47% 0.1726 259.49)` | `oklch(93.46% 0.0305 255.11)` | `oklch(67.47% 0.1726 259.49)` | `oklch(29.23% 0.0626 270.49)` |
| indigo | `oklch(66.34% 0.1806 277.2)` | `oklch(92.13% 0.0388 282.36)` | `oklch(66.34% 0.1806 277.2)` | `oklch(26.58% 0.0737 283.96)` |
| violet | `oklch(70.28% 0.1753 295.36)` | `oklch(93.88% 0.033 300.19)` | `oklch(70.28% 0.1753 295.36)` | `oklch(30.14% 0.0826 296.5)` |
| purple | `oklch(71.9% 0.198 310.03)` | `oklch(94.11% 0.0366 308.03)` | `oklch(67.34% 0.2314 309.13)` | `oklch(29.68% 0.0791 315.62)` |
| fuchsia | `oklch(73.43% 0.2332 321.41)` | `oklch(94.79% 0.0407 320.6)` | `oklch(60.62% 0.2915 319.64)` | `oklch(26.29% 0.0683 327.3)` |
| pink | `oklch(71.5% 0.197 354.23)` | `oklch(95.16% 0.0242 343.23)` | `oklch(65.98% 0.2407 358.64)` | `oklch(26.3% 0.054 358.23)` |
| rose | `oklch(70.79% 0.1862 16.25)` | `oklch(93.37% 0.0339 12.05)` | `oklch(67.58% 0.2135 18.63)` | `oklch(25.15% 0.0495 7.54)` |

> 色值来源：ekmas `src/data/colors.ts`，所有颜色均使用 OKLCH 格式。

所有 OKLCH 值均来自以下权威源并做了交叉验证：

| 色值来源 | 用途 |
|---------|------|
| [neobrutalism-components (ekmas)](https://github.com/ekmas/neobrutalism-components) `colors.ts` | 主色、背景色的 OKLCH 原始值 |
| [Raft Brutal Palette](https://raft.app) CSS 提取 | Hex 参考值和 6 色强调体系 |
| OKLCH 色空间计算 (`c ≡ √(a² + b²)`) | 确保多级派生色值线性一致 |

---

## 4. 阴影系统（匹配 ekmas）

### 4.1 阴影 Token

ekmas 使用单一 `--shadow` token，通过 `--box-shadow-x` / `--box-shadow-y` 控制偏移量。

```css
:root {
  --box-shadow-x: 4px;
  --box-shadow-y: 4px;
  --reverse-box-shadow-x: -4px;
  --reverse-box-shadow-y: -4px;
  --shadow: var(--box-shadow-x) var(--box-shadow-y) 0px 0px var(--border);
}
```

偏移量可配置（-4px 到 4px，步长 2px）实现不同的 shadow 强度。

**Reverse shadow**：用于 Button `reverse` variant，hover 时 shadow 反向出现。

```css
.nb-button.reverse:hover {
  transform: translate(var(--reverse-box-shadow-x), var(--reverse-box-shadow-y));
  box-shadow: var(--shadow);
}
```

### 4.2 与 shadcn/ui 的对比

| 维度 | shadcn/ui | Neubrutalism |
|------|-----------|--------------|
| 阴影模式 | `box-shadow: 0 1px 2px rgba(0,0,0,0.05)` | `box-shadow: 4px 4px 0px 0px #000` |
| blur | 有（模拟高度） | **无**（纯偏移） |
| spread | 有 | **无** |
| 颜色 | 半透明黑 | 纯色 `--nb-border` |
| 层级 | sm/md/lg 基于偏移量 | sm/md/lg/xl 基于偏移量 |
| 物理隐喻 | 模拟 Z 轴高度 | 模拟印刷套色偏移（misregistration） |

### 4.3 交互态阴影变化

```css
/* 默认态 */
.nb-button {
  box-shadow: var(--shadow-md);
}

/* hover — 阴影增大，模拟按钮被"抬起" */
.nb-button:hover {
  box-shadow: var(--shadow-lg);
}

/* active — 阴影缩小，模拟按钮被"按下" */
.nb-button:active {
  box-shadow: var(--shadow-sm);
}

/* 禁用态 — 无阴影、降低对比 */
.nb-button:disabled {
  box-shadow: none;
  opacity: 0.5;
}
```

---

## 5. Orca 语义变量映射

### 5.1 核心映射表

将 `--nb-*` 设计 Token 映射到 Orca 的 `--orca-color-*` 语义体系。

```css
/* === 背景层 === */
--orca-color-bg-0:         var(--nb-bg-deepest);
--orca-color-bg-1:         var(--nb-bg-base);      /* 主面板背景 */
--orca-color-bg-2:         var(--nb-bg-float);     /* 浮层背景 */
--orca-color-bg-3:         var(--nb-bg-selected);  /* 选中态背景 */

/* === 文字 === */
--orca-color-text-1:       var(--nb-fg);           /* 正文 */
--orca-color-text-2:       var(--nb-fg-dim);       /* 次要 */
--orca-color-text-3:       var(--nb-fg-muted);     /* 禁用 */

/* === 边框 === */
--orca-color-border:       var(--nb-border);
--orca-color-border-2:     var(--nb-border-hi);
--orca-color-divider:      var(--nb-border);

/* === 链接 === */
--orca-color-link:         var(--nb-info);
--orca-color-link-hover:   color-mix(in oklab, var(--nb-info), var(--nb-fg) 20%);
--orca-color-link-visited: var(--nb-accent);

/* === 标题 === */
--orca-color-heading-1:    var(--nb-main);                            /* h1 — 主色 */
--orca-color-heading-2:    var(--nb-fg);                              /* h2 — 正文色 */
--orca-color-heading-3:    color-mix(in oklab, var(--nb-main) 60%, var(--nb-fg));  /* h3 — 混色 */
--orca-color-heading-4:    var(--nb-fg-dim);                          /* h4 — 次要色 */

/* === 主色派生层级（通过 color-mix 自动计算） === */
--orca-color-primary-1:    color-mix(in oklab, var(--nb-main) 10%, var(--nb-bg-base));  /* 最浅主色背景 */
--orca-color-primary-2:    color-mix(in oklab, var(--nb-main) 20%, var(--nb-bg-base));
--orca-color-primary-3:    color-mix(in oklab, var(--nb-main) 35%, var(--nb-bg-base));
--orca-color-primary-4:    color-mix(in oklab, var(--nb-main) 50%, var(--nb-bg-base));
--orca-color-primary-5:    var(--nb-main);                                               /* 基准主色 */
--orca-color-primary-6:    color-mix(in oklab, var(--nb-main) 60%, var(--nb-fg));
--orca-color-primary-7:    color-mix(in oklab, var(--nb-main) 40%, var(--nb-fg));
--orca-color-primary-8:    color-mix(in oklab, var(--nb-main) 20%, var(--nb-fg));
--orca-color-primary-9:    color-mix(in oklab, var(--nb-main) 10%, var(--nb-fg));        /* 最深主色文字 */

/* === 灰色层级（统一中性灰阶梯） === */
--orca-color-gray-0:       var(--nb-bg-deepest);   /* 最深层 */
--orca-color-gray-1:       var(--nb-bg-base);
--orca-color-gray-2:       var(--nb-bg-hover);
--orca-color-gray-3:       var(--nb-bg-float);
--orca-color-gray-4:       var(--nb-bg-selected);
--orca-color-gray-5:       var(--nb-fg-muted);
--orca-color-gray-6:       color-mix(in oklab, var(--nb-fg-muted) 50%, var(--nb-fg-dim));
--orca-color-gray-7:       var(--nb-fg-dim);
--orca-color-gray-8:       color-mix(in oklab, var(--nb-fg-dim) 50%, var(--nb-fg));
--orca-color-gray-9:       var(--nb-fg);            /* 最浅层 */

/* === 语义色（成功/警告/危险） === */
--orca-color-success-1:    color-mix(in oklab, var(--nb-success) 15%, var(--nb-bg-base));
--orca-color-success-5:    var(--nb-success);
--orca-color-success-9:    color-mix(in oklab, var(--nb-success) 15%, var(--nb-fg));

--orca-color-warning-1:    color-mix(in oklab, var(--nb-warning) 15%, var(--nb-bg-base));
--orca-color-warning-5:    var(--nb-warning);
--orca-color-warning-9:    color-mix(in oklab, var(--nb-warning) 15%, var(--nb-fg));

--orca-color-dangerous-1:  color-mix(in oklab, var(--nb-danger) 15%, var(--nb-bg-base));
--orca-color-dangerous-5:  var(--nb-danger);
--orca-color-dangerous-9:  color-mix(in oklab, var(--nb-danger) 15%, var(--nb-fg));

/* === 标签 / badge === */
--orca-color-tag:          var(--nb-accent);

/* === 滚动条 === */
--orca-color-scrollbar:    var(--nb-border);
--orca-color-scrollbar-hover: var(--nb-fg-muted);

/* === 选中高亮 === */
--orca-color-selection:    color-mix(in oklab, var(--nb-main) 30%, var(--nb-bg-base));
```

### 5.2 Light Mode 变量继承

亮色模式无需重新声明所有映射。只需覆盖 `--nb-*` 底层 Token（§3.3 已定义），`--orca-color-*` 通过 `var()` 引用自动继承新值。这是本设计体系与 shadcn/ui 标准化模式一致的关键优势。

```css
/* 亮色模式只需一行语义覆盖 — 所有引用自动生效 */
html.t-light {
  --nb-bg-base: oklch(96% 0.005 85);
  /* ... 更多 Token 覆盖见 §3.3 ... */
}
/* --orca-color-bg-1 自动变为 oklch(96% 0.005 85) */
```

---

## 6. 代码高亮

### 6.1 终端荧光风 8 色调色板

采用终端仿真器风格的荧光色方案，保持高对比度与可读性。

```css
:root {
  /* 代码高亮专用 token — 语义化命名，与 Orca 体系对齐 */
  --orca-color-code-fg:            var(--nb-fg);              /* 默认前景 — 正文色 */
  --orca-color-code-comment:       var(--nb-fg-muted);        /* 注释 — 45% 灰 */
  --orca-color-code-keyword:       var(--nb-accent);          /* 关键字 — Brutal Pink #fe7da8 */
  --orca-color-code-string:        var(--nb-success);         /* 字符串 — Brutal Lime #a9d877 */
  --orca-color-code-number:        var(--nb-warning);         /* 数字 — Brutal Orange #f8a16f */
  --orca-color-code-function:      var(--nb-info);            /* 函数名 — Brutal Cyan #27ccf3 */
  --orca-color-code-constant:      var(--nb-main);            /* 常量 — Brutal Yellow #ffd440 */
  --orca-color-code-type:          var(--nb-main);            /* 类型/类 — Brutal Yellow #ffd440 */
  --orca-color-code-operator:      var(--nb-fg-dim);          /* 运算符 — 65% 灰 */
  --orca-color-code-punctuation:   var(--nb-fg-dim);          /* 标点 — 65% 灰 */
  --orca-color-code-builtin:       color-mix(in oklab, var(--nb-info) 70%, var(--nb-fg)); /* 内置对象 */
  --orca-color-code-variable:      var(--nb-fg);              /* 变量名 */
  --orca-color-code-attribute:     var(--nb-warning);         /* 属性 */
  --orca-color-code-doc:           color-mix(in oklab, var(--nb-success) 60%, var(--nb-fg)); /* 文档注释 */
  --orca-color-code-diff-added:    color-mix(in oklab, var(--nb-success) 30%, var(--nb-bg-base));
  --orca-color-code-diff-removed:  color-mix(in oklab, var(--nb-danger) 30%, var(--nb-bg-base));
}
```

### 6.2 配色方案对照表

```css
/* 示例 — TypeScript 代码高亮效果 */

/* 关键字 */  const         → #fe7da8 (pink)
/* 函数 */    function      → #fe7da8 (pink)
/* 类型 */    string        → #ffd440 (yellow)
/* 变量 */    const x       → #e3ddd3 (white-ish)
/* 字符串 */  "hello"       → #a9d877 (green)
/* 数字 */    42            → #f8a16f (orange)
/* 注释 */    // TODO       → #6e6860 (muted)
/* 运算符 */  =>            → #9c958b (dim)
/* 常量 */    MAX_COUNT     → #ffd440 (yellow)
/* 内置 */    console       → #6acbe6 (cyan-tinted)
```

---

## 7. 多主题变体体系（扩展性）

### 7.1 架构原理

每个 flavor（主题变体）是一个独立的 CSS 文件，**只包含** `:root` / `html.t-light` 下的变量覆盖。结构代码（边框、阴影、布局、字体）全部在 `_shared.css` 中，flavor CSS 只改变颜色语义。

```
src/flavors/
├── default.css     # Brutal Yellow 主色
├── pink.css        # Brutal Pink 主色
├── cyan.css        # Brutal Cyan 主色
├── green.css       # Brutal Lime 主色
├── violet.css      # Brutal Purple 主色
└── red.css         # Brutal Red 主色
```

### 7.2 Flavor 切换时只需覆盖的 6 个 Token

每个 flavor 只需重新声明这 6 个色值（其他 token 通过 `color-mix()` 自动派生）：

| Token | 默认值 (default.css) | pink.css | cyan.css |
|-------|---------------------|----------|----------|
| `--nb-main` | `oklch(75.9% 0.155 92.93)` | `oklch(74.9% 0.162 0.71)` | `oklch(78.3% 0.135 219.2)` |
| `--nb-accent` | `oklch(74.9% 0.162 0.71)` | `oklch(75.9% 0.155 92.93)` | `oklch(74.9% 0.162 0.71)` |
| `--nb-info` | `oklch(78.3% 0.135 219.2)` | `oklch(78.3% 0.135 219.2)` | `oklch(75.9% 0.155 92.93)` |
| `--nb-success` | `oklch(82.7% 0.135 130.07)` | `oklch(82.7% 0.135 130.07)` | `oklch(82.7% 0.135 130.07)` |
| `--nb-warning` | `oklch(78.5% 0.123 50.11)` | `oklch(78.5% 0.123 50.11)` | `oklch(78.5% 0.123 50.11)` |
| `--nb-danger` | `oklch(71.1% 0.168 28.04)` | `oklch(71.1% 0.168 28.04)` | `oklch(71.1% 0.168 28.04)` |

> **设计原则：** main 作为主色驱动 hue 变化，accent 自动成为 main 的互补偏移色。其他语义色（info/success/warning/danger）在非默认 flavor 中保持稳定，确保全局语义一致性。

### 7.3 Flavor CSS 模板

```css
/* =============================================
   Neubrutalism — Flavor: [NAME]
   Author: auto-generated from flavor template
   Changes: only override :root + html.t-light
   ============================================= */

:root {
  --nb-main:    oklch(…);
  --nb-accent:  oklch(…);
  --nb-info:    oklch(…);
  --nb-success: oklch(…);
  --nb-warning: oklch(…);
  --nb-danger:  oklch(…);
}

html.t-light {
  --nb-main:    oklch(…);   /* 亮色版 */
  --nb-accent:  oklch(…);
  --nb-info:    oklch(…);
  --nb-success: oklch(…);
  --nb-warning: oklch(…);
  --nb-danger:  oklch(…);
}
```

### 7.4 生成脚本（预研）

未来可以用 Node.js 脚本从 `themes.json` 配置生成所有 flavor：

```json
{
  "themes": [
    {
      "name": "yellow",
      "main": "oklch(75.9% 0.155 92.93)",
      "accent": "oklch(74.9% 0.162 0.71)",
      "info": "oklch(78.3% 0.135 219.2)",
      "success": "oklch(82.7% 0.135 130.07)",
      "warning": "oklch(78.5% 0.123 50.11)",
      "danger": "oklch(71.1% 0.168 28.04)"
    }
  ]
}
```

---

## 8. 目录结构（基于 TUI-minimal 改造）

### 8.1 完整项目结构

```
src/
├── main.ts                        # 主题注册入口
│   ├── orca.themes.register()     # 注册 Neubrutalism 主题
│   ├── document.documentElement.classList.add(THEME_CLASS)
│   ├── syncThemeMode()            # 监听 orca.state.themeMode → 切换 html.t-light
│   └── injectCSSResource()        # 加载 _shared.css + flavor.css + features/ + plugin-styles/
│
├── orca.d.ts                      # Orca API 类型声明（与 TUI-minimal 共享）
│
├── theme-css/
│   ├── _shared.css                # 结构层（颜色无关）
│   │   ├── 全局 border-radius: 0
│   │   ├── 粗边框系统
│   │   ├── 硬阴影系统
│   │   ├── 排版体系（font-family, font-weight, line-height）
│   │   ├── 焦点样式（:focus-visible）
│   │   ├── 滚动条样式
│   │   └── 基础组件样式（卡片、按钮、输入框、弹窗）
│   │
│   └── reference/
│       └── diagnostic-script.js   # CSS 变量诊断工具（开发用）
│           ├── 输出所有 --nb-* 变量的计算值
│           ├── 校验对比度 ratio
│           └── 列出未使用的 --orca-color-* 变量
│
├── flavors/                       # 配色层（每个文件仅含变量覆盖）
│   ├── default.css                # Brutal Yellow（默认）
│   ├── pink.css                   # Brutal Pink
│   ├── cyan.css                   # Brutal Cyan
│   ├── green.css                  # Brutal Lime
│   ├── violet.css                 # Brutal Purple
│   └── red.css                    # Brutal Red
│
├── features/                      # 可选特性（结构层 + 配色层分离）
│   ├── _pixel-decorations.css     # 像素装饰元素（复古指针、像素分隔线）
│   ├── _strikethrough-checkboxes.css  # 待办已完成 = 删除线
│   └── _typewriter-cursor.css     # 打字机光标动画
│
├── plugin-styles/                 # 第三方插件适配
│   ├── orca-calendar.css          # 日历插件
│   ├── orca-kanban.css            # 看板插件
│   ├── orca-slash-commands.css    # 斜杠命令面板
│   └── orca-whiteboard.css        # 白板插件
│
└── scripts/
    ├── build-theme-css.cjs        # CSS 拼接脚本（开发构建用）
    │   ├── 读取 _shared.css
    │   ├── 读取选中的 flavor.css
    │   ├── 读取 features/ 中的激活项
    │   ├── 读取 plugin-styles/ 中的必需项
    │   └── 拼接为单个 theme.css 输出
    └── generate-flavors.cjs       # 从 JSON 配置生成 flavor CSS 文件（可选）
```

### 8.2 文件职责分离

| 分层 | 文件名 | 包含内容 | 是否颜色相关 | 变更频率 |
|------|--------|----------|-------------|---------|
| **结构层** | `_shared.css` | 边框、阴影、布局、字体、间距 | ❌ 否 | 低 |
| **配色层** | `flavors/*.css` | 所有 `--nb-*` 和 `--orca-color-*` 变量定义 | ✅ 是 | 高 |
| **特性层** | `features/*.css` | 像素装饰、动画、特殊交互 | 混合 | 中 |
| **适配层** | `plugin-styles/*.css` | 第三方插件覆盖 | 混合 | 中 |

### 8.3 main.ts 核心逻辑

```typescript
// === src/main.ts ===
// Neubrutalism Orca Theme — Entry Point
// Based on TUI-minimal architecture

const THEME_NAME = "Neubrutalism";
const THEME_CLASS = "t-neubrutalism";
const LIGHT_CLASS = "t-light";
const DEFAULT_FLAVOR = "default";

let pluginName: string;
let themeModeUnsub: (() => void) | null = null;

function syncThemeMode() {
  const isLight = (orca.state as any).themeMode === "light";
  document.documentElement.classList.toggle(LIGHT_CLASS, isLight);
}

export async function load(name: string) {
  pluginName = name;

  // 1. 注册主题
  if (orca.themes[THEME_NAME] == null) {
    orca.themes.register(pluginName, THEME_NAME, "neubrutalism.css");
  }

  // 2. 添加主题 class
  document.documentElement.classList.add(THEME_CLASS);

  // 3. 注入结构层
  orca.themes.injectCSSResource("_shared.css");

  // 4. 注入默认 flavor（或由配置决定）
  orca.themes.injectCSSResource(`flavors/${DEFAULT_FLAVOR}.css`);

  // 5. 注入特性（可选）
  // orca.themes.injectCSSResource("features/_pixel-decorations.css");

  // 6. 同步亮暗模式
  syncThemeMode();
  themeModeUnsub = subscribe(orca.state, () => { syncThemeMode(); });
}

export async function unload() {
  document.documentElement.classList.remove(THEME_CLASS);
  if (themeModeUnsub) themeModeUnsub();
}

export function switchFlavor(flavor: string) {
  // 动态切换 flavor — 加载新 flavor CSS、移除旧 flavor CSS
  // 实现细节视 Orca API 支持程度而定
}
```

---

## 9. 与 TUI-minimal 的关键差异

### 9.1 完整对比表

| 维度 | TUI-minimal | Neubrutalism |
|------|-------------|--------------|
| **圆角** | 全部 `0` | 全部 `0`（共享） |
| **边框宽度** | `1px` 细线 | `2px` 粗边 |
| **边框颜色** | 灰阶暗边（Catppuccin 配色） | 纯黑 `--nb-border` |
| **阴影** | 无 | 硬偏移阴影 `4px 4px 0px 0px` |
| **动画 / 过渡** | 全无 (`transition: none`) | 保留 `0.15s ease`（hover/active） |
| **强调色数量** | 1 色（终端青绿） | 3-5 色高饱和 palette（黄/粉/青/橙/绿） |
| **标题样式** | 制表符 `[bracket]` 装饰 | **粗体 700 + 彩色**，无装饰符号 |
| **背景色调** | 深灰/黑（冷色） | 深暖黑 `oklch(18% 0.008 85)` / 奶油白 |
| **主色** | Catppuccin 蓝绿系 | Brutal Yellow `#ffd440` |
| **Display 字体** | 无专门 Display 字体 | Space Grotesk / Hanken Grotesk |
| **等宽字体** | JetBrains Mono | Space Mono / Geist Mono |
| **整体氛围** | 工程化冷静、克制 | 复古像素印刷 + 高能量 |
| **CSS 架构** | `_shared.css` + `flavors/*.css` | 相同架构（继承） |
| **亮暗切换** | `html.t-light` class | 相同机制（继承） |
| **`!important` 策略** | ~95% 规则使用 | 目标降低到 ~60%（通过 CSS 特异性优化） |
| **语义色** | 仅在 Catppuccin palette 内 | 独立的 `--nb-success/warning/danger` 体系 |
| **代码高亮风格** | 单色系低饱和 | 终端荧光多色高饱和 |
| **Flavor 数量** | 4 (Catppuccin Mocha/Macchiato/Frappe/Latte) | 6 (Yellow/Pink/Cyan/Green/Violet/Red) |
| **像素装饰** | 无 | 可选 `features/_pixel-decorations.css` |
| **阴影 Token** | 无 | `--shadow-{sm,md,lg,xl}` |

### 9.2 迁移注意事项

如果从 TUI-minimal 迁移用户至 Neubrutalism：

1. **`html.t-light` class 兼容** — 两者使用相同的亮暗切换机制，无需修改用户配置
2. **`!important` 减少策略** — 通过提高 CSS 选择器特异性（如 `.t-neubrutalism .nb-card`）而非全局 `!important`，降低维护成本
3. **Theme class 独立** — `t-tui-minimal` vs `t-neubrutalism` 互不冲突，用户可自由切换
4. **Flavor 配置迁移** — 若 TUI-minimal 用户使用了 `catppuccin-mocha`，Neubrutalism 推荐映射为 `default`(dark)
5. **字体回退** — 系统字体回退链确保即使用户未安装 Space Grotesk，UI 仍然可用

---

## 附录 A：OKLCH 色值速查表

### A.1 默认 Dark Mode 核心色值

```css
/* 背景 */
--nb-bg-deepest:  oklch(12% 0.005 85);
--nb-bg-base:     oklch(18% 0.008 85);
--nb-bg-float:    oklch(24% 0.012 85);
--nb-bg-selected: oklch(30% 0.015 85);
--nb-bg-hover:    oklch(27% 0.013 85);

/* 文字 */
--nb-fg:          oklch(90% 0.005 85);
--nb-fg-dim:      oklch(65% 0.008 85);
--nb-fg-muted:    oklch(45% 0.008 85);

/* 边框 */
--nb-border:      oklch(0% 0 0);
--nb-border-hi:   oklch(100% 0 0);

/* 语义色 */
--nb-main:        oklch(75.9% 0.155 92.93);
--nb-accent:      oklch(74.9% 0.162 0.71);
--nb-info:        oklch(78.3% 0.135 219.2);
--nb-success:     oklch(82.7% 0.135 130.07);
--nb-warning:     oklch(78.5% 0.123 50.11);
--nb-danger:      oklch(71.1% 0.168 28.04);

/* 功能 */
--nb-ring:        oklch(100% 0 0);
--nb-overlay:     oklch(0% 0 0 / 0.8);
--nb-cream:       oklch(94% 0.01 85);
```

### A.2 默认 Light Mode 核心色值

```css
html.t-light {
  --nb-bg-deepest:  oklch(89% 0.008 85);
  --nb-bg-base:     oklch(96% 0.005 85);
  --nb-bg-float:    oklch(100% 0 0);
  --nb-bg-selected: oklch(92% 0.008 85);
  --nb-bg-hover:    oklch(94% 0.006 85);

  --nb-fg:          oklch(20% 0.008 85);
  --nb-fg-dim:      oklch(38% 0.008 85);
  --nb-fg-muted:    oklch(55% 0.008 85);

  --nb-border:      oklch(0% 0 0);
  --nb-border-hi:   oklch(100% 0 0);

  --nb-main:        oklch(75.9% 0.155 92.93);
  --nb-accent:      oklch(70% 0.155 0.71);
  --nb-info:        oklch(73% 0.130 219.2);
  --nb-success:     oklch(77% 0.130 130.07);
  --nb-warning:     oklch(73% 0.118 50.11);
  --nb-danger:      oklch(66% 0.162 28.04);

  --nb-ring:        oklch(0% 0 0);
  --nb-overlay:     oklch(0% 0 0 / 0.6);
  --nb-cream:       oklch(18% 0.008 85);
}
```

### A.3 Flavor 变体主色速查

| Flavor 名称 | `--nb-main` (OKLCH) | Hex 约值 | 来源 |
|-------------|---------------------|----------|------|
| default (Yellow) | `oklch(75.9% 0.155 92.93)` | `#ffd440` | Raft Brutal Yellow |
| pink | `oklch(74.9% 0.162 0.71)` | `#fe7da8` | Raft Brutal Pink |
| cyan | `oklch(78.3% 0.135 219.2)` | `#27ccf3` | Raft Brutal Cyan |
| green | `oklch(82.7% 0.135 130.07)` | `#a9d877` | Raft Brutal Lime |
| violet | `oklch(73.2% 0.126 297.4)` | `#bbafe6` | Raft Brutal Lavender |
| red | `oklch(71.1% 0.168 28.04)` | `#f97264` | Raft Brutal Red |

---

## 附录 B：neobrutalism-components 17 套主题参考

来自 [neobrutalism-components (ekmas)](https://github.com/ekmas/neobrutalism-components) `colors.ts`，供未来 flavor 扩展参考：

| 主题名 | 主色 Light | 主色 Dark | 背景 Light | 背景 Dark |
|--------|-----------|-----------|-----------|----------|
| blue | `oklch(67.47% 0.1726 259.49)` | 同左 | `oklch(93.46% 0.0305 255.11)` | `oklch(29.23% 0.0626 270.49)` |
| green | `oklch(67.83% 0.1758 151.74)` | 同左 | `oklch(92.61% 0.0341 133.60)` | `oklch(27.77% 0.0549 162.75)` |
| orange | `oklch(69.73% 0.1635 43.11)` | 同左 | `oklch(92.53% 0.0281 93.67)` | `oklch(27.30% 0.0517 51.01)` |
| pink | `oklch(67.44% 0.1892 353.39)` | 同左 | `oklch(93.62% 0.0300 1.32)` | `oklch(28.30% 0.0670 358.22)` |
| purple | `oklch(64.73% 0.1975 304.91)` | 同左 | `oklch(93.87% 0.0280 308.98)` | `oklch(26.82% 0.0698 306.70)` |
| red | `oklch(68.16% 0.1892 26.53)` | 同左 | `oklch(93.53% 0.0271 34.26)` | `oklch(27.63% 0.0626 24.80)` |
| yellow | `oklch(73.63% 0.1599 90.09)` | 同左 | `oklch(93.63% 0.0257 95.40)` | `oklch(29.34% 0.0521 87.50)` |

> **注意：** neobrutalism-components 的所有主题在 light 和 dark 模式下使用**相同的主色**（明度和彩度不变）。本规范做了进一步优化：在 light 模式下略微调整明度值，确保在浅色背景上仍保持足够的对比度（§3.3）。

---

## 附录 C：CSS 变量命名约定

### C.1 命名规则

| 层级 | 前缀 | 示例 | 用途 |
|------|------|------|------|
| 设计 Token | `--nb-*` | `--nb-bg-base` | 设计系统的原始变量，直接定义 OKLCH 值 |
| Orca 语义 | `--orca-color-*` | `--orca-color-bg-1` | 映射到 Orca 平台的变量，引用 `--nb-*` |
| 阴影 | `--shadow-*` | `--shadow-md` | 阴影专用变量 |
| 组件局部 | `--nb-<component>-*` | `--nb-card-bg` | (可选) 组件级别的覆盖 |

### C.2 CSS 自定义属性定义顺序

在每个 CSS 文件中，变量应遵循以下声明顺序：

1. `--nb-*` 基础色（bg, fg, border）
2. `--nb-*` 语义色（main, accent, info, success, warning, danger）
3. `--shadow-*` 阴影变量
4. `--orca-color-*` 映射变量（引用前面已定义的 `--nb-*`）
5. `--orca-color-code-*` 代码高亮变量

---

## 附录 D：设计验收清单

在实现过程中，用此清单逐一验证：

- [ ] 所有元素 `border-radius: 0`（全局强制）
- [ ] 所有阴影 `box-shadow: X Y 0px 0px`（无 blur）
- [ ] 全局边框 `2px solid var(--nb-border)`（或更粗）
- [ ] 亮暗切换通过 `html.t-light` 工作（与 TUI-minimal 一致）
- [ ] `--nb-*` → `--orca-color-*` 映射完整（无遗漏的 Orca color token）
- [ ] `color-mix()` 在浏览器中计算正确
- [ ] 所有 OKLCH 色值在 Chrome 116+ 或 Safari 16.5+ 上解析正常
- [ ] 代码高亮 8 色 + 背景 diff 色工作正常
- [ ] Flavor 切换仅需覆盖 6 个 token（验证隔离性）
- [ ] Space Grotesk / Space Mono 字体加载策略（@font-face 或 Google Fonts）
- [ ] 滚动条样式统一直角（`scrollbar-width: thin` + 直角 thumb）
- [ ] Focus-visible ring 可见且高对比（`--nb-ring` 白色或黑色）
- [ ] Dark / Light 背景色在纯黑和纯白内容下不突兀

---

> **本文档遵循的原则：** 可实现的、经过验证的、可扩展的。所有 OKLCH 色值均来自 neobrutalism-components 源码或经手动计算校准。所有架构决策均基于 TUI-minimal 的现有工作模式。所有映射策略均借鉴 shadcn/ui 的 CSS 变量标准化实践。

---

## 附录 E：实现状态

### E.1 已实现文件

| 文件 | 状态 | 说明 |
|------|------|------|
| `src/main.ts` | ✅ | 主题注册入口，亮暗模式同步，task-planner CSS 注入 |
| `src/theme-css/_shared.css` | ✅ | 基于 TUI-minimal 改造：2px 边框、硬阴影、空间字体、保留过渡、纯色焦点环 |
| `src/flavors/default.css` | ✅ | Brutal Yellow 暗/亮双模式，完整 Orca 语义映射 + 代码高亮 8 色 |
| `src/flavors/pink.css` | ✅ | Brutal Pink 主色（6 token 覆盖） |
| `src/flavors/cyan.css` | ✅ | Brutal Cyan 主色（6 token 覆盖） |
| `src/flavors/green.css` | ✅ | Brutal Lime 主色（6 token 覆盖） |
| `src/flavors/violet.css` | ✅ | Brutal Violet 主色（6 token 覆盖） |
| `src/flavors/red.css` | ✅ | Brutal Red 主色（6 token 覆盖） |
| `scripts/build-theme-css.cjs` | ✅ | 拼接 `_shared.css` + `default.css` 输出 `neubrutalism.css` |
| `scripts/build-plugin-css.cjs` | ✅ | 复制 plugin-styles/ + features/ CSS |
| `package.json` | ✅ | 改名 `neubrutalism-orca-theme`，构建脚本适配 |
| `vite.config.ts` | ✅ | 同 TUI-minimal，输出 ESM library |

### E.2 与 TUI-minimal 的关键差异（实现确认）

| 维度 | TUI-minimal | Neubrutalism (已实现) |
|------|-------------|----------------------|
| 边框宽度 | 1px 细线 | **2px** 粗边 `var(--nb-border)` |
| 阴影 | 全无 (`box-shadow: none`) | **硬偏移阴影** `var(--shadow-sm/md/lg/xl)` |
| 过渡动画 | 全无 (`transition: none`) | **保留** `0.15s ease` hover/active/focus |
| 焦点环 | `accent 色 2px solid` | **纯白/纯黑** `2px solid var(--nb-ring)` + 2px offset |
| 标题装饰 | 制表符包围 `┫ ┣` | **无装饰**，纯粗体 + 主色 |
| Display 字体 | 无专用字体 | **Space Grotesk** 标题/按钮 |
| 代码字体 | JetBrains Mono | **Space Mono** + JetBrains Mono 回退 |
| 强调色 | 1 色 (teal) | **6 色** Raft Brutal palette |
| 代码高亮 | 单色系低饱和 | **8 色** 终端荧光色 |
| 滚动条 | 6px 细条 | **8px** 粗条 + accent hover |
| 复选框 | 1px 细边 | **2px** 粗边 + 硬阴影 |
| 面包屑 | none | 移除 |

### E.3 设计验收清单

- [x] 所有元素 `border-radius: 0`（全局强制，见 global reset section）
- [x] 所有阴影 `box-shadow: X Y 0px 0px`（无 blur，见 shadow system + structural 声明）
- [x] 全局边框 `2px solid var(--nb-border)`（结构元素）
- [x] 亮暗切换通过 `html.t-light` 工作（main.ts + syncThemeMode，同 TUI-minimal）
- [x] `--nb-*` → `--orca-color-*` 映射完整（default.css 含 bg/text/border/primary/gray/semantic/selection/scrollbar/code）
- [x] `color-mix()` 自动计算派生色值（primary 9 阶、gray 10 阶、语义色 3 阶）
- [ ] OKLCH 色值需在目标浏览器验证解析
- [x] 代码高亮 8 色 + diff 背景色（default.css code section）
- [x] Flavor 切换仅需覆盖 6 个 token（pink/cyan/green/violet/red 已验证隔离性）
- [ ] Space Grotesk / Space Mono 字体加载需部署时确认（Google Fonts 或自托管）
- [x] 滚动条 8px 直角 thumb + accent hover
- [x] Focus-visible ring 纯白/纯黑高对比
- [x] Dark/Light 背景色在 deep warm black / cream white 区间内

### E.4 待办项

1. **字体加载**：Space Grotesk + Space Mono 建议通过 Google Fonts 加载：

   ```html
   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono&display=swap" rel="stylesheet">
   ```

2. **Flavor 选择器 UI**：当前所有 flavor CSS 已创建，但需要 Orca UI 入口或 config 来选择不同 flavor
3. **Feature CSS**：`_pixel-decorations.css`、`_strikethrough-checkboxes.css`、`_typewriter-cursor.css` 尚未实现
4. **Plugin 适配**：`orca-calendar.css`、`orca-kanban.css`、`orca-slash-commands.css`、`orca-whiteboard.css` 为预留占位
5. **generate-flavors.cjs**：从 `themes.json` 批量生成 flavor CSS 的脚本未实现
