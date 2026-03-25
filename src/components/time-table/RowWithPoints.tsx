import {TableCell, TableRow} from "@mui/material";
import {cell, cellLeft, hoverRow, winnerColumnStyle} from "./_styles.ts";
import type {ScoredWeeklyGuess} from "../../types/data.ts";

export const TableRowWithPoints = ({row}: { row: ScoredWeeklyGuess }) => (
    <TableRow sx={hoverRow}>
        <TableCell/>
        <TableCell sx={cellLeft}>{row.name}</TableCell>
        <TableCell sx={[cell, row.points!.eric === 0 ? winnerColumnStyle : {}]}>
            {row.guesses.eric} ({row.points!.eric})
        </TableCell>
        <TableCell sx={[cell, row.points!.niels === 0 ? winnerColumnStyle : {}]}>
            {row.guesses.niels} ({row.points!.niels})
        </TableCell>
        <TableCell sx={[cell, row.points!.marcel === 0 ? winnerColumnStyle : {}]}>
            {row.guesses.marcel} ({row.points!.marcel})
        </TableCell>
        <TableCell sx={cell}>{row.actual}</TableCell>
    </TableRow>
);