// === Orca 选择器诊断：控制台运行后复制输出 ===
// 用途：扫描当前页面的 DOM 结构和 CSS 规则，输出选择器映射
// 使用：在 Orca 中打开测试文档 → F12 → 粘贴运行 → 复制 JSON 输出
// 提示：运行前打开属性编辑页面的日期/标签弹窗可获取更完整数据
(() => {
	const out = {
		containers: {},
		blocks: {},
		inlineTypes: {},
		fontSources: {},
		propsPanel: {},
		popup: {},
		tags: {},
	};

	// 1. 容器层级
	[
		"#main",
		".orca-panels-container",
		".orca-panels-row",
		".orca-panel",
		".orca-block-editor",
		".orca-block-editor-main",
		".orca-block-editor-blocks",
		".orca-repr-main-content",
		".orca-repr-main-none-editable",
	].forEach((sel) => {
		const el = document.querySelector(sel);
		if (el)
			out.containers[sel] = {
				tag: el.tagName,
				classes: el.className,
				font: getComputedStyle(el).fontFamily,
			};
	});

	// 2. 块级元素
	const blockQuery = `
    h1, h2, h3, h4, h5, h6,
    blockquote,
    pre, .orca-code-wrapper,
    hr,
    [data-type="quote"], [data-type="quote2"],
    [data-type="ul"], [data-type="ol"], [data-type="todo"],
    [data-type="table"], [data-type="table-row"],
    .orca-block-divider
  `;
	document.querySelectorAll(blockQuery).forEach((el, i) => {
		if (i > 40) return;
		const path = [];
		let node = el;
		while (node && node !== document.body && path.length < 8) {
			let s = node.tagName?.toLowerCase() || "";
			if (node.id) s += "#" + node.id;
			const cls =
				typeof node.className === "string"
					? node.className.split(" ").filter(Boolean).slice(0, 4).join(".")
					: "";
			if (cls) s += "." + cls;
			path.unshift(s);
			node = node.parentElement;
		}
		const key = path.join(" > ");
		if (!out.blocks[key]) {
			const cs = getComputedStyle(el);
			out.blocks[key] = {
				tag: el.tagName,
				classes: el.className,
				font: cs.fontFamily,
				color: cs.color,
				bg: cs.backgroundColor,
				dataType: el.getAttribute("data-type") || null,
			};
		}
	});

	// 3. 行内类型
	document.querySelectorAll(".orca-inline").forEach((el, i) => {
		if (i > 30) return;
		const typeClass =
			[...el.classList].find(
				(c) => c.length === 1 && c !== "c" && c !== "b" && c !== "i",
			) || "";
		const type =
			typeClass ||
			(el.classList.contains("c")
				? "c"
				: el.classList.contains("b")
					? "b"
					: "plain");
		if (!out.inlineTypes[type]) {
			out.inlineTypes[type] = {
				html: el.outerHTML.slice(0, 200),
				font: getComputedStyle(el).fontFamily,
				color: getComputedStyle(el).color,
				dataType: el.getAttribute("data-type") || null,
			};
		}
	});

	// 4. 字体设置来源
	const rules = [];
	for (const sheet of document.styleSheets) {
		try {
			for (const rule of sheet.cssRules || []) {
				const st = rule.style;
				if (!st || !st.fontFamily) continue;
				const sel = rule.selectorText || "";
				if (/orca|blockquote|repr|codemirror|inline/i.test(sel)) {
					rules.push({
						selector: sel.slice(0, 120),
						font: st.fontFamily,
						imp: st.getPropertyPriority("font-family") === "important",
						src: (sheet.href || "<inline>").split("/").slice(-2).join("/"),
					});
				}
			}
		} catch (e) {}
	}
	out.fontSources = rules;

	// 5. 属性编辑页面面板（需先打开有属性的页面）
	document
		.querySelectorAll(
			'[class*="orca-repr-tag-props"], [class*="orca-page-propert"], [class*="orca-propert"]',
		)
		.forEach((el) => {
			const key = el.className.split(" ").slice(0, 3).join(".");
			if (out.propsPanel[key]) return;
			const cs = getComputedStyle(el);
			out.propsPanel[key] = {
				tag: el.tagName,
				classes: el.className.slice(0, 80),
				font: cs.fontFamily.slice(0, 60),
				bg: cs.backgroundColor,
				border: cs.border,
				borderRadius: cs.borderRadius,
			};
		});

	// 6. Popup 弹窗（需先点开日期/标签编辑弹窗）
	const popup = document.querySelector(".orca-popup");
	if (popup) {
		const cs = getComputedStyle(popup);
		out.popup._container = {
			tag: popup.tagName,
			classes: popup.className.slice(0, 120),
			bg: cs.backgroundColor,
			border: cs.border,
			borderRadius: cs.borderRadius,
			boxShadow: cs.boxShadow,
		};
		popup.querySelectorAll("[class]").forEach((el, i) => {
			if (i > 50) return;
			const cls = el.className.slice(0, 60);
			const tag = el.tagName.toLowerCase();
			const cs2 = getComputedStyle(el);
			if (!el.textContent.trim() && tag === "div" && cs2.width === "0px")
				return;
			const key = tag + "." + cls.split(" ").slice(0, 2).join(".");
			if (out.popup[key]) return;
			out.popup[key] = {
				text: el.textContent.slice(0, 30),
				bg: cs2.backgroundColor,
				color: cs2.color,
				border: cs2.border,
				borderRadius: cs2.borderRadius,
				font: cs2.fontFamily.slice(0, 50),
				fontSize: cs2.fontSize,
			};
		});
	} else {
		out.popup._note = "NO .orca-popup found — open a date/tag editor first";
	}

	// 7. 标签 chips（属性区域和标签选择弹窗）
	document
		.querySelectorAll(
			'.orca-tag, .orca-pill, [class*="orca-tag"], [class*="tag-props"]',
		)
		.forEach((el) => {
			const key = el.className.split(" ").slice(0, 3).join(".");
			if (out.tags[key]) return;
			const cs = getComputedStyle(el);
			out.tags[key] = {
				tag: el.tagName,
				text: el.textContent.trim().slice(0, 30),
				bg: cs.backgroundColor,
				color: cs.color,
				border: cs.border,
				borderRadius: cs.borderRadius,
				font: cs.fontFamily.slice(0, 50),
				padding: cs.padding,
			};
		});

	console.log(JSON.stringify(out, null, 2));
})();
