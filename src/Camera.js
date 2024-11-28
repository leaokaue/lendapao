import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
    constructor() {
        super({});

        events.on("HERO_POSITION",this,heroPosition => {
           this.moveCamera(heroPosition)
        //    console.log(heroPosition);
        })

        events.on("CHANGE_LEVEL",this, (newMap) => {
            this.moveCamera(newMap.heroStartPosition)
        })
    }
    
    moveCamera(pos) {
        const personHalf = 8;
        const canvasWidth = 320;
        const canvasHeight = 180;
        const halfWidth = -personHalf + canvasWidth / 2;
        const halfHeight = -personHalf + canvasHeight / 2;

        this.position =  new Vector2(
            -pos.x + halfWidth,
            -pos.y + halfHeight - 8
        )
    }
}