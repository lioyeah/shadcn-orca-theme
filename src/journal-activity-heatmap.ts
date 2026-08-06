import type { Block } from "./orca.d.ts";

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

function assertFixture(condition: boolean, message: string): void {
	if (!condition) {
		throw new Error(`journal-activity-heatmap fixture: ${message}`);
	}
}

function runDevFixture(): void {
	const blocks: ActivityBlock[] = [
		{
			id: 1,
			created: new Date("2026-08-06T00:30:00+08:00"),
			modified: new Date("2026-08-06T08:00:00+08:00"),
		},
		{
			id: 2,
			created: new Date("2026-08-05T23:30:00+08:00"),
			modified: new Date("2026-08-06T00:10:00+08:00"),
		},
	];
	const today = new Date("2026-08-06T12:00:00+08:00");
	const snapshot = aggregateActivity(blocks, today);

	const dayCount = (date: string) =>
		snapshot.days.find((day) => day.date === date)?.count;

	assertFixture(snapshot.endDate === localDateKey(today), "endDate uses local today");
	assertFixture(snapshot.days.length === 365, "snapshot covers 365 days");
	assertFixture(dayCount("2026-08-05") === 1, "block 2 counts on creation day");
	assertFixture(dayCount("2026-08-06") === 2, "blocks aggregate on modification day");
	assertFixture(
		dayCount("2026-08-06") === 2,
		"same block create+modify same day counts once",
	);

	const block2Modified = blocks[1].modified;
	const utcModifiedKey = block2Modified.toISOString().slice(0, 10);
	assertFixture(
		utcModifiedKey !== localDateKey(block2Modified),
		"localDateKey differs from UTC ISO date for cross-midnight timestamps",
	);
	assertFixture(
		localDateKey(block2Modified) === "2026-08-06",
		"modification day uses local calendar date",
	);

	assertFixture(
		snapshot.days.every((day) => day.level >= 0 && day.level <= 4),
		"activity levels stay within 0-4",
	);
}

if (import.meta.env?.DEV) {
	runDevFixture();
}
