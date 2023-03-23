import React from "react";
import { useEffect, useState } from "react";
import Help from "../Help/Help";
import Tableau from "../Tableau/Tableau";
import Options from "../Options/Options";
import "./Nonogram.scss";
import StartChoice from "../StartChoice/StartChoice";
import EndMessage from "../EndMessage/EndMessage";
import { checkQuines, generateTab, getEmptyTab } from "../Tableau/Utils";
import type { ITableau } from "../Tableau/Utils";
import {
    calculateScore,
    getFillProbFromDifficulty,
    getSizeFromDifficulty,
} from "./Utils";

export default function Nonogram(): JSX.Element {
    const [difficulty, setDifficulty] = useState<number>(-1);
    const [size, setSize] = useState<number>(getSizeFromDifficulty(difficulty));
    const [fillProb, setFillProb] = useState<number>(
        getFillProbFromDifficulty(difficulty)
    );
    const [showHelp, setShowHelp] = useState<boolean>(false);

    const [gameMap, setGameMap] = useState<number[][]>(getEmptyTab(size, size));
    const [solutionMap, setSolutionMap] = useState<ITableau>(
        generateTab(size, size, fillProb)
    );

    const [fillMode, setFillMode] = useState<number>(1);
    const [highlight, setHighlight] = useState<boolean>(false);
    const [errors, setErrors] = useState<number>(0);
    const [end, setEnd] = useState<number>(0);

    const [counting, setCounting] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (counting) setTime((time) => time + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [counting]);

    const reset = (regenerate: boolean = true) => {
        if (regenerate) {
            setDifficulty(-1);
        } else {
            setGameMap(getEmptyTab(size, size));
            setTime(0);
            setErrors(0);
            setEnd(0);
            setHighlight(false);
            setCounting(true);
        }
    };

    const start = (difficulty: number) => {
        setDifficulty(difficulty);
        const newSize: number = getSizeFromDifficulty(difficulty);
        const newProb: number = getFillProbFromDifficulty(difficulty);
        setSize(newSize);
        setFillProb(newProb);
        setSolutionMap(generateTab(newSize, newSize, newProb));
        setGameMap(getEmptyTab(newSize, newSize));
        setTime(0);
        setErrors(0);
        setEnd(0);
        setHighlight(false);
        setCounting(true);
    };

    useEffect(() => {
        if (errors === 3) setEnd(2);
    }, [errors]);

    const fillCase = (x: number, y: number, button: number) => {
        //inverser les valeurs
        if (fillMode === 1) {
            if (button === 2) button = 1;
            else button = 2;
        }
        //si la valeur n'est pas correcte
        if (gameMap[x][y] !== solutionMap.cases[x][y] && !end) {
            //relever les erreurs
            if (button !== solutionMap.cases[x][y] && button !== gameMap[x][y])
                setErrors(errors + 1);
            //changer la valeur
            const newGameMap = gameMap.slice();
            newGameMap[x][y] = button;
            setGameMap(newGameMap);
        }
    };

    useEffect(() => {
        setGameMap(checkQuines(size, solutionMap, gameMap));
        checkWin();
        //eslint-disable-next-line
    }, [gameMap]);

    const checkWin = () => {
        let isGood: boolean = true;
        for (let x = 0; x < size; x++)
            for (let y = 0; y < size; y++)
                if (solutionMap.cases[x][y] !== gameMap[x][y]) isGood = false;
        if (isGood) {
            setEnd(1);
            setCounting(false);
        }
    };

    return (
        <div className={"Nonogram"}>
            {difficulty === -1 && (
                <StartChoice
                    start={(difficulty: number) => start(difficulty)}
                />
            )}
            {showHelp && <Help onClick={() => setShowHelp(false)} />}
            {end !== 0 && (
                <EndMessage
                    end={end}
                    restart={(regenerate: boolean) => {
                        setEnd(0);
                        reset(regenerate);
                    }}
                    difficulty={difficulty}
                    time={end === 1 ? time : -1}
                    score={calculateScore(
                        solutionMap,
                        errors,
                        time,
                        difficulty
                    )}
                ></EndMessage>
            )}
            <Tableau
                solutionMap={solutionMap}
                gameMap={gameMap}
                fillCase={fillCase}
                end={end !== 0}
                size={size}
                highlight={highlight}
            />
            <Options
                toggleHelp={() => setShowHelp(!showHelp)}
                toggleEmpty={() => setHighlight(!highlight)}
                switchFillMode={() => {
                    setFillMode(fillMode === 1 ? 2 : 1);
                }}
                reset={reset}
                fillMode={fillMode}
                errors={errors}
                time={time}
            ></Options>
        </div>
    );
}
