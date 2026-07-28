# Orca Note CSS 类名完整目录

> 总计 **1,091** 个 `.orca-*` 类名，按功能区域分类
>
> ⚠️ 核心 CSS 经过 minify，部分类名（如 `.orca-sidebar-item`、`.orca-tab-item`、`.orca-list-item`、
> `.orca-pill`）**不在 minified 核心 CSS 中以独立选择器出现**，由组件 JS 注入或 Neubrutalism 主题 CSS 补充。
> 此处全量列出以保证覆盖全面。

---

## 1. 根级与应用 Shell

```
orca-app-view
orca-app-window
orca-community
orca-container
orca-drag
orca-dropdown
orca-editor
orca-exporting
orca-icon
orca-icon-2
orca-inner
orca-inner-container
orca-input
orca-layer
orca-layers
orca-link
orca-list
orca-list-item
orca-lo
orca-loader
orca-loading
orca-main
orca-maximized
orca-modal
orca-overlay
orca-page
orca-page-item
orca-panels-container
orca-panels-row
orca-pill
orca-popup
orca-preview
orca-progress
orca-selected
orca-selection
orca-shell
orca-slash-commands
orca-skeleton
orca-sortable
orca-spinner
orca-status
orca-tab
orca-tab-item
orca-tab-options
orca-tabs
orca-textarea
orca-textarea-input
orca-tip
orca-title
orca-tooltip
orca-vault-icon
orca-vault-selector
orca-vault-selector-icon
orca-view
orca-view-panel
orca-views
```

## 2. 块编辑器 (Block Editor)

### 编辑器容器
```
orca-block-editor
orca-block-editor-backref-view
orca-block-editor-blocks
orca-block-editor-cover
orca-block-editor-custom-query-remove
orca-block-editor-drop-overlay
orca-block-editor-drop-overlay-text
orca-block-editor-go-btn
orca-block-editor-go-btns
orca-block-editor-go-down
orca-block-editor-go-up
orca-block-editor-main
orca-block-editor-none-editable
orca-block-editor-placeholder
orca-block-editor-placeholder-text
orca-block-editor-query-add-btn
orca-block-editor-query-nosamekind
orca-block-editor-query-tabs
orca-block-editor-query-tabs-container
orca-block-editor-query-views
```

### 块手柄 (Block Handle)
```
orca-block-handle
orca-block-handle-check
orca-block-handle-collapsed
orca-block-handle-colored
orca-block-handle-empty
orca-block-handle-menu
orca-block-handle-time
```

### 块子组件
```
orca-block
orca-block-breadcrumb
orca-block-breadcrumb-segment
orca-block-breadcrumb-segment-menu
orca-block-caption
orca-block-dragging
orca-block-folding-handle
orca-block-folding-handle-relative
orca-block-graph
orca-block-graph-container
orca-block-graph-depth-control
orca-block-graph-header
orca-block-graph-selection-box
orca-block-highlighter
orca-block-menu-item
orca-block-popup
orca-block-popup-content
orca-block-popup-input
orca-block-popup-preview
orca-block-popup-results
orca-block-popup-with-preview
orca-block-postfix
orca-block-preview
orca-block-preview-hint
orca-block-preview-interactive
orca-block-preview-mover
orca-block-preview-popup
orca-block-preview-resizer-bottom
orca-block-preview-resizer-bottom-left
orca-block-preview-resizer-bottom-right
orca-block-preview-resizer-left
orca-block-preview-resizer-right
orca-block-preview-resizer-top
orca-block-preview-resizer-top-left
orca-block-preview-resizer-top-right
orca-block-ref-count-marker
orca-block-ref-count-marker-overflow
orca-block-select-button
orca-block-select-checkbox
orca-block-select-menu
orca-block-select-popup
orca-block-select-popup-input
orca-block-thumbnail
```

### 侧边工具栏 (Side Tools)
```
orca-block-editor-sidetools
orca-block-editor-sidetools-btn
orca-math-toolbar
orca-mermaid-toolbar
orca-image-toolbar
orca-code-copy-btn
```

## 3. 块表示类型 (Block Representation / `_repr`)

