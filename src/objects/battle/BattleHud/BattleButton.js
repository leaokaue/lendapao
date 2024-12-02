import { GameObject } from "../../../GameObject";
import { resources } from "../../../Resource";
import { Sprite } from "../../../Sprite";
import { Vector2 } from "../../../Vector2";
import { BattleText } from "./BattleText";

export class BattleButton extends GameObject {
    constructor({selected, context,position}) {
        super({});
        
        this.drawLayer = "HUD";

        this.selected = selected ?? false;

        this.inactive = false;

        this.position = position ?? new Vector2(0,0);

        this.context = context ?? "Butão";
        
        this.selectArrow = new Sprite({
            resource: resources.images.battleButtonArrow,
            frameSize : new Vector2(6,12)
        })
        
        this.selectArrow.hide()
        this.addChild(this.selectArrow)
        
        this.backdrop = new Sprite({
            resource: resources.images.battleButton,
            frameSize: new Vector2(46,12)
        });
        
        this.addChild(this.backdrop)
        
        this.text = new BattleText({
            text : this.context,
            position : new Vector2(0,0)
        })
        
        this.addChild(this.text);
    }

    setSelected(bool) {
        if (bool) {
            this.backdrop.position.x = 6
            this.text.position.x = 6
            this.selectArrow.show();
        } else {
            this.backdrop.position.x = 0
            this.text.position.x = 0
            this.selectArrow.hide()
        }
        this.selected = bool;
    }
}