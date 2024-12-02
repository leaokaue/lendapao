import { GameObject } from "../../../GameObject";
import { resources } from "../../../Resource";
import { Sprite } from "../../../Sprite";
import { Vector2 } from "../../../Vector2";
import { getCharacterFrame, getCharacterWidth } from "../../SpriteTextString/SpriteFontMap";
import { getNumberFrame, getNumWidth, numFrameMap } from "../../SpriteTextString/SpriteNumberMap";

export class BattleText extends GameObject {
    constructor({text,numFont,position}) {
        super({});

        this.numFont = numFont ?? false;
        this.drawLayer = "TEXT";
        this.position = position ?? new Vector2(0,0);
        this.maxWidth = 42;
        this.lineHeight = 7;
        this.paddingLeft = 2;
        this.paddingTop = 0;

        this.text = text ?? "";

        this.words = this.updateText();

    }

    ready() {
        this.words = this.updateText();
    }
    
    step(delta) {
        this.words = this.updateText();
    }

    updateText() {
        return this.text.split(" ").map(word => {

            let wordWidth = 0;
            const chars = word.split("").map(char => {

                let charWidth = 0;
                
                if (!this.numFont){
                    charWidth = getCharacterWidth(char);
                    wordWidth += charWidth;
                } else {
                    charWidth = getNumWidth(char);
                    wordWidth += charWidth;
                }
                


                if (!this.numFont){

                    return {
                        width : charWidth,
                        sprite : new Sprite({
                            resource: resources.images.fontWhite,
                            hFrames: 13,
                            vFrames: 7,
                            frame: getCharacterFrame(char)
                        })}
                    } else {
                        return {
                            width : charWidth,
                            sprite : new Sprite({
                                resource: resources.images.fontNum,
                                hFrames: 13,
                                vFrames: 7,
                                frame: getNumberFrame(char)
                            })}
                    }
                })

            return {
                wordWidth,
                chars
            }
        })

    }

    drawImage(ctx,drawPosX,drawPosY) {

        let cursorX = drawPosX + this.paddingLeft;
        let cursorY = drawPosY + this.paddingTop;

        this.words.forEach(word => {

            const spaceRemaining = drawPosX + this.maxWidth- cursorX;
            if (spaceRemaining < word.wordWidth) {
                cursorY += this.lineHeight,
                cursorX = drawPosX + this.paddingLeft
            }

            word.chars.forEach(char => {
                

                const {sprite,width} = char;

                const withCharOffset = cursorX - 5;
                sprite.draw(ctx, withCharOffset,cursorY)

                cursorX += width;

                cursorX += 1;
            })

            cursorX += 3;
        });

        
    }
}