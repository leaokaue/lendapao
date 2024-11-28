import { Camera } from "../../Camera.js";
import { events } from "../../Events.js";
import { GameObject } from "../../GameObject";
import { Input } from '../../Input.js';
import { storyFlags } from "../../StoryFlags.js";
import { Battle } from "../battle/Battle.js";
import { Inventory } from "../Inventory/inventory";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";
import { TextBox } from "../Textbox/Textbox.js";

export class Main extends GameObject {
    constructor () {
        super({});
        this.level = null;
        this.input = new Input();
        this.camera = new Camera();
    }

    ready() {

        const inventory = new Inventory();
        this.addChild(inventory);

        events.on("CHANGE_LEVEL",this,newLevelInstance => {
            this.setLevel(newLevelInstance)
        })

        events.on("HERO_REQUESTS_ACTION",this,(withObject) => {

            if (typeof withObject.getContent === "function") {
                const content = withObject.getContent();

                if (!content) {
                    return;
                }
    
                if (content.addsFlag) {
                    storyFlags.add(content.addsFlag);
                }

                const textbox = new SpriteTextString({
                    portraitFrame : content.portraitFrame,
                    string : content.string,
                });
                this.addChild(textbox)
                events.emit("START_TEXT_BOX");
    
                const endingSub = events.on("END_TEXT_BOX", this,() => {
                    textbox.destroy();
                    events.off(endingSub);
                })

            }

        })

        events.on("HERO_ENTER_BATTLE", this , (levelObject) => {

            if (typeof levelObject.getBattleContent === "function") {
                const content = levelObject.getBattleContent();

                if (!content) {
                    return;
                }

                const battle = new Battle({
                    type : content.type,
                    enviroment : content.enviroment,
                    enemies : content.enemies,
                })

                this.addChild(battle)

                events.emit("START_BATTLE");
                
                const endingSub = events.on("END_BATTLE", this, () => {
                    battle.destroy();
                    events.off(endingSub);
                })
            }
        })

    }
    

    setLevel(newLevelInstance) {

        if (this.level) {
            this.level.destroy();
        }

        this.level = newLevelInstance;
        this.addChild(this.level);

    }

    drawBackground(ctx) {
        this.level?.background.drawImage(ctx,0,0);
    }

    drawObjects(ctx) {
        this.children.forEach(child => {
            if (child.drawLayer !== "HUD") {
                child.draw(ctx,0,0);
            }
        })
    }

    drawForeground(ctx) {
        this.children.forEach(child => {
            if (child.drawLayer === "HUD") {
                child.draw(ctx,0,0);
            }
        })
    }
}