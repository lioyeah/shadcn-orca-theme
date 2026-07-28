# 块类型系统（`_repr` 机制）

> Orca Note 的块渲染基于 `_repr.type` 字段，每个类型对应特定的 CSS 类和渲染组件。

---

## 核心块类型与 CSS 类映射

| `_repr.type` | 类前缀 | 描述 |
|-------------|--------|------|
| `text` | `.orca-repr-text-content` | 普通文本 |
| `heading` | `.orca-repr-heading` / `.orca-repr-heading-content` | 标题（h1-h4） |
| `ul` | `.orca-repr-ul` / `.orca-repr-ul-content` | 无序列表 |
| `ol` | `.orca-repr-ol` / `.orca-repr-ol-content` | 有序列表 |
| `task` | `.orca-repr-task` / `.orca-repr-task-0/1` | 任务列表 |
| `quote` | `.orca-repr-quote-content` | 引用 |
| `quote2` | `.orca-repr-quote2` | Callout/警示框 |
| `code` | `.orca-repr-code` (推断) | 代码块 |
| `table` | `.orca-repr-table` / `.orca-repr-table2` | 表格 |
| `hr` | `.orca-repr-hr-content` | 分割线 |
| `journal` | `.orca-repr-journal` | 日记视图 |
| `alias` | `.orca-repr-as-alias` | 别名引用 |
| `bgraph` | `.orca-repr-bgraph` | 块关系图 |
| `spreadsheet` | `.orca-repr-spreadsheet-content` | 电子表格 |
| `whiteboard` | `.orca-repr-whiteboard-content` | 白板 |
| `epub` | `.orca-repr-epub-*` | EPUB 嵌入 |
| `pdf` | `.orca-repr-pdf-*` | PDF 嵌入 |
| `title` | `.orca-repr-title` | 标题页 |
| `tag-hierarchy` | `.orca-repr-tag-hierarchy` | 标签层次 |
| `tag-props` | `.orca-repr-tag-props` | 标签属性 |
| `tag-values` | `.orca-repr-tag-values` | 标签值 |

## Callout 子类型 (quote2)

`quote2` 通过 `_repr.type_` 字段区分具体类型：

| Callout 类型 | CSS 类补充 |
|-------------|-----------|
| `note` | `.orca-repr-quote2-note` |
| `info` | `.orca-repr-quote2-info` |
| `tip` | `.orca-repr-quote2-tip` |
| `warning` | `.orca-repr-quote2-warning` |
| `important` | `.orca-repr-quote2-important` |
| `error` | `.orca-repr-quote2-error` |
| `quote` | `.orca-repr-quote2-quote` |
| `single` | `.orca-repr-quote2-single` |

## 块结构层次

```
.orca-block (每个块的根容器)
  .orca-block-handle (左侧拖拽手柄)
  .orca-repr-main (块表示主容器)
    .orca-repr-{type} (类型特定的渲染容器)
      .orca-repr-{type}-content (内容)
    .orca-repr-children (子块容器, 递归渲染)
```

## 内联格式类型

内联格式通过 ContentFragment 的 `t`（type）和 `f`（format）字段控制：

| `t` / `f` 值 | CSS 类 | 描述 |
|-------------|--------|------|
| `t: "t"` | `.orca-inline` (基础) | 纯文本 |
| `f: "b"` | `.orca-inline.b` | 加粗 |
| `f: "i"` | `.orca-inline.i` | 斜体 |
| `f: "bc"` | `.orca-inline.bc` | 高亮 (背景色) |
| `f: "c"` | `.orca-inline.c` | 行内代码 |
| `f: "s"` | (划除) | 删除线 |
| `f: "u"` | (下划线) | 下划线 |
| `t: "r"` | `.orca-inline[data-type="r"]` | 块引用 |
| `t: "mt"` | `.orca-inline-mt-icon` | 数学公式内联 |
| `t: "l"` | `.orca-inline-l-*` | 链接 |

## 块标识相关类

| 类名 | 用途 |
|------|------|
| `.orca-block-preview` | 悬停/引用预览 |
| `.orca-block-popup` | 块弹出菜单 |
| `.orca-block-select-button` | 块选择按钮 |
| `.orca-block-select-checkbox` | 块多选勾选框 |
| `.orca-block-ref-count-marker` | 引用计数标记 |
| `.orca-block-breadcrumb` | 面包屑导航 |
| `.orca-block-caption` | 块标题/说明 |
| `.orca-block-graph` | 块关系图入口 |
| `.orca-block-highlighter` | 高亮标记 |

## 编辑模式渲染

| 渲染模式 | 行为 |
|---------|------|
| `normal` | 完整渲染 |
| `relative` | 相对模式 |
| `simple` | 简化渲染（如引用预览） |
| `simple-children` | 简化但显示子块 |
| `readonly` | 只读模式，隐藏编辑控件 |
