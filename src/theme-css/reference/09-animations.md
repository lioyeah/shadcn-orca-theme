# 动画与过渡效果

> 提取自 `index-IXWiDYyA.css`，共 **32** 个 `@keyframes` 动画
>
> ⚠️ 以下 **32** 个动画名全部经直接提取验证。

---

## 动画完整列表

### 进入/退出

| 动画名 | 用途 |
|--------|------|
| `fadeIn` | 淡入 (通用) |
| `fade-in` | 淡入（模态框 CSS 动画） |
| `fadeOut` | 淡出 |
| `enter` | 进入动画 |
| `exit` | 退出动画 |
| `scaleIn` | 缩放出现 |
| `scaleOut` | 缩放消失 |
| `slideInLeft` | 左侧滑入 |
| `slideInRight` | 右侧滑入 |
| `slideInDown` | 上方滑入 |
| `slideOutLeft` | 左侧滑出 |
| `slideOutRight` | 右侧滑出 |
| `popup-slide-up-in` | 弹出从下滑入 |
| `popup-slide-up-out` | 弹出从下滑出 |

### 旋转

| 动画名 | 用途 |
|--------|------|
| `spin` | 标准旋转加载 |
| `rotate` | 旋转 |
| `orca-aichat-border-spin` | AI 聊天边框旋转 |

### 电子表格 (Univer)

| 动画名 | 用途 |
|--------|------|
| `univer-spin` | 电子表格旋转加载 |
| `library-unit__adder-animation` | 添加单元动画 |
| `library-unit__skeleton-opacity-animation` | 骨架屏透明度动画 |

### 杂项

| 动画名 | 用途 |
|--------|------|
| `dash` | 虚线描边 |
| `mix` | 混合动画 |

### 块编辑

| 动画名 | 用途 |
|--------|------|
| `indentBlock` | 块缩进动画 |
| `outdentBlock` | 块取消缩进 |
| `shakeAndScale` | 抖动+缩放 |
| `breathe` | 呼吸效果 |
| `dashdraw` | 虚线绘制 |

### 提示/状态

| 动画名 | 用途 |
|--------|------|
| `speaking-indicator-anim` | 语音指示器 |
| `successStatusAnimation` | 成功状态 |
| `textColorWave` | 文字颜色波动 |
| `mix` | 混合动画 |

### 骨架屏/加载

| 动画名 | 用途 |
|--------|------|
| `library-unit__adder-animation` | 添加动画（电子表格） |
| `library-unit__skeleton-opacity-animation` | 骨架屏透明度动画 |

### Other

| 动画名 | 用途 |
|--------|------|
| `Modal__background__fade-in` | 模态背景淡入 |
| `Modal__content_fade-in` | 模态内容淡入 |
| `dash` | 虚线描边 |

## 过渡 (Transitions)

Orca 使用 CSS `transition` 属性实现平滑的状态切换：

| 属性 | 持续时间 | 缓动函数 | 用途 |
|------|---------|---------|------|
| `background-color` | `0.15s` | `ease` | 悬停/选中背景切换 |
| `color` | `0.15s` | `ease` | 颜色变化 |
| `opacity` | `0.15s` | `ease` | 淡入淡出 |
| `transform` | `0.15s` | `ease` | 移动/缩放 |
| `box-shadow` | `0.15s` | `ease` | 阴影变化 |
| `border-color` | `0.15s` | `ease` | 边框变化 |

## 关键说明

1. 动画持续时间通常为 `0.15s`（150ms），统一使用 `ease` 缓动函数
2. 大部分交互反馈使用过渡而非动画
3. `orca-aichat-border-spin` 是 AI 聊天的标志性动画
4. 没有 `pulse`、`slideUp`、`slideDown`、`shimmer`、`ripple`、`skeleton-loading` 等猜测的动画名
