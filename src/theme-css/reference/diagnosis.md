# 代码诊断报告

> 基于 Orca 原生 CSS 参考文档 vs 现有主题实现的对比分析

---

## 1. `_shared.css`（2,543 行）存在的问题

### 1.1 重复定义（+ 重复代码）

| # | 问题 | 位置 | 严重度 |
|---|------|------|--------|
| 1 | `.orca-calendar` box-shadow 在 §1（L25-27）和 `@scope`（L1061-1335）中重复声明 | §1 + §22 | ⚠️ |
| 2 | 浮动工具栏（sidetools/math/mermaid/image）在 §1（L28-37）和 §35（L1984-2009）重复样式化 | §1 + §35 | ⚠️ |
| 3 | Popup icon 颜色分散在 §13（L652-662）、§15（L797-807）、§24 toolbar 区域 | §13/15/24 | 🔴 |
| 4 | 侧边栏 hover/selected 在 §15（L838-862）全局定义，又在 §15 V2（L864-914）用 `#sidebar` 重新定义 | §15 | 🔴 |
| 5 | Checkbox 状态写了 5 组几乎相同的选择器组合（L504-562） | §11 | ⚠️ |
| 6 | `.orca-button.solid.primary` 和 `.orca-button.solid:not(.primary)` 的 hover 逻辑完全相同 | §7 | ⚠️ |
| 7 | 日历样式在 `@scope` 内定义后又在外面用 `!important` 覆盖（L1341-1370） | §22 + §23 | 🔴 |

### 1.2 架构问题

| # | 问题 | 详情 |
|---|------|------|
| 8 | 硬编码 #000 | 日历（§22）和 `#main`（§13）使用 `#000` 而非 `var(--border)`，违背 DESIGN_SPEC |
| 9 | redundant `!important` 泛化 | 全局选择器 `*` 下用 `!important` 降低可维护性，应在最小作用域使用 |
| 10 | 无可维护的 Section 编号 | §31 下有 31b/31c/31d 散乱编号，§40 出现两次 |
| 11 | 背景 `color` 与 `background-color` 同时声明 | 20+ 处同时写两者，语义重复 |
| 12 | 未使用 CSS Nesting | Orca 运行在 Electron ≥120，完全支持原生 CSS Nesting |

### 1.3 冗余 CSS

| # | 选择器/规则 | 说明 |
|---|------------|------|
| 13 | `.nb-dot-grid` / `.nb-dot-grid-main` | 定义了但未被引用，可移除或移到特色 CSS |
| 14 | `.plugin-item img, .orca-plugin-item img, .orca-plugin-market img` | L1455-1461 覆盖 `border: none`，但 min-width 下这些选择器可能已失效 |
| 15 | `.orca-katex` 相关（如果存在，但未在 `_shared.css` 中发现） | N/A |

## 2. `default.css`（591 行）存在的问题

### 2.1 严重重复

| # | 问题 | 行数 | 严重度 |
|---|------|------|--------|
| 16 | `:root`（暗色）与 `html.t-light`（亮色）的 Orca 语义映射完全相同的结构，超过 95% 内容重复 | L58-302 + L304-536 = 478 行 | 🔴 |
| 17 | 侧边栏变量覆盖在 `#sidebar` 和 `html.t-light #sidebar` 中完全相同结构重复 | L538-591 | ⚠️ |

### 2.2 设计偏离

| # | 问题 | 说明 |
|---|------|------|
| 18 | DESIGN_SPEC 说应该是 Orange 主色，实际用的是 Blue | 259deg = 蓝色，预期 50deg = 橙色 |
| 19 | 缺少 `--heading-font-weight` / `--base-font-weight` | DESIGN_SPEC 要求 700/500 但未定义变量 |
| 20 | `--border-radius: 5px` 但 DESIGN_SPEC 要求 0（新粗野主义核心特征） | 需要确认设计意图 |

### 2.3 缺失的变量

| 变量名 | 用途 | 状态 |
|--------|------|------|
| `--heading-font-weight` | 标题字重 | ❌ 未定义，_shared.css 硬编码 |
| `--base-font-weight` | 基础字重 | ❌ 未定义，_shared.css 硬编码 |
| `--orca-color-bg-selection` | 选中背景 | ❌ 未定义，_shared.css 引用 core 默认值 |
| `--orca-radius-*` | 圆角体系 | ❌ 未定义，仅用 `--border-radius` |

## 3. 其他文件

其他 flavor CSS（cyan/pink/green/red/violet）仅定义 `--main` 和 `--background` 两个变量，其他变量继承 default.css — 这个模式是正确的，无需改动。

`neubrutalism-vignette.css` 和 `neubrutalism-task-planner.css` 是特色/插件 CSS，结构独立，暂不重构。

## 4. 重构目标

| 目标 | _shared.css | default.css |
|------|-------------|-------------|
| 去重 | 删除约 500 行重复代码 | 合并暗/亮色变量减少 ~400 行 |
| 使用 CSS Nesting | 减少约 200 行父选择器重复 | N/A（变量文件） |
| 修复硬编码颜色 | `#000` → `var(--border)` | N/A |
| 统一 § 编号系统 | 重编号为逻辑分组 | N/A |
| 删除冗余声明 | 移除重复 `background-color` | N/A |
| 删除死代码 | 移除 `.nb-dot-grid` 等 | N/A |
| 引入 `@layer` 管理 | 3 层：base > components > overrides | N/A |
| 总减少 | ~2,543 → ~1,600（-37%） | ~591 → ~200（-66%） |
