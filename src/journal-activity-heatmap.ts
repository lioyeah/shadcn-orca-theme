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
