# shadcn/ui 组件映射

主题实现对照官方源码，避免猜测 class 组合。

## 来源

| 类型 | URL |
|------|-----|
| Theming | https://ui.shadcn.com/docs/theming |
| Neutral tokens | `apps/v4/registry/themes.ts` → `name: "neutral"` |
| 组件 | `apps/v4/registry/new-york-v4/ui/*.tsx` |

## Orca 选择器 → shadcn 组件

| Orca 类 / 区域 | shadcn 组件 | 皮肤要点 |
|----------------|-------------|----------|
| `.orca-button` | `button.tsx` | primary / secondary / outline / ghost / destructive |
| `.orca-input` (plain) | `input.tsx` | `border-input`, `shadow-xs`；focus 保持 `--input` 边框 |
| `.orca-textarea`, `.orca-textarea-input` | `input.tsx` | 同 plain input |
| `.orca-input:has(.orca-input-pre, .ti-search, …)` | `input-group.tsx` | 外壳 `border-input shadow-xs`；focus 不提亮边框 |
| `.orca-command-modal-filter-input`, `.orca-search-modal > .orca-input` | `input-group.tsx` (embedded) | 嵌入深色 chrome：仅 `border-b`；focus 保持底边 `--border` |
| `.orca-find-replace-input` | `input-group.tsx` | inline-end 按钮 = `InputGroupButton` icon-xs |
| `.orca-settings section.views .orca-select-button` | `select.tsx` (SelectTrigger) | 仅设置表单：`border-input shadow-xs`；focus `border-ring` only |
| `.orca-settings .orca-select-menu-filter` | `combobox.tsx` | 仅设置页可搜索下拉：popover 内 input-group |
| `.orca-menu-text-kbd`, `.orca-menu-title-kbd`, `.orca-settings-keybinding` | `kbd.tsx` | `bg-muted text-muted-foreground rounded-sm h-5 px-1 text-xs font-medium`; group = `KbdGroup` gap |
| `.orca-tooltip-shortcut` | `kbd.tsx` (in tooltip) | inverted pill: `bg-background/20 text-background` |
| `.orca-menu`, `.orca-dropdown`, `.orca-select-menu` | `dropdown-menu.tsx`, `popover.tsx` | `bg-popover`, `shadow-md`, `rounded-md` |
| `.orca-menu-item`, `.orca-menu-text` | `DropdownMenuItem` | hover/focus `bg-accent` |
| `.orca-command-modal` | `dialog.tsx` + `command.tsx` | shell=`secondary-background`, list=`background`, footer muted |
| `.orca-search-modal` | `dialog` + 自定义分栏 | 左列表 sidebar 色，右 preview = editor |
| `.orca-find-replace` | `popover` 式浮层 | `card`/`secondary` 壳，无双边框 |
| `.orca-editor-toolbar`, `.orca-editor-toolbar-bar`, `.orca-editor-toolbar-list` | `context-menu.tsx` | popover 壳 + `shadow-md`；按钮项 hover=`accent`；下拉列表=SubContent |
| `nav#sidebar`, `.orca-aliased-block-item` | `sidebar.tsx` | `--sidebar`, hover `--sidebar-accent` |
| `.orca-switch` | `switch.tsx` | off=`input` track, on=`primary`, thumb=`background` |
| `.orca-tooltip` | `tooltip.tsx` | `bg-foreground text-background` |
| `.orca-settings section.views .desc` | typography muted | `text-muted-foreground text-xs` |
| `.orca-modal`, `.orca-settings` | `dialog.tsx` | `shadow-lg`, `rounded-lg` |
| `.orca-tag`, `.orca-pill` | `badge.tsx` | outline + muted fill |
| `input[type="checkbox"]`, `.orca-checkbox-box` | `checkbox.tsx` | checked=`primary` |
| `.orca-query-conditions` | `accordion.tsx` (Card + Borders) | shell=`card`+`shadow-sm`; header=AccordionTrigger (`py-4`, `font-medium`); body=AccordionContent (`pb-4`) |
| `.orca-block-graph-header`, `.orca-block-graph-depth-control` | `accordion.tsx` + `slider.tsx` | 查询栏与 query editor 同 card 壳；Depth/Size 滑块 = muted track + primary fill + ring thumb |
| `.orca-repr-tag-props` | `collapsible.tsx` + `separator.tsx` | 正文标签属性：无背景/边框的 `Collapsible`；标题下方使用平直 `Separator`，属性行是 content |
| `.orca-query-tabs`, `.orca-tab-item.orca-selected` | `tabs.tsx` | active=`background` + `shadow-sm` |
| `.orca-stats-*` cards | `card.tsx` | `--card`, `shadow-sm` |
| `html body #main`, `#main.orca-panels-container` | `sidebar.tsx` `SidebarInset` | `border` + `rounded-xl` + `shadow-sm`；右侧/底边 `0.5rem` inset；`#app.sidebar-closed` 时左侧同样 `0.5rem` |
| `#main`, `.orca-block-editor` (preview) | `typeset` / Typography | `--typeset-*` 节奏 + `foreground`/`muted-foreground` 灰阶正文 |
| `.orca-breadcrumb`, `.orca-scrolling-breadcrumb` | `breadcrumb.tsx` | list=`text-muted-foreground`; ancestor segments=`BreadcrumbLink` hover→foreground; current segment=`BreadcrumbPage` — scrolling trail uses flat `.orca-scrolling-breadcrumb-segment:last-of-type`; block trail uses last `.orca-breadcrumb-item` |
| `.orca-repr-self-fold-container`, `.orca-aichat-collapsible` | `card.tsx` | 查询列表 AI 对话等 self-fold 容器：`rounded-md` + `border` + `shadow-sm` |
| `.orca-query-list-block-block .orca-aichat-container` (expanded) | `card.tsx` | 展开后的 messages 面板：外层 card 圆角；messages 区 `--background`，composer 底栏无二次边框 |
| `.orca-calendar`, `.orca-date-picker` | `calendar.tsx` | today=`accent`；selected=`primary`；weekday=`muted-foreground`；nav=ghost |
| `.orca-aichat-container` | `message-scroller.tsx` (Root) | `flex min-h-0 flex-col overflow-hidden`；composer 固定在底部 |
| `.orca-aichat-messages` | `MessageScrollerViewport` + `MessageScrollerContent` | `overflow-y-auto overscroll-contain scrollbar-thin scrollbar-gutter-stable scroll-fade-b`；`gap-8` 轮次间距 |
| `.orca-aichat-message-user`, `.orca-aichat-message-assistant` | `MessageScrollerItem` | `min-w-0 shrink-0` |
| `.orca-aichat-container.orca-maximized` | 全屏 transcript 布局 | 居中 `max-w-[900px]`；header 底部分割线 |
| `.orca-aichat-message-user`, `.orca-aichat-message-user-content` | `message.tsx` + `bubble.tsx` (default) | `align=end`；user bubble=`primary`/`primary-foreground`，`max-w-[80%]`，`rounded-xl px-3 py-2` |
| `.orca-aichat-message-assistant`, `.orca-aichat-message-content` | `message.tsx` + `bubble.tsx` (ghost) | `align=start`；助手正文透明底、无 card 边框 |
| `.orca-aichat-reasoning-toggle`, `.orca-aichat-tool-process`, `.orca-aichat-searching-toggle` | `marker.tsx` | `text-sm text-muted-foreground` 行内状态 |
| `.orca-aichat-message-reasoning-streaming .orca-aichat-reasoning-toggle` 等 | `marker.tsx` + `shimmer` | 推理/工具流式时文字 shimmer 动效 |
| `.orca-aichat-composer` | `input-group` + `card` | card 壳 + 内嵌 secondary 输入区 |

## CSS 文件职责

| 文件 | 职责 |
|------|------|
| `src/flavors/default.css` | Token + Orca `--orca-color-*` 映射 |
| `src/theme-css/shadcn-primitives.css` | 可复用 shadcn 模式（ring、popover surface 等） |
| `src/theme-css/manifest.cjs` | 显式 source layer 顺序，最终仍生成单一 `shadcn.css` |
| `src/theme-css/base/` | 全局 reset、surface、布局和 shell 规则 |
| `src/theme-css/components/` | 按组件职责拆分的 Orca 选择器映射 |
| `src/theme-css/context-overrides.css` | 搜索、引用、预览等上下文规则 |
| `src/theme-css/native-precedence.css` | 需要击败 Orca 原生加载顺序的高特异性补丁 |

## 不应再出现的 Neo 模式

- `4px 4px 0` 硬阴影
- 2px 纯黑边框作为默认 chrome
- 大面积 `--main` 蓝色块 + 强制黑字
- 在已有 popup 边框内再给 input 加第二圈 focus 框（双边框）
