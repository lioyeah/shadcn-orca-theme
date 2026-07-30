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
let themeModeUnsub: (() => void) | null = null;

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

	// Sync with Orca's built-in light/dark toggle
	syncThemeMode();
	themeModeUnsub = subscribe(orca.state, syncThemeMode);
}

export async function unload() {
	if (themeModeUnsub) {
		themeModeUnsub();
		themeModeUnsub = null;
	}
	orca.themes.unregister(THEME_NAME);
	document.documentElement.classList.remove(THEME_CLASS, LIGHT_CLASS);
}
