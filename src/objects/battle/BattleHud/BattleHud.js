import { Tween, Easing} from "@tweenjs/tween.js";
import { GameObject } from "../../../GameObject";
import { resources } from "../../../Resource";
import { Sprite } from "../../../Sprite";
import { Vector2 } from "../../../Vector2";
import { BattleButton } from "./BattleButton";
import { BattleBar } from "./BattleBar";
import { awaitTimeout } from "../../../helpers/AwaitTimeout";


export class BattleHud extends GameObject {
    constructor() {
        super({});

        this.drawLayer = "HUD";

        this.tween = new Tween(this.position)

        this.hudBG = new Sprite({
            resource : resources.images.battleMenuBG,
            frameSize : new Vector2(320,180)
        });

        this.healthBar = new BattleBar({
            resource : resources.images.barraVida,
            frameSize : new Vector2(49,6),
            numOffset : 17,
            displayNum : true,
            horizontal : true,
            position : new Vector2(9,114),
            value : 0,
            maxValue : 100,

        })
        
        this.hudFG = new Sprite({
            resource : resources.images.battleMenuFG,
            frameSize : new Vector2(320,180)
        });

        this.hudDetails = new Sprite({
            resource : resources.images.battleMenuDetails,
            frameSize : new Vector2(320,180)
        });

        
        this.hudButton1 = new BattleButton({
            context : "Atacar",
            position : new Vector2 (4,137) 
        })
        
        this.hudButton2 = new BattleButton({
            context : "Culinária",
            position : new Vector2 (4,151) 
        })
        
        this.hudButton3 = new BattleButton({
            context : "Itens",
            position : new Vector2 (4,165) 
        })
        
        this.addChild(this.hudBG);
        this.addChild(this.healthBar);
        
        this.addChild(this.hudButton1)
        this.hudButton1.setSelected(true)
        this.addChild(this.hudButton2)
        this.addChild(this.hudButton3)
        
    }

    async ready() {
        this.position.y = 90;
        this.tween.easing(Easing.Cubic.Out)
        this.tween.to({y : 0},700).delay(700)
        this.tween.start()
        await awaitTimeout(200)
        // this.addChild(this.hudFG);
        // this.addChild(this.hudDetails);
    }

    step(delta,root) {
        this.tween.update()
        const input = root.input;
        if (input?.getActionJustPressed("Space")) {
            this.healthBar.targetValue *= 0.5
        }
        this.healthBar.targetValue += (delta / 1000) * 2;
    }

}