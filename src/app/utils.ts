import { Point } from './point';
import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
    public toBoolean(value: any): boolean {
        return (value == 'true' || value == 'True' || value === true);
    }

    public toPoint(pointer: any) {
        return {
            x: pointer.left + pointer.width / 2,
            y: pointer.top + pointer.height / 2,
        };
    }

    public round(value: number): number {
        return Math.round(value * 100) / 100; // /* Merci la virgule flottante, but i'm your father ;-) */
    }

    // Returns a random integer between min (included) and max (included)
    public getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public convertToPoint(valeur: number, base: number): Point {
        let pt = new Point();
        pt.x = Math.floor(valeur / base);
        pt.y = valeur % base;

        return pt;
    }
}

export enum Orientation {
    Vertical,   //0
    Horizontal  //1
}

export enum TypeButton {
    Decrement,
    Increment  //1
}