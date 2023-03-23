import React from "react";
import { time_convert } from "../Nonogram/Utils";
import "./Options.scss";

export type IOptions = {
    toggleHelp: () => void;
    switchFillMode: () => void;
    toggleEmpty: () => void;
    reset: (regenerate: boolean) => void;
    fillMode: number;
    errors: number;
    time: number;
};

export default function Options({
    toggleHelp,
    switchFillMode,
    toggleEmpty,
    reset,
    fillMode,
    errors,
    time,
}: IOptions): JSX.Element {
    return (
        <div className={"Options"}>
            <div className={"OptionsGroup"}>
                <span className={"Display"}>{time_convert(time)}</span>
                <span className={"Display"}>Erreurs : {errors}/3</span>
            </div>

            <div className={"OptionsGroup"}>
                <button className={"FillMode"} onClick={() => switchFillMode()}>
                    {fillMode === 1 ? (
                        <div className={"FillModeCase"}></div>
                    ) : (
                        <img
                            className={"FillModeCross"}
                            src="images/nonogram/cross.png"
                            alt="X"
                        ></img>
                    )}
                </button>
                <button
                    className={"HighlightButton"}
                    onClick={() => toggleEmpty()}
                >
                    Surligner les cases vides
                </button>
            </div>

            <div className={"OptionsGroup"}>
                <button className={"ResetButton"} onClick={() => reset(false)}>
                    Recommencer
                </button>
                <button className={"ResetButton"} onClick={() => reset(true)}>
                    Nouvelle Grille
                </button>
            </div>

            <div className={"OptionsGroup"}>
                <button className={"HelpButton"} onClick={() => toggleHelp()}>
                    ? Help
                </button>
            </div>
        </div>
    );
}
