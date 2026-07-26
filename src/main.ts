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
let pluginName: string;
let themeModeUnsub: (() => void) | null = null;

function syncThemeMode() {
	const isLight = (orca.state as any).themeMode === "light";
	document.documentElement.classList.toggle(LIGHT_CLASS, isLight);
}

export async function load(name: string) {
	pluginName = name;

	if ((orca.state as any).themes?.[THEME_NAME] == null) {
		orca.themes.register(pluginName, THEME_NAME, "neubrutalism.css");
	}

	document.documentElement.classList.add(THEME_CLASS);

	// Sync with Orca's built-in light/dark toggle
	syncThemeMode();
	themeModeUnsub = subscribe(orca.state, () => {
		syncThemeMode();
	});
}

export async function unload() {
	if (themeModeUnsub) {
		themeModeUnsub();
		themeModeUnsub = null;
	}
	orca.themes.unregister(THEME_NAME);
	document.documentElement.classList.remove(THEME_CLASS);
	document.documentElement.classList.remove(LIGHT_CLASS);
}
