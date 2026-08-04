# 正文块引用搜索面板样式设计

## 目标

在正文中触发块引用搜索时，保留现有的“搜索结果 + 块预览”分栏结构，但将视觉层级调整为 shadcn/ui Neutral 风格。

## 现状问题

- 搜索面板外壳、列表区域和预览区域存在重复边框，视觉上像多个嵌套窗口。
- 左侧结果列表没有稳定的 sidebar 层级，结果项与容器边界混在一起。
- 右侧预览没有自然复用编辑器背景，仍带有弹窗式 chrome。
- 输入栏和底部快捷键栏没有形成清晰的 header/footer 区域。

## 设计

- `.orca-search-modal` 作为唯一可见外壳，使用 `--secondary-background`、单边框、圆角和轻阴影。
- 顶部搜索输入保持嵌入式 input group，只保留下边框，不增加内层 focus ring。
- `.orca-search-modal-result-list` 使用 `--sidebar`，结果项默认透明，悬停和选中使用 `--accent` / `--accent-foreground`。
- 结果项之间不使用卡片边框；只用间距和背景色表达选中层级。
- `.orca-search-modal-result-preview` 使用 `--background`，保留唯一的左侧分隔线，内部编辑器保持透明。
- `.orca-search-modal-footer` 使用 `--muted` 或 `--secondary-background` 全宽铺满，文字使用 `--muted-foreground`，图标使用 `--foreground`。
- 不修改搜索逻辑、结果数据、预览内容或 Orca DOM 结构。

## 验证标准

1. 面板只有一层外壳边框，内部没有重复卡片边框。
2. 左侧结果选中态能通过 `--accent` 清楚识别，且文字、图标和高亮保持可读。
3. 右侧预览与主编辑器背景一致，不显示嵌套面板阴影。
4. 顶部输入和底部快捷键栏形成完整的 header/content/footer 结构。
5. 明亮和暗色 flavor 均能继续使用现有语义变量。
