import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { awaitTimeout } from "../../helpers/AwaitTimeout";
import { lerp } from "../../helpers/Lerp";
import { moveTowards } from "../../helpers/MoveTowards";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Battle extends GameObject {
    constructor(type,enviroment,enemies) {
        super({
            position : new Vector2(0,0)
        });
        this.type = type;
        this.enviroment = enviroment;
        this.enemies = enemies;

        this.transitioning = true;
        this.transitionOpaque = false;

        this.locked = true;

        this.drawLayer = "HUD";

        this.exiting = false;

        const battleNode = new GameObject({

        });

        this.addChild(battleNode)

        this.battleObject = battleNode;

        const transition = new Sprite({
            resource : resources.images.battleTransition,
            frameSize : new Vector2(320,180),
            alpha : 0.0,

        });

        this.transitionObject = transition;

        this.addChild(transition);
    }


    ready() {
        this.addBattleSprites()
    }

    step(delta,root) {
        this.handleTransition(delta);

        const input = root.input;
        if (input?.getActionJustPressed("Escape")) {
            if (!this.exiting) {
                this.exiting = true;
                this.endBattle()
                return;
            }

            events.emit("END_TEXT_BOX");
        }
        
    }

    handleTransition(delta) {
        const t = this.transitionObject;
        if (this.transitioning) {
            if (t.alpha <= 1.0) {
                // t.alpha += (delta / 1000) * 2;
                t.alpha = lerp(t.alpha,1.0,(delta / 1000) * 7)
            }

        } else {
            if (t.alpha >= 0.0) {
                t.alpha = lerp(t.alpha,0.0,(delta / 1000) * 7)
            }
        }
    }

    async addBattleSprites() {
        let b = this.battleObject;
        console.log("created battle sprite")
        const bg = new Sprite({
            resource : resources.images.sky,
            frameSize : new Vector2(320,180)
        })

        const ground = new Sprite({
            resource : resources.images.battleGround0,
            frameSize : new Vector2(320,192)
        })

        const hud = new Sprite({
            resource : resources.images.HUDTest,
            frameSize : new Vector2(320,180)
        })
        await awaitTimeout(1700)

        b.addChild(bg);
        b.addChild(ground);
        b.addChild(hud)

        await awaitTimeout(500)

        this.transitioning = false;

    }

    async endBattle() {
        this.transitioning = true;
        await awaitTimeout(1200)
        this.battleObject.destroy()
        this.transitioning = false;
        await awaitTimeout(1200)
        events.emit("END_BATTLE",this)
        this.destroy()
    }

    // fade in black screen,

    // show background
    // show battle menu
    // health bar, spice bar
    // battlehero character
    // battlenpc character
    //


}