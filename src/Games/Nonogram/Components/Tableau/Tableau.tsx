import React, { useCallback, useState } from "react";
import Case from "../Case/Case";
import "./Tableau.scss";
import Indications from "../Indications/Indications";
import { ITableau } from "./Utils";
import classNames from "classnames";

export type ITableauComponent = {
    solutionMap: ITableau;
    fillCase: (x: number, y: number, button: number) => void;
    gameMap: number[][];
    size: number;
    end: boolean;
    highlight: boolean;
};

export default function Tableau({
    solutionMap,
    fillCase,
    gameMap,
    size,
    end,
    highlight,
}: ITableauComponent): JSX.Element {
    const [highlightedColumns, setHighlightedColumns] = useState<number[]>([]);
    const [highlightedRows, setHighlightedRows] = useState<number[]>([]);

    const highlightColumn = useCallback(
        (index: number) => {
            let hcols = highlightedColumns.slice();
            if (hcols.indexOf(index) === -1) {
                hcols.push(index);
            } else {
                hcols.splice(hcols.indexOf(index), 1);
            }
            setHighlightedColumns(hcols);
        },
        [highlightedColumns, setHighlightedColumns]
    );

    const highlightRow = useCallback(
        (index: number) => {
            let hrows = highlightedRows.slice();
            if (hrows.indexOf(index) === -1) {
                hrows.push(index);
            } else {
                hrows.splice(hrows.indexOf(index), 1);
            }
            setHighlightedRows(hrows);
        },
        [highlightedRows, setHighlightedRows]
    );

    return (
        <div className={"Tableau"}>
            <div className={"Tableau-infos"}></div>
            <Indications
                indices={solutionMap.indicTop}
                solution={solutionMap}
                gameMap={gameMap}
                size={size}
                direction={"row"}
                highlightIndex={highlightColumn}
            ></Indications>
            <Indications
                indices={solutionMap.indicSide}
                solution={solutionMap}
                gameMap={gameMap}
                size={size}
                direction={"column"}
                highlightIndex={highlightRow}
            ></Indications>
            <div
                className={
                    "Tableau-cases " + (highlight ? "highlight-empty" : "")
                }
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, " + 100 / size + "%)",
                    gridTemplateRows: "repeat(auto-fill, " + 100 / size + "%)",
                }}
            >
                {solutionMap.cases.map((solutionRow: number[], x: number) => {
                    return solutionRow.map(
                        (solutionCase: number, y: number) => {
                            let borders: string = "";
                            if ((y + 1) % 5 === 0)
                                borders += "Case-BorderRight ";
                            if (y % 5 === 0) borders += "Case-BorderLeft ";
                            if ((x + 1) % 5 === 0)
                                borders += "Case-BorderBottom ";
                            if (x % 5 === 0) borders += "Case-BorderTop ";
                            return (
                                <Case
                                    className={
                                        borders +
                                        classNames({
                                            CaseHighlight:
                                                highlightedColumns.indexOf(
                                                    y
                                                ) !== -1 ||
                                                highlightedRows.indexOf(x) !==
                                                    -1,
                                        })
                                    }
                                    useable={!end}
                                    key={x + "" + y}
                                    goodValue={solutionCase}
                                    value={gameMap[x][y]}
                                    onClick={(button: number) =>
                                        fillCase(x, y, button)
                                    }
                                />
                            );
                        }
                    );
                })}
            </div>
        </div>
    );
}
