import {Container, Stack} from "@mui/material";
import {TimeTable} from "./components/time-table";
import {ScoreCard} from "./components/score-card/ScoreCard.tsx";
import {usePointsCalculator} from "./hooks/usePointsCalculator.ts";
import {useWeeklyScores} from "./hooks/useWeeklyScores.ts";
import {GlassCard} from "./components/GlassCard.tsx";
import {WeeklyScoresChart} from "./components/weekly-scores/WeeklyScoresChart.tsx";
import {AccumulatedScoresChart} from "./components/weekly-scores/AccumulatedScoresChart.tsx";
import {AppBar} from "./components/app-bar/AppBar.tsx";
import {useDataFile} from "./hooks/useDataFile.ts";
import type {WeeklyGuess} from "./types/data.ts";


export default function App() {
    const data = useDataFile();
    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            {!!data && (
                <AppContent arrivalTimes={data.arrivalTimes}/>
            )}
        </Container>
    );
}

interface AppContentProps {
    arrivalTimes: Record<number, WeeklyGuess[]>
}

function AppContent({arrivalTimes}: AppContentProps) {
    const {addPointsToWeeklyGuess, getPlayerStats} = usePointsCalculator();
    const {sumWeeklyScores} = useWeeklyScores();

    const scoredData = Object.fromEntries(Object.entries(arrivalTimes)
        .map(([week, data]) => [week, data.map(addPointsToWeeklyGuess)]))

    const weeklyScores = sumWeeklyScores(scoredData);
    const playerScores = getPlayerStats(weeklyScores);

    return (
        <Stack spacing={2}>
            <AppBar/>

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
                    <WeeklyScoresChart data={weeklyScores}/>
                </GlassCard>
                <GlassCard title={"Scores over time"}>
                    <AccumulatedScoresChart data={weeklyScores}/>
                </GlassCard>
            </Stack>

            <TimeTable data={scoredData}/>
        </Stack>
    )
}