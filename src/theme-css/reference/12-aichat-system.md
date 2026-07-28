# AI 聊天组件

---

## 1. 容器

```
.orca-aichat-container (AI 聊天根容器)
```

## 2. 消息区域

```
.orca-aichat-messages (消息列表)
```

### 用户消息
```
.orca-aichat-message-user
  .orca-aichat-message-user-context (上下文指示)
  .orca-aichat-message-user-content (文本内容, 含内联)
  .orca-aichat-message-user-images (附带图片)
    .orca-aichat-image-strip
      .orca-aichat-image-card
        .orca-aichat-image-thumb (缩略图)
        .orca-aichat-image-remove (删除按钮)
```

### 助手消息
```
.orca-aichat-message-assistant
  .orca-aichat-message-content (助手回复内容)
    span.orca-inline
  .orca-aichat-message-assistant-table (表格回复)
  .orca-aichat-message-reasoning (推理过程)
    .orca-aichat-reasoning-block
    .orca-aichat-reasoning-header
    .orca-aichat-reasoning-toggle
  .orca-aichat-message-reasoning-streaming (流式推理)
  .orca-aichat-message-tool (工具调用)
    .orca-aichat-tool-process (工具进行中)
    .orca-aichat-tool-process-streaming (工具流式)
    .orca-aichat-tool-step (工具步骤)
      .orca-aichat-tool-step-header
      .orca-aichat-tool-step-name
      .orca-aichat-tool-step-args (参数)
      .orca-aichat-tool-step-result (结果)
  .orca-aichat-message-btn (消息操作按钮)
  .orca-aichat-message-toolbar (消息工具栏)
```

## 3. 输入区域

```
.orca-aichat-composer (输入组合区域)
  .orca-aichat-context-bar (上下文栏)
    .orca-aichat-context-chips (上下文片段)
      .orca-aichat-context-chip (单个片段)
        .orca-aichat-context-chip-label
        .orca-aichat-context-chip-remove
  .orca-aichat-draft-images (草稿图片区)
    .orca-aichat-image-input (图片上传)
  .orca-aichat-chatbox (输入框容器)
    .orca-aichat-chatbox-input (文本输入)
    .orca-aichat-chatbox-button (发送/操作按钮)
      .orca-aichat-chatbox-button-label
```

## 4. 最大化模式

```
.orca-aichat-maximized-header (最大化头部)
  .orca-aichat-maximized-title
  .orca-aichat-maximized-actions
.orca-aichat-maximize-btn (最大化切换按钮)
```

## 5. 折叠面板

```
.orca-aichat-collapsible (可折叠容器)
  .orca-aichat-collapsible-header (折叠头部)
  .orca-aichat-collapsible-delete-btn (删除)
```

## 6. 搜索模式

```
.orca-aichat-searching-toggle (联网搜索切换)
.orca-aichat-debug-badge (调试标识)
.orca-aichat-drop-active (拖拽活跃)
.orca-aichat-drop-overlay (拖拽覆盖层)
```

## 7. AI 生成重写

### AI 生成
```
.orca-aigeneration-popup (AI 生成弹出)
  .orca-aigeneration-form (表单)
    .orca-aigeneration-input-row (输入行)
    .orca-aigeneration-input
  .orca-aigeneration-status (生成状态)
    .orca-aigeneration-status-item (状态项)
    .orca-aigeneration-status-item-active (活跃项)
```

### AI 重写
```
.orca-airewrite-popup (AI 重写弹出)
.orca-airewrite-toolbar (重写工具栏)
  .orca-airewrite-toolbar-btn (转换按钮)
```

### AI 推荐标签
```
.orca-airectags-toolbar (AI 推荐标签工具栏)
  .orca-airectags-toolbar-btn
.orca-airectags-tags (推荐标签列表)
  .orca-airectags-tags-empty (空状态)
```

### AI 菜单信息
```
.orca-aimenu-info (AI 菜单信息)
```

## 8. 关键交互

| 状态类 | 用途 |
|--------|------|
| `.orca-aichat-responding` | AI 正在回复 |
| `.orca-aichat-reasoning-streaming` | 推理过程流式输出 |
| `.orca-aichat-tool-process-streaming` | 工具调用流式 |
| `.orca-aichat-drop-active` | 拖拽活跃 |
| `.orca-aichat-maximized` | 最大化状态 |
