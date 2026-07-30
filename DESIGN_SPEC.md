# shadcn — Orca Note 主题插件设计规范

> **实现说明（2026-07-30）:** 本文描述当前插件的目标与实现。主题名 **shadcn**，CSS 类 `t-shadcn`，构建产物 `shadcn.css`。

## 1. 设计来源

视觉与 token 对齐 [shadcn/ui](https://ui.shadcn.com/) **neutral** 默认主题：

- Token 定义：[Theming 文档](https://ui.shadcn.com/docs/theming)
- 色值来源：GitHub `shadcn-ui/ui` → `apps/v4/registry/themes.ts`（`name: "neutral"`）
- 组件类名来源：`apps/v4/registry/new-york-v4/ui/*.tsx`（`button`, `input`, `dropdown-menu`, `switch`, `dialog`, `command`, `tooltip`, `sidebar`, …）

**不**再使用 Neobrutalism / ekmas 的粗边框、硬偏移阴影、高饱和主色 chrome。

## 2. 视觉原则

| 维度 | shadcn Orca 主题 |
|------|------------------|
| 边框 | 1px，`--border` / `--input` |
| 阴影 | 无硬偏移；popover/dialog 用 `--shadow-md` / `--shadow-lg` |
| 圆角 | `--radius: 0.625rem`（及 `radius-sm` … `radius-xl` 派生） |
| 悬停/选中 | `--accent` / `--sidebar-accent`，非蓝色 `--main` 块 |
| 主操作 | `--primary` / `--primary-foreground` |
| 浮层 | `--popover` + `shadow-md` |
| 侧栏 | `--sidebar-*` token 系列 |
| Tooltip | 反色：`bg-foreground` + `text-background` |
| Focus | `ring-[3px] ring-ring/50` → `--shadcn-ring` |

编辑器正文保持**双色/灰阶**层次（字重/字号），不在 prose 里铺语义彩虹色。

## 3. 构建架构

```
src/flavors/default.css          ← shadcn neutral tokens + Orca 别名
src/theme-css/shadcn-primitives.css  ← 从官方组件翻译的语义模式
src/theme-css/manifest.cjs       ← 显式控制 source layer 顺序
src/theme-css/base/              ← reset、surface、layout
src/theme-css/components/        ← 按 Orca 组件拆分的映射规则
src/theme-css/context-overrides.css ← preview/context 专用规则
src/theme-css/native-precedence.css ← 击败 Orca late-loaded CSS 的补丁
        ↓ build-theme-css.cjs
public/shadcn.css / dist/shadcn.css
        ↓ main.ts
orca.themes.register(plugin, "shadcn", "shadcn.css")
document.documentElement.classList.add("t-shadcn")
```

Orca 约定：`:root` = 暗色，`html.t-light` = 亮色（与 Orca 内置 light/dark 切换同步）。

## 4. Token 清单（neutral）

`:root` / `html.t-light` 中定义：

- 表面：`background`, `foreground`, `card`, `popover`, `muted`, `secondary`, `accent`
- 操作：`primary`, `destructive`（及对应 `-foreground`）
- 边框/焦点：`border`, `input`, `ring`
- 侧栏：`sidebar`, `sidebar-foreground`, `sidebar-accent`, `sidebar-border`, …
- 图表：`chart-1` … `chart-5`
- 阴影：`shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`

Orca 兼容别名（历史命名，语义已 neutral 化）：

- `--main` → `--accent`
- `--text-muted` → `--muted-foreground`
- `--secondary-background` → `--card`

## 5. Orca → shadcn 组件映射（摘要）

| Orca | shadcn 参考 |
|------|-------------|
| `.orca-button` | `button.tsx` variants |
| `.orca-input` | `input.tsx` |
| `.orca-menu`, `.orca-select-menu` | `dropdown-menu.tsx` / `popover.tsx` |
| `.orca-command-modal` | `dialog.tsx` + `command.tsx` |
| `nav#sidebar` | `sidebar.tsx` |
| `.orca-switch` | `switch.tsx` |
| `.orca-tooltip` | `tooltip.tsx` |
| `.orca-modal` | `dialog.tsx` |
| Checkbox | `checkbox.tsx` |
| Tabs / segmented | `tabs.tsx` |

详见 `src/theme-css/reference/15-shadcn-mapping.md`。

## 6. 弹层结构（避免双边框）

- `.orca-popup` — 定位壳，透明、无边框
- `.orca-menu` / `.orca-select-menu` 等 — 唯一可见面板，承载 border + shadow

全局 `.orca-menu` 规则须排除：`.orca-search-modal`, `.orca-block-popup`, `.orca-command-modal`, `.orca-inline-reference-with-preview` 等。

## 7. 插件入口

```typescript
const THEME_NAME = "shadcn";
const THEME_CLASS = "t-shadcn";
const THEME_FILE = "shadcn.css";
```

部署默认路径：`/home/ilio/Documents/orca/plugins/shadcn`（`ORCA_PLUGINS_DIR` 可覆盖）。

## 8. 遗留文件

- `src/flavors/{pink,cyan,green,violet,red}.css` — 旧 palette 源，**未**接入运行时切换；仅作参考。
- `src/theme-css/reference/` — Orca 原生 CSS 逆向参考，与主题品牌无关。
- `public/icons/` — 可选 SVG 图标包（MIT），与 shadcn 皮肤无硬依赖。

## 9. 开发命令

```bash
npm run build:css      # 仅 CSS
npm run build          # CSS + TS
npm run deploy         # 构建并复制到 Orca plugins 目录
npm run build:deploy   # 同 deploy
npm run audit:css      # 输出 CSS selector/token 审计
npm run audit:css:write # 写入当前基线
```

修改 CSS 后需 `build:deploy`；Orca 可能缓存 `?_t=`，切换主题或重载插件以生效。
