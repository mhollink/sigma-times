import type {GroupedWeeklyGuess, Points, ScoredWeeklyGuess} from "../types/data.ts";
import {usePointsCalculator} from "./usePointsCalculator.ts";

export const useWeeklyScores = () => {
    function groupWeeklyData(calculated: ScoredWeeklyGuess[]) {
        return calculated.reduce<GroupedWeeklyGuess>((acc, row) => {
            acc[row.week] = acc[row.week] || [];
            acc[row.week].push(row);
            return acc;
        }, {});
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

    function sumWeeklyScores(weeklyGuesses: GroupedWeeklyGuess) {
        return Object.fromEntries(Object.entries(weeklyGuesses)
            .map(([week, guesses]) => {
                const summedScores = getAllTimeStats(guesses);
                return [week, summedScores]
            })
        )
    }

    return {
        groupWeeklyData,
        sumWeeklyScores
    }
}