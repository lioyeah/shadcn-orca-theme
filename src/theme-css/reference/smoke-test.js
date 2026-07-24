/**
 * smoke-test.js — TUI-minimal selector canary test
 *
 * 在 Orca 控制台运行此脚本，验证主题依赖的关键 CSS 选择器是否仍能匹配 Orca DOM。
 * 用法：打开 Orca → 按 F12 → Console → 粘贴整个脚本 → 回车
 *
 * 结果：
 *   ✅ HIT   — 选择器匹配到元素，主题规则仍然有效
 *   ❌ MISS  — 选择器无匹配，Orca 可能已修改 DOM（需要更新选择器）
 *   ⚠️ PARTIAL — 匹配到元素但数量异常少
 */

(() => {
	/** @type {{selector: string, label: string, category: string, min?: number}[]} */
	const SELECTORS = [
		// ── Container & Layout ──
		{
			selector: "#sidebar",
			label: "Sidebar container",
			category: "Layout",
		},
		{
			selector: "#main",
			label: "Main content area",
			category: "Layout",
		},
		{
			selector: ".orca-panels-container",
			label: "Panels container",
			category: "Layout",
		},

		// ── Popup & Menu ──
		{
			selector: ".orca-popup",
			label: "Popup wrapper (any)",
			category: "Popup",
			min: 0,
		},
		{
			selector: ".orca-menu",
			label: "Menu (any)",
			category: "Menu",
			min: 0,
		},
		{
			selector: ".orca-dropdown",
			label: "Dropdown (any)",
			category: "Menu",
			min: 0,
		},

		// ── Sidebar ──
		{
			selector: "#sidebar .orca-sidebar-item",
			label: "Sidebar items",
			category: "Sidebar",
		},
		{
			selector: "#sidebar .orca-fav-item-item",
			label: "Favorites items",
			category: "Sidebar",
			min: 0,
		},
		{
			selector: ".orca-sidebar-create-aliased-btn",
			label: "New page button",
			category: "Sidebar",
		},

		// ── Buttons & Inputs ──
		{
			selector: ".orca-button",
			label: "Buttons (any)",
			category: "Controls",
		},
		{
			selector:
				".orca-input-actualinput, .orca-input-input, input[type='text']",
			label: "Text inputs",
			category: "Controls",
			min: 0,
		},
		{
			selector: "textarea",
			label: "Text areas",
			category: "Controls",
			min: 0,
		},

		// ── Block Editor ──
		{
			selector: ".orca-block-editor",
			label: "Block editor",
			category: "Editor",
			min: 0,
		},
		{
			selector: ".orca-block-editor .orca-inline",
			label: "Inline elements in editor",
			category: "Editor",
			min: 0,
		},

		// ── Query ──
		{
			selector: ".orca-query-editor",
			label: "Query editor",
			category: "Query",
			min: 0,
		},
		{
			selector: ".orca-query-list-block",
			label: "Query list block",
			category: "Query",
			min: 0,
		},

		// ── Calendar / Date Picker ──
		{
			selector: ".orca-date-picker",
			label: "Date picker",
			category: "Calendar",
			min: 0,
		},
		{
			selector: ".orca-time-picker",
			label: "Time picker",
			category: "Calendar",
			min: 0,
		},

		// ── AI Chat ──
		{
			selector: ".orca-ai-chat",
			label: "AI chat panel",
			category: "AI Chat",
			min: 0,
		},

		// ── Settings ──
		{
			selector: ".orca-settings",
			label: "Settings panel",
			category: "Settings",
			min: 0,
		},

		// ── Code Block ──
		{
			selector: ".orca-code-block, .orca-code-wrapper",
			label: "Code blocks",
			category: "Code",
			min: 0,
		},
	];

	console.log(
		"%cTUI-minimal Smoke Test%c — checking %d selectors\n",
		"font-weight:bold;font-size:14px",
		"",
		SELECTORS.length,
	);

	const results = [];
	let passed = 0;
	let failed = 0;
	let partial = 0;

	for (const { selector, label, category, min } of SELECTORS) {
		let elements;
		try {
			elements = document.querySelectorAll(selector);
		} catch (e) {
			results.push({
				selector,
				label,
				category,
				count: 0,
				status: "ERROR",
				error: e.message,
			});
			failed++;
			continue;
		}

		const count = elements.length;
		const threshold = min ?? 1;
		let status;

		if (count >= threshold) {
			status = "HIT";
			passed++;
		} else if (count > 0) {
			status = "PARTIAL";
			partial++;
		} else {
			status = "MISS";
			failed++;
		}

		results.push({ selector, label, category, count, status });
	}

	// Group by category
	const byCategory = {};
	for (const r of results) {
		if (!byCategory[r.category]) byCategory[r.category] = [];
		byCategory[r.category].push(r);
	}

	for (const [cat, items] of Object.entries(byCategory)) {
		console.log(`\n%c── ${cat} ──`, "font-weight:bold;color:#89b4fa");
		for (const r of items) {
			const icon =
				r.status === "HIT"
					? "✅"
					: r.status === "PARTIAL"
						? "⚠️"
						: r.status === "ERROR"
							? "🔥"
							: "❌";
			const extra =
				r.status === "PARTIAL"
					? ` (min ${r.min ?? 1}, got ${r.count})`
					: r.status === "ERROR"
						? ` — ${r.error}`
						: "";
			console.log(`  ${icon} ${r.label}${extra}`);
		}
	}

	console.log(
		`\n%c${passed} passed, ${partial} partial, ${failed} failed / ${SELECTORS.length} total\n`,
		failed > 0
			? "color:#f38ba8;font-weight:bold"
			: "color:#a6e3a1;font-weight:bold",
	);

	if (failed > 0) {
		console.log(
			"%c⚠️  Some selectors failed. Run `diagnostic-script.js` to capture updated DOM data, then update `src/theme-css/_shared.css` and regenerate `docs/orca-selectors-reference.md`.",
			"color:#fab387",
		);
	}
})();
