import React, { useState } from "react";
import Modal from "../../../../Components/Modal/Modal";
import { time_convert } from "../Nonogram/Utils";
import { Difficulties } from "../StartChoice/Utils";
import "./EndMessage.scss";

export type IEndMessage = {
    end: number;
    restart: (regenerate: boolean) => void;
    difficulty: number;
    time: number;
    score: number;
};

export default function EndMessage({
    end,
    restart,
    difficulty,
    time,
    score,
}: IEndMessage): JSX.Element {
    if (
        !window.localStorage.getItem("BestTimes") ||
        !Array.isArray(
            JSON.parse(window.localStorage.getItem("BestTimes") || "")
        )
    ) {
        window.localStorage.setItem(
            "BestTimes",
            JSON.stringify(new Array<number>(-1, -1, -1, -1))
        );
    }
    let bestTimes = JSON.parse(
        window.localStorage.getItem("BestTimes") || ""
    ) as number[];
    if (
        !window.localStorage.getItem("BestScores") ||
        !Array.isArray(
            JSON.parse(window.localStorage.getItem("BestScores") || "")
        )
    ) {
        window.localStorage.setItem(
            "BestScores",
            JSON.stringify(new Array<number>(-1, -1, -1, -1))
        );
    }
    let bestScores = JSON.parse(
        window.localStorage.getItem("BestScores") || ""
    ) as number[];

    const [bestTime] = useState<number>(bestTimes[difficulty]);
    const [isBestTime] = useState<boolean>(bestTime > time || bestTime === -1);
    const [bestScore] = useState<number>(bestScores[difficulty]);
    const [isBestScore] = useState<boolean>(bestScore < score);

    if (isBestTime && time !== -1) {
        bestTimes[difficulty] = time;
        window.localStorage.setItem("BestTimes", JSON.stringify(bestTimes));
    }
    if (isBestScore && score !== -1) {
        bestScores[difficulty] = score;
        window.localStorage.setItem("BestScores", JSON.stringify(bestScores));
    }
    console.log(score);
    return (
        <Modal>
            {(end === 1 && (
                <>
                    <span className={"EndTitle"}>Vous avez Gagné !</span>
                    <span className={"EndMessage"}>
                        Vous avez terminé en mode {Difficulties[difficulty]} en{" "}
                        {time_convert(time)} avec un score de {score} !
                    </span>
                    <span className={"EndTitle"}>En mode Facile :</span>
                    {(isBestTime && (
                        <span className={"EndMessage"}>
                            C'est votre nouveau meilleur temps !
                            {bestTime !== -1 && (
                                <> L'ancien était {time_convert(bestTime)}</>
                            )}
                        </span>
                    )) || (
                        <span className={"EndMessage"}>
                            Meilleur temps : {time_convert(bestTime)}
                        </span>
                    )}
                    {(isBestScore && (
                        <span className={"EndMessage"}>
                            C'est votre nouveau meilleur score !
                            {bestScore !== -1 && (
                                <> L'ancien était {bestScore}</>
                            )}
                        </span>
                    )) || (
                        <span className={"EndMessage"}>
                            Meilleur score : {bestScore}
                        </span>
                    )}
                </>
            )) || <span className={"EndTitle"}>Vous avez Perdu !</span>}
            {end === 2 && (
                <button onClick={() => restart(false)}>Recommencer</button>
            )}

            <button onClick={() => restart(true)}>Nouvelle Grille</button>
        </Modal>
    );
}
