// === 查询列表项 Handle 诊断：控制台运行后复制输出 ===
// 用途：检查查询列表项的 DOM 结构，确认 handle 元素是否存在及其样式
((sel = ".orca-query-list-block") => {
  const items = document.querySelectorAll(sel);
  if (!items.length) {
    console.log(`未找到 ${sel}（共 0 个）`);
    return;
  }

  const out = [];
  items.forEach((el, i) => {
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const entry = {
      index: i,
      text: el.textContent.trim().slice(0, 60),
      classes: el.className.slice(0, 120),
      rect: { w: rect.width.toFixed(0), h: rect.height.toFixed(0) },
      before: {
        pseudo: "::before",
        display: getComputedStyle(el, "::before").display,
        content: getComputedStyle(el, "::before").content,
        bgColor: getComputedStyle(el, "::before").backgroundColor,
        bgImage: getComputedStyle(el, "::before").backgroundImage,
        color: getComputedStyle(el, "::before").color,
        width: getComputedStyle(el, "::before").width,
        height: getComputedStyle(el, "::before").height,
        cursor: getComputedStyle(el, "::before").cursor,
      },
      children: [],
    };

    // Scan direct children for handle-like elements
    el.querySelectorAll(":scope > *").forEach((child) => {
      const cls = child.className.slice(0, 100);
      if (/handle|grip|drag|icon|menu/i.test(cls)) {
        const ccs = getComputedStyle(child);
        entry.children.push({
          tag: child.tagName,
          classes: cls,
          display: ccs.display,
          visibility: ccs.visibility,
          opacity: ccs.opacity,
          width: ccs.width,
          height: ccs.height,
          color: ccs.color,
          cursor: ccs.cursor,
          pointerEvents: ccs.pointerEvents,
          innerText: child.textContent.trim().slice(0, 30),
          innerHTML: child.innerHTML.slice(0, 80),
        });
      }
    });

    // Also check all descendants for .orca-block-handle
    const handles = el.querySelectorAll(".orca-block-handle");
    handles.forEach((h) => {
      const hcs = getComputedStyle(h);
      const before = getComputedStyle(h, "::before");
      entry.children.push({
        tag: h.tagName,
        classes: h.className.slice(0, 100),
        display: hcs.display,
        visibility: hcs.visibility,
        opacity: hcs.opacity,
        width: hcs.width,
        height: hcs.height,
        color: hcs.color,
        cursor: hcs.cursor,
        pointerEvents: hcs.pointerEvents,
        innerText: h.textContent.trim().slice(0, 30),
        innerHTML: h.innerHTML.slice(0, 80),
        beforeContent: before.content,
        beforeColor: before.color,
      });
    });

    out.push(entry);
  });

  console.log(JSON.stringify(out, null, 2));
})();
