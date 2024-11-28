import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Exit extends GameObject {
    constructor(x,y) {
        super({
            position: new Vector2(x,y)
        })
        this.addChild(new Sprite({
            resource: resources.images.exit
        }))

        this.drawLayer = "FLOOR";
    }

    ready() {

        console.log(this.drawLayer)

        events.on("HERO_POSITION",this,pos => {
            //detect overlap
            const roundHeroX = Math.round(pos.x);
            const roundHeroY = Math.round(pos.y);

            if (roundHeroX === this.position.x && roundHeroY === this.position.y) {
                events.emit("HERO_EXITS")
            }
        })
    }
    
}