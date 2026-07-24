// === TUI-minimal Task Planner 诊断 (兼容版) ===
// 在 Orca 中打开 task-planner 页面 → F12 控制台 → 粘贴运行 → 复制 JSON 输出

var out = {
	cssLoaded: null,
	mloClasses: [],
	mloSample: [],
	styleRules: [],
};

// 1. 检查 CSS 文件是否被加载
var sheets = document.styleSheets;
for (var si = 0; si < sheets.length; si++) {
	try {
		var sheet = sheets[si];
		var href = sheet.href || "";
		if (href.indexOf("tui-minimal-task-planner") !== -1) {
			out.cssLoaded = {
				href: href,
				ruleCount: (sheet.cssRules || []).length,
			};
			var rules = sheet.cssRules || [];
			for (var ri = 0; ri < Math.min(rules.length, 30); ri++) {
				if (rules[ri].selectorText) {
					out.styleRules.push(rules[ri].selectorText);
				}
			}
		}
	} catch (e) {}
}

// 如果没找到 tui-minimal-task-planner.css，检查是否有任何 mlo 规则
if (!out.cssLoaded) {
	for (var sj = 0; sj < sheets.length; sj++) {
		try {
			var rules2 = sheets[sj].cssRules || [];
			for (var rj = 0; rj < rules2.length; rj++) {
				if (
					rules2[rj].selectorText &&
					rules2[rj].selectorText.indexOf("mlo-") !== -1
				) {
					if (!out.cssLoaded) {
						out.cssLoaded = {
							href: sheets[sj].href || "<inline>",
							ruleCount: rules2.length,
						};
					}
					out.styleRules.push(rules2[rj].selectorText);
				}
			}
		} catch (e) {}
	}
}

// 2. 扫描页面上所有包含 mlo- 的 class 元素
var mloEls = document.querySelectorAll('[class*="mlo-"]');
var mloSet = {};
for (var ei = 0; ei < mloEls.length; ei++) {
	var cls = mloEls[ei].className;
	var parts = cls.split(/\s+/);
	for (var pi = 0; pi < parts.length; pi++) {
		if (parts[pi].indexOf("mlo-") === 0) {
			mloSet[parts[pi]] = true;
		}
	}
}
out.mloClasses = Object.keys(mloSet).sort();

// 3. 采样前 20 个 mlo- 元素
for (var mi = 0; mi < Math.min(mloEls.length, 20); mi++) {
	var el = mloEls[mi];
	var cs = getComputedStyle(el);
	var mloCls = [];
	var elParts = el.className.split(/\s+/);
	for (var pj = 0; pj < elParts.length; pj++) {
		if (elParts[pj].indexOf("mlo-") === 0) mloCls.push(elParts[pj]);
	}
	out.mloSample.push({
		tag: el.tagName,
		mloClasses: mloCls.slice(0, 5).join(" "),
		borderRadius: cs.borderRadius,
		boxShadow: cs.boxShadow,
		border: cs.border,
		borderTop: cs.borderTop,
		borderLeft: cs.borderLeft,
		bg: (cs.background || "").slice(0, 80),
		bgImage: (cs.backgroundImage || "").slice(0, 80),
		transition: (cs.transition || "").slice(0, 80),
		textShadow: cs.textShadow,
	});
}

// 4. 如果没有 mlo-* class，搜索可能的相关 class
if (mloEls.length === 0) {
	out.missingMlo = true;
	out.possibleClasses = [];
	var allEls = document.querySelectorAll("[class]");
	var found = {};
	for (var ai = 0; ai < Math.min(allEls.length, 500); ai++) {
		var ac = allEls[ai].className;
		var acParts = typeof ac === "string" ? ac.split(/\s+/) : [];
		for (var aj = 0; aj < acParts.length; aj++) {
			if (
				acParts[aj].indexOf("task") !== -1 ||
				acParts[aj].indexOf("myday") !== -1 ||
				acParts[aj].indexOf("dashboard") !== -1 ||
				acParts[aj].indexOf("timer") !== -1 ||
				acParts[aj].indexOf("project") !== -1
			) {
				found[acParts[aj]] = true;
			}
		}
	}
	out.possibleClasses = Object.keys(found).sort();
}

console.log(JSON.stringify(out, null, 2));
