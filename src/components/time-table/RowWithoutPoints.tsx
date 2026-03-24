import {TableCell, TableRow} from "@mui/material";
import {cell, cellLeft, hoverRow} from "./_styles.ts";
import type {WeeklyGuess} from "../../types/data.ts";

export const TableRowWithoutPoints = ({row}: {row: WeeklyGuess}) => (
    <TableRow sx={hoverRow}>
        <TableCell/>
        <TableCell sx={cellLeft}>{row.name}</TableCell>
        <TableCell sx={cell}>{row.guesses.eric}</TableCell>
        <TableCell sx={cell}>{row.guesses.niels}</TableCell>
        <TableCell sx={cell}>{row.guesses.marcel}</TableCell>
        <TableCell sx={cell}>{row.actual}</TableCell>
    </TableRow>
);
