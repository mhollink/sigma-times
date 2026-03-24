export type WeeklyGuess = {
    name: string;
    actual: string;
    guesses: Record<string, String>;
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