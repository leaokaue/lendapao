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

        this.shieldBar = new BattleBar({
            resource : resources.images.barraEscudo,
            frameSize : new Vector2(49,6),
            numOffset : 17,
            displayNum : true,
            horizontal : true,
            position : new Vector2(9,121),
            value : 0,
            maxValue : 50,

        })

        this.spiceBar = new BattleBar({
            resource : resources.images.barraTempero,
            frameSize : new Vector2(49,6),
            numOffset : 17,
            displayNum : true,
            horizontal : true,
            position : new Vector2(9,128),
            value : 0,
            maxValue : 25,

        })

        this.attackBar = new BattleBar({
            resource : resources.images.barraAtaque,
            frameSize : new Vector2(11,44),
            displayNum : false,
            horizontal : false,
            position : new Vector2(62,121),
            value : 0,
            maxValue : 100,

        })

        this.cookBar = new BattleBar({
            resource : resources.images.barraCulinaria,
            frameSize : new Vector2(11,44),
            displayNum : false,
            horizontal : false,
            position : new Vector2(75,121),
            value : 0,
            maxValue : 100,

        })

        this.itemBar = new BattleBar({
            resource : resources.images.barraItem,
            frameSize : new Vector2(11,44),
            displayNum : false,
            horizontal : false,
            position : new Vector2(88,121),
            value : 0,
            maxValue : 100,

        })
        
        this.hudFG = new Sprite({
            resource : resources.images.battleMenuFG,
            frameSize : new Vector2(320,180),
            drawLayer : "FG"
        });

        this.hudDetails = new Sprite({
            resource : resources.images.battleMenuDetails,
            frameSize : new Vector2(320,180),
            drawLayer : "DETAIL",
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

        this.buttonArray = [this.hudButton1,this.hudButton2,this.hudButton3]

        this.activeButton = 0;
        
        this.addChild(this.hudBG);
        this.addChild(this.healthBar);
        this.addChild(this.shieldBar);
        this.addChild(this.spiceBar);
        this.addChild(this.attackBar);
        this.addChild(this.cookBar);
        this.addChild(this.itemBar);
        this.addChild(this.hudFG);
        this.addChild(this.hudDetails);
        
        this.addChild(this.hudButton1)
        this.addChild(this.hudButton2)
        this.addChild(this.hudButton3)
        this.hudButton1.setSelected(true)
        
    }

    async ready() {
        this.position.y = 90;
        this.tween.easing(Easing.Cubic.Out)
        this.tween.to({y : 0},700).delay(700)
        this.tween.start()
    }

    step(delta,root) {
        this.tween.update()
        const input = root.input;

        if (input?.getActionJustPressed("KeyE")) {
            this.healthBar.targetValue *= 0.5
        }

        if (input?.getActionJustPressed("KeyR")) {
            this.shieldBar.targetValue += 20
        }

        if (input?.getActionJustPressed("KeyT")) {
            this.spiceBar.targetValue -= 5
        }

        if (input?.getActionJustPressed("KeyW")) {
            this.selectUp();
        }

        if (input?.getActionJustPressed("KeyS")) {
            this.selectDown();
        }

        if (input?.getActionJustPressed("Space")) {
            this.useActiveButton();
        }

        this.shieldBar.targetValue -= (delta / 1000) * 1.5;

        this.attackBar.targetValue += (delta / 1000) * 30;
        this.cookBar.targetValue += (delta / 1000) * 20;
        this.itemBar.targetValue += (delta / 1000) * 9;
    }

    selectDown() {
        this.activeButton += 1;
        this.activeButton %= 3;
        this.updateButton();
    }

    selectUp() {
        this.activeButton -= 1;
        if (this.activeButton < -1) {
            this.activeButton *= -1;
        }
        this.activeButton %= 3;
        console.log(this.activeButton)
        this.updateButton()
    }

    updateButton() {
        this.buttonArray.forEach((button,index) => {
            if (this.activeButton !== index) {
                button.setSelected(false)
            } else {
                button.setSelected(true)
            }
        })
    }

    useActiveButton() {
        switch (this.activeButton) {
            case 0:
                this.spiceBar.targetValue += 5;
                this.attackBar.targetValue = -30;
                break;
            case 1:
                this.healthBar.targetValue += 30;
                this.spiceBar.targetValue -= 7.5;
                this.cookBar.targetValue = -30;
                break;
            case 2:
                this.shieldBar.targetValue += 20
                this.itemBar.targetValue = -30;
                break;
        }
    }

}