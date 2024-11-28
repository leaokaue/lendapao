import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Inventory extends GameObject {
    constructor() {
        super({
            position : new Vector2(0,1)
        });

        this.alpha = 1.0;
        this.drawLayer = "HUD";
        this.nextId = 0;
        this.items = [
            {
                id: -1,
                image: resources.images.rod
            }
        ]

        this.renderInventory()
    }

    ready() {

        events.on("HERO_PICKS_UP_ITEM",this,data => {
            this.addItem(data.image)
            
        })

        events.on("HERO_ENTER_BATTLE",this,data => {
            this.hide()
            
        })

        events.on("END_BATTLE",this,data => {
            this.show()
            
        })
    }

    renderInventory() {

        this.children.forEach(child => child.destroy())

        this.items.forEach((item,index) => {
            const sprite =  new Sprite({
                resource: item.image,
                position: new Vector2(index * 16,0),
                alpha : this.alpha
                
            })
            this.addChild(sprite)
        })
    }

    addItem(image) {
        this.nextId += 1;
        this.items.push({
            id: this.nextId,
            image: image
        })
        this.renderInventory()
    }

    removeItem(id) {
        this.items = this.items.filter(item => this.items.id !== id);
        this.renderInventory()
    }

    hide() {
        this.alpha = 0.0
        this.renderInventory()
    }

    show() {
        this.alpha = 1.0
        this.renderInventory()
    }
}