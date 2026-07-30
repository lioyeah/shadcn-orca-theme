/**
 * Ordered theme source manifest.
 *
 * Paths are relative to src/. Keep native-precedence.css last: those rules
 * intentionally win against Orca's late-loaded native stylesheet.
 */

module.exports = {
	prelude: ["flavors/default.css", "theme-css/shadcn-primitives.css"],
	base: ["theme-css/base/reset.css", "theme-css/base/surfaces.css"],
	components: [
		"theme-css/components/forms.css",
		"theme-css/components/navigation.css",
		"theme-css/components/overlays.css",
		"theme-css/components/editor.css",
		"theme-css/components/calendar.css",
		"theme-css/components/navigation-editor.css",
		"theme-css/components/query.css",
		"theme-css/components/tag-properties.css",
		"theme-css/components/settings.css",
		"theme-css/components/ai-chat.css",
		"theme-css/components/overlays-floating.css",
		"theme-css/components/feedback.css",
		"theme-css/components/navigation-shell.css",
		"theme-css/components/calendar-popup.css",
		"theme-css/components/query-text.css",
	],
	overrides: [
		"theme-css/context-overrides.css",
		"theme-css/native-precedence.css",
	],
};
