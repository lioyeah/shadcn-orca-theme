# 日历与日期选择器

---

## 1. 侧边栏日历

### 容器
```
.orca-calendar (inline 日历)
```

### 结构

```
.orca-calendar
  header (头部)
    .choosen-year (选择年份, 可点击切换)
    .choosen-month (选择月份, 可点击切换)
    .go-now ("今天" 按钮)
    .orca-calendar-left-btn (上个月)
    .orca-calendar-right-btn (下个月)
  .days (日期网格, CSS grid, 8 列)
    .weekday ×7 (星期标题 Mo/Tu/We/Th/Fr/Sa/Su)
    .week ×5-6 (周数)
    .day ×35-42 (日期单元格)
      .journal-dot (日记标记点)
```

### 日期单元格状态

| 类名 | 含义 |
|------|------|
| `.day` | 普通日期 |
| `.day.weekend` | 周末 |
| `.day.outside` | 非当前月日期 |
| `.day.today` | 今天 |
| `.day.current` | 当前选中 |
| `.day.value` | 选中值 |
| `.day.selected` | 被选中 |
| `.day:hover` | 悬停 |

### 月/年选择器

```
.month (月份选择)
.year (年份选择)
.month.value / .month.selected (选中月)
.year.value / .year.selected (选中年)
```

### 日记标记点

```
.journal-dot (底部小圆点, 表示当日有日记)
```

## 2. 弹出日期选择器

### 容器
```
.orca-date-picker (弹出日历选择器)
.orca-datepicker-menu (日期选择器菜单容器)
```

### 结构

```
.orca-date-picker
  header
    .choosen-year
    .choosen-month
    .orca-date-picker-left-btn
    .orca-date-picker-right-btn
  .days (网格)
    .weekday
    .day
```

### 底部操作栏

```
.orca-datepicker-menu
  .nl-input-container (自然语言输入)
  .button-bar
    .orca-button.plain ("当下" / Now)
    .orca-button.solid ("确定" / OK)
```

### 时间选择器

```
.orca-time-picker
  li (时间项, 可滚动列表)
```

时间项状态：

| 类名 | 含义 |
|------|------|
| `li.selected` | 选中 |
| `li.value` | 当前值 |
| `li[data-state="checked"]` | 已勾选 |

## 关键说明

1. 日历网格为 **8 列** CSS Grid：第一列为周数，后 7 列为星期
2. 星期标题通过 `::before` 伪元素显示缩写（Mo/Tu/We/Th/Fr/Sa/Su）
3. `.journal-dot` 标记存在日记的日期
4. 弹出日期选择器 `@scope (.orca-date-picker, .orca-time-picker)` 独立定义
5. `.orca-date-picker` 使用 `@scope` 隔离样式
