import {Fragment, FunctionComponent} from "react";
import {TableCell, TableRow} from "@mui/material";
import {TableRowWithoutPoints, TableRowWithPoints} from "./"
import {weekHeaderStyle, winnerColumnStyle} from "./_styles.ts";

type Scores = {
    eric: number;
    marcel: number;
    niels: number;
};

export type RowGroupProps = {
    rows: ScoredWeeklyGuess[];
    week: string;
}

export const RowGroup: FunctionComponent<RowGroupProps> = ({rows, week}) => {

    const weeklyScores = rows
        .map(row => row.points)
        .filter(x => !!x)
        .reduce<Scores>(
            (acc, curr) => {
                acc.eric += curr.eric;
                acc.marcel += curr.marcel;
                acc.niels += curr.niels;
                return acc;
            },
            {eric: 0, marcel: 0, niels: 0}
        )

    const minScore = Math.min(weeklyScores.eric, weeklyScores.niels, weeklyScores.marcel);

    const getCellStyle = (score: number) => ({
        ...weekHeaderStyle,
        textAlign: "center",
        ...(score === minScore && winnerColumnStyle),
    });

    return (
        <Fragment>
            <TableRow>
                <TableCell
                    colSpan={2}
                    sx={weekHeaderStyle}
                >
                    {week}
                </TableCell>
                <TableCell sx={getCellStyle(weeklyScores.eric)}>
                    {weeklyScores.eric}
                </TableCell>
                <TableCell sx={getCellStyle(weeklyScores.niels)}>
                    {weeklyScores.niels}
                </TableCell>
                <TableCell sx={getCellStyle(weeklyScores.marcel)}>
                    {weeklyScores.marcel}
                </TableCell>
                <TableCell sx={weekHeaderStyle}/>
            </TableRow>

            {rows.map((row) => (
                <Fragment key={`${week}-${row.name}`}>
                    {!row.points ? (
                        <TableRowWithoutPoints row={row}/>
                    ) : (
                        <TableRowWithPoints row={row}/>
                    )}
                </Fragment>
            ))}
        </Fragment>
    );
}