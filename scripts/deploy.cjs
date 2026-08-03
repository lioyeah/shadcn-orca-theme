/**
 * deploy.cjs — copies build output + root files to Orca plugins directory.
 * Run: node scripts/deploy.cjs   (or: npm run deploy)
 */

const fs = require("fs");
const path = require("path");

const DEFAULT_DEPLOY_DIR = "/home/ilio/Documents/orca/plugins/shadcn";
const DEPLOY_DIR = process.env.ORCA_PLUGINS_DIR
	? path.join(process.env.ORCA_PLUGINS_DIR, "shadcn")
	: DEFAULT_DEPLOY_DIR;

const ROOT_FILES = ["package.json", "icon.png", "LICENSE", "NOTICE", "README.md"];

const DIST_FILES = [
	"index.js",
	"shadcn.css",
];

function copy(src, dest) {
	const destDir = path.dirname(dest);
	if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
	fs.copyFileSync(src, dest);
	console.log(`  ${path.basename(src)} → ${dest}`);
}

function ensureDir(dir) {
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

console.log(`\n📦 Deploying to ${DEPLOY_DIR}\n`);

// 1. Root files
const projectRoot = path.resolve(__dirname, "..");
for (const file of ROOT_FILES) {
	const src = path.join(projectRoot, file);
	if (fs.existsSync(src)) {
		copy(src, path.join(DEPLOY_DIR, file));
	} else {
		console.log(`  ⚠️  ${file} not found in project root, skipping`);
	}
}

// 2. dist/ files
const distSrc = path.join(projectRoot, "dist");
ensureDir(path.join(DEPLOY_DIR, "dist"));
for (const file of DIST_FILES) {
	const src = path.join(distSrc, file);
	if (fs.existsSync(src)) {
		copy(src, path.join(DEPLOY_DIR, "dist", file));
	} else {
		throw new Error(`${file} not found in dist/. Run npm run build first.`);
	}
}

// 3. Remove stale artifacts from previous theme name
const STALE_DIST_FILES = ["neubrutalism.css"];
for (const file of STALE_DIST_FILES) {
	const stale = path.join(DEPLOY_DIR, "dist", file);
	if (fs.existsSync(stale)) {
		fs.unlinkSync(stale);
		console.log(`  🗑️  removed stale dist/${file}`);
	}
}

console.log(`\nDeploy complete: ${DEPLOY_DIR}\n`);
