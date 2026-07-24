/**
 * TUI-minimal — Vignette Module
 *
 * Manages top/bottom gradient overlays on the main editor area.
 * Independent from theme registration — only handles overlay logic.
 */

import { subscribe } from "valtio";

const IMMERSIVE_CLASS = "t-immersive";
const FOCUS_CLASS = "t-focus";

let settingsUnsub: (() => void) | null = null;
let resizeListener: (() => void) | null = null;
let mutationObserver: MutationObserver | null = null;
let vignetteTop: HTMLDivElement | null = null;
let vignetteBottom: HTMLDivElement | null = null;

function applyClass(className: string, enabled: boolean) {
	if (enabled) {
		document.documentElement.classList.add(className);
	} else {
		document.documentElement.classList.remove(className);
	}
}

function syncFromSettings(pluginName: string) {
	const settings = orca.state.plugins[pluginName]?.settings;
	const immersive = settings?.immersive === true;
	const focus = settings?.focus === true;
	applyClass(IMMERSIVE_CLASS, immersive);
	applyClass(FOCUS_CLASS, focus);
	if (vignetteBottom) vignetteBottom.style.display = immersive ? "" : "none";
	if (vignetteTop) vignetteTop.style.display = focus ? "" : "none";
}

function syncVignetteTop() {
	const m = document.querySelector("#main");
	if (m) {
		document.documentElement.style.setProperty(
			"--t-main-top",
			m.getBoundingClientRect().top + 1 + "px", // +1px for border
		);
	}
}

export async function init(pluginName: string) {
	// Register settings schema
	await orca.plugins.setSettingsSchema(pluginName, {
		immersive: {
			label: "底部遮罩",
			description: "在编辑区底部添加渐暗遮罩",
			type: "boolean",
			defaultValue: false,
		},
		focus: {
			label: "顶部遮罩",
			description: "在编辑区顶部添加渐暗遮罩，与底部遮罩叠加后仅保留中间区域",
			type: "boolean",
			defaultValue: false,
		},
	});

	// Create overlay elements (not pseudo-elements, avoids Orca flex layout conflict)
	vignetteTop = document.createElement("div");
	vignetteTop.className = "t-vignette-overlay-top";
	vignetteTop.style.display = "none";
	document.body.appendChild(vignetteTop);
	vignetteBottom = document.createElement("div");
	vignetteBottom.className = "t-vignette-overlay-bottom";
	vignetteBottom.style.display = "none";
	document.body.appendChild(vignetteBottom);

	// Apply initial settings after elements exist
	syncFromSettings(pluginName);

	// Dynamic top offset for top vignette
	syncVignetteTop();
	resizeListener = syncVignetteTop;
	window.addEventListener("resize", resizeListener);
	mutationObserver = new MutationObserver(syncVignetteTop);
	mutationObserver.observe(document.body, {
		attributes: true,
		attributeFilter: ["class"],
		subtree: true,
	});

	// React to settings changes (subscribe to top-level plugins record for reliability)
	settingsUnsub = subscribe(orca.state.plugins, () => {
		syncFromSettings(pluginName);
	});
}

export function destroy() {
	if (settingsUnsub) {
		settingsUnsub();
		settingsUnsub = null;
	}
	if (resizeListener) {
		window.removeEventListener("resize", resizeListener);
		resizeListener = null;
	}
	if (mutationObserver) {
		mutationObserver.disconnect();
		mutationObserver = null;
	}
	if (vignetteTop) {
		vignetteTop.remove();
		vignetteTop = null;
	}
	if (vignetteBottom) {
		vignetteBottom.remove();
		vignetteBottom = null;
	}
	document.documentElement.classList.remove(IMMERSIVE_CLASS);
	document.documentElement.classList.remove(FOCUS_CLASS);
}
