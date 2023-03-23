import React from "react";
import "./DinoClicker.css";
import Shop from "../Shop/Shop";
import Zoo from "../Zoo/Zoo";
import Clicker from "../Clicker/Clicker";

export type IDinoClicker = {};

export default function DinoClicker({}: IDinoClicker): JSX.Element {
    return (
        <div className={"DinoClicker"}>
            <Clicker></Clicker>
            <Zoo></Zoo>
            <Shop></Shop>
        </div>
    );
}
