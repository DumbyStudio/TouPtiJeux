import React from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MainFrame } from "../MainFrame/MainFrame";
import "./GamesMenu.css";

export type GamesMenuProps = {
    children: JSX.Element | JSX.Element[] | undefined;
};

export function GamesMenu({ children }: GamesMenuProps): JSX.Element {
    return (
        <div className="GamesMenu">
            <Header></Header>
            <MainFrame id={"Game"}>
                {children || <div>Menu Principal</div>}
            </MainFrame>
            <Footer></Footer>
        </div>
    );
}
