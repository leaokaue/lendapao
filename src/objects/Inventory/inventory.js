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

        this.nextId = 0;
        this.items = [
            {
                id: -1,
                image: resources.images.rod
            }
        ]
        
        events.on("HERO_PICKS_UP_ITEM",this,data => {
            this.addItem(data.image)
            
        })

        this.renderInventory()
    }

    renderInventory() {

        this.children.forEach(child => child.destroy())

        this.items.forEach((item,index) => {
            const sprite =  new Sprite({
                resource: item.image,
                position: new Vector2(index * 16,0)
                
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
}