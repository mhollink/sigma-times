import { TableCell, TableRow } from "@mui/material";
import type { WeeklyGuess } from "../../types/data.ts";
import { cell, cellLeft, hoverRow } from "./_styles.ts";
import { useAverage } from "./useAverage.ts";

export const TableRowWithoutPoints = ({ row }: { row: WeeklyGuess }) => {
	const getAverage = useAverage();
	const average = getAverage(Object.values(row.guesses));
	return (
		<TableRow sx={hoverRow}>
			<TableCell />
			<TableCell sx={cellLeft}>{row.name}</TableCell>
			<TableCell sx={cell}>{row.guesses.eric}</TableCell>
			<TableCell sx={cell}>{row.guesses.niels}</TableCell>
			<TableCell sx={cell}>{row.guesses.marcel}</TableCell>
			<TableCell sx={cell}>{average}</TableCell>
			<TableCell sx={cell}>{row.actual}</TableCell>
		</TableRow>
	);
};