### 正文与列表
```
orca-repr-main
orca-repr-main-content
orca-repr-main-none-editable
orca-repr-text-content
orca-repr-title
orca-repr-children
orca-repr-simple-children
orca-repr-self-fold
orca-repr-self-fold-actions
orca-repr-self-fold-btn
orca-repr-self-fold-container
orca-repr-self-fold-delete
orca-repr-scope-line
orca-repr-heading
orca-repr-heading-content
orca-repr-ol
orca-repr-ol-content
orca-repr-ul
orca-repr-ul-content
orca-repr-task
orca-repr-task-0
orca-repr-task-1
orca-repr-task-content
orca-repr-hr-content
orca-repr-quote-content
```

### 引用块 (Quote/Callout)
```
orca-repr-quote2
orca-repr-quote2-content
orca-repr-quote2-error
orca-repr-quote2-icon
orca-repr-quote2-important
orca-repr-quote2-info
orca-repr-quote2-isroot
orca-repr-quote2-note
orca-repr-quote2-quote
orca-repr-quote2-single
orca-repr-quote2-tip
orca-repr-quote2-type-selector
orca-repr-quote2-warning
```

### 表格与更多
```
orca-repr-table
orca-repr-table2
orca-repr-spreadsheet-content
orca-repr-tag-hierarchy
orca-repr-tag-hierarchy-text
orca-repr-tag-props
orca-repr-tag-props-collapsed
orca-repr-tag-props-group
orca-repr-tag-props-title
orca-repr-tag-value-ref
orca-repr-tag-values
orca-repr-tag-values-full
```

### 引用与别名
```
orca-repr-alias-edit
orca-repr-alias-icon
orca-repr-as-alias
orca-repr-bgraph
orca-repr-tag-value-ref
```

### Journal
```
orca-repr-journal
orca-repr-journal-btn
orca-repr-journal-calendar
orca-repr-journal-date
orca-repr-journal-emptyroot
orca-repr-journal-left
orca-repr-journal-right
orca-repr-journal-today
```

### Embedded (EPUB/PDF)
```
orca-repr-epub-container
orca-repr-epub-content
orca-repr-epub-link-view
orca-repr-epub-sfold
orca-repr-pdf-container
orca-repr-pdf-content
orca-repr-pdf-link-view
orca-repr-pdf-sfold
orca-repr-whiteboard-content
```

### 内联格式
```
orca-inline
orca-inline-l-emoji
orca-inline-l-favicon
orca-inline-l-icon
orca-inline-l-text
orca-inline-link-edit
orca-inline-link-edit-input
orca-inline-link-edit-label
orca-inline-link-edit-ok
orca-inline-mt-icon
orca-inline-r-content
orca-inline-r-task
orca-inline-r-task-checked
orca-inline-reference
orca-inline-reference-preview
orca-inline-reference-results
orca-inline-reference-with-preview
```

## 4. 菜单与弹出层

```
orca-menu
orca-menu-hide-if-search
orca-menu-item
orca-menu-item-dangerous
orca-menu-item-pre
orca-menu-separator
orca-menu-text
orca-menu-text-centered
orca-menu-text-disabled
orca-menu-text-emoji
orca-menu-text-icon
orca-menu-text-kbd
orca-menu-text-post
orca-menu-text-pre
orca-menu-text-subtitle
orca-menu-text-text
orca-menu-text-title
orca-menu-title
orca-menu-title-info
orca-key-selected
```

### 命令面板
```
orca-command-modal
orca-command-modal-command-header
orca-command-modal-command-item
orca-command-modal-command-list
orca-command-modal-footer
orca-command-modal-footer-item
orca-command-modal-filter-input
```

## 5. 工具栏

### Headbar
```
orca-headbar-global-tools
orca-headbar-sidebar-tools
orca-headbar-user-tools
orca-headbar-top-left
orca-headbar-top-right
```

### 通用工具栏
```
orca-toolbar
orca-toolbar-group
orca-toolbar-button
orca-toolbar-input
orca-toolbar-search
orca-no-editable-btn
```

### 编辑器浮动工具栏
```
orca-block-editor-sidetools
orca-block-editor-sidetools-btn
orca-math-toolbar
orca-mermaid-toolbar
orca-image-toolbar
```

## 6. 按钮

```
orca-button
orca-button-danger
orca-button-icon
orca-button-icon-2
orca-button-inner
orca-button-plain
orca-button-text
```

## 7. 输入控件

### Input
```
orca-input
orca-input-actualinput
orca-input-input
orca-input-pre
orca-input-post
```

