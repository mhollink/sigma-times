import type {GroupedWeeklyGuess, Points, ScoredWeeklyGuess} from "../types/data.ts";

export const useWeeklyScores = () => {
    function getAllTimeStats(allTimeData: ScoredWeeklyGuess[]): Points {
        return allTimeData
            .map(row => row.points)
            .filter(x => !!x)
            .reduce(
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

    return {sumWeeklyScores}
}