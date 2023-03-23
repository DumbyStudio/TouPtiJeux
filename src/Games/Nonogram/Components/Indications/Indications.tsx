import React, { useCallback } from "react";
import { useEffect, useRef } from "react";
import Indicateur, { IIndicateur } from "../Indicateur/Indicateur";
import { isColumnCompleted, isLineCompleted, ITableau } from "../Tableau/Utils";
import "./Indications.scss";

export type IIndications = {
    indices: IIndicateur[];
    direction: "row" | "column";
    solution: ITableau;
    gameMap: number[][];
    size: number;
    highlightIndex: (index: number) => void;
};

export default function Indications({
    indices,
    direction,
    solution,
    gameMap,
    size,
    highlightIndex,
}: IIndications): JSX.Element {
    const indicateursDir = direction === "row" ? "column" : "row";

    const refScroller = useRef<HTMLDivElement>(null);
    const refContent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroller: HTMLDivElement | null = refScroller.current;
        if (scroller) {
            scroller.scrollTop = scroller.scrollHeight;
        }
    }, []);

    const isCompleted = useCallback(
        (index: number) => {
            let completed = false;
            if (direction === "column") {
                completed = isLineCompleted(index, size, gameMap);
            } else {
                completed = isColumnCompleted(index, size, gameMap);
            }
            return completed;
        },
        [direction, gameMap, size]
    );

    return (
        <div
            ref={refScroller}
            className={"Indications Indications-" + direction}
        >
            <div
                ref={refContent}
                className={"IndicationsContent IndicationsContent-" + direction}
            >
                {indices.map((indicateur: IIndicateur, index: number) => {
                    let gapAfter = 2;
                    let gapBefore = 2;
                    if ((index + 1) % 5 === 0) gapAfter = 4;
                    if (index % 5 === 0) gapBefore = 4;

                    return (
                        <Indicateur
                            gapAfter={gapAfter}
                            gapBefore={gapBefore}
                            key={index}
                            direction={indicateursDir}
                            indices={indicateur.indices}
                            completed={isCompleted(index)}
                            onClick={() => {
                                highlightIndex(index);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
