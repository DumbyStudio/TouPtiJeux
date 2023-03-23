import React from "react";
import Modal from "../../../../Components/Modal/Modal";

export type IHelp = {
    onClick: () => void;
};

export default function Help({ onClick }: IHelp): JSX.Element {
    return (
        <Modal className={"Help"}>
            <p>
                Le but de ce jeu est de remplir la grille avec des cases pleines
                et des croix.
                <br />
                Vous pouvez remplir une case avec le clic gauche et poser une
                croix avec le clic droit.
                <br />
                <br />
                Les indications en haut du tableau et sur le côté vous
                permettent de déduire les cases à remplir :
            </p>
            <ul>
                <li>
                    un "1" indiquera une suite de 1 case pleine entourée de 2
                    croix
                </li>
                <li>
                    un "5" indiquera une suite de 5 cases pleines entourées de 2
                    croix
                </li>
            </ul>
            <p>
                En croisant ces informations vous pourrez déduire chaque cases
                et remplir le tableau.
                <br />
                <br />A vous de jouer !
            </p>
            <p>
                La case sous le bouton d'aide permet de placer des croix avec
                clic gauche.
            </p>
            <button onClick={() => onClick()}>Fermer l'aide</button>
        </Modal>
    );
}
