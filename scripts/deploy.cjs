/**
 * deploy.cjs — copies build output + root files to Orca plugins directory.
 * Run: node scripts/deploy.cjs   (or: npm run deploy)
 */

const fs = require("fs");
const path = require("path");

const DEPLOY_DIR = "/home/ilio/Documents/orca/plugins/Neubrutalism";

const ROOT_FILES = ["package.json", "icon.png", "LICENSE", "README.md"];

const DIST_FILES = [
	"index.js",
	"neubrutalism.css",
	"neubrutalism-task-planner.css",
	"neubrutalism-vignette.css",
];

function copy(src, dest) {
	const destDir = path.dirname(dest);
	if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
	fs.copyFileSync(src, dest);
	console.log(`  ✅ ${path.basename(src)} → ${dest}`);
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
		console.log(`  ⚠️  ${file} not found in dist/, skipping`);
	}
}

console.log(`\n✅ Deploy complete: ${DEPLOY_DIR}\n`);
