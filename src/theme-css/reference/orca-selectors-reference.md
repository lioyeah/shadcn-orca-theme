# Orca Core CSS — Selectors Reference

提取自 `orca` 渲染器核心 CSS（`index-IXWiDYyA.css`），整理关键组件选择器及其结构，辅助主题开发。

---

## 1. 弹出菜单 / Popups & Menus

### `.orca-popup`

```
position: absolute; pointer-events: auto
```

基础弹出容器。

### `.orca-menu`

```
position: relative;
padding: var(--orca-spacing-sm);
background-color: var(--orca-color-bg-1);
border-radius: var(--orca-radius-md);
box-shadow: var(--orca-shadow-menu);
min-width: 180px;
width: max-content;
```

#### 子元素

| 选择器 | 用途 |
|--------|------|
| `.orca-menu .orca-key-selected` | 键盘选中的项 |
| `.orca-menu-text` | 菜单文本项 (flex, align-start) |
| `.orca-menu-text-icon` | 菜单项图标 (flex 0 0 auto) |
| `.orca-menu-text-pre` | 图标前缀 |
| `.orca-menu-text-post` | 后缀 |
| `.orca-menu-text-text` | 文本内容 (flex 1 1 auto) |
| `.orca-menu-text-title` | 标题文本 |
| `.orca-menu-text-subtitle` | 副标题 |
| `.orca-menu-text-kbd` | 快捷键提示 |
| `.orca-menu-text-centered` | 居中文本 |
| `.orca-menu-text-disabled` | 禁用状态 |
| `.orca-menu-text-emoji` | Emoji 图标 |
| `.orca-menu-title` | 菜单标题 |
| `.orca-menu-separator` | 分隔线 |

#### 交互状态

```css
.orca-menu-text:not(.orca-menu-text-disabled):hover {
    background-color: var(--orca-color-menu-highlight);
}
.orca-select-item:hover {
    background-color: var(--orca-color-menu-highlight);
}
```

---

## 2. 命令面板 / Command Modal

### `.orca-command-modal`

```
display: flex; flex-direction: column; padding: 0;
width: min(65vw, 800px); max-width: unset;
height: 80vh; overflow: clip
```

注意：命令面板同时有 `orca-menu` 类，继承`.orca-menu`的背景色。

#### 子结构

```
.orca-command-modal
  .orca-input.orca-command-modal-filter-input     ← 搜索栏容器
    .orca-input-input                              ← 输入框包装
      i.ti.ti-search.orca-input-pre                ← 搜索图标
      input.orca-input-actualinput                 ← 实际输入
  .orca-command-modal-command-list                 ← 命令列表
    .orca-menu-title.orca-command-modal-command-header  ← 分组标题
    .orca-menu-text.orca-command-modal-command-item     ← 命令项
  .orca-command-modal-footer                       ← 底部栏
    .or-ca-command-modal-footer-item
```

#### 关键样式

```css
.orca-command-modal-filter-input > .orca-input-input {
    height: 44px; border-radius: 0;
    padding: var(--orca-spacing-sm) var(--orca-spacing-lg);
}
.orca-command-modal-command-list {
    flex: 1; overflow-y: auto;
}
.orca-command-modal-command-header {
    background-color: var(--orca-color-gray-1);
    /* dark: var(--orca-color-gray-8) */
    font-weight: var(--orca-fontweight-lg);
    position: sticky; top: 0; z-index: 1;
}
.orca-command-modal-command-item {
    padding: var(--orca-spacing-md) var(--orca-spacing-lg);
}
```

---

## 3. 工具栏 / Toolbar

### Headbar

```css
#headbar { /* Orca 顶部工具栏 */ }
.orca-headbar-sidebar-tools    /* 侧边栏切换按钮 */
.orca-headbar-global-tools     /* 全局工具按钮 */
.orca-headbar-user-tools       /* 用户按钮 */
```

### `.orca-toolbar`

通用工具栏容器。

---

## 4. 按钮 / Button

```css
.orca-button                    /* 基础按钮 */
.orca-button.solid.primary      /* 实心主色 (蓝色) */
.orca-button.solid:not(.primary) /* 实心中性 */
.orca-button.outline            /* 轮廓按钮 */
.orca-button.plain              /* 纯文字按钮 */
.orca-button.soft               /* 柔和背景 */
.orca-button.dangerous          /* 危险按钮 (红色) */
.orca-button:disabled           /* 禁用 */
```

#### 交互

```css
.orca-button.solid.primary:hover {
    transform: translate(var(--box-shadow-x), var(--box-shadow-y));
    box-shadow: none;
}
```

---

## 5. 输入框 / Input

```css
.orca-input                 /* 输入框容器 */
.orca-input-input           /* 输入框内部包装 */
.orca-input-actualinput     /* 实际 <input> 元素 */
.orca-input-pre             /* 输入框前缀图标 */
```

#### 子结构

