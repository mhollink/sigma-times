import type {FunctionComponent} from "react";
import type {WeeklyGuess} from "../types/data.ts";

import {Table, TableBody, TableCell, TableHead, TableRow,} from "@mui/material";
import {GlassCard} from "../GlassCard.tsx";
import {RowGroup} from "./RowGroup.tsx";

import {headerStyle} from "./_styles.ts";

export type TimeTableProps = {
    data: Record<number, WeeklyGuess[]>
}

export const TimeTable: FunctionComponent<TimeTableProps> = ({data}) => {
    return (
        <GlassCard title={"Arrival times & Guesses"}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{...headerStyle, textAlign: "left"}}>Week</TableCell>
                        <TableCell sx={{...headerStyle, textAlign: "left"}}>Team member</TableCell>
                        <TableCell sx={headerStyle}>Eric</TableCell>
                        <TableCell sx={headerStyle}>Niels</TableCell>
                        <TableCell sx={headerStyle}>Marcel</TableCell>
                        <TableCell sx={headerStyle}>Actual</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object
                        .entries(data)
                        .sort(([weekA], [weekB]) => Number(weekB) - Number(weekA))
                        .slice(0, 3) // cap at 3 weeks
                        .map(([week, rows]) => (
                            <RowGroup key={week} week={week} rows={rows}/>
                        ))}
                </TableBody>
            </Table>
        </GlassCard>
    );
}

