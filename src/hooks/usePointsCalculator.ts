import {useTimeCalculator} from "./useTimeCalculator.ts";
import type {AllTimeStats, Points, ScoredWeeklyGuess, WeeklyGuess} from "../types/data.ts";

export const usePointsCalculator = () => {
    const {calculateDifference} = useTimeCalculator();

    function addPointsToWeeklyGuess(row: WeeklyGuess): ScoredWeeklyGuess {
        if (row.actual == "-") {
            return row;
        }

        const points = Object.fromEntries(Object.entries(row.guesses)
            .map(([player, guess]) => [player, calculateDifference(guess, row.actual)]));

        return {
            ...row,
            points
        }
    }


    function getPlayerStats(allTimeData: ScoredWeeklyGuess[]): AllTimeStats {
        const weeklyPoints = Object.values(allTimeData);
        const count = weeklyPoints.length;
        const players = ["eric", "niels", "marcel"] as const;

        // First pass: calculate stats
        const baseStats = Object.fromEntries(
            players.map((player) => {
                const values = weeklyPoints.map(p => p[player]);

                const total = values.reduce((a, b) => a + b, 0);
                const min = Math.min(...values);
                const avg = count ? (total / count).toFixed(1) : 0;

                return [
                    player,
                    {total, min, avg},
                ];
            })
        ) as Record<typeof players[number], { total: number; min: number; avg: number }>;

        // Determine best (lowest) values
        const bestTotal = Math.min(...players.map(p => baseStats[p].total));

        // Second pass: add flags
        const result = Object.fromEntries(
            players.map((player) => {
                const stats = baseStats[player];

                return [
                    player,
                    {
                        ...stats,
                        isBestTotal: stats.total === bestTotal,
                    },
                ];
            })
        );

        return result as AllTimeStats;
    }

    return {
        addPointsToWeeklyGuess,
        getPlayerStats,
    }
}