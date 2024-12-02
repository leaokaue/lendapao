import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { randfRange } from "../../helpers/Random";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { battleActions } from "./BattleActions";
import { battleInfo } from "./BattleInfo";
import { Combatant } from "./Combatant";

export class BattleEnemy extends Combatant {
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
        this.stats.maxCooldown *= randfRange(0.70,1.30);
        this.stats.cooldown = this.stats.maxCooldown;
        this.stats.maxHP *= randfRange(0.85,1.15);
        this.stats.hp = this.stats.maxHP;
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
            animSpeed : 0.5,
        })
        
        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32,32),
            position : new Vector2(-16,-18),
            drawLayer : this.drawLayer
            
        })

        spr.animations.play("idle");
        
        this.sprite.addChild(shadow);
        this.sprite.addChild(spr);

        // console.log(spr.resource)
    }

    handleAction(delta,root) {
        // console.log(this.stats.cooldown)
        if (this.stats.cooldown > 0) {
            this.stats.cooldown -= (delta / 1000) * this.stats.attackSpeed;
        } else {
            this.stats.cooldown = this.stats.maxCooldown;
            this.emitEvent();
        }
    }

    emitEvent() {
        const request = this.getRequest();
        // events.emit("BATTLE_EVENT",(this,request))
    }

    getRequest() {
        let request = {
            type : "enemyAction",
            actions : this.getRandomAction(),
            id : this.id,
        }

        // console.log(request)

        return request;
    }

    getRandomAction() {
        return battleActions.enemyActions.swipe.success
    }

}