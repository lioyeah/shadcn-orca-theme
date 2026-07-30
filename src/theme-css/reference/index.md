# Orca Note 原生视觉参考体系

> 提取自 `orca_note.appimage` v1.87.1 的 `app.asar` → `out/renderer/assets/index-IXWiDYyA.css` (779 KB)
> 共 **11,000** CSS 规则，**1,091** 个 `.orca-*` 类名，**558** CSS 自定义属性，**96** 媒体查询，**32** 动画

---

## 参考文档索引

| 文件 | 内容 |
|------|------|
| [01-class-catalog.md](./01-class-catalog.md) | 完整的 `.orca-*` 类名分类目录 |
| [02-component-hierarchy.md](./02-component-hierarchy.md) | DOM 层次结构与组件嵌套关系 |
| [03-css-variables.md](./03-css-variables.md) | 全部 CSS 自定义属性（设计令牌） |
| [04-block-repr-types.md](./04-block-repr-types.md) | 块类型系统（`_repr` 机制） |
| [05-layout-system.md](./05-layout-system.md) | 布局系统：面板、侧边栏、弹层 |
| [06-interactive-states.md](./06-interactive-states.md) | 交互状态：hover/focus/active/selected |
| [07-data-attributes.md](./07-data-attributes.md) | Data 属性选择器全集 |
| [08-media-queries.md](./08-media-queries.md) | 响应式断点与媒体查询 |
| [09-animations.md](./09-animations.md) | 动画与过渡效果 |
| [10-tag-property-system.md](./10-tag-property-system.md) | 标签与属性系统 |
| [11-query-system.md](./11-query-system.md) | 查询编辑器组件 |
| [12-aichat-system.md](./12-aichat-system.md) | AI 聊天组件 |
| [13-calendar-datepicker.md](./13-calendar-datepicker.md) | 日历与日期选择器 |
| [14-editor-block-system.md](./14-editor-block-system.md) | 编辑器与块系统 |
| [15-shadcn-mapping.md](./15-shadcn-mapping.md) | shadcn/ui 组件与 Orca 类名映射 |

## 统计概览

- CSS 规则块数: **11,000**
- 唯一选择器数: **10,819**
- `.orca-*` 类名数: **1,091**
- CSS 自定义属性数: **558**
- `@media` 查询数: **96** (其中 70+ 为 `prefers-color-scheme:dark`)
- `@keyframes` 数: **32**
- `@font-face` 声明: **1** (KaTeX)
- ID 选择器数: **35**

## 选择器分类统计

| 类别 | 数量 |
|------|------|
| `.orca-*` 类选择器 | 1,676 个选择器片段 |
| Data 属性选择器 | 51 个 |
| `:root` 变量 | 42 个 |
| ID 选择器 | 35 个 |
| HTML 元素选择器 | 约 30 个 |
| 伪元素 | 7 个 |
| 通用选择器 `*` | 3 个 |

## 核心架构

### DOM 顶层结构

```
body
  #app (或 #orca-app)
    #headbar (HEADER 元素)
      .orca-headbar-sidebar-tools
      .orca-headbar-global-tools
      .orca-headbar-user-tools
    .orca-panels-container
      nav#sidebar
        .orca-sidebar-header (仓库选择器)
        .orca-vault-selector
        .orca-aliased-list (页面列表)
        .orca-tags-panel (标签面板)
        .orca-sidebar-footer
      #main (主编辑器区域)
        .orca-block-editor
          .orca-block-editor-main
            (块内容)
    (面板区域 =.orca-panels-container 的子级)

  .orca-popup (body 直接子级, 弹出层)
    .orca-menu
    .orca-slash-commands
    .orca-command-modal
    .orca-datepicker-menu
    etc.
```

### CSS 变量前缀

| 前缀 | 用途 | 数量 |
|------|------|------|
| `--orca-color-*` | 颜色系统（含 9 阶主色/危险色/灰色/警告/成功/信息） | ~50 |
| `--orca-radius-*` | 圆角 | ~3 (sm/md/lg) |
| `--orca-spacing-*` | 间距 | ~5 (xs/sm/md/lg/xl) |
| `--orca-shadow-*` | 阴影 | ~4 (menu/card/modal/popup) |
| `--orca-fontweight-*` | 字重 | ~2 (sm/lg) |
| `--epr-*` | Emoji 选择器 | ~15 |
| `--ExcTextField-*` | 输入字段 | ~5 |
