import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import * as Game from "./Games/index";
import { GamesMenu } from "./SiteParts/GamesMenu/GamesMenu";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route
            path="/"
            element={
                <GamesMenu>
                    <Game.Nonogram />
                </GamesMenu>
            }
        />,
        <Route
            path="/dev"
            element={
                <GamesMenu>
                    <Game.DinoClicker />
                </GamesMenu>
            }
        />,
    ])
);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
