// === TUI-minimal — 标签图标编辑列表 Hover 闪烁诊断 ===
// 用途：诊断在编辑标签图标时，列表项hover出现的闪烁问题
// 使用：在 Orca 中打开标签图标编辑弹窗 → F12 → 粘贴运行 → 交互列表项观察输出
// 输出：hover前后的样式变化、过渡/动画检测、重绘/回流统计

(() => {
  const out = {
    hoverTargets: [],
    transitions: [],
    animations: [],
    layoutShifts: [],
    styleChanges: [],
    pseudoChanges: [],
    stats: {
      scannedElements: 0,
      hoverListenersAttached: 0,
      styleSnapshots: 0,
    },
  };

  // ========== Phase 1: 扫描可能的hover目标 ==========
  // 标签图标编辑弹窗中常见的列表项选择器
  const HOVER_SELECTORS = [
    // 弹窗内的列表项
    '.orca-popup [class*="item"]',
    '.orca-popup [class*="row"]',
    '.orca-popup [class*="option"]',
    '.orca-popup [class*="icon"]',
    '.orca-popup [class*="select"]',
    '.orca-popup [class*="list"] > *',
    '.orca-popup li',
    '.orca-popup [role="option"]',
    '.orca-popup [role="listbox"] > *',
    // 标签相关
    '.orca-tags-tag-item',
    '.orca-tag-item',
    '[class*="tag-icon"]',
    '[class*="tag-select"]',
    // 弹窗中的通用可点击元素
    '.orca-popup .orca-button',
    '.orca-popup [class*="grid"] > *',
    '.orca-popup [class*="picker"] > *',
    // 下拉菜单中的选项
    '.orca-dropdown [class*="item"]',
    '.orca-dropdown li',
    '.orca-menu [class*="item"]',
  ];

  const hoverTargets = [];
  const selectorMap = {};

  HOVER_SELECTORS.forEach((sel) => {
    try {
      document.querySelectorAll(sel).forEach((el) => {
        if (!hoverTargets.includes(el)) {
          hoverTargets.push(el);
          selectorMap.get(el) || selectorMap.set(el, sel);
          if (!selectorMap.has(el)) selectorMap.set(el, sel);
        }
      });
    } catch (e) {}
  });

  out.stats.scannedElements = hoverTargets.length;

  // 如果没找到弹窗元素，提供提示
  if (hoverTargets.length === 0) {
    out.hoverTargets.push({
      note: "NO popup elements found — open a tag icon editor first",
    });
  }

  // ========== Phase 2: 快照函数 ==========
  function snapshotElement(el) {
    const cs = getComputedStyle(el);
    const before = getComputedStyle(el, "::before");
    const after = getComputedStyle(el, "::after");

    return {
      tag: el.tagName,
      className: el.className?.toString().slice(0, 80),
      rect: el.getBoundingClientRect(),
      // 核心样式属性
      backgroundColor: cs.backgroundColor,
      color: cs.color,
      border: cs.border,
      borderRadius: cs.borderRadius,
      boxShadow: cs.boxShadow,
      outline: cs.outline,
      opacity: cs.opacity,
      transform: cs.transform,
      // 过渡和动画
      transition: cs.transition,
      transitionProperty: cs.transitionProperty,
      transitionDuration: cs.transitionDuration,
      animation: cs.animation,
      animationName: cs.animationName,
      // 布局
      width: cs.width,
      height: cs.height,
      padding: cs.padding,
      margin: cs.margin,
      position: cs.position,
      zIndex: cs.zIndex,
      overflow: cs.overflow,
      // 伪元素
      before: {
        content: before.content,
        display: before.display,
        position: before.position,
        width: before.width,
        height: before.height,
        backgroundColor: before.backgroundColor,
        border: before.border,
        opacity: before.opacity,
        transform: before.transform,
      },
      after: {
        content: after.content,
        display: after.display,
        position: after.position,
        width: after.width,
        height: after.height,
        backgroundColor: after.backgroundColor,
        border: after.border,
        opacity: after.opacity,
        transform: after.transform,
      },
    };
  }

  function diffSnapshots(before, after, label) {
    const changes = [];
    const deepDiff = (a, b, path) => {
      if (typeof a !== "object" || typeof b !== "object") {
        if (a !== b) changes.push({ path, before: a, after: b });
        return;
      }
      const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
      keys.forEach((k) => {
        deepDiff(a[k], b[k], path ? path + "." + k : k);
      });
    };
    deepDiff(before, after, "");
    return changes.length > 0 ? { label, changes } : null;
  }

  // ========== Phase 3: 检测继承的transition规则 ==========
  function findInheritedTransitions(el) {
    const transitions = [];
    let node = el;
    while (node && node !== document.body) {
      const cs = getComputedStyle(node);
      const tp = cs.transitionProperty;
      const td = cs.transitionDuration;
      if (
        tp &&
        tp !== "none" &&
        td &&
        td !== "0s" &&
        td !== "0ms"
      ) {
        transitions.push({
          selector:
            node.tagName +
            (node.className
              ? "." +
                node.className
                  .toString()
                  .split(/\s+/)
                  .slice(0, 3)
                  .join(".")
              : ""),
          transitionProperty: tp,
          transitionDuration: td,
          transitionTimingFunction: cs.transitionTimingFunction,
        });
      }
      node = node.parentElement;
    }
    return transitions;
  }

  // ========== Phase 4: 检测CSS规则中的transition ==========
  function findCSSTransitionRules() {
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules || []) {
          const st = rule.style;
          if (!st) continue;
          const tp = st.transitionProperty;
          const td = st.transitionDuration;
          if (
            tp &&
            tp !== "none" &&
            td &&
            td !== "0s" &&
            td !== "0ms"
          ) {
            const sel = rule.selectorText || "";
            if (
              /hover|tag|icon|item|row|option|popup|menu|list|select/i.test(
                sel,
              )
            ) {
              rules.push({
                selector: sel.slice(0, 120),
                transitionProperty: tp,
                transitionDuration: td,
                source: (sheet.href || "<inline>")
                  .split("/")
                  .slice(-2)
                  .join("/"),
              });
            }
          }
        }
      } catch (e) {}
    }
    return rules;
  }

  // ========== Phase 5: PerformanceObserver 检测闪烁 ==========
  let paintEvents = [];
  let layoutEvents = [];

  try {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "paint") {
          paintEvents.push({
            name: entry.name,
            startTime: Math.round(entry.startTime),
          });
        }
        if (entry.entryType === "layout-shift") {
          layoutEvents.push({
            value: entry.value,
            startTime: Math.round(entry.startTime),
          });
        }
      }
    });
    perfObserver.observe({ type: "paint", buffered: false });
    perfObserver.observe({ type: "layout-shift", buffered: false });
  } catch (e) {}

  // ========== Phase 6: 注入hover监听 ==========
  let snapshotBefore = null;
  let lastHoveredEl = null;
  let rafId = null;

  hoverTargets.forEach((el) => {
    out.stats.hoverListenersAttached++;

    el.addEventListener("mouseenter", () => {
      // 清除之前的snapshot
      snapshotBefore = snapshotElement(el);
      lastHoveredEl = el;
      out.stats.styleSnapshots++;

      // 检查继承的transition
      const inheritedTrans = findInheritedTransitions(el);
      if (inheritedTrans.length > 0) {
        out.transitions.push({
          element:
            el.tagName +
            "." +
            (el.className?.toString().split(/\s+/).slice(0, 2).join(".") || ""),
          inherited: inheritedTrans,
        });
      }

      // 检查元素自身的transition
      const cs = getComputedStyle(el);
      if (
        cs.transitionProperty !== "none" &&
        cs.transitionDuration !== "0s"
      ) {
        out.transitions.push({
          element:
            el.tagName +
            "." +
            (el.className?.toString().split(/\s+/).slice(0, 2).join(".") || ""),
          self: {
            transitionProperty: cs.transitionProperty,
            transitionDuration: cs.transitionDuration,
            transitionTimingFunction: cs.transitionTimingFunction,
          },
        });
      }
    });

    el.addEventListener("mouseleave", () => {
      if (!snapshotBefore || el !== lastHoveredEl) return;

      // requestAnimationFrame延迟获取hover状态的快照
      // 这样可以捕获hover期间的完整状态
      setTimeout(() => {
        const snapshotAfter = snapshotBefore; // mouseenter时的状态是"之前"
        const snapshotHover = snapshotElement(el); // mouseleave后恢复，用mouseenter的snapshot作为对比
        // 实际上我们需要在mouseenter后、动画完成前获取hover状态
        // 但由于我们已经在mouseenter时获取了snapshot，这里只需要报告差异
        snapshotBefore = null;
      }, 50);
    });
  });

  // ========== Phase 7: 主动hover快照机制 ==========
  // 用定时器周期性检查hover状态变化（用于捕获闪烁）
  let lastFocused = null;
  let flickerCount = 0;

  const hoverPoll = setInterval(() => {
    const focused = document.querySelector(":hover");
    if (focused && focused !== lastFocused) {
      if (lastFocused) {
        const snap1 = snapshotElement(lastFocused);
        // 记录从一个hover目标跳到另一个时的快速变化
        if (snap1.opacity !== "1" || snap1.transform !== "none") {
          flickerCount++;
        }
      }
      lastFocused = focused;
    }
  }, 16); // ~60fps

  // ========== Phase 8: 收集CSS规则 ==========
  const cssTransitionRules = findCSSTransitionRules();
  out.animations = cssTransitionRules;

  // ========== Phase 9: 输出结果 ==========
  // 停止轮询
  setTimeout(() => {
    clearInterval(hoverPoll);

    // 收集hover目标信息
    hoverTargets.slice(0, 20).forEach((el) => {
      const cs = getComputedStyle(el);
      const info = {
        selector: selectorMap.get(el) || "unknown",
        tag: el.tagName,
        className: el.className?.toString().slice(0, 60),
        transition: cs.transition,
        animation: cs.animation,
        willChange: cs.willChange,
        contain: cs.contain,
        backfaceVisibility: cs.backfaceVisibility,
        perspective: cs.perspective,
        // 关键属性
        opacity: cs.opacity,
        transform: cs.transform,
        boxShadow: cs.boxShadow,
      };
      out.hoverTargets.push(info);
    });

    // 性能事件
    out.stats.paintEvents = paintEvents.length;
    out.stats.layoutShifts = layoutEvents.length;
    out.stats.totalLayoutShift = layoutEvents.reduce(
      (sum, e) => sum + e.value,
      0,
    );
    out.stats.flickerDetections = flickerCount;

    console.log(JSON.stringify(out, null, 2));
    console.log(
      "%c🔍 诊断完成。检查上述JSON输出中的 transitions、animations、layoutShifts 字段",
      "color: #89b4fa; font-weight: bold",
    );
    console.log(
      "%c提示：如果 transitions 非空，说明有CSS过渡规则在hover时触发变化，这可能是闪烁的根源",
      "color: #a6e3a1",
    );
  }, 3000);

  // ========== 用户提示 ==========
  console.log(
    "%c⏳ 诊断脚本已启动！请在3秒内将鼠标hover到标签图标列表的各个项目上",
    "color: #f9e2af; font-size: 14px; font-weight: bold",
  );
  console.log(
    "%c💡 操作建议：缓慢地在列表项之间移动鼠标，让过渡动画有时间播放",
    "color: #cba6f7",
  );
  console.log(
    "%c📊 3秒后自动输出诊断结果",
    "color: #94e2d5",
  );
})();