```
.orca-input
  span.orca-input-input
    i.ti.ti-search.orca-input-pre  (可选前缀图标)
    input.orca-input-actualinput   (实际输入)
    i.ti.ti-xxx                     (可选后缀图标)
```

---

## 6. 日历 / Calendar

### `.orca-calendar`（侧边栏日历）

```
background: var(--main); border: 2px solid #000;
border-radius: var(--border-radius); box-shadow: var(--shadow);
```

#### 子结构

```
.orca-calendar
  header                          ← 头部含年/月选择/导航
    .choosen-year                 ← 年份（点击切换）
    .choosen-month                ← 月份（点击切换）
    .go-now                       ← "本月" 按钮
    .orca-calendar-left-btn       ← 左导航
    .orca-calendar-right-btn      ← 右导航
  .days                           ← 天数网格 (grid)
    .weekday                      ← 周几标题
    .week                         ← 周数
    .day                          ← 日期格子
      .journal-dot                ← 日记标记圆点
```

### `.orca-date-picker`（弹出日历选择器）

```
border: 2px solid var(--border); border-radius: var(--border-radius);
background: var(--main); box-shadow: none;
```

---

## 7. 输入控件 / Form Controls

### Checkbox

```css
.orca-checkbox-box               /* 复选框容器 (span) */
input[type="checkbox"]           /* 原生复选框 */
.orca-select-item-check          /* 菜单选中勾 */
```

### Switch

```css
.orca-switch                     /* 开关容器 */
.orca-switch[data-state="on"],
.orca-switch.on                  /* 开启状态 */
.orca-switch-toggle              /* 开关滑块 */
```

---

## 8. 设置面板 / Settings

```css
.orca-settings > .sections       /* 左侧栏 */
.orca-settings > section.views   /* 右侧内容 */
.orca-settings-shortcuts-header  /* 快捷键标题 */
.orca-command-modal-command-header /* 命令标题 */
```

---

## 9. 选择控件 / Select

```css
.orca-select-button              /* 选择按钮 */
.orca-select-button-text         /* 选择按钮文字 */
.orca-select-button-selector     /* 选择按钮箭头 */
.orca-select-item                /* 选择菜单项 */
.orca-select-menu                /* 选择菜单容器 */
```

---

## 10. 查询栏 / Query

```css
.orca-query-editor               /* 查询编辑器容器 */
.orca-query-conditions           /* 查询条件区域 */
.orca-query-conditions-header    /* 查询条件标题栏 */
.orca-query-conditions-reset     /* 重置按钮 */
.orca-query-results              /* 查询结果区域 */
.orca-query-result-list-toolbar  /* 结果列表工具栏 */
```

---

## 11. 其他 / Misc

### `.orca-tag` / `.orca-tags-tag-item`

标签/标记组件。

### `.orca-block-editor-sidetools`

块编辑器右侧工具栏。

### `.orca-block-handle`

块手柄（左侧拖拽/引用指示器）。

### `.orca-block-ref-count-marker`

块引用计数标记。

### `.orca-repo-switcher-button`

仓库/库选择器按钮。

### `.orca-plugin-marketplace` / `.orca-plugin-market-card`

插件市场容器 / 插件卡片。

---

## 12. CSS 变量体系

### Orca 核心变量

| 变量 | 用途 |
|------|------|
| `--orca-color-primary-5` | 主色 (blue) |
| `--orca-color-text-1` | 主文字色 |
| `--orca-color-text-2` | 次要文字色 |
| `--orca-color-bg-1` | 表面背景 (菜单/弹出) |
| `--orca-color-bg-2` | 次要背景 |
| `--orca-color-border` | 边框色 |
| `--orca-color-menu-highlight` | 菜单项 hover 高亮色 |
| `--orca-color-gray-1` | 灰色 1 |
| `--orca-color-gray-8` | 灰色 8 (暗模式) |

### 我们的主题覆盖

见 `default.css` 中的 `--orca-color-*` 映射。

---

## 13. 交互状态优先级

CSS 优先级（从低到高）：

1. CSS 规则（非 !important）
2. 内联样式（非 !important）
3. CSS 规则（!important）
4. 内联样式（!important）
5. CSS 动画 / 过渡

Orca 通过 JavaScript 设置的内联 `background-color` 属于第 2 层。我们的 `!important` 规则属于第 3 层。要覆盖内联 `!important`（第 4 层），需要使用 CSS 动画（第 5 层）。

---

## 14. DOM 结构速查

```
body
  #app                                     ← Orca 应用根
    #headbar (HEADER)                      ← 顶部工具栏
      .orca-headbar-sidebar-tools
      .orca-headbar-global-tools
      .orca-headbar-user-tools
    .orca-panels-container
      nav#sidebar                           ← 侧边栏
      #main                                 ← 主内容区
        .orca-block-editor                  ← 块编辑器

  .orca-popup                               ← 弹出层(在 body 下)
    .orca-menu                              ← 菜单
    .orca-command-modal                     ← 命令面板(不在 #app 内!)
```
