import classNames from "classnames";
import React from "react";
import "./Indicateur.scss";

export type IIndicateur = {
    indices: number[];
};

export type IIndicateurComponent = {
    indices: number[];
    direction: string;
    gapAfter: number;
    gapBefore: number;
    completed: boolean;
    onClick: () => void;
};

export default function Indicateur({
    indices,
    direction,
    gapAfter,
    gapBefore,
    completed,
    onClick,
}: IIndicateurComponent): JSX.Element {
    let marginTop: number = 2;
    let marginBottom: number = 2;
    let marginRight: number = 2;
    let marginLeft: number = 2;
    if (direction === "column") {
        marginRight = gapAfter;
        marginLeft = gapBefore;
    } else {
        marginBottom = gapAfter;
        marginTop = gapBefore;
    }
    return (
        <div
            style={{ marginTop, marginLeft, marginBottom, marginRight }}
            className={
                "Indicateur Indicateur-" +
                direction +
                " " +
                classNames({
                    IndicateurCompleted: completed,
                })
            }
            onClick={() => {
                onClick();
            }}
        >
            {indices.map((indice: number, index: number) => {
                return (
                    <span key={index} className={"Indicateur-number"}>
                        {indice}
                    </span>
                );
            })}
        </div>
    );
}
