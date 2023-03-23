import React from "react";
import Modal from "../../../../Components/Modal/Modal";
import "./StartChoice.scss";

export type IStartChoice = {
    start: (difficulty: number) => void;
};

export default function StartChoice({ start }: IStartChoice): JSX.Element {
    return (
        <Modal className={"StartChoice"}>
            <p>Choisissez la difficultée dans laquelle vous voulez jouer :</p>
            <h1>Difficultées :</h1>
            <button className={"DifficultyButton"} onClick={() => start(0)}>
                Facile
            </button>
            <button className={"DifficultyButton"} onClick={() => start(1)}>
                Medium
            </button>
            <button className={"DifficultyButton"} onClick={() => start(2)}>
                Difficile
            </button>
            <button className={"DifficultyButton"} onClick={() => start(3)}>
                Impossible
            </button>
        </Modal>
    );
}
