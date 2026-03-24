import {GlassCard} from "../GlassCard.tsx";
import type {FunctionComponent} from "react";
import {Stack, Typography} from "@mui/material";
import {capitalizeFirstLetter} from "../../utils/string.ts";
import type {PlayerStats} from "../../types/data.ts";

export type ScoreCardProps = {
    name: string,
    score: PlayerStats,
}

const winnerStyle = {
    color: "#7CFFCB",
    fontWeight: 600,
    textShadow: "0 0 6px rgba(124, 255, 203, 0.9)",
};

const winnerStrong = {
    ...winnerStyle,
    textShadow: "0 0 10px rgba(124, 255, 203, 1)",
};

const winnerSubtle = {
    color: "#7CFFCB",
    textShadow: "0 0 4px rgba(124, 255, 203, 0.6)",
};

export const ScoreCard: FunctionComponent<ScoreCardProps> = ({ name, score }) => {
    return (
        <GlassCard title={capitalizeFirstLetter(name) + ":"}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">

                {/* Total */}
                <Typography
                    variant="h3"
                    component="span"
                    sx={{
                        ...(score.isBestTotal && winnerStrong),
                    }}
                >
                   {score.total}
                </Typography>

                <Stack alignItems="end">

                    {/* Best (min) */}
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{
                            ...(score.isBestMin && winnerSubtle),
                        }}
                    >
                        High: {score.min}
                    </Typography>

                    {/* Average */}
                    <Typography
                        variant="h6"
                        component="span"
                    >
                        Avg: {score.avg}
                    </Typography>

                </Stack>
            </Stack>
        </GlassCard>
    );
};