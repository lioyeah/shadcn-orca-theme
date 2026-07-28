# Orca Note CSS 自定义属性（设计令牌）

> 总计 **558** 个 CSS 自定义属性，提取自 `index-IXWiDYyA.css`

---

## 1. 颜色系统 — `--orca-color-*`

### 主色与语义色

| 变量名 | 用途 |
|--------|------|
| `--orca-color-primary-1` ~ `--orca-color-primary-9` | 主色阶 (蓝色系) |
| `--orca-color-dangerous-1` ~ `--orca-color-dangerous-9` | 危险色阶 (红色系) |
| `--orca-color-gray-1` ~ `--orca-color-gray-9` | 灰色阶 |
| `--orca-color-warning-1` ~ `--orca-color-warning-9` | 警告色阶 |
| `--orca-color-success-1` ~ `--orca-color-success-9` | 成功色阶 |
| `--orca-color-info-1` ~ `--orca-color-info-9` | 信息色阶 |

注意：Orca 的动态主题机制会覆盖 `--orca-color-primary-5` 等核心色。

### 功能色

| 变量名 | 值 | 用途 |
|--------|----|------|
| `--orca-color-text-1` | `var(--orca-color-gray-1)` | 主文字色 |
| `--orca-color-text-2` | `var(--orca-color-gray-4)` | 次要文字色 |
| `--orca-color-bg-1` | `white !important` | 表面背景 (菜单/弹出) |
| `--orca-color-bg-2` | `var(--orca-color-gray-8)` | 次要背景 (暗色) |
| `--orca-color-bg-3` | `var(--orca-color-gray-7)` | 第三背景 |
| `--orca-color-border` | `var(--orca-color-gray-6)` | 边框色 |
| `--orca-color-black` | `hsl(0 0% 5%)` | 近似黑色 |
| `--orca-color-menu-highlight` | 动态 | 菜单项 hover 高亮色 |
| `--orca-color-separator` | 动态 | 分隔线色 |
| `--orca-color-scope-line` | 动态 | 范围线色 |
| `--orca-color-placeholder` | 动态 | 占位符色 |
| `--orca-color-bg-selection` | `hsl(from var(--orca-color-primary-5) h s l / 15%)` | 选中背景 |
| `--orca-color-link` | 动态 | 链接色 |
| `--orca-color-link-visited` | 动态 | 已访问链接色 |

### 背景语义色

| 变量名 | 值 |
|--------|----|
| `--orca-color-bg-blue` | `#2b6285` |
| `--orca-color-bg-green` | `#3f6e34` |
| `--orca-color-bg-red` | `#7d4e4e` |
| `--orca-color-bg-yellow` | `#827c58` |

## 2. 间距 — `--orca-spacing-*`

| 变量名 | 用途 |
|--------|------|
| `--orca-spacing-xs` | 极小间距 |
| `--orca-spacing-sm` | 小间距 (菜单 padding) |
| `--orca-spacing-md` | 中间距 |
| `--orca-spacing-lg` | 大间距 |
| `--orca-spacing-xl` | 极大间距 |

## 3. 圆角 — `--orca-radius-*`

| 变量名 | 用途 |
|--------|------|
| `--orca-radius-sm` | 小圆角 (输入框) |
| `--orca-radius-md` | 中圆角 (菜单/卡片) |
| `--orca-radius-lg` | 大圆角 |

## 4. 阴影 — `--orca-shadow-*`

| 变量名 | 用途 |
|--------|------|
| `--orca-shadow-menu` | 菜单阴影 |
| `--orca-shadow-card` | 卡片阴影 |
| `--orca-shadow-modal` | 模态框阴影 |
| `--orca-shadow-popup` | 弹出层阴影 |

## 5. 字重 — `--orca-fontweight-*`

| 变量名 | 用途 |
|--------|------|
| `--orca-fontweight-sm` | 小字重 |
| `--orca-fontweight-md` | 中字重 |
| `--orca-fontweight-lg` | 大字重 (标题) |

## 6. 编辑器相关

| 变量名 | 用途 |
|--------|------|
| `--orca-block-indent` | 块缩进 (`calc(...)`) |
| `--orca-lf-initial-level` | 初始缩进级别 |
| `--orca-block-handle-passive-color` | 手柄默认色 |
| `--editor-container-padding` | 编辑器容器 padding (`1rem`) |
| `--orca-aichat-border-angle` | AI 聊天边框动画角度 |

## 7. 边框样式

| 变量名 | 值 |
|--------|----|
| `--orca-border-bold` | `2px solid var(--orca-color-primary-5)` |
| `--orca-border-box` | `1px solid var(--orca-color-primary-5)` |
| `--orca-border-checkbox` | `1px solid var(--orca-color-gray-4)` |
| `--orca-border-general` | `none` |
| `--orca-border-scope` | `1px solid var(--orca-color-scope-line)` |
| `--orca-border-separator` | `1px solid var(--orca-color-separator)` |

## 8. Emoji 选择器变量 — `--epr-*`

| 变量名 | 用途 |
|--------|------|
| `--epr-bg-color` | 背景色 (`transparent`) |
| `--epr-emoji-size` | Emoji 尺寸 (`22px`) |
| `--epr-emoji-hover-color` | Hover 高亮色 |
| `--epr-text-color` | 文字色 |
| `--epr-search-input-bg-color` | 搜索输入背景 |
| `--epr-search-input-text-color` | 搜索输入文字色 |
| `--epr-search-input-placeholder-color` | 搜索占位符色 |
| `--epr-search-input-border-radius` | 搜索输入圆角 |
| `--epr-search-input-height` | 搜索输入高度 (`34px`) |
| `--epr-picker-border-color` | 选择器边框 |
| `--epr-header-padding` | 头部 padding |
| `--epr-category-navigation-button-size` | 分类导航按钮尺寸 |
| `--epr-category-padding` | 分类 padding |
| `--epr-category-label-bg-color` | 分类标签背景 |
| `--epr-category-icon-active-color` | 分类图标激活色 |
| `--epr-search-border-color` | 搜索边框色 |
| `--epr-search-border-color-active` | 搜索边框激活色 |
| `--epr-search-icon-color` | 搜索图标色 |

## 9. Excalidraw 变量 — `--Exc*`

| 变量名 | 用途 |
|--------|------|
| `--ExcTextField--background` | 输入字段背景 |
| `--ExcTextField--border` | 输入字段边框 |
| `--ExcTextField--border-active` | 激活边框 |
| `--ExcTextField--border-hover` | Hover 边框 |
| `--ExcTextField--color` | 输入字段文字色 |
| `--ExcTextField--label-color` | 标签色 |

## 10. 代码高亮变量

为 Pr.js 和 CodeMirror 定义的变量（在 `.t-dark` 和 `.t-light` 主题中动态设置）。

## 11. 暗色模式变量

暗色模式通过 `prefers-color-scheme:dark` 媒体查询覆盖核心变量。

## 关键设计要点

1. **主题覆盖机制**: Orca 的核心变量（`--orca-color-primary-5` 等）在主题启用时被覆盖。主题 CSS 通过 `:root` 或 `.t-light` / `.t-dark` 类设置新值。

2. **动态主题**: `orca.state.themeMode` 控制 `.t-light` / `.t-dark` 类，类切换驱动变量值改变。

3. **颜色算法**: 部分颜色使用 `color-mix(in oklab, ...)` 进行动态混合，确保与主色协调。

4. **`!important` 策略**: `--orca-color-bg-1` 定义中使用了 `!important`，表明颜色覆盖优先级高。
