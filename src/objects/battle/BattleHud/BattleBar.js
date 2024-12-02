import { GameObject } from "../../../GameObject";
import { clamp } from "../../../helpers/Clamp";
import { lerp } from "../../../helpers/Lerp";
import { Sprite } from "../../../Sprite";
import { Vector2 } from "../../../Vector2";
import { BattleText } from "./BattleText";

export class BattleBar extends GameObject {
    constructor({
        resource,
        frameSize,
        numOffset,
        displayNum,
        value,
        maxValue,
        horizontal,
        position,
        drawLayer,
        }) {
        super({});
        
        this.drawLayer = drawLayer;
        this.resource = resource ?? null;

        this.position = position ?? new Vector2(0,0),
        this.frameSize = frameSize ?? new Vector2(0,0),
        this.numOffset = numOffset ?? 0;
        this.displayNum = displayNum ?? true;
        this.targetValue = maxValue ?? 0
        this.value = value ?? 0;
        this.maxValue = maxValue ?? 100;
        this.horizontal = horizontal ?? true;

        this.baseFrameX = frameSize.x ?? 0;
        this.baseFrameY = frameSize.y ?? 0;
        
        this.basePosX = position.x ?? 0;
        this.basePosY = position.y ?? 0;

        this.barSprite = new Sprite({
            resource : this.resource,
            frameSize : this.frameSize,
            drawLayer : "BAR",
        });
        
        this.addChild(this.barSprite);
        
        if (displayNum) {
            this.numText = new BattleText({
                numFont : true,
                position : new Vector2(numOffset ?? 0,-5),
                text : `${this.value}/${this.maxValue}`,
               
            })

            this.addChild(this.numText)
        };

    }

    ready() {
        
    }

    step(delta,root) {

        this.updateValue(delta)
        this.updateNumbers()
        this.updateBar()
        // console.log(this.value,this.maxValue)
    }

    updateBar() {
        let targetX = Math.round((this.value / this.maxValue) * this.baseFrameX - this.baseFrameX ) * -1
        let targetY = Math.round((this.value / this.maxValue) * this.baseFrameY)

        if (this.horizontal) {
            // this.barSprite.position.x = targetX
            this.barSprite.frameSize.x = this.baseFrameX - targetX
        } else {
            // this.barSprite.position.y = targety
            // console.log(this.basePosY,this.baseFrameY,targetY)
            this.barSprite.position.y = this.baseFrameY - targetY
            // this.barSprite.frameSize.y = this.baseFrameY + targety
            // this.barSprite.frameSize.y = targety
        }

    }

    updateValue(delta) {
        this.value = lerp(this.value,this.targetValue,(delta / 1000) * 5)
        // this.value = Math.round(this.value);
        this.targetValue = clamp(this.targetValue,-100,this.maxValue)
        this.value = clamp(this.value,0,this.maxValue)
    }

    updateNumbers() {
        if (this.displayNum) {
            this.numText.text = `${Math.round(this.value)}/${this.maxValue}`

        }

    }

}