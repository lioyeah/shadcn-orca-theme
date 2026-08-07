/**
 * shadcn/ui Neutral — community theme for Orca Notes
 *
 * Inspired by the neutral palette and component patterns from https://ui.shadcn.com/
 * Not affiliated with or endorsed by shadcn/ui.
 */

import { subscribe } from "valtio";
import { setupClickSpark } from "./click-spark";

const THEME_NAME = "shadcn/ui Neutral";
const THEME_CLASS = "t-shadcn";
const LEGACY_THEME_NAME = "Neubrutalism";
const LEGACY_THEME_CLASS = "t-neubrutalism";
const LIGHT_CLASS = "t-light";
const THEME_FILE = "shadcn.css";
const BLOCK_GRAPH_SLIDER_SELECTOR = ".orca-block-graph-depth-control input[type=\"range\"]";
const BLOCK_GRAPH_DETENT_CLASS = "shadcn-slider-detents";
const BLOCK_GRAPH_VALUE_CLASS = "shadcn-slider-value";
/** Tabler laser icon tip on Excalidraw's 28×28 cursor (viewBox 0 0 24 24). */
const EXCALIDRAW_LASER_CURSOR_HOTSPOT = "4 4";
let themeModeUnsub: (() => void) | null = null;
let whiteboardExcalidrawFixUnsub: (() => void) | null = null;
let blockGraphSliderUnsub: (() => void) | null = null;
let clickSparkUnsub: (() => void) | null = null;

/**
 * Adds the configured hotspot coordinates to an Excalidraw SVG laser cursor.
 *
 * @param cursor - The CSS cursor value to inspect.
 * @returns The corrected cursor value, or `null` when no correction is needed or the value is unsupported.
 */
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
	let syncFrame: number | null = null;
	const syncAll = () => {
		syncFrame = null;
		patchWhiteboardExcalidraw();
	};
	const scheduleSync = () => {
		if (syncFrame == null) {
			syncFrame = requestAnimationFrame(syncAll);
		}
	};

	syncAll();

	const resizeObserver = new ResizeObserver(scheduleSync);
	const observedRoots = new WeakSet<HTMLElement>();
	const observeExcalidrawRoots = (root: ParentNode = document) => {
		root.querySelectorAll<HTMLElement>(".orca-whiteboard .excalidraw").forEach((excalidraw) => {
			if (!observedRoots.has(excalidraw)) {
				observedRoots.add(excalidraw);
				resizeObserver.observe(excalidraw);
			}
		});
	};

	observeExcalidrawRoots();

	const onWindowChange = scheduleSync;
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
						observeExcalidrawRoots(node);
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
		if (syncFrame != null) {
			cancelAnimationFrame(syncFrame);
		}
		window.removeEventListener("scroll", onWindowChange, true);
		window.removeEventListener("resize", onWindowChange);
	};
}

function syncThemeMode() {
	const state = orca.state as { themeMode?: string };
	const isLight = state.themeMode === "light";
	document.documentElement.classList.toggle(LIGHT_CLASS, isLight);
}

