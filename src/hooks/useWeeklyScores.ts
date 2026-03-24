import type {GroupedWeeklyGuess, ScoredWeeklyGuess} from "../types/data.ts";
import {usePointsCalculator} from "./usePointsCalculator.ts";

export const useWeeklyScores = () => {
    const {getAllTimeStats} = usePointsCalculator();

    function groupWeeklyData(calculated: ScoredWeeklyGuess[]) {
        return calculated.reduce<GroupedWeeklyGuess>((acc, row) => {
            acc[row.week] = acc[row.week] || [];
            acc[row.week].push(row);
            return acc;
        }, {});
    }

    function sumWeeklyScores(weeklyGuesses: GroupedWeeklyGuess) {
        return Object.fromEntries(Object.entries(weeklyGuesses)
            .map(([week, guesses]) => {
                const summedScores = getAllTimeStats(guesses)
                return [week, summedScores]
            })
        )
    }

    return {
        groupWeeklyData,
        sumWeeklyScores
    }
}