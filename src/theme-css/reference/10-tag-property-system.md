# 标签与属性系统

---

## 1. 标签 (Tags)

### 标签显示

| 类名 | 用途 |
|------|------|
| `.orca-tag` | 标签项（内联显示） |
| `.orca-tag-icon` | 标签图标 |
| `.orca-tag-input` | 标签输入框 |
| `.orca-tags-tags` | 标签列表容器 |
| `.orca-tags-tag-item` | 标签列表项 |
| `.orca-tags-tag-icon` | 标签项图标 |
| `.orca-tags-tag-name` | 标签名称 |
| `.orca-pill` | 药丸式标签变体 |

### 标签交互状态

| 选择器 | 状态 |
|--------|------|
| `.orca-tags-tag-item:hover` | 悬停高亮 |
| `.orca-tags-tag-item.selected` | 选中 |
| `.orca-tag:hover` | 悬停 |

## 2. 别名 (Aliases) / 页面

### 别名列表（侧边栏）

```
.orca-aliased-list (别名列表根)
  .orca-aliased-list-items (可滚动列表)
    .orca-aliased-list-items-sticky (粘性头部)
    .orca-aliased-block-item (每个页面项)
      .orca-aliased-block-icon (页面图标)
      .orca-aliased-block-name (页面名称)
      .orca-aliased-block-backcount (反链计数)
      .orca-aliased-block-fold (折叠)
      .orca-aliased-block-menu (右键菜单)
```

### 别名编辑

```
.orca-alias-editor (别名编辑弹出)
  .orca-alias-editor-title (标题)
  .orca-alias-hierarchy (层级设置)
    .orca-alias-hierarchy-alias
    .orca-alias-hierarchy-input
    .orca-alias-hierarchy-list
    .orca-alias-hierarchy-menu
    .orca-alias-hierarchy-minus
  .orca-alias-template (模板选择)
    .orca-alias-template-select
  .orca-alias-format-* (格式设置)
    .orca-alias-format-between
    .orca-alias-format-color-button
    .orca-alias-format-color-menu
    .orca-alias-format-grid
    .orca-alias-format-label
    .orca-alias-format-select
    .orca-alias-format-space-between
```

## 3. 标签属性 (Tag Properties)

### 属性编辑器

```
.orca-tag-props-editor (属性编辑器弹出)
  .orca-tag-props-editor-add-prop (添加属性)
  .orca-tag-props-editor-prop (属性行)
    .orca-tag-props-editor-prop-inner
    .orca-tag-props-editor-prop-type (类型选择)
    .orca-tag-props-editor-prop-value (值输入)
```

### 属性显示

```
.orca-repr-tag-props (标签属性渲染)
  .orca-repr-tag-props-collapsed (折叠状态)
  .orca-repr-tag-props-group (属性分组)
  .orca-repr-tag-props-title (分组标题)
.orca-repr-tag-hierarchy (标签层次)
  .orca-repr-tag-hierarchy-text
.orca-repr-tag-values (标签值)
  .orca-repr-tag-values-full
.orca-repr-tag-value-ref (标签值引用)
```

## 4. 标签上下文菜单

```
.orca-tag-menu (标签右键菜单)
```

## 5. 标签面板（侧边栏标签选项卡）

```
.orca-tags-panel (标签面板)
  .orca-tags-tags (标签列表)
    .orca-tags-tag-item
      .orca-tags-tag-icon
      .orca-tags-tag-name
  .orca-tag-input (过滤输入)
```

## 关键说明

标签系统支持：
1. **层级标签**：通过 `.orca-repr-tag-hierarchy` 渲染
2. **标签属性**：通过 `.orca-repr-tag-props` 渲染键值对
3. **属性类型**：text/number/date/select/multi-select/boolean 等
4. **标签引用**：`.orca-repr-tag-value-ref` 表示引用其他块