function setupBlockGraphSliderDetents() {
	const cleanups: Array<() => void> = [];
	const initialized = new WeakSet<HTMLInputElement>();

	const setupSlider = (input: HTMLInputElement) => {
		if (initialized.has(input) || !input.parentElement) return;
		const control = input.closest<HTMLElement>(".orca-block-graph-depth-control");
		if (!control) return;

		const min = Number(input.min);
		const max = Number(input.max);
		const step = Number(input.step) || 1;
		if (!Number.isFinite(min) || !Number.isFinite(max) || max <= min) return;
		const detentCount = Math.floor((max - min) / step) + 1;
		if (detentCount > 16) return;

		initialized.add(input);
		control.classList.add("shadcn-slider-detent-control");
		const marks = document.createElement("span");
		marks.className = BLOCK_GRAPH_DETENT_CLASS;
		marks.setAttribute("aria-hidden", "true");
		for (let index = 0; index < detentCount; index += 1) {
			const mark = document.createElement("span");
			mark.style.left = `${(index / (detentCount - 1)) * 100}%`;
			marks.appendChild(mark);
		}
		control.appendChild(marks);

		const value = document.createElement("output");
		value.className = BLOCK_GRAPH_VALUE_CLASS;
		value.setAttribute("aria-hidden", "true");
		control.appendChild(value);

		const sync = () => {
			const ratio = (Number(input.value) - min) / (max - min);
			const percent = Math.min(100, Math.max(0, ratio * 100));
			input.style.setProperty("--shadcn-slider-value", `${percent}%`);
			value.textContent = input.value;
			const inputRect = input.getBoundingClientRect();
			const controlRect = control.getBoundingClientRect();
			value.style.left = `${inputRect.left - controlRect.left + inputRect.width * (percent / 100)}px`;
			marks.style.left = `${inputRect.left - controlRect.left}px`;
			marks.style.top = `${inputRect.bottom - controlRect.top + 1}px`;
			marks.style.width = `${inputRect.width}px`;
		};
		const showValue = () => value.classList.add("is-visible");
		const hideValue = () => value.classList.remove("is-visible");
		const resizeObserver = new ResizeObserver(sync);
		input.addEventListener("input", sync);
		input.addEventListener("focus", showValue);
		input.addEventListener("blur", hideValue);
		resizeObserver.observe(control);
		sync();

		cleanups.push(() => {
			input.removeEventListener("input", sync);
			input.removeEventListener("focus", showValue);
			input.removeEventListener("blur", hideValue);
			resizeObserver.disconnect();
			marks.remove();
			value.remove();
			control.classList.remove("shadcn-slider-detent-control");
		});
	};

	const scan = (root: ParentNode) => {
		if (root instanceof HTMLInputElement) {
			setupSlider(root);
		}
		root.querySelectorAll<HTMLInputElement>(BLOCK_GRAPH_SLIDER_SELECTOR).forEach(setupSlider);
	};
	scan(document);
	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			mutation.addedNodes.forEach((node) => {
				if (node instanceof HTMLElement) {
					scan(node);
				}
			});
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
	cleanups.push(() => observer.disconnect());
	return () => cleanups.splice(0).forEach((cleanup) => cleanup());
}

/**
 * Loads the theme and initializes its UI enhancements and theme-mode synchronization.
 *
 * @param name - The display name used when registering the theme
 */
export async function load(name: string) {
	themeModeUnsub?.();
	blockGraphSliderUnsub?.();
	clickSparkUnsub?.();

	const state = orca.state as {
		themes?: Record<string, unknown>;
	};
	if (state.themes?.[LEGACY_THEME_NAME] != null) {
		orca.themes.unregister(LEGACY_THEME_NAME);
	}
	document.documentElement.classList.remove(LEGACY_THEME_CLASS);

	// Refresh the registration on every plugin load so Orca does not reuse
	// a stale CSS URL/cache entry after the theme file has been rebuilt.
	if (state.themes?.[THEME_NAME] != null) {
		orca.themes.unregister(THEME_NAME);
	}
	orca.themes.register(name, THEME_NAME, THEME_FILE);

	document.documentElement.classList.add(THEME_CLASS);
	blockGraphSliderUnsub = setupBlockGraphSliderDetents();
	whiteboardExcalidrawFixUnsub = setupWhiteboardExcalidrawFix();
	clickSparkUnsub = setupClickSpark();

	// Sync with Orca's built-in light/dark toggle
	syncThemeMode();
	themeModeUnsub = subscribe(orca.state, syncThemeMode);
}

/**
 * Removes the theme and releases its active subscriptions and effects.
 */
export async function unload() {
	if (themeModeUnsub) {
		themeModeUnsub();
		themeModeUnsub = null;
	}
	if (blockGraphSliderUnsub) {
		blockGraphSliderUnsub();
		blockGraphSliderUnsub = null;
	}
	if (clickSparkUnsub) {
		clickSparkUnsub();
		clickSparkUnsub = null;
	}
	if (whiteboardExcalidrawFixUnsub) {
		whiteboardExcalidrawFixUnsub();
		whiteboardExcalidrawFixUnsub = null;
	}
	orca.themes.unregister(THEME_NAME);
	document.documentElement.classList.remove(THEME_CLASS, LIGHT_CLASS);
}
