export type WeeklyGuess = {
    week: number;
    name: string;
    eric: string;
    niels: string;
    marcel: string;
    actual: string;
};

export type Points = {
    eric: number,
    niels: number,
    marcel: number,
}

export type PlayerStats = {
    total: number;
    min: number;
    avg: number;
    isBestTotal: boolean;
    isBestMin: boolean;
    isBestAvg: boolean;
};

export type AllTimeStats = {
    eric: PlayerStats;
    niels: PlayerStats;
    marcel: PlayerStats;
};

export type ScoredWeeklyGuess = WeeklyGuess & { points?: Points };

export type GroupedWeeklyGuess = Record<number, ScoredWeeklyGuess>;