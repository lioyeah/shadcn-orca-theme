// === TUI-minimal Task Planner — 双层边框诊断 ===
// 扫描所有 mlo-* 元素，找出相邻/嵌套元素边框叠加形成的 2px+ 线

var out = { doubleBorders: [], stats: {} };

// 辅助：边框是否有实际宽度
function borderWidth(borderStr) {
	if (!borderStr || borderStr === "0px none" || borderStr.indexOf("0px") === 0)
		return 0;
	var m = borderStr.match(/^(\d+(?:\.\d+)?)px/);
	return m ? parseFloat(m[1]) : 0;
}

// 辅助：获取边框四边宽度
function getEdges(el) {
	var cs = getComputedStyle(el);
	return {
		top: borderWidth(cs.borderTop),
		bottom: borderWidth(cs.borderBottom),
		left: borderWidth(cs.borderLeft),
		right: borderWidth(cs.borderRight),
	};
}

var allMlo = document.querySelectorAll('[class*="mlo-"]');

// 按父子关系建树
var parentMap = {};
for (var i = 0; i < allMlo.length; i++) {
	var el = allMlo[i];
	var parent = el.parentElement;
	while (
		parent &&
		parent.className &&
		parent.className.indexOf("mlo-") === -1
	) {
		parent = parent.parentElement;
	}
	if (parent && parent !== el) {
		parentMap[i] = parent;
	}
}

// 检查所有 mlo- 元素
for (var j = 0; j < allMlo.length; j++) {
	var el = allMlo[j];
	var edges = getEdges(el);
	var tag = el.tagName.toLowerCase();
	var cls = el.className
		.split(/\s+/)
		.filter((c) => c.indexOf("mlo-") === 0)
		.slice(0, 3)
		.join(" ");

	// 1. 检查与相邻兄弟的双边
	var prev = el.previousElementSibling;
	if (prev && prev.className && prev.className.indexOf("mlo-") !== -1) {
		var prevEdges = getEdges(prev);
		// 上一个的 bottom + 我的 top = 叠加
		if (prevEdges.bottom > 0 && edges.top > 0) {
			out.doubleBorders.push({
				type: "sibling-v",
				pos: "between",
				el1:
					prev.tagName +
					" ." +
					prev.className
						.split(/\s+/)
						.filter((c) => c.indexOf("mlo-") === 0)
						.slice(0, 2)
						.join("."),
				el2: tag + " ." + cls,
				top: edges.top + "px",
				bottom: prevEdges.bottom + "px",
				total: edges.top + prevEdges.bottom + "px",
			});
		}
	}

	var next = el.nextElementSibling;
	if (next && next.className && next.className.indexOf("mlo-") !== -1) {
		var nextEdges = getEdges(next);
		if (edges.bottom > 0 && nextEdges.top > 0) {
			out.doubleBorders.push({
				type: "sibling-v",
				pos: "between",
				el1: tag + " ." + cls,
				el2:
					next.tagName +
					" ." +
					next.className
						.split(/\s+/)
						.filter((c) => c.indexOf("mlo-") === 0)
						.slice(0, 2)
						.join("."),
				top: nextEdges.top + "px",
				bottom: edges.bottom + "px",
				total: edges.bottom + nextEdges.top + "px",
			});
		}
	}

	// 2. 检查与父元素的嵌套双边（父子都有同侧边框）
	var parent = parentMap[j];
	if (parent) {
		var pEdges = getEdges(parent);
		var parentCls = parent.className
			.split(/\s+/)
			.filter((c) => c.indexOf("mlo-") === 0)
			.slice(0, 3)
			.join(" ");

		if (pEdges.top > 0 && edges.top > 0) {
			out.doubleBorders.push({
				type: "nested-top",
				parent: parent.tagName + " ." + parentCls,
				child: tag + " ." + cls,
				parentBorder: pEdges.top + "px",
				childBorder: edges.top + "px",
			});
		}
		if (pEdges.bottom > 0 && edges.bottom > 0) {
			out.doubleBorders.push({
				type: "nested-bottom",
				parent: parent.tagName + " ." + parentCls,
				child: tag + " ." + cls,
				parentBorder: pEdges.bottom + "px",
				childBorder: edges.bottom + "px",
			});
		}
	}
}

// 统计
out.stats = {
	totalMloElement: allMlo.length,
	doubleBorderCount: out.doubleBorders.length,
};

// 去重合并
var seen = {};
var unique = [];
for (var k = 0; k < out.doubleBorders.length; k++) {
	var key = JSON.stringify(out.doubleBorders[k]);
	if (!seen[key]) {
		seen[key] = true;
		unique.push(out.doubleBorders[k]);
	}
}
out.doubleBorders = unique;
out.stats.uniqueIssues = unique.length;

console.log(JSON.stringify(out, null, 2));
