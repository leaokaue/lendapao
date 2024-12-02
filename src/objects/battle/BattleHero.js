import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { Combatant } from "./Combatant";

export class BattleHero extends Combatant {
    constructor(config,battle) {
        super({})

        Object.keys(config).forEach(key => {
            this[key] = config[key]
        })
        
        this.drawLayer = "HUD";
        
        this.sprite = new GameObject({});
        
        this.addChild(this.sprite);

        this.battle = battle ?? null;
    }

    ready() {
        this.createSprite()
    }

    step(delta,root) {

    }

    createSprite() {
        const spr = new Sprite({
            resource : this.resource,
            frameSize : this.frameSize,
            position : new Vector2(-8,-5),
            vFrames : this.vFrames,
            hFrames : this.hFrames,
            animations : this.animations,
            frame : this.frame,
            animSpeed : 0.3,
        })

        console.log(this.animations)
        
        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32,32),
            position : new Vector2(-16,-18
            ),
            drawLayer : this.drawLayer
        })
        
        spr.animations.play("idle");

        this.sprite.addChild(shadow);
        this.sprite.addChild(spr);

        console.log(spr.resource)
    }

}