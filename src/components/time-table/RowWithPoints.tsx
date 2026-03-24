import {TableCell, TableRow} from "@mui/material";
import {cell, cellLeft, hoverRow} from "./_styles.ts";
import type {ScoredWeeklyGuess} from "../../types/data.ts";

export const TableRowWithPoints = ({row}: { row: ScoredWeeklyGuess }) => (
    <TableRow sx={hoverRow}>
        <TableCell/>
        <TableCell sx={cellLeft}>{row.name}</TableCell>
        <TableCell sx={cell}>{row.eric} ({row.points.eric})</TableCell>
        <TableCell sx={cell}>{row.niels} ({row.points.niels})</TableCell>
        <TableCell sx={cell}>{row.marcel} ({row.points.marcel})</TableCell>
        <TableCell sx={cell}>{row.actual}</TableCell>
    </TableRow>
);