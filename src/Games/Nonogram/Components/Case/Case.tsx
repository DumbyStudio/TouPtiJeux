import React from "react";
import "./Case.scss";

export type ICaseComponent = {
    goodValue: number;
    value?: number;
    onClick: (button: number) => void;
    useable: boolean;
    className: string;
};

export default function Case({
    goodValue,
    value = 0,
    onClick,
    useable,
    className,
}: ICaseComponent): JSX.Element {
    const onEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.buttons === 1 || event.buttons === 2) {
            event.preventDefault();
            onClick(event.buttons);
        }
    };

    return (
        <div
            className={
                className +
                " Case " +
                (useable ? "clickable " : "") +
                (value === 0
                    ? "Case-inconnue"
                    : value === 2
                    ? "Case-pleine"
                    : "Case-vide") +
                (value === 0
                    ? ""
                    : goodValue === value
                    ? " Case-connue"
                    : " Case-fausse")
            }
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
                if (event.buttons === 1 || event.buttons === 2) {
                    event.preventDefault();
                    onClick(event.buttons);
                }
            }}
            onMouseOver={(event: React.MouseEvent<HTMLDivElement>) =>
                onEnter(event)
            }
            onContextMenu={(event: React.MouseEvent<HTMLDivElement>) => {
                event.preventDefault();
            }}
        >
            <span className={"Case-Content"}>
                {value === 1 && value === goodValue ? (
                    <img src="images/nonogram/cross.png" alt="X"></img>
                ) : undefined}
            </span>
        </div>
    );
}
