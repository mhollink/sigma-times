import {Box, Card, Typography} from "@mui/material";
import type {FunctionComponent, PropsWithChildren} from "react";

type GlassCardProps = PropsWithChildren<{
    title: string;
}>

export const GlassCard: FunctionComponent<GlassCardProps> = ({title, children}) => (
    <Card
        sx={{
            p: 3,
            borderRadius: 2,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            color: "white",
        }}
    >
        <Typography variant="h5">
            {title}
        </Typography>

        <Box>
            {children}
        </Box>
    </Card>
)