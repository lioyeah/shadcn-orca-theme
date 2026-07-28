# 查询编辑器组件

> Orca Note 的查询系统允许用户通过可视化条件编辑器构建复杂查询。

---

## 容器结构

```
.orca-query-editor (根容器)
```

## 选项卡

```
.orca-query-tabs (选项卡容器)
  .orca-tab-item (单个选项卡)
  .orca-tab-item.orca-selected (选中选项卡)
```

选项卡组件复用 `Segmented` 控件样式。

## 条件编辑器

```
.orca-query-conditions
  .orca-query-conditions-header (栏顶)
    .orca-query-conditions-header-arrow (折叠箭头)
    .orca-query-conditions-header-non-editable (非编辑模式)
    .orca-select-button (条件类型选择)
      .orca-select-button-text
      .orca-select-button-selector
    .orca-query-conditions-reset (重置按钮)
  .orca-query-conditions-body
    .orca-query-condition-group (条件组)
      .orca-query-condition-header
        .orca-query-condition-header-and/or (逻辑连接符)
        .orca-query-condition-header-action (添加)
        .orca-query-condition-header-text
      .orca-query-condition-item (单个条件)
        .orca-query-condition-item-header
          .orca-query-condition-item-kind (类型选择)
          .orca-query-condition-item-remove (删除)
        .orca-query-condition-item-body
          // 因条件类型而异
          .orca-query-condition-tag-header
          .orca-query-condition-tag-name
          .orca-query-condition-tag-properties
          .orca-query-condition-text (文本条件)
          .orca-query-condition-text-container
          .orca-query-condition-ref-container (引用条件)
          .orca-query-condition-journal-grid (日记条件)
          .orca-query-condition-journal-date
          .orca-query-condition-journal-number
          .orca-query-condition-task (任务条件)
```

## 条件类型

| CSS 类 | 条件类型 |
|--------|---------|
| `.orca-query-condition-tag-*` | 标签条件 |
| `.orca-query-condition-text` | 文本搜索 |
| `.orca-query-condition-ref-container` | 引用条件 |
| `.orca-query-condition-journal-*` | 日记日期条件 |
| `.orca-query-condition-task` | 任务完成条件 |

## 结果区域

```
.orca-query-results
  .orca-query-result-list-toolbar (工具栏)
    .orca-query-result-list-toolbar-tag (标签筛选)
  .orca-query-result-list (结果列表)
    .orca-query-result-list-header
    .orca-query-result-list-item (每行)
  .orca-query-list-sort (排序)
  .orca-query-block
  .orca-query-list-block
```

## 查询块（嵌入在块编辑器中的查询）

```
.orca-block-editor-query-tabs (块内查询选项卡)
.orca-block-editor-query-tabs-container
.orca-block-editor-query-views
.orca-block-editor-custom-query-remove (移除按钮)
```

## 关键说明

1. 查询条件使用 AND/OR 分组，对应 `.orca-query-condition-header-and/or`
2. 条件项可以嵌套（组中组）
3. 结果列表使用虚拟滚动（通过 CSS 类 `.orca-query-list` 推断）
4. 条件编辑器支持键盘导航
