import React from "react";
import "./Modal.css";

export type IModal = {
    children: any;
    blurBkgd?: boolean;
    className?: string;
};

export default function Modal({
    children,
    blurBkgd = true,
    className,
}: IModal): JSX.Element {
    return (
        <div
            className={
                className +
                " ModalBackground " +
                (blurBkgd ? "ModalBackgroundBlured" : "")
            }
        >
            <div className={"Modal"}>{children}</div>
        </div>
    );
}
