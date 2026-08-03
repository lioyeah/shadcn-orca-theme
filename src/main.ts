/**
 * shadcn/ui Theme for Orca Notes
 *
 * Neutral palette and component patterns from https://ui.shadcn.com/
 */

import { subscribe } from "valtio";

const THEME_NAME = "shadcn";
const THEME_CLASS = "t-shadcn";
const LEGACY_THEME_NAME = "Neubrutalism";
const LEGACY_THEME_CLASS = "t-neubrutalism";
const LIGHT_CLASS = "t-light";
const THEME_FILE = "shadcn.css";
const BLOCK_GRAPH_SLIDER_STYLE_ID = "shadcn-block-graph-slider";
/** Tabler laser icon tip on Excalidraw's 28×28 cursor (viewBox 0 0 24 24). */
const EXCALIDRAW_LASER_CURSOR_HOTSPOT = "4 4";
let themeModeUnsub: (() => void) | null = null;
let whiteboardExcalidrawFixUnsub: (() => void) | null = null;

const BLOCK_GRAPH_SLIDER_CSS = `
html:root:root .orca-block-graph-depth-control input[type="range"] {
	accent-color: var(--primary) !important;
	background: transparent !important;
	flex: 1 1 7rem !important;
	min-inline-size: 6rem !important;
	max-inline-size: 10rem !important;
	block-size: 1rem !important;
	cursor: pointer !important;
	align-self: center !important;
	margin-block: 0 !important;
}
html:root:root .orca-block-graph-depth-control input[type="range"]::-webkit-slider-runnable-track {
	block-size: 0.375rem !important;
	border-radius: 9999px !important;
}
html:root:root .orca-block-graph-depth-control input[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none !important;
	appearance: none !important;
	box-sizing: border-box !important;
	inline-size: 1rem !important;
	block-size: 1rem !important;
	margin-top: calc(0.375rem / 2 - 1rem / 2 - 1px) !important;
	margin-block-start: calc(0.375rem / 2 - 1rem / 2 - 1px) !important;
	border-radius: 9999px !important;
	border: 1px solid var(--primary) !important;
	background: #fff !important;
	box-shadow: var(--shadow-sm) !important;
}
html:root:root .orca-block-graph-depth-control input[type="range"]::-moz-range-track {
	block-size: 0.375rem !important;
	border-radius: 9999px !important;
	background: var(--muted) !important;
	border: none !important;
}
html:root:root .orca-block-graph-depth-control input[type="range"]::-moz-range-progress {
	block-size: 0.375rem !important;
	border-radius: 9999px !important;
	background: var(--primary) !important;
}
html:root:root .orca-block-graph-depth-control input[type="range"]::-moz-range-thumb {
	inline-size: 1rem !important;
	block-size: 1rem !important;
	border-radius: 9999px !important;
	border: 1px solid var(--primary) !important;
	background: #fff !important;
	box-shadow: var(--shadow-sm) !important;
}
`.trim();

function injectBlockGraphSliderStyles() {
	let style = document.getElementById(BLOCK_GRAPH_SLIDER_STYLE_ID) as HTMLStyleElement | null;
	if (!style) {
		style = document.createElement("style");
		style.id = BLOCK_GRAPH_SLIDER_STYLE_ID;
		document.head.appendChild(style);
	}
	style.textContent = BLOCK_GRAPH_SLIDER_CSS;
}

function tagBlockGraphSliders() {
	document
		.querySelectorAll<HTMLInputElement>('.orca-block-graph-depth-control input[type="range"]')
		.forEach((input) => {
			input.classList.add("shadcn-slider-input");
		});
}

function setupBlockGraphSliderObserver() {
	tagBlockGraphSliders();
	const observer = new MutationObserver(tagBlockGraphSliders);
	observer.observe(document.body, { childList: true, subtree: true });
	return () => observer.disconnect();
}

let blockGraphSliderUnsub: (() => void) | null = null;

function fixExcalidrawLaserCursor(cursor: string): string | null {
	if (!cursor.includes("data:image/svg+xml")) {
		return null;
	}
	// Eraser and other tools already specify x y before the fallback.
	if (/url\([^)]+\)\s+-?\d+(?:\.\d+)?\s+-?\d+(?:\.\d+)?\s*,/.test(cursor)) {
		return null;
	}
	const match = cursor.match(/^url\((.+)\),\s*auto$/);
	if (!match) {
		return null;
	}
	return `url(${match[1]}) ${EXCALIDRAW_LASER_CURSOR_HOTSPOT}, auto`;
}

