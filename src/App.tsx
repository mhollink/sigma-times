import {Container, Stack} from "@mui/material";
import {TimeTable} from "./components/time-table";
import {arrivalTimes} from "./data/arrival-times.ts"
import {ScoreCard} from "./components/score-card/ScoreCard.tsx";
import {usePointsCalculator} from "./hooks/usePointsCalculator.ts";
import {useWeeklyScores} from "./hooks/useWeeklyScores.ts";
import {GlassCard} from "./components/GlassCard.tsx";
import {WeeklyScoresChart} from "./components/weekly-scores/WeeklyScoresChart.tsx";
import {AccumulatedScoresChart} from "./components/weekly-scores/AccumulatedScoresChart.tsx";
import {useOcto} from "./hooks/useOcto.ts";

export default function App() {
    const {addPointsToWeeklyGuess, getPlayerStats} = usePointsCalculator();
    const {groupWeeklyData, sumWeeklyScores} = useWeeklyScores();
    const allTimeStats = arrivalTimes.map(addPointsToWeeklyGuess)
    const weeklyScores = sumWeeklyScores(groupWeeklyData(allTimeStats));
    const playerScores = getPlayerStats(weeklyScores);

    const octo = useOcto("");
    octo.updateGuesses(allTimeStats);

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Stack spacing={2}>
                <Stack spacing={3} direction="row" sx={{
                    "& > *": {
                        width: "100%",
                    },
                }}>
                    {Object.entries(playerScores).map(([player, score]) => (
                        <ScoreCard key={player} name={player} score={score}/>
                    ))}
                </Stack>

                <Stack spacing={3} direction="row" sx={{
                    "& > *": {
                        width: "100%",
                    },
                }}>

                    <GlassCard title={"Weekly scores"}>
                        <WeeklyScoresChart data={weeklyScores} />
                    </GlassCard>
                    <GlassCard title={"Scores over time"}>
                        <AccumulatedScoresChart data={weeklyScores} />
                    </GlassCard>
                </Stack>


                <TimeTable data={arrivalTimes}/>
            </Stack>


        </Container>
    );
}
