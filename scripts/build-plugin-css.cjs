/**
 * build-plugin-css.cjs
 * Copies feature CSS and plugin CSS to public/ and dist/
 *
 * src/features/      → theme-internal feature CSS (vignette, etc.)
 * src/plugin-styles/ → third-party Orca plugin CSS (task-planner, etc.)
 *
 * Orca convention: CSS must live in the plugin's dist/ directory.
 * injectCSSResource in main.ts resolves paths relative to plugins root.
 */

const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const featuresDir = path.join(rootDir, "src", "features");
const pluginStylesDir = path.join(rootDir, "src", "plugin-styles");
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");

function ensureDir(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

function copyFromDir(sourceDir) {
	if (!fs.existsSync(sourceDir)) return;

	const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith(".css"));

	for (const file of files) {
		const content = fs.readFileSync(path.join(sourceDir, file), "utf8");
		const outputName = `neubrutalism-${file}`;

		// Write to public/
		ensureDir(publicDir);
		fs.writeFileSync(path.join(publicDir, outputName), content, "utf8");
		console.log(`Copied ${outputName} → public/`);

		// Write to dist/
		if (fs.existsSync(distDir)) {
			ensureDir(distDir);
			fs.writeFileSync(path.join(distDir, outputName), content, "utf8");
			console.log(`Copied ${outputName} → dist/`);
		}

		// Dev: copy to Orca plugins root
		if (process.env.ORCA_PLUGINS_DIR) {
			const orcaFile = path.join(process.env.ORCA_PLUGINS_DIR, outputName);
			fs.writeFileSync(orcaFile, content, "utf8");
			console.log(`Copied ${outputName} → ${process.env.ORCA_PLUGINS_DIR}/`);
		}
	}
}

copyFromDir(featuresDir);
copyFromDir(pluginStylesDir);
