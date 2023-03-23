import { IIndicateur } from "../Indicateur/Indicateur";

type ITableau = {
    cases: number[][];
    indicTop: IIndicateur[];
    indicSide: IIndicateur[];
};

function generateTab(sizeX: number, sizeY: number, proba: number): ITableau {
    let cases: number[][] = new Array<Array<number>>();
    let indicTop: IIndicateur[] = new Array<IIndicateur>();
    let indicSide: IIndicateur[] = new Array<IIndicateur>();
    for (let x = 0; x < sizeX; x++) {
        cases.push(new Array<number>());
        let indices: number[] = new Array<number>();
        let count = 0;
        for (let y = 0; y < sizeY; y++) {
            cases[x].push(Math.min(Math.floor(Math.random() * proba) + 1, 2));
            if (cases[x][y] === 2) count++;
            if ((cases[x][y] !== 2 || y === sizeY - 1) && count !== 0) {
                indices.push(count);
                count = 0;
            }
        }
        indicSide.push({ indices });
    }
    for (let y = 0; y < sizeY; y++) {
        let indices: number[] = new Array<number>();
        let count = 0;
        for (let x = 0; x < sizeX; x++) {
            if (cases[x][y] === 2) count++;
            if ((cases[x][y] !== 2 || x === sizeX - 1) && count !== 0) {
                indices.push(count);
                count = 0;
            }
        }
        indicTop.push({ indices });
    }
    return { cases, indicTop, indicSide };
}

function getEmptyTab(sizeX: number, sizeY: number): number[][] {
    let emptyMap: number[][] = new Array<Array<number>>();
    for (let x = 0; x < sizeX; x++) {
        emptyMap.push(new Array<number>());
        for (let y = 0; y < sizeY; y++) emptyMap[x].push(0);
    }

    return emptyMap;
}

const checkQuines = (
    size: number,
    solutionMap: ITableau,
    gameMap: number[][]
): number[][] => {
    let newGameMap = gameMap;
    for (let x = 0; x < size; x++) {
        if (isLineToComplete(x, size, solutionMap, gameMap))
            newGameMap = completeRow(x, size, solutionMap, gameMap);
    }
    for (let y = 0; y < size; y++) {
        if (isColumnToComplete(y, size, solutionMap, gameMap))
            newGameMap = completeColumn(y, size, solutionMap, gameMap);
    }
    return newGameMap;
};

const isLineToComplete = (
    lineNumber: number,
    size: number,
    solutionMap: ITableau,
    gameMap: number[][]
): boolean => {
    let goodQuineFill = true;
    let goodQuineCross = true;
    let completedLine = true;
    for (let y = 0; y < size; y++) {
        const solutionNumber = solutionMap.cases[lineNumber][y];
        const gameNumber = gameMap[lineNumber][y];
        if (solutionNumber === 2 && gameNumber !== 2) goodQuineFill = false;
        if (solutionNumber === 1 && gameNumber !== 1) goodQuineCross = false;
        if (gameNumber === 0) completedLine = false;
    }
    goodQuineCross = false; //cancel the option because it can cause bugs
    if ((goodQuineFill || goodQuineCross) && !completedLine) return true;
    return false;
};

const isLineCompleted = (
    lineNumber: number,
    size: number,
    gameMap: number[][]
): boolean => {
    for (let y = 0; y < size; y++) {
        if (gameMap[lineNumber][y] === 0) return false;
    }
    return true;
};

const isColumnToComplete = (
    columnNumber: number,
    size: number,
    solutionMap: ITableau,
    gameMap: number[][]
): boolean => {
    let goodQuineFill = true;
    let goodQuineCross = true;
    let completedLine = true;
    for (let x = 0; x < size; x++) {
        const solutionNumber = solutionMap.cases[x][columnNumber];
        const gameNumber = gameMap[x][columnNumber];
        if (solutionNumber === 2 && gameNumber !== 2) goodQuineFill = false;
        if (solutionNumber === 1 && gameNumber !== 1) goodQuineCross = false;
        if (gameNumber === 0) completedLine = false;
    }
    goodQuineCross = false; //cancel the option because it can cause bugs
    if ((goodQuineFill || goodQuineCross) && !completedLine) return true;
    return false;
};

const isColumnCompleted = (
    columnNumber: number,
    size: number,
    gameMap: number[][]
): boolean => {
    for (let x = 0; x < size; x++) {
        if (gameMap[x][columnNumber] === 0) return false;
    }
    return true;
};

const completeRow = (
    x: number,
    size: number,
    solutionMap: ITableau,
    gameMap: number[][]
): number[][] => {
    const newGameMap: number[][] = gameMap.slice();
    for (let y = 0; y < size; y++) {
        newGameMap[x][y] = solutionMap.cases[x][y];
    }
    return newGameMap;
};

const completeColumn = (
    y: number,
    size: number,
    solutionMap: ITableau,
    gameMap: number[][]
): number[][] => {
    const newGameMap: number[][] = gameMap.slice();
    for (let x = 0; x < size; x++) {
        newGameMap[x][y] = solutionMap.cases[x][y];
    }
    return newGameMap;
};

export {
    generateTab,
    getEmptyTab,
    checkQuines,
    isColumnCompleted,
    isLineCompleted,
};
export type { ITableau };
