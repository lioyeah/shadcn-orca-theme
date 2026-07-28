# Data 属性选择器全集

> 提取自 `index-IXWiDYyA.css`，共 **51** 个 data 属性选择器（真实提取，含所有变体）

---

## 块类型标识

以下 `[data-type=*]` 选择器用于标识块表示类型：

| 选择器 | 用途 |
|--------|------|
| `[data-type=r]` | 内联引用（引用其他块） |
| `[data-type=l]` | 内联链接 |
| `[data-type=mt]` | 数学公式 |
| `[data-type=mirror]` | 镜像块 |
| `[data-type=heading]` | 标题块 |
| `[data-type=hr]` | 分割线块 |
| `[data-type=journal]` | 日记块 |
| `[data-type=ol]` | 有序列表块 |
| `[data-type=ul]` | 无序列表块 |
| `[data-type=task]` | 任务块 |
| `[data-type=quote2]` | Callout 块 |

## 状态属性

| 选择器 | 用途 |
|--------|------|
| `[data-state=open]` | 折叠面板展开 |
| `[data-state=closed]` | 折叠面板收起 |
| `[data-state=active]` | 激活状态 |
| `[data-state=inactive]` | 未激活状态 |

## 编辑模式

| 选择器 | 用途 |
|--------|------|
| `[data-editable=false]` | 不可编辑区域 |
| `[data-disabled]` | 禁用状态 |

## 缩进层级

| 选择器 | 用途 |
|--------|------|
| `[data-indent="0"]` | 无缩进 |
| `[data-indent="1"]` | 缩进 1 级 |
| `[data-level="-1"]` ~ `[data-level="4"]` | 块嵌套层级（-1 到 4） |

## 定位

| 选择器 | 用途 |
|--------|------|
| `[data-side=top]` | 弹出/定位在下方（上方空间不足时翻转） |
| `[data-side=bottom]` | 弹出/定位在上方 |
| `[data-side=left]` | 弹出在右侧 |
| `[data-side=right]` | 弹出在左侧 |
| `[data-orientation=horizontal]` | 水平方向 |
| `[data-orientation=vertical]` | 垂直方向 |

## Excalidraw / 白板

| 选择器 | 用途 |
|--------|------|
| `[data-resizing=true]` | 正在调整大小 |
| `[data-resizing]` | 调整大小中 |
| `[data-editor-rotation="0"]` ~ `[data-editor-rotation="270"]` | 编辑器旋转角度 |
| `[data-main-rotation="0"]` ~ `[data-main-rotation="270"]` | 主视图旋转角度 |
| `[data-icon]` | 图标元素 |
| `[data-description]` | 描述元素 |
| `[data-title]` | 标题元素 |

## Univer (电子表格)

| 选择器 | 用途 |
|--------|------|
| `[data-u-command]` | Univer 命令元素 |
| `[data-u-comp=form-layout]` | 表单布局 |
| `[data-u-comp=input]` | 输入组件 |
| `[data-u-comp=select]` | 选择组件 |
| `[data-u-comp=pager-left-arrow]` | 分页左箭头 |
| `[data-u-comp=pager-right-arrow]` | 分页右箭头 |

## 第三方库

| 选择器 | 用途 |
|--------|------|
| `[data-sonner-toast]` | Sonner toast 通知库 |

## 关键说明

1. 所有 data 属性来自 **minified CSS 直接提取**（不带引号格式）
2. 块类型标识 `[data-type=*]` 用于区分 `span.orca-inline` 的渲染类型
3. CSS 中 `.orca-inline[data-type=r]` 是最常用的引用选择器
4. 主题开发时也可使用带引号版本（如 `[data-state="open"]`），两种格式等效
