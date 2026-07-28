# DOM 层次结构与组件嵌套关系

> 基于 CSS 选择器和类名推断的完整 DOM 结构

---

## 1. 顶层结构

```
body (或 #orca-shell)
  #app / #orca-app
    #headbar (HEADER 元素)
      .orca-headbar-top-left
        .orca-headbar-sidebar-tools
          .orca-button.plain[aria-label="侧边栏"]
      .orca-headbar-top-right
        .orca-headbar-global-tools
          .orca-button.plain (各种全局按钮)
        .orca-headbar-user-tools
          .orca-button.plain (用户相关按钮)
    
    .orca-panels-container
      #sidebar (nav 元素, 侧边栏)
        .orca-sidebar-header
          .orca-repo-switcher-button (仓库选择器)
            .orca-select-button-text
            .orca-select-button-selector
          .orca-vault-selector-icon
        .orca-aliased-list (页面/别名列表)
          .orca-aliased-list-items
            .orca-aliased-list-items-sticky
          .orca-aliased-filter (搜索过滤)
          .orca-aliased-block-item (每项)
            .orca-aliased-block-icon
            .orca-aliased-block-name
            .orca-aliased-block-backcount (反链计数)
            .orca-aliased-block-fold
        .orca-tags-panel
          .orca-tags-tags
            .orca-tags-tag-item
              .orca-tags-tag-icon
              .orca-tags-tag-name
        .orca-sidebar-footer
          .orca-sidebar-create-aliased-btn (新建页面按钮)
      
      #main (主编辑器区域)
        .orca-toolbar (编辑器工具栏)
          .orca-toolbar-group
          .orca-toolbar-button
        .orca-block-editor
          .orca-block-editor-main
            .orca-block (块容器)
              ...

  .orca-popup (弹出层, 在 body 下)
    .orca-menu
    ...
```

## 2. 块结构

```
.orca-block (每个块)
  .orca-block-handle (左侧手柄, 35-40px 宽)
    .orca-block-handle-check (选中状态)
    .orca-block-handle-time (时间戳)
    .orca-block-handle-menu (右键菜单)
  .orca-repr-main (块内容容器)
    .orca-repr-scope-line (范围线, 可选)
    .orca-repr-{type} (类型特定渲染器)
      .orca-repr-{type}-content (内容区域)
        span.orca-inline (内联内容)
        span.orca-inline.b (加粗)
        span.orca-inline.i (斜体)
        span.orca-inline.c (行内代码)
        span.orca-inline.bc (高亮)
        span.orca-inline[data-type="r"] (块引用)
    .orca-repr-children (子块容器, 递归)
      .orca-block (子块)
        ...
  .orca-block-editor-sidetools (浮动侧边工具栏)
    .orca-block-editor-sidetools-btn
```

## 3. 查询编辑器

```
.orca-query-editor
  .orca-query-tabs (选项卡)
    .orca-tab-item (每个选项卡)
  .orca-query-conditions (条件区域)
    .orca-query-conditions-header
      .orca-query-conditions-header-arrow (折叠箭头)
      .orca-select-button (条件类型选择)
      .orca-query-conditions-reset (重置按钮)
    .orca-query-conditions-body
      .orca-query-condition-group
        .orca-query-condition-header
          .orca-query-condition-header-and/or (AND/OR 切换)
          .orca-query-condition-header-action (添加条件)
          .orca-query-condition-header-text
        .orca-query-condition-item
          .orca-query-condition-item-header
            .orca-query-condition-item-kind (类型选择)
            .orca-query-condition-item-remove (删除)
          .orca-query-condition-item-body
            // 条件内容因类型而异:
            .orca-query-condition-tag-header
            .orca-query-condition-tag-name
            .orca-query-condition-tag-properties
            .orca-query-condition-text-container
            .orca-query-condition-ref-container
            .orca-query-condition-journal-grid
            .orca-query-condition-task
  .orca-query-results (结果区域)
    .orca-query-result-list-toolbar (结果工具栏)
    .orca-query-result-list (结果列表)
      .orca-query-result-list-item (每项)
```

## 4. 命令面板

```
.orca-command-modal.orca-popup.orca-menu
  .orca-input.orca-command-modal-filter-input (搜索栏)
    .orca-input-input
      i.ti-search.orca-input-pre (搜索图标)
      input.orca-input-actualinput
  .orca-command-modal-command-list (命令列表)
    .orca-menu-title.orca-command-modal-command-header (分组标题)
    .orca-menu-text.orca-command-modal-command-item (命令项)
  .orca-command-modal-footer (底部)
    .orca-command-modal-footer-item
```

## 5. 设置面板

```
.orca-settings
  .sections (左侧导航)
    .title
    .item.selected / .plugin-item
  section.views (右侧内容)
    .option / .item-horizontal / .item-vertical
    .desc
    h2, h3
    .orca-settings-shortcuts-header
    .orca-settings-keybinding
    .orca-input
    .orca-select
    .orca-switch
```

## 6. 菜单结构

```
.orca-popup (定位容器)
  .orca-menu
    .orca-menu-title (分组标题)
      .orca-menu-title-info
    .orca-menu-separator (分隔线)
    .orca-menu-text (菜单项)
      .orca-menu-text-pre (前缀图标)
      .orca-menu-text-icon (图标)
      .orca-menu-text-emoji (Emoji)
      .orca-menu-text-text (文本内容)
        .orca-menu-text-title (标题)
        .orca-menu-text-subtitle (副标题)
      .orca-menu-text-kbd (快捷键)
      .orca-menu-text-post (后缀)
    .orca-menu-text.orca-menu-text-centered (居中)
    .orca-menu-text.orca-menu-text-disabled (禁用)
```

## 7. 弹出菜单（块手柄菜单）

```
.orca-block-popup (弹出层)
  .orca-block-popup-content
    .orca-block-popup-input (搜索/输入)
    .orca-block-popup-results (搜索结果)
    .orca-block-popup-preview (预览区域)
    .orca-block-popup-with-preview (带预览项)
```

## 8. AI 聊天

```
.orca-aichat-container
  .orca-aichat-messages (消息列表)
    .orca-aichat-message-user
      .orca-aichat-message-user-context
      .orca-aichat-message-user-content
        span.orca-inline
      .orca-aichat-message-user-images
    .orca-aichat-message-assistant
      .orca-aichat-message-content
        span.orca-inline
      .orca-aichat-message-reasoning
      .orca-aichat-message-tool
        .orca-aichat-tool-process
        .orca-aichat-tool-step
      .orca-aichat-message-toolbar
  .orca-aichat-composer (输入区域)
    .orca-aichat-context-bar
    .orca-aichat-chatbox
      .orca-aichat-chatbox-input
      .orca-aichat-chatbox-button
```

## 9. 侧边工具栏 (浮动)

```
.orca-block-editor-sidetools (浮动在块编辑区)
.orca-math-toolbar (数学公式工具栏)
.orca-mermaid-toolbar (Mermaid 工具栏)
.orca-image-toolbar (图片工具栏)
```
