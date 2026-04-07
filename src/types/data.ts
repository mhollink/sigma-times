export type WeeklyGuess = {
	name: string;
	actual: string;
	guesses: Record<string, string>;
};

export type Points = Record<string, number>;
export type ScoredWeeklyGuess = WeeklyGuess & { points?: Points };

export type Stats = {
	total: number;
	min: number;
	avg: number;
	isBestTotal: boolean;
};

export type PlayerStats = Record<string, Stats>;
export type GroupedWeeklyGuess = Record<string, WeeklyGuess[]>;
