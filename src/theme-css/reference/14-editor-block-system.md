# 编辑器与块系统

---

## 1. 编辑器架构

```
.orca-block-editor (编辑器根容器)
  .orca-block-editor-main (主编辑器区域)
    .orca-block-editor-blocks (块列表容器)
      .orca-block (单个块)
      ...
    .orca-block-editor-cover (封面区域, 可选)
    .orca-block-editor-placeholder (空白占位)
      .orca-block-editor-placeholder-text
    .orca-block-editor-backref-view (反向链接视图)
    .orca-block-editor-go-btns (上下导航按钮)
      .orca-block-editor-go-btn
      .orca-block-editor-go-up
      .orca-block-editor-go-down
    .orca-block-editor-drop-overlay (拖拽覆盖层)
      .orca-block-editor-drop-overlay-text
```

## 2. 块 (Block) 结构

```
.orca-block (块容器)
  ├── .orca-block-handle (左侧手柄)
  │     ├── .orca-block-handle-check (选择勾)
  │     ├── .orca-block-handle-time (时间戳)
  │     ├── .orca-block-handle-menu (右键菜单触发)
  │     └── .orca-block-handle-colored (着色)
  ├── .orca-repr-main (主表示区)
  │     ├── .orca-repr-scope-line (范围线)
  │     ├── .orca-repr-{type} (内容渲染器)
  │     │     └── .orca-repr-{type}-content
  │     │           └── span.orca-inline (内联内容)
  │     └── .orca-repr-children (子块容器)
  │           └── .orca-block (递归)
  ├── .orca-block-editor-sidetools (浮动工具栏)
  ├── .orca-block-folding-handle (折叠手柄)
  └── .orca-block-caption (标题/说明)
```

## 3. 块手柄 (Block Handle)

块手柄是 Orca 的标志性 UI 元素：

| 类名 | 用途 |
|------|------|
| `.orca-block-handle` | 手柄容器（悬停时显示） |
| `.orca-block-handle-check` | 多选模式勾选框 |
| `.orca-block-handle-time` | 更新时间戳 |
| `.orca-block-handle-menu` | 右键/点击弹出菜单 |
| `.orca-block-handle-colored` | 根据类型着色 |
| `.orca-block-handle-collapsed` | 子块折叠状态 |
| `.orca-block-handle-empty` | 无子块状态 |

手柄在块悬停时出现，默认隐藏。

## 4. 块拖拽

| 类名 | 用途 |
|------|------|
| `.orca-block-dragging` | 正在拖拽的块 |
| `.orca-drag` | 拖拽元素标记 |
| `.orca-sortable` | 可排序容器 |
| `.orca-block-editor-drop-overlay` | 拖拽释放区 |

## 5. 块折叠

| 类名 | 用途 |
|------|------|
| `.orca-block-folding-handle` | 折叠/展开手柄 |
| `.orca-block-folding-handle-relative` | 相对模式折叠 |
| `.orca-block-handle-collapsed` | 手柄折叠指示 |

## 6. 块选择

| 类名 | 用途 |
|------|------|
| `.orca-block-select-button` | 选择模式按钮 |
| `.orca-block-select-checkbox` | 选择勾选框 |
| `.orca-block-select-menu` | 选择弹出菜单 |
| `.orca-block-select-popup` | 选择弹出面板 |
| `.orca-block-select-popup-input` | 选择弹窗搜索 |

## 7. 块预览

| 类名 | 用途 |
|------|------|
| `.orca-block-preview` | 预览容器 |
| `.orca-block-preview-hint` | 预览提示 |
| `.orca-block-preview-interactive` | 可交互预览 |
| `.orca-block-preview-mover` | 预览移动器 |
| `.orca-block-preview-popup` | 预览弹出层 |
| `.orca-block-preview-resizer-*` | 预览调整大小手柄 (top/right/bottom/left 及角) |

## 8. 块菜单

| 类名 | 用途 |
|------|------|
| `.orca-block-menu-item` | 块菜单项 |
| `.orca-block-popup` | 块操作弹出层 |
| `.orca-block-popup-content` | 弹出内容 |
| `.orca-block-popup-input` | 弹出输入框 |
| `.orca-block-popup-preview` | 弹出预览 |
| `.orca-block-popup-results` | 弹出搜索结果 |
| `.orca-block-popup-with-preview` | 带预览的弹出 |

## 9. 块图 (Block Graph)

| 类名 | 用途 |
|------|------|
| `.orca-block-graph` | 块关系图入口 |
| `.orca-block-graph-container` | 图容器 |
| `.orca-block-graph-depth-control` | 深度控制 |
| `.orca-block-graph-header` | 图头部 |
| `.orca-block-graph-selection-box` | 选择框 |

## 10. 编辑器占位符

```
.orca-block-editor-none-editable (不可编辑状态)
.orca-block-editor-placeholder (空状态占位)
.orca-block-editor-placeholder-text
.orca-repr-main-none-editable
```

## 11. 引用计数标记

```
.orca-block-ref-count-marker (引用计数气泡)
.orca-block-ref-count-marker-overflow (溢出指示)
```

## 12. 面包屑导航

```
.orca-block-breadcrumb
  .orca-block-breadcrumb-segment (每个层级)
    .orca-block-breadcrumb-segment-menu (层级菜单)
```

## 13. 嵌入视图

```
.orca-repr-epub-* (EPUB 嵌入)
.orca-repr-pdf-* (PDF 嵌入)
.orca-repr-whiteboard-content (白板嵌入)
.orca-repr-spreadsheet-content (电子表格嵌入)
```

## 14. 块工具栏 (浮动)

```
.orca-block-editor-sidetools (块侧边浮动工具栏)
.orca-block-editor-sidetools-btn
.orca-math-toolbar (数学公式)
.orca-mermaid-toolbar (Mermaid 图)
.orca-image-toolbar (图片)
.orca-code-copy-btn (代码复制)
```
