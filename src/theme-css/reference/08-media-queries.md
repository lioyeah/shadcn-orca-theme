# 响应式断点与媒体查询

> 提取自 `index-IXWiDYyA.css`，共 **96** 条 `@media` 查询
>
> ⚠️ 以下断点全部经直接提取验证。

---

## 1. 暗色模式 (`prefers-color-scheme:dark`)

约 **70+ 条**，占全部媒体查询的 73%+，为各组件提供暗色模式覆盖。分散在 CSS 中，非集中管理。

## 2. 亮色模式 (`prefers-color-scheme:light`)

约 **6 条** 亮色模式特定规则。

## 3. 宽度断点（精确验证）

| 断点 | 方向 | 数量 | 用途 |
|------|------|------|------|
| `max-width: 320px` | 窄 | 1 | 极小屏 |
| `max-width: 379px` | 窄 | 1 | 极小屏 + screen |
| `max-width: 450px` | 窄 | 1 | 手机竖屏 + screen |
| `max-width: 460px` | 窄 | 1 | 手机竖屏 |
| `max-width: 720px` | 紧凑 | 1 | 小屏设备 |
| `max-width: 760px` | 紧凑 | 1 | 小屏设备 |
| `max-width: 800px` | 中等 | 1 | 平板竖屏 |
| `max-width: 860px` | 中等 | 1 | 平板竖屏 |
| `max-width: 861px` | 中等 | 1 | 平板竖屏 + screen |
| `min-width: 861px` | 宽 | 6+ | 桌面宽屏 + screen |
| `min-width: 1024px` | 宽 | 2 | 桌面标准 + screen |
| `min-width: 1536px` | 超宽 | 1 | 大屏桌面 |

**超大屏 (`min-width: 1921px`)** 使用 `screen` 限定共 **3 条**，其中 1 条附加 `min-device-width: 1921px`。

此外还有 `min-width: 640px` 和 `min-width: 768px` 各 1 条（基础响应式断点）。

## 4. 高度断点

| 断点 | 用途 |
|------|------|
| `max-height: 500px` | 紧凑模式（与 `max-width: 320px` 组合） |
| `max-height: 599px` | 紧凑模式（2 条） |
| `min-height: 600px and max-height: 900px` | 适中高度优化 |

## 5. 组合断点

| 断点 | 用途 |
|------|------|
| `(max-width: 1024px), (max-width: 800px)` | 多设备通用适配 |

## 6. 打印

| 断点 | 用途 |
|------|------|
| `print` | 打印样式 |

## 7. 系统特性

| 断点 | 用途 |
|------|------|
| `screen and (forced-colors:active)` | Windows 高对比度模式 |

## 总结

1. 桌面/平板分界：**861px**（最常用的响应式分界点，频繁出现）
2. 暗色模式分散在 CSS 各处以 `prefers-color-scheme:dark` 内联定义
3. 高度断点用于侧边栏和编辑器的紧凑模式
4. 没有 `max-width: 1024px` 单条断点（只有 `(max-width: 1024px), (max-width: 800px)` 组合）
