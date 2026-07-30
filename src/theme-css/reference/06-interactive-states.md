# 交互状态：hover / focus / active / selected

> Orca 中主要的状态类和数据属性约定。
>
> ⚠️ 核心 CSS 经过 minify，`.orca-sidebar-item`、`.orca-list-item` 等在 minified CSS
> 中不作为独立选择器出现，但 shadcn 主题 CSS 及运行时 JS 会使用它们。

## 1. 通用状态

| 状态 | 适用元素 | 行为 |
|------|---------|------|
| `:hover` | 大部分交互元素 | 基础悬停效果 |
| `.selected` | 列表项、标签项等 | 当前选中项 |
| `.active` | 各种 | 激活状态 |
| `.disabled` | 按钮、菜单项 | 禁用状态 |
| `:focus-visible` | 大部分可聚焦元素 | 键盘焦点指示 |
| `:focus-within` | 容器 | 内部元素获得焦点 |
| `:active` | 按钮等 | 按下状态 |

## 2. 菜单项状态

### `.orca-menu-text`

| 选择器 | 行为 |
|--------|------|
| `.orca-menu-text:hover` | 悬停高亮 |
| `.orca-menu-text.disabled` | 禁用（50% 不透明度） |
| `.orca-menu-text.selected` | 选中 |
| `.orca-menu-text.centered` | 居中文本变体 |

### `.orca-key-selected`

专门用于键盘导航选中的高亮：
```
.orca-key-selected { background-color: var(--orca-color-menu-highlight); }
```

### 菜单选中项

```
.orca-menu .orca-key-selected    /* 键盘导航选中的菜单项 */
.orca-select-item:hover          /* 选择菜单悬停 */
```

## 3. 按钮状态

| 状态 | 选择器 |
|------|--------|
| 默认 hover | `.orca-button:hover` |
| 实心主色 hover | `.orca-button.solid.primary:hover` |
| 禁用 | `.orca-button:disabled` |

## 4. 侧边栏列表项状态

| 选择器 | 状态 | 验证 |
|--------|------|------|
| `.orca-aliased-block-item:hover` | 悬停 | ✅ 核心 CSS 确认 |
| `.orca-aliased-block-item.selected` | 选中 | ✅ 核心 CSS 确认 |
| `.orca-tags-tag-item:hover` | 悬停 | ✅ 核心 CSS 确认 |
| `.orca-tags-tag-item.selected` | 选中 | ✅ 核心 CSS 确认 |
| `.orca-fav-item-item:hover` | 悬停 | ✅ 核心 CSS 确认 |
| `.orca-fav-item-item.selected` | 选中 | ✅ 核心 CSS 确认 |
| `.orca-search-result-item:hover` | 悬停 | ✅ 核心 CSS 确认 |
| `.orca-search-result-item.selected` | 选中 | ✅ 核心 CSS 确认 |

> `.orca-sidebar-item` 和 `.orca-list-item` 不在 minified 核心 CSS 中，
> 但 shadcn 主题 CSS 定义了它们（见 `_shared.css`）。

## 5. 开关 (Switch) 状态

| 选择器 | 状态 | 验证 |
|--------|------|------|
| `.orca-switch.on` | 开启（类） | ✅ 核心 CSS 确认 |
| `.orca-switch-toggle` | 滑块 | ✅ 核心 CSS 确认 |

> `[data-state="on"]` 不在 minified 核心 CSS 中直接出现，
> 但由 Switch 组件运行时设置，shadcn 主题 CSS 中使用。

## 6. 复选框 (Checkbox) 状态

| 选择器 | 状态 | 验证 |
|--------|------|------|
| `.orca-checkbox-box` | 容器 | ✅ 核心 CSS 确认 |
| `input[type="checkbox"]:checked` | 原生选中 | ✅ 核心 CSS 确认 |

> `[data-state="checked"]` 不在 minified 核心 CSS 中直接出现，
> 但由 Checkbox 组件运行时设置，shadcn 主题 CSS 中使用。

## 7. 选项卡 (Tab) 状态

| 选择器 | 状态 |
|--------|------|
| `.orca-tab-item.orca-selected` | 选中 |
| `.orca-segmented-item.orca-selected` | 分段选中 |
| `.orca-tab.orca-selected` | 选中 |

## 8. 输入框状态

| 选择器 | 状态 |
|--------|------|
| `.orca-input:focus-within` | 容器获得焦点 |
| `.orca-input-input:focus` | 输入框聚焦 |
| `input:disabled` | 禁用 |
| `textarea:disabled` | 禁用 |

## 9. 数据属性驱动的状态

| 选择器 | 用途 | 验证 |
|--------|------|------|
| `[data-type=r]` | 块引用（内联） | ✅ 核心 CSS 确认 |
| `[data-type=l]` | 链接（内联） | ✅ 核心 CSS 确认 |
| `[data-editable=false]` | 不可编辑 | ✅ 核心 CSS 确认 |
| `[data-disabled]` | 禁用 | ✅ 核心 CSS 确认 |
| `[data-indent]` | 缩进级别 | ✅ 核心 CSS 确认 |
| `[data-level]` | 块层级 | ✅ 核心 CSS 确认 |

## 10. 拖拽状态

| 选择器 | 用途 |
|--------|------|
| `.orca-block-dragging` | 块正在拖拽 |
| `.orca-aichat-drop-active` | AI 聊天拖拽激活 |
| `.orca-drag` | 通用拖拽 |
| `.orca-sortable` | 可排序 |

## 11. 颜色状态

- `.orca-block-handle-colored` — 手柄着色
- `.orca-active` — 活跃状态
- `.orca-active-parent` — 祖辈活跃

## 12. 加载/空状态

| 选择器 | 用途 |
|--------|------|
| `.orca-aichat-responding` | AI 回复中 |
| `.orca-aichat-reasoning-streaming` | AI 推理中 |
| `.orca-aichat-tool-process-streaming` | 工具调用中 |
| `.orca-loading` | 加载状态 | ✅ 核心 CSS 确认 |
| `.orca-spinner` | 旋转加载 | ✅ 核心 CSS 确认 |
| `.orca-skeleton` | 骨架屏占位 | ✅ 核心 CSS 确认 |
