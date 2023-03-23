import React from "react";
import "./MainFrame.css";

export type MainFrameProps = {
    id?: string;
    children: JSX.Element | JSX.Element[];
};

export function MainFrame({ id, children }: MainFrameProps): JSX.Element {
    return (
        <div id={id} className={"MainFrame"}>
            {children}
        </div>
    );
}