### Select
```
orca-select-button
orca-select-button-selector
orca-select-button-text
orca-select-item
orca-select-item-check
orca-select-menu
orca-select-popup
```

### Checkbox
```
orca-checkbox-box
orca-checkbox-inner
orca-select-item-check
```

### Switch
```
orca-switch
orca-switch-on
orca-switch-toggle
```

### 其他输入
```
orca-composition-input
orca-textarea
orca-textarea-input
```

## 8. 标签与标记

```
orca-tag
orca-tag-icon
orca-tag-input
orca-tag-props
orca-tag-props-editor
orca-tag-props-editor-add-prop
orca-tag-props-editor-prop
orca-tag-props-editor-prop-inner
orca-tag-props-editor-prop-type
orca-tag-props-editor-prop-value
orca-tag-tag-editor
orca-tags-tag-item
orca-tags-tag-icon
orca-tags-tag-name
orca-tags-tags
orca-pill
```

## 9. 侧边栏

### 通用项目
```
orca-sidebar-content
orca-sidebar-create-aliased-btn
orca-sidebar-footer
orca-sidebar-header
orca-sidebar-item
orca-sidebar-tab
orca-sidebar-tab-options
```

### 别名/页面列表
```
orca-aliased-block
orca-aliased-block-backcount
orca-aliased-block-fold
orca-aliased-block-icon
orca-aliased-block-icon-cube
orca-aliased-block-icon-emoji
orca-aliased-block-item
orca-aliased-block-menu
orca-aliased-block-name
orca-aliased-filter
orca-aliased-icon
orca-aliased-list
orca-aliased-list-items
orca-aliased-list-items-sticky
orca-aliased-sync
orca-aliased-item
```

### 收藏
```
orca-fav-item
orca-fav-item-icon
orca-fav-item-item
orca-fav-item-name
orca-fav-list
```

## 10. 查询编辑器

```
orca-query-block
orca-query-condition
orca-query-condition-group
orca-query-condition-header
orca-query-condition-header-action
orca-query-condition-header-and
orca-query-condition-header-or
orca-query-condition-header-text
orca-query-condition-item
orca-query-condition-item-body
orca-query-condition-item-header
orca-query-condition-item-kind
orca-query-condition-item-remove
orca-query-condition-journal-date
orca-query-condition-journal-grid
orca-query-condition-journal-number
orca-query-condition-journal-row
orca-query-condition-ref-container
orca-query-condition-tag-header
orca-query-condition-tag-name
orca-query-condition-tag-properties
orca-query-condition-task
orca-query-condition-text
orca-query-condition-text-container
orca-query-conditions
orca-query-conditions-body
orca-query-conditions-cap
orca-query-conditions-header
orca-query-conditions-header-arrow
orca-query-conditions-header-non-editable
orca-query-conditions-reset
orca-query-editor
orca-query-list
orca-query-list-block
orca-query-list-item
orca-query-list-sort
orca-query-result-list
orca-query-result-list-header
orca-query-result-list-item
orca-query-result-list-toolbar
orca-query-result-list-toolbar-tag
orca-query-results
orca-query-tab
orca-query-tabs
```

## 11. 设置面板

```
orca-settings
orca-settings-actions
orca-settings-item
orca-settings-keybinding
orca-settings-shortcuts-header
orca-settings-shortcut
```

## 12. 日历与日期选择器

```
orca-calendar
orca-calendar-day
orca-calendar-header
orca-calendar-left-btn
orca-calendar-right-btn
orca-date-picker
orca-date-picker-header
orca-date-picker-left-btn
orca-date-picker-right-btn
orca-datepicker-menu
orca-time-picker
```

## 13. 搜索

```
orca-search-input
orca-search-result-item
orca-search-results
orca-global-search
```

## 14. AI 聊天