function patchWhiteboardLaserCursor(canvas: HTMLElement) {
	const fixed = fixExcalidrawLaserCursor(canvas.style.cursor);
	if (fixed) {
		canvas.style.cursor = fixed;
	}
}

/** Laser/eraser trails render in .SVGLayer (position:fixed). Orca .orca-panel { container-type } breaks fixed anchoring — compensate with viewport offset (excalidraw/excalidraw#7113). */
function syncWhiteboardSvgLayer(svgLayer: HTMLElement) {
	const excalidraw = svgLayer.closest(".excalidraw");
	if (!excalidraw) {
		return;
	}
	const { left, top } = excalidraw.getBoundingClientRect();
	svgLayer.style.left = `${-left}px`;
	svgLayer.style.top = `${-top}px`;
	svgLayer.style.width = "100vw";
	svgLayer.style.height = "100vh";
}

function patchWhiteboardExcalidraw(root: ParentNode = document) {
	root.querySelectorAll<HTMLElement>(".orca-whiteboard .excalidraw canvas.excalidraw__canvas").forEach(patchWhiteboardLaserCursor);
	root.querySelectorAll<HTMLElement>(".orca-whiteboard .excalidraw .SVGLayer").forEach(syncWhiteboardSvgLayer);
}

function setupWhiteboardExcalidrawFix() {
	const syncAll = () => patchWhiteboardExcalidraw();

	syncAll();

	const resizeObserver = new ResizeObserver(syncAll);
	const observeExcalidrawRoots = () => {
		document.querySelectorAll<HTMLElement>(".orca-whiteboard .excalidraw").forEach((root) => {
			resizeObserver.observe(root);
		});
	};

	observeExcalidrawRoots();

	const onWindowChange = () => syncAll();
	window.addEventListener("scroll", onWindowChange, true);
	window.addEventListener("resize", onWindowChange);

	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === "attributes" && mutation.attributeName === "style") {
				const target = mutation.target as HTMLElement;
				if (target.matches("canvas.excalidraw__canvas")) {
					patchWhiteboardLaserCursor(target);
				}
			}
			if (mutation.type === "childList") {
				mutation.addedNodes.forEach((node) => {
					if (node instanceof HTMLElement) {
						patchWhiteboardExcalidraw(node);
						node.querySelectorAll<HTMLElement>(".orca-whiteboard .excalidraw").forEach((root) => {
							resizeObserver.observe(root);
						});
					}
				});
			}
		}
	});

	observer.observe(document.body, {
		attributes: true,
		attributeFilter: ["style"],
		subtree: true,
		childList: true,
	});

	return () => {
		observer.disconnect();
		resizeObserver.disconnect();
		window.removeEventListener("scroll", onWindowChange, true);
		window.removeEventListener("resize", onWindowChange);
	};
}

function syncThemeMode() {
	const state = orca.state as { themeMode?: string };
	const isLight = state.themeMode === "light";
	document.documentElement.classList.toggle(LIGHT_CLASS, isLight);
}

export async function load(name: string) {
	themeModeUnsub?.();

	const state = orca.state as {
		themes?: Record<string, unknown>;
	};
	if (state.themes?.[LEGACY_THEME_NAME] != null) {
		orca.themes.unregister(LEGACY_THEME_NAME);
	}
	document.documentElement.classList.remove(LEGACY_THEME_CLASS);

	if (state.themes?.[THEME_NAME] == null) {
		orca.themes.register(name, THEME_NAME, THEME_FILE);
	}

	document.documentElement.classList.add(THEME_CLASS);
	injectBlockGraphSliderStyles();
	blockGraphSliderUnsub = setupBlockGraphSliderObserver();
	whiteboardExcalidrawFixUnsub = setupWhiteboardExcalidrawFix();

	// Sync with Orca's built-in light/dark toggle
	syncThemeMode();
	themeModeUnsub = subscribe(orca.state, syncThemeMode);
}

export async function unload() {
	if (themeModeUnsub) {
		themeModeUnsub();
		themeModeUnsub = null;
	}
	document.getElementById(BLOCK_GRAPH_SLIDER_STYLE_ID)?.remove();
	if (blockGraphSliderUnsub) {
		blockGraphSliderUnsub();
		blockGraphSliderUnsub = null;
	}
	if (whiteboardExcalidrawFixUnsub) {
		whiteboardExcalidrawFixUnsub();
		whiteboardExcalidrawFixUnsub = null;
	}
	orca.themes.unregister(THEME_NAME);
	document.documentElement.classList.remove(THEME_CLASS, LIGHT_CLASS);
}
