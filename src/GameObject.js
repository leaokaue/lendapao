import { events } from "./Events";
import { Vector2 } from "./Vector2";

export class GameObject {
    constructor({position}) {
        this.position = position ?? new Vector2(0,0);
        this.children = [];
        this.parent = null;
        this.hasReadyBeenCalled = false;
        this.isSolid = false;
        this.drawLayer = null;
    }

    stepEntry(delta,root) {
        this.children.forEach((child) => child.stepEntry(delta,root));
        
        if (!this.hasReadyBeenCalled) {
            this.hasReadyBeenCalled = true
            this.ready()
        }

        this.step(delta,root);
    }

    step(delta) {

    }

    ready() {
        
    }
    
    draw(ctx,x,y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        this.drawImage(ctx,drawPosX,drawPosY);

        this.getDrawChildrenOrder().forEach((child) => child.draw(ctx,drawPosX,drawPosY));

    }

    getDrawChildrenOrder() {
        return [...this.children].sort((a,b) => {

            if (a.drawLayer === "FLOOR") {
                return -1;
            }

            if (a.drawLayer === "BATTLE") {
                return 1;
            }

            // console.log(b.drawLayer)

            return a.position.y > b.position.y ? 1 : -1
        })
    }


    drawImage(ctx,drawPosX,drawPosY) {

    }

    destroy() {
        this.children.forEach(child => {
            child.destroy();
        })

        this.parent.removeChild(this);
    }

    addChild(gameObject) {
        this.children.push(gameObject);
        gameObject.parent = this;
    }

    removeChild(gameObject) {
        events.unsubscribe(gameObject)
        this.children = this.children.filter (g => {
            return gameObject !== g;
        })
    }

    hide() {
        this.alpha = 0.0;
    }

    show() {
        this.alpha = 1.0;
    }    

}