```
orca-aichat
orca-aichat-chatbox
orca-aichat-chatbox-button
orca-aichat-chatbox-button-label
orca-aichat-chatbox-input
orca-aichat-collapsible
orca-aichat-collapsible-delete-btn
orca-aichat-collapsible-header
orca-aichat-composer
orca-aichat-container
orca-aichat-context-bar
orca-aichat-context-chip
orca-aichat-context-chip-label
orca-aichat-context-chip-remove
orca-aichat-context-chips
orca-aichat-debug-badge
orca-aichat-draft-images
orca-aichat-drop-active
orca-aichat-drop-overlay
orca-aichat-image-card
orca-aichat-image-input
orca-aichat-image-remove
orca-aichat-image-strip
orca-aichat-image-thumb
orca-aichat-maximize-btn
orca-aichat-maximized-actions
orca-aichat-maximized-header
orca-aichat-maximized-title
orca-aichat-message-assistant
orca-aichat-message-assistant-table
orca-aichat-message-btn
orca-aichat-message-content
orca-aichat-message-reasoning
orca-aichat-message-reasoning-streaming
orca-aichat-message-tool
orca-aichat-message-tool-content
orca-aichat-message-tool-content-block
orca-aichat-message-toolbar
orca-aichat-message-user
orca-aichat-message-user-content
orca-aichat-message-user-context
orca-aichat-message-user-images
orca-aichat-messages
orca-aichat-prompt-item
orca-aichat-reasoning-block
orca-aichat-reasoning-header
orca-aichat-reasoning-toggle
orca-aichat-ref
orca-aichat-responding
orca-aichat-searching-toggle
orca-aichat-tool-process
orca-aichat-tool-process-streaming
orca-aichat-tool-step
orca-aichat-tool-step-args
orca-aichat-tool-step-header
orca-aichat-tool-step-name
orca-aichat-tool-step-result
```

### AI 生成 & 重写
```
orca-aigeneration-form
orca-aigeneration-input
orca-aigeneration-input-row
orca-aigeneration-popup
orca-aigeneration-status
orca-aigeneration-status-item
orca-aigeneration-status-item-active
orca-aimenu-info
orca-airectags-tags
orca-airectags-tags-empty
orca-airectags-toolbar
orca-airectags-toolbar-btn
orca-airewrite-popup
orca-airewrite-toolbar
orca-airewrite-toolbar-btn
```

## 15. 插件市场

```
orca-plugin-market-card
orca-plugin-market-card-actions
orca-plugin-market-card-author
orca-plugin-market-card-desc
orca-plugin-market-card-footer
orca-plugin-market-card-icon
orca-plugin-market-card-id
orca-plugin-market-card-title
orca-plugin-marketplace
```

## 16. 目录 (TOC)

```
orca-toc
orca-toc-item
orca-toc-item-child-items
orca-toc-item-content
orca-toc-item-fold-arrow
orca-toc-item-label
orca-toc-items
orca-toc-resizer
```

## 17. 别名/标签编辑

```
orca-alias-editor
orca-alias-editor-title
orca-alias-format-between
orca-alias-format-color-button
orca-alias-format-color-menu
orca-alias-format-grid
orca-alias-format-label
orca-alias-format-select
orca-alias-format-space-between
orca-alias-hierarchy
orca-alias-hierarchy-alias
orca-alias-hierarchy-input
orca-alias-hierarchy-list
orca-alias-hierarchy-menu
orca-alias-hierarchy-minus
orca-alias-template
orca-alias-template-select
orca-aliased
```

## 18. 仓库/库选择器

```
orca-repo-switcher-button
orca-repo-switcher-icon
orca-repo-panel
orca-repo-item
```

## 19. 通知

```
orca-notification
orca-notifications
orca-notification-message
orca-notification-title
```

## 20. 分隔线

```
orca-separator
orca-divider
```

## 21. 块引用计数

```
orca-block-ref-count-marker
orca-block-ref-count-marker-overflow
```

## 22. 统计 & 关于

```
orca-stats
orca-stats-content
orca-stats-header
orca-about-activation-input
orca-about-deactivate
orca-about-deactivate-btn
orca-about-dialog
orca-about-license-info
orca-about-licensing
orca-about-list
orca-about-logo
orca-about-modal
orca-about-purchase
orca-about-subtitle
orca-about-subtitle-link
orca-about-title
orca-about-trial
```

## 23. 图 (Graph/Block Graph)

```
orca-bgraph
orca-bgraph-container
orca-bgraph-controls
orca-bgraph-graph
orca-bgraph-header
orca-bgraph-panel
orca-bgraph-toolbar
orca-bgraph-wrapper
orca-block-graph
orca-block-graph-container
orca-block-graph-depth-control
orca-block-graph-header
orca-block-graph-selection-box
```

## 24. LaTeX / KaTeX

```
orca-katex
orca-katex-block
```
