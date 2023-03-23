import { ITableau } from "../Tableau/Utils";

export function time_convert(time: number) {
    let mins: number = Math.floor(time / 60);
    const hours: number = Math.floor(mins / 60);
    mins = mins % 60;
    const secs: number = time % 60;
    if (hours === 0) {
        if (mins === 0) {
            return `${secs}s`;
        }
        return `${mins}m ${secs}s`;
    }
    return `${hours}H ${mins}m ${secs}s`;
}

export function getSizeFromDifficulty(difficulty: number): number {
    switch (difficulty) {
        default:
        case 0:
            return 10;
        case 1:
            return 15;
        case 2:
            return 20;
        case 3:
            return 20;
    }
}

export function getFillProbFromDifficulty(difficulty: number): number {
    switch (difficulty) {
        default:
        case 0:
            return 4;
        case 1:
            return 3;
        case 2:
            return 3;
        case 3:
            return 2;
    }
}

const DifficultiesScores: number[] = [1000, 3000, 8000, 20000];
const DifficultiesMidTime: number[] = [200, 600, 1600, 4000];

function calculateSolutionScore(solution: ITableau) {
    let total = 0;
    for (let i = 0; i < solution.cases.length; i++) {
        let totaly = solution.indicTop[i].indices.length - 1;
        solution.indicTop[i].indices.forEach((i) => {
            totaly += i;
        });
        total += totaly;
        let totalx = solution.indicSide[i].indices.length - 1;
        solution.indicSide[i].indices.forEach((i) => {
            totalx += i;
        });
        total += totalx;
    }
    const moyenne = total / (solution.cases.length * 2) / solution.cases.length;
    return moyenne;
}

export function calculateScore(
    solution: ITableau,
    errors: number,
    time: number,
    difficulty: number
): number {
    return Math.round(
        calculateSolutionScore(solution) *
            DifficultiesScores[difficulty] *
            Math.abs((errors - 3) / 3) *
            (DifficultiesMidTime[difficulty] / time)
    );
}
