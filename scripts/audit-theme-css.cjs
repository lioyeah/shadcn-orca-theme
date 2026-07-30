/**
 * Audit generated theme CSS for safe maintenance refactors.
 *
 * Usage:
 *   node scripts/audit-theme-css.cjs
 *   node scripts/audit-theme-css.cjs --write path/to/baseline.json
 *   node scripts/audit-theme-css.cjs --compare path/to/baseline.json
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const outputPath = path.join(rootDir, "public", "shadcn.css");
const [, , action, requestedPath] = process.argv;

function resolvePath(filePath) {
	return path.isAbsolute(filePath) ? filePath : path.join(rootDir, filePath);
}

function read(filePath) {
	return fs.readFileSync(filePath, "utf8");
}

function sha256(value) {
	return crypto.createHash("sha256").update(value).digest("hex");
}

function stripComments(css) {
	return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function extractSelectors(css) {
	const selectors = new Set();
	const declarationBlockPattern = /(^|})\s*([^@{}][^{}]*)\{/g;
	let match;

	while ((match = declarationBlockPattern.exec(stripComments(css))) !== null) {
		for (const selector of match[2].split(",")) {
			const normalized = selector.replace(/\s+/g, " ").trim();
			if (normalized) selectors.add(normalized);
		}
	}

	return [...selectors].sort();
}

function extractCustomProperties(css) {
	const properties = new Set();
	for (const match of stripComments(css).matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g)) {
		properties.add(match[1]);
	}
	return [...properties].sort();
}

function countDeclarationBlocks(css) {
	return [...stripComments(css).matchAll(/\{/g)].length;
}

function audit(filePath) {
	const content = read(filePath);
	return {
		file: path.relative(rootDir, filePath),
		sha256: sha256(content),
		bytes: Buffer.byteLength(content),
		lines: content.split(/\r?\n/).length,
		selectorCount: extractSelectors(content).length,
		selectors: extractSelectors(content),
		customPropertyCount: extractCustomProperties(content).length,
		customProperties: extractCustomProperties(content),
		declarationBlockCount: countDeclarationBlocks(content),
	};
}

function createReport() {
	const manifest = require(path.join(rootDir, "src", "theme-css", "manifest.cjs"));
	const sourceFiles = [
		...manifest.prelude,
		...manifest.base,
		...manifest.components,
		...manifest.overrides,
	].map((filePath) => path.join(rootDir, "src", filePath));

	return {
		generated: audit(outputPath),
		sources: sourceFiles.map(audit),
	};
}

function compareReports(actual, expected) {
	const comparable = (report) => ({
		selectorCount: report.generated.selectorCount,
		selectors: report.generated.selectors,
		customPropertyCount: report.generated.customPropertyCount,
		customProperties: report.generated.customProperties,
	});
	const actualComparable = JSON.stringify(comparable(actual), null, 2);
	const expectedComparable = JSON.stringify(comparable(expected), null, 2);

	if (actualComparable !== expectedComparable) {
		console.error("CSS inventory differs from baseline.");
		process.exitCode = 1;
		return;
	}

	console.log("CSS selector and custom-property inventories match baseline.");
}

if (action === "--write" || action === "--compare") {
	if (!requestedPath) {
		throw new Error(`${action} requires a JSON path`);
	}

	const targetPath = resolvePath(requestedPath);
	if (action === "--write") {
		fs.mkdirSync(path.dirname(targetPath), { recursive: true });
		fs.writeFileSync(targetPath, `${JSON.stringify(createReport(), null, 2)}\n`);
		console.log(`Wrote CSS audit baseline: ${path.relative(rootDir, targetPath)}`);
	} else {
		compareReports(createReport(), JSON.parse(read(targetPath)));
	}
} else {
	console.log(JSON.stringify(createReport(), null, 2));
}
