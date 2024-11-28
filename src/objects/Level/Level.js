import { GameObject } from "../../GameObject";

export class Level extends GameObject {
    constructor() {
        super({});
        this.background = null;
        this.enviroment = 0;
        this.enemies = [0];
        this.hero = null;
    }
}