import { subscribe } from "valtio";

import type { Block, RowPanel, ViewPanel } from "./orca.d.ts";

export type ActivityBlock = Pick<Block, "id" | "created" | "modified">;

export type ActivityDay = {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
};

export type ActivitySnapshot = {
	startDate: string;
	endDate: string;
	days: ActivityDay[];
};

/** Local calendar date as `YYYY-MM-DD` (not UTC). */
export function localDateKey(value: Date): string {
	const year = value.getFullYear();
	const month = String(value.getMonth() + 1).padStart(2, "0");
	const day = String(value.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function parseLocalDateKey(key: string): Date {
	const [year, month, day] = key.split("-").map(Number);
	return new Date(year, month - 1, day);
}

function addLocalDays(date: Date, dayOffset: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + dayOffset);
	return result;
}

function isDateKeyInRange(
	dateKey: string,
	startDate: string,
	endDate: string,
): boolean {
	return dateKey >= startDate && dateKey <= endDate;
}

function enumerateDateKeys(startDate: string, endDate: string): string[] {
	const keys: string[] = [];
	let cursor = parseLocalDateKey(startDate);
	const end = parseLocalDateKey(endDate);

	while (cursor <= end) {
		keys.push(localDateKey(cursor));
		cursor = addLocalDays(cursor, 1);
	}

	return keys;
}

function activityLevel(count: number, maxCount: number): ActivityDay["level"] {
	if (count <= 0 || maxCount <= 0) {
		return 0;
	}

	const ratio = count / maxCount;
	if (ratio <= 0.25) {
		return 1;
	}
	if (ratio <= 0.5) {
		return 2;
	}
	if (ratio <= 0.75) {
		return 3;
	}
	return 4;
}

export function buildDateRange(
	today: Date,
	dayCount = 365,
): { startDate: string; endDate: string } {
	const endDate = localDateKey(today);
	const startDate = localDateKey(addLocalDays(today, -(dayCount - 1)));
	return { startDate, endDate };
}

export function aggregateActivity(
	blocks: ActivityBlock[],
	today: Date,
): ActivitySnapshot {
	const { startDate, endDate } = buildDateRange(today);
	const blockIdsByDate = new Map<string, Set<Block["id"]>>();

	for (const dateKey of enumerateDateKeys(startDate, endDate)) {
		blockIdsByDate.set(dateKey, new Set());
	}

	for (const block of blocks) {
		const createdKey = localDateKey(block.created);
		if (isDateKeyInRange(createdKey, startDate, endDate)) {
			blockIdsByDate.get(createdKey)?.add(block.id);
		}

		const modifiedKey = localDateKey(block.modified);
		if (isDateKeyInRange(modifiedKey, startDate, endDate)) {
			blockIdsByDate.get(modifiedKey)?.add(block.id);
		}
	}

	const counts = enumerateDateKeys(startDate, endDate).map((dateKey) => ({
		dateKey,
		count: blockIdsByDate.get(dateKey)?.size ?? 0,
	}));
	const maxCount = counts.reduce((max, entry) => Math.max(max, entry.count), 0);

	const days: ActivityDay[] = counts.map(({ dateKey, count }) => ({
		date: dateKey,
		count,
		level: activityLevel(count, maxCount),
	}));

	return { startDate, endDate, days };
}

export function createEmptySnapshot(today: Date): ActivitySnapshot {
	return aggregateActivity([], today);
}

const QUERY_KIND_SELF_AND = 100;
const QUERY_KIND_BLOCK = 9;
const QUERY_OP_GE = 9;
const QUERY_OP_LE = 10;
const QUERY_DATE_ABSOLUTE = 2;
const QUERY_PAGE_SIZE = 500;
const GET_BLOCKS_BATCH_SIZE = 200;

type QueryDateValue = { t: number; v: number };
type QueryBlockCondition = {
	kind: typeof QUERY_KIND_BLOCK;
	created?: { op: number; value: QueryDateValue };
	modified?: { op: number; value: QueryDateValue };
};
type QueryDescriptionPayload = {
	q: {
		kind: typeof QUERY_KIND_SELF_AND;
		conditions: QueryBlockCondition[];
	};
	page?: number;
	pageSize?: number;
};
type QueryBackendResult = {
	totalCount?: number;
	page?: number;
	pageSize?: number;
	resultIds?: number[];
};

function dateKeyToStartMs(dateKey: string): number {
	const [year, month, day] = dateKey.split("-").map(Number);
	return new Date(year, month - 1, day, 0, 0, 0, 0).getTime();
}

function dateKeyToEndMs(dateKey: string): number {
	const [year, month, day] = dateKey.split("-").map(Number);
	return new Date(year, month - 1, day, 23, 59, 59, 999).getTime();
}

function buildBlockDateRangeQuery(
	field: "created" | "modified",
	startDate: string,
	endDate: string,
): QueryDescriptionPayload {
	const startMs = dateKeyToStartMs(startDate);
	const endMs = dateKeyToEndMs(endDate);
	const dateCondition = (op: number, valueMs: number): QueryBlockCondition => ({
		kind: QUERY_KIND_BLOCK,
		[field]: { op, value: { t: QUERY_DATE_ABSOLUTE, v: valueMs } },
	});

	return {
		q: {
			kind: QUERY_KIND_SELF_AND,
			conditions: [
				dateCondition(QUERY_OP_GE, startMs),
				dateCondition(QUERY_OP_LE, endMs),
			],
		},
	};
}

async function queryAllBlockIds(
	description: QueryDescriptionPayload,
): Promise<number[]> {
	const ids: number[] = [];
	let page = 1;
	let totalCount = Number.POSITIVE_INFINITY;

	while ((page - 1) * QUERY_PAGE_SIZE < totalCount) {
		const result = (await orca.invokeBackend("query", {
			...description,
			page,
			pageSize: QUERY_PAGE_SIZE,
		})) as QueryBackendResult;
		const pageIds = result?.resultIds ?? [];
		totalCount = result?.totalCount ?? pageIds.length;
		ids.push(...pageIds);
		if (pageIds.length === 0) {
			break;
		}
		page += 1;
	}

	return ids;
}

async function fetchActivityBlocksByIds(ids: number[]): Promise<ActivityBlock[]> {
	if (ids.length === 0) {
		return [];
	}

	const blocks: ActivityBlock[] = [];
	for (let index = 0; index < ids.length; index += GET_BLOCKS_BATCH_SIZE) {
		const batch = ids.slice(index, index + GET_BLOCKS_BATCH_SIZE);
		const fetched = (await orca.invokeBackend("get-blocks", batch)) as Block[];
		for (const block of fetched ?? []) {
			blocks.push({
				id: block.id,
				created: block.created,
				modified: block.modified,
			});
		}
	}
	return blocks;
}

async function collectActivityBlocks(
	startDate: string,
	endDate: string,
): Promise<ActivityBlock[]> {
	const createdIds = await queryAllBlockIds(
		buildBlockDateRangeQuery("created", startDate, endDate),
	);
	const modifiedIds = await queryAllBlockIds(
		buildBlockDateRangeQuery("modified", startDate, endDate),
	);
	const uniqueIds = [...new Set([...createdIds, ...modifiedIds])];
	return fetchActivityBlocksByIds(uniqueIds);
}

export type ActivityCollector = {
	load(today: Date): Promise<ActivitySnapshot>;
	cancel(): void;
};

export function createActivityCollector(): ActivityCollector {
	let requestToken = 0;
	const snapshotCache = new Map<string, ActivitySnapshot>();
	let lastSuccessfulSnapshot: ActivitySnapshot | null = null;

	return {
		cancel() {
			requestToken += 1;
		},
		async load(today: Date): Promise<ActivitySnapshot> {
			const requestId = ++requestToken;
			const { startDate, endDate } = buildDateRange(today);
			const cacheKey = `${startDate}:${endDate}`;
			const cachedSnapshot = snapshotCache.get(cacheKey);
			if (cachedSnapshot) {
				return cachedSnapshot;
			}

			const fallback = (): ActivitySnapshot =>
				lastSuccessfulSnapshot ?? createEmptySnapshot(today);

			try {
				const blocks = await collectActivityBlocks(startDate, endDate);
				if (requestId !== requestToken) {
					return fallback();
				}
				const snapshot = aggregateActivity(blocks, today);
				snapshotCache.set(cacheKey, snapshot);
				lastSuccessfulSnapshot = snapshot;
				return snapshot;
			} catch {
				if (requestId !== requestToken) {
					return fallback();
				}
				return fallback();
			}
		},
	};
}

const HEATMAP_ROOT_CLASS = "shadcn-journal-activity-heatmap";
const MAX_WEEK_COLUMNS = 53;
const WEEKDAY_COUNT = 7;

type PanelNode = RowPanel | ViewPanel;

type GridCell =
	| { kind: "placeholder" }
	| { kind: "day"; date: string; count: number; level: ActivityDay["level"] };

type WeekGridLayout = {
	columns: GridCell[][];
	monthLabels: Array<{ column: number; label: string }>;
};

function isViewPanel(panel: PanelNode): panel is ViewPanel {
	return "view" in panel;
}

function walkViewPanels(
	root: PanelNode,
	visit: (panel: ViewPanel) => void,
): void {
	if (isViewPanel(root)) {
		visit(root);
		return;
	}
	for (const child of root.children) {
		walkViewPanels(child as PanelNode, visit);
	}
}

function findActiveJournalMountRoot(): HTMLElement | null {
	const state = orca.state as { panels: RowPanel; activePanel: string };
	const activePanel = orca.nav.findViewPanel(
		state.activePanel,
		state.panels,
	);
	if (activePanel?.view === "journal") {
		const panelElement = document.getElementById(activePanel.id);
		const editor = panelElement?.querySelector(".orca-block-editor");
		if (editor instanceof HTMLElement) {
			return editor;
		}
	}

	let fallback: HTMLElement | null = null;
	walkViewPanels(state.panels, (panel) => {
		if (fallback || panel.view !== "journal") {
			return;
		}
		const panelElement = document.getElementById(panel.id);
		const editor = panelElement?.querySelector(".orca-block-editor");
		if (editor instanceof HTMLElement) {
			fallback = editor;
		}
	});
	return fallback;
}

function mondayFirstWeekdayIndex(date: Date): number {
	const day = date.getDay();
	return day === 0 ? 6 : day - 1;
}

function formatActivityRange(snapshot: ActivitySnapshot): string {
	return `${snapshot.startDate} – ${snapshot.endDate}`;
}

function buildWeekGrid(days: ActivityDay[]): WeekGridLayout {
	const cells: GridCell[] = [];
	const startPad = mondayFirstWeekdayIndex(parseLocalDateKey(days[0]?.date ?? localDateKey(new Date())));

	for (let index = 0; index < startPad; index += 1) {
		cells.push({ kind: "placeholder" });
	}

	for (const day of days) {
		cells.push({
			kind: "day",
			date: day.date,
			count: day.count,
			level: day.level,
		});
	}

	const endPad = (WEEKDAY_COUNT - (cells.length % WEEKDAY_COUNT)) % WEEKDAY_COUNT;
	for (let index = 0; index < endPad; index += 1) {
		cells.push({ kind: "placeholder" });
	}

	const columns: GridCell[][] = [];
	for (let index = 0; index < cells.length; index += WEEKDAY_COUNT) {
		columns.push(cells.slice(index, index + WEEKDAY_COUNT));
	}
	if (columns.length > MAX_WEEK_COLUMNS) {
		columns.length = MAX_WEEK_COLUMNS;
	}

	const monthLabels: WeekGridLayout["monthLabels"] = [];
	const seenMonths = new Set<string>();
	for (const [columnIndex, column] of columns.entries()) {
		for (const cell of column) {
			if (cell.kind !== "day") {
				continue;
			}
			const date = parseLocalDateKey(cell.date);
			if (date.getDate() !== 1) {
				continue;
			}
			const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
			if (seenMonths.has(monthKey)) {
				continue;
			}
			seenMonths.add(monthKey);
			monthLabels.push({
				column: columnIndex,
				label: new Intl.DateTimeFormat("zh-CN", { month: "short" }).format(date),
			});
			break;
		}
	}

	return { columns, monthLabels };
}

function createHeatmapShell(): HTMLElement {
	const section = document.createElement("section");
	section.className = HEATMAP_ROOT_CLASS;
	section.setAttribute("aria-label", "最近一年的块活动");
	section.innerHTML = `
<div class="shadcn-journal-activity-header">
  <span class="shadcn-journal-activity-title">活动</span>
  <span class="shadcn-journal-activity-range"></span>
</div>
<div class="shadcn-journal-activity-grid" role="presentation"></div>
<div class="shadcn-journal-activity-legend" aria-hidden="true">
  <span class="shadcn-journal-activity-legend-less">少</span>
  <span class="shadcn-journal-activity-cell is-level-0"></span>
  <span class="shadcn-journal-activity-cell is-level-1"></span>
  <span class="shadcn-journal-activity-cell is-level-2"></span>
  <span class="shadcn-journal-activity-cell is-level-3"></span>
  <span class="shadcn-journal-activity-cell is-level-4"></span>
  <span class="shadcn-journal-activity-legend-more">多</span>
</div>`;
	return section;
}

function renderActivityCell(cell: GridCell): HTMLSpanElement {
	const element = document.createElement("span");
	element.className = "shadcn-journal-activity-cell";
	if (cell.kind === "placeholder") {
		element.classList.add("is-placeholder");
		element.setAttribute("aria-hidden", "true");
		return element;
	}
	element.classList.add(`is-level-${cell.level}`);
	element.dataset.date = cell.date;
	element.dataset.count = String(cell.count);
	return element;
}

function renderHeatmapSnapshot(
	root: HTMLElement,
	snapshot: ActivitySnapshot,
): void {
	const rangeElement = root.querySelector<HTMLElement>(
		".shadcn-journal-activity-range",
	);
	if (rangeElement) {
		rangeElement.textContent = formatActivityRange(snapshot);
	}

	const gridElement = root.querySelector<HTMLElement>(
		".shadcn-journal-activity-grid",
	);
	if (!gridElement) {
		return;
	}

	const { columns, monthLabels } = buildWeekGrid(snapshot.days);
	gridElement.replaceChildren();

	const monthsElement = document.createElement("div");
	monthsElement.className = "shadcn-journal-activity-months";
	monthsElement.setAttribute("aria-hidden", "true");
	for (const label of monthLabels) {
		const monthElement = document.createElement("span");
		monthElement.className = "shadcn-journal-activity-month-label";
		monthElement.dataset.column = String(label.column);
		monthElement.textContent = label.label;
		monthsElement.appendChild(monthElement);
	}
	gridElement.appendChild(monthsElement);

	const weeksElement = document.createElement("div");
	weeksElement.className = "shadcn-journal-activity-weeks";
	for (const column of columns) {
		const columnElement = document.createElement("div");
		columnElement.className = "shadcn-journal-activity-week-column";
		for (const cell of column) {
			columnElement.appendChild(renderActivityCell(cell));
		}
		weeksElement.appendChild(columnElement);
	}
	gridElement.appendChild(weeksElement);
}

function computeBlocksFingerprint(
	blocks: Record<string | number, Block | undefined>,
): string {
	let count = 0;
	let checksum = 0;
	for (const block of Object.values(blocks)) {
		if (!block) {
			continue;
		}
		count += 1;
		checksum ^= Number(block.id) ^ block.modified.getTime();
	}
	return `${count}:${checksum}`;
}

export function setupJournalActivityHeatmap(): () => void {
	let collector = createActivityCollector();
	let mountedRoot: HTMLElement | null = null;
	let heatmapElement: HTMLElement | null = null;
	let scanFrame: number | null = null;
	let loadGeneration = 0;
	let blocksFingerprint = computeBlocksFingerprint(orca.state.blocks);

	const clearScanFrame = () => {
		if (scanFrame != null) {
			cancelAnimationFrame(scanFrame);
			scanFrame = null;
		}
	};

	const unmountHeatmap = () => {
		collector.cancel();
		loadGeneration += 1;
		heatmapElement?.remove();
		heatmapElement = null;
		mountedRoot = null;
	};

	const loadAndRender = async () => {
		const element = heatmapElement;
		if (!element) {
			return;
		}
		const requestGeneration = ++loadGeneration;
		const snapshot = await collector.load(new Date());
		if (requestGeneration !== loadGeneration || heatmapElement !== element) {
			return;
		}
		renderHeatmapSnapshot(element, snapshot);
	};

	const mountHeatmap = (mountRoot: HTMLElement) => {
		unmountHeatmap();
		mountedRoot = mountRoot;
		heatmapElement = createHeatmapShell();
		mountRoot.appendChild(heatmapElement);
		void loadAndRender();
	};

	const scan = () => {
		const mountRoot = findActiveJournalMountRoot();
		if (!mountRoot) {
			unmountHeatmap();
			return;
		}

		if (
			heatmapElement &&
			(!heatmapElement.isConnected || mountedRoot !== mountRoot)
		) {
			unmountHeatmap();
		}

		if (!heatmapElement) {
			mountHeatmap(mountRoot);
		}
	};

	const scheduleScan = () => {
		clearScanFrame();
		scanFrame = requestAnimationFrame(() => {
			scanFrame = null;
			scan();
		});
	};

	const refreshData = () => {
		collector.cancel();
		collector = createActivityCollector();
		if (heatmapElement) {
			void loadAndRender();
		}
	};

	const stateUnsub = subscribe(orca.state, () => {
		const nextFingerprint = computeBlocksFingerprint(orca.state.blocks);
		const blocksChanged = nextFingerprint !== blocksFingerprint;
		if (blocksChanged) {
			blocksFingerprint = nextFingerprint;
			refreshData();
		}
		scheduleScan();
	});

	const mountTarget = document.querySelector("#main") ?? document.body;
	const domObserver = new MutationObserver(() => {
		scheduleScan();
	});
	domObserver.observe(mountTarget, { childList: true, subtree: true });

	scan();

	return () => {
		stateUnsub();
		domObserver.disconnect();
		clearScanFrame();
		unmountHeatmap();
		collector.cancel();
	};
}

function assertFixture(condition: boolean, message: string): void {
	if (!condition) {
		throw new Error(`journal-activity-heatmap fixture: ${message}`);
	}
}

function localDateTime(
	year: number,
	month: number,
	day: number,
	hour: number,
	minute = 0,
	second = 0,
): Date {
	return new Date(year, month - 1, day, hour, minute, second);
}

function localTimeOn(date: Date, hour: number, minute = 0, second = 0): Date {
	return new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		hour,
		minute,
		second,
	);
}

function countFor(snapshot: ActivitySnapshot, dateKey: string): number {
	return snapshot.days.find((day) => day.date === dateKey)?.count ?? 0;
}

function runDevFixture(): void {
	// Fixed local calendar anchor — all keys derived from these Date instances.
	const today = localDateTime(2020, 6, 15, 12, 0, 0);
	const yesterday = addLocalDays(today, -1);
	const todayKey = localDateKey(today);
	const yesterdayKey = localDateKey(yesterday);

	const blockSameDay: ActivityBlock = {
		id: 1,
		created: localTimeOn(today, 0, 30),
		modified: localTimeOn(today, 8, 0),
	};
	const blockCrossDay: ActivityBlock = {
		id: 2,
		created: localTimeOn(yesterday, 23, 30),
		modified: localTimeOn(today, 0, 10),
	};

	assertFixture(
		localDateKey(blockSameDay.created) === todayKey,
		"same-day block creation maps to today",
	);
	assertFixture(
		localDateKey(blockSameDay.modified) === todayKey,
		"same-day block modification maps to today",
	);
	assertFixture(
		localDateKey(blockCrossDay.created) === yesterdayKey,
		"cross-day block creation maps to yesterday",
	);
	assertFixture(
		localDateKey(blockCrossDay.modified) === todayKey,
		"cross-day block modification maps to today",
	);

	const sameDayOnly = aggregateActivity([blockSameDay], today);
	assertFixture(
		countFor(sameDayOnly, todayKey) === 1,
		"same block create+modify same day counts once",
	);

	const crossDayOnly = aggregateActivity([blockCrossDay], today);
	assertFixture(
		countFor(crossDayOnly, yesterdayKey) === 1,
		"cross-day block counts on creation day",
	);
	assertFixture(
		countFor(crossDayOnly, todayKey) === 1,
		"cross-day block counts on modification day",
	);

	const snapshot = aggregateActivity([blockSameDay, blockCrossDay], today);
	assertFixture(snapshot.endDate === todayKey, "endDate uses local today");
	assertFixture(snapshot.days.length === 365, "snapshot covers 365 days");
	assertFixture(
		countFor(snapshot, yesterdayKey) === 1,
		"combined snapshot: cross-day block on creation day",
	);
	assertFixture(
		countFor(snapshot, todayKey) === 2,
		"combined snapshot: same-day block once plus cross-day block on modification day",
	);

	const earlyToday = localTimeOn(today, 0, 10);
	const localKey = localDateKey(earlyToday);
	const utcKey = earlyToday.toISOString().slice(0, 10);
	assertFixture(localKey === todayKey, "early-morning timestamp buckets to local today");
	if (localKey !== utcKey) {
		assertFixture(
			countFor(crossDayOnly, todayKey) === 1,
			"aggregation follows localDateKey, not UTC ISO date",
		);
	}

	assertFixture(
		snapshot.days.every((day) => day.level >= 0 && day.level <= 4),
		"activity levels stay within 0-4",
	);
}

if (import.meta.env?.DEV) {
	runDevFixture();
}
