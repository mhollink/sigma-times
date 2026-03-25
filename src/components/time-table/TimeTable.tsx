import type {FunctionComponent} from "react";
import type {WeeklyGuess} from "../../types/data.ts"

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {GlassCard} from "../GlassCard.tsx";
import {RowGroup} from "./RowGroup.tsx";

import {headerStyle} from "./_styles.ts";

export type TimeTableProps = {
    data: Record<number, WeeklyGuess[]>
}

export const TimeTable: FunctionComponent<TimeTableProps> = ({data}) => {
    return (
        <GlassCard title={"Arrival times & Guesses"}>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: {xs: 'scroll', md: 'auto'},
                }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{...headerStyle, textAlign: "left"}}>Date</TableCell>
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
                            .sort(([weekA], [weekB]) => new Date(weekB).getTime() - new Date(weekA).getTime())
                            .slice(0, 4)
                            .map(([week, rows]) => (
                                <RowGroup key={week} week={week} rows={rows}/>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </GlassCard>
    );
}

