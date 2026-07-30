/**
 * Neubrutalism Theme for Orca Notes
 *
 * Hard shadows, thick borders, zero border-radius.
 * Based on TUI-minimal architecture with shadcn/ui CSS variable standardization.
 */

import { subscribe } from "valtio";

const THEME_NAME = "Neubrutalism";
const THEME_CLASS = "t-neubrutalism";
const LIGHT_CLASS = "t-light";
const THEME_FILE = "neubrutalism.css";
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
