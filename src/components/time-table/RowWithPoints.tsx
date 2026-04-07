import { TableCell, TableRow } from "@mui/material";
import type { ScoredWeeklyGuess } from "../../types/data.ts";
import { cell, cellLeft, hoverRow, winnerColumnStyle } from "./_styles.ts";
import { useAverage } from "./useAverage.ts";

export const TableRowWithPoints = ({
	row,
}: {
	row: Required<ScoredWeeklyGuess>;
}) => {
	const getAverage = useAverage();
	const average = getAverage(Object.values(row.guesses));
	return (
		<TableRow sx={hoverRow}>
			<TableCell />
			<TableCell sx={cellLeft}>{row.name}</TableCell>
			<TableCell sx={[cell, row.points.eric === 0 ? winnerColumnStyle : {}]}>
				{row.guesses.eric} ({row.points.eric})
			</TableCell>
			<TableCell sx={[cell, row.points.niels === 0 ? winnerColumnStyle : {}]}>
				{row.guesses.niels} ({row.points.niels})
			</TableCell>
			<TableCell sx={[cell, row.points.marcel === 0 ? winnerColumnStyle : {}]}>
				{row.guesses.marcel} ({row.points.marcel})
			</TableCell>
			<TableCell sx={cell}>{average}</TableCell>
			<TableCell sx={cell}>{row.actual}</TableCell>
		</TableRow>
	);
};
