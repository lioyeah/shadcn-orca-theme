# 布局系统：面板、侧边栏、弹层

---

## 1. 面板系统 (Panels)

### 面板层次结构

```
.orca-panels-container (flex, 顶层容器)
  nav#sidebar (左侧固定侧边栏)
  #main (主内容区)

.orca-panels-row (水平排列)
  .orca-view-panel (视图面板)
  .orca-view-panel
```

Orca 的面板系统支持**嵌套的 row/column 布局**（类似 VS Code）：

- **RowPanel** (`direction: "row"`) — 子面板水平排列
- **ColumnPanel** (`direction: "column"`) — 子面板垂直排列
- **ViewPanel** — 叶子面板，实际显示内容（journal 或 block）

### 面板历史

```
.orca-panel-back (后退按钮)
.orca-panel-forward (前进按钮)
```

### 面板分隔条

面板间可拖拽分隔条，CSS 中用 `.orca-panel-drag-handle` 表示。

## 2. 侧边栏 (Sidebar)

```
nav#sidebar
  .orca-sidebar-header
    .orca-repo-switcher-button (仓库/库选择器)
  .orca-aliased-list (页面/别名列表)
    .orca-aliased-filter (搜索框)
    .orca-aliased-list-items (滚动列表)
      .orca-aliased-list-items-sticky
      .orca-aliased-block-item (...)
  .orca-fav-list (收藏列表)
    .orca-fav-item (...)
  .orca-tags-panel (标签面板)
    .orca-tags-tags
      .orca-tags-tag-item (...)
  .orca-sidebar-footer
    .orca-sidebar-create-aliased-btn (新建页面按钮)
```

### 侧边栏交互

| 交互 | CSS |
|------|-----|
| Hover 项目 | `.orca-aliased-block-item:hover` / `.orca-tags-tag-item:hover` |
| 选中项目 | `.orca-aliased-block-item.selected` / `.orca-tags-tag-item.selected` |
| 新建页面按钮 | `.orca-sidebar-create-aliased-btn` |

### 标签过滤

```
.orca-tag-input (标签过滤输入框)
.orca-tags-tag-item:hover (悬停高亮)
.orca-tags-tag-item.selected (选中)
```

## 3. 弹出层系统 (Popup)

弹出层位于 `body` 的直接子级，通过绝对定位或 fixed 定位放置：

### 弹出类型

| 组件 | 容器类 | 用途 |
|------|--------|------|
| 菜单 | `.orca-popup > .orca-menu` | 右键菜单、下拉菜单 |
| 命令面板 | `.orca-command-modal.orca-popup` | Ctrl+P 命令面板 |
| 选择器 | `.orca-select-popup` | 下拉选择 |
| 块弹出 | `.orca-block-popup` | 块操作菜单 |
| 日期选择器 | `.orca-datepicker-menu` | 日期选择弹出 |
| AI 生成 | `.orca-aigeneration-popup` | AI 生成弹出 |
| AI 重写 | `.orca-airewrite-popup` | AI 重写弹出 |
| 引用预览 | `.orca-inline-reference-preview` | 引用预览弹出 |

### 弹出层位置类

弹出层位置通过样式属性控制，CSS 中有：

```css
.orca-popup { position: absolute; pointer-events: auto; }
```

## 4. 模态框 (Modal)

```
.orca-modal
  .orca-modal-overlay (遮罩层)
```

Orca 使用 `.orca-modal-overlay` 作为模态遮罩。

## 5. 工具栏 (Toolbar)

### Headbar（顶部栏）

```
#headbar
  .orca-headbar-top-left
    .orca-headbar-sidebar-tools (侧边栏切换)
  .orca-headbar-top-right
    .orca-headbar-global-tools (全局工具)
    .orca-headbar-user-tools (用户设置)
```

### 编辑器工具栏

```
.orca-toolbar (编辑器工具栏)
.orca-block-editor-sidetools (块侧边浮动栏)
.orca-math-toolbar (数学公式工具栏)
.orca-mermaid-toolbar (Mermaid 工具栏)
.orca-image-toolbar (图片工具栏)
```

## 6. 布局尺寸断点

参见 [08-media-queries.md](./08-media-queries.md) 获取完整响应式断点列表。

关键断点：

| 断点 | 触发条件 |
|------|---------|
| 窄屏 | `max-width: 450px` / `max-width: 460px` |
| 紧凑 | `max-width: 720px` / `max-width: 760px` |
| 平板 | `max-width: 800px` / `max-width: 860px` |
| 宽屏 | `min-width: 861px` |
| 大屏 | `min-width: 1024px` |
| 超大屏 | `min-width: 1921px` |
| 低高度 | `max-height: 500px` / `max-height: 599px` |
| 中高度 | `min-height: 600px and max-height: 900px` |
