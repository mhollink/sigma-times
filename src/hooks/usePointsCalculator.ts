import {useTimeCalculator} from "./useTimeCalculator.ts";
import type {Points, ScoredWeeklyGuess, WeeklyGuess, AllTimeStats} from "../types/data.ts";

export const usePointsCalculator = () => {
    const {calculateDifference} = useTimeCalculator();

    function addPointsToWeeklyGuess(row: WeeklyGuess): ScoredWeeklyGuess {
        if (row.actual == "-") {
            return row;
        }

        const points: Points = {
            eric: calculateDifference(row.eric, row.actual),
            marcel: calculateDifference(row.marcel, row.actual),
            niels: calculateDifference(row.niels, row.actual)
        }

        return {
            ...row,
            points
        }
    }

    function getAllTimeStats(allTimeData: ScoredWeeklyGuess[]): Points {
        return allTimeData
            .map(row => row.points)
            .filter(x => !!x)
            .reduce<Scores>(
                (acc, curr) => {
                    acc.eric += curr.eric;
                    acc.marcel += curr.marcel;
                    acc.niels += curr.niels;
                    return acc;
                },
                {eric: 0, marcel: 0, niels: 0}
            )
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
                const avg = count ? total / count : 0;

                return [
                    player,
                    { total, min, avg },
                ];
            })
        ) as Record<typeof players[number], { total: number; min: number; avg: number }>;

        // Determine best (lowest) values
        const bestTotal = Math.min(...players.map(p => baseStats[p].total));
        const bestMin = Math.min(...players.map(p => baseStats[p].min));
        const bestAvg = Math.min(...players.map(p => baseStats[p].avg));

        // Second pass: add flags
        const result = Object.fromEntries(
            players.map((player) => {
                const stats = baseStats[player];

                return [
                    player,
                    {
                        ...stats,
                        isBestTotal: stats.total === bestTotal,
                        isBestMin: stats.min === bestMin,
                        isBestAvg: stats.avg === bestAvg,
                    },
                ];
            })
        );

        return result as AllTimeStats;
    }

    return {
        addPointsToWeeklyGuess,
        getPlayerStats,
        getAllTimeStats,
    }
}