import { Point } from './point';

export enum State {
    Init,
    Indeterminate,
    Marked,
    clicked
}

export class Cell {
    public position: Point;
    public isMine: boolean;
    public state: State;
    public neerestMines: number;
    constructor() { }
}