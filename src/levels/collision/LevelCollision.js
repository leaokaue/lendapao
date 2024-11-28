import { GameObject } from "../../GameObject";
import { Main } from "../../objects/Main/Main";
import { Rod } from "../../objects/Rod/Rod";
import { Vector2 } from "../../Vector2";

export class LevelCollision extends GameObject{
    constructor(width,height,level) {
        super({})
        this.blockArray = [];
        this.levelWidth = width ?? 0;
        this.levelHeight = height ?? 0;
        this.walls = new Set();
        this.wildSpots = new Set();
        this.level = level ?? 0;
        this.setLevelCollisionType();
        this.buildCollisionSet();
    }

    buildCollisionSet() {
        this.blockArray.forEach((tile,i) => {
            if (tile > 0) {
                const x = (i % this.levelWidth);
                const y = Math.floor(i / this.levelHeight);
                const wall = `${x*16},${y*16}`;
                switch (tile) {
                    case 16:
                        this.walls.add(wall);
                        break;
                    case 14:
                        this.wildSpots.add(wall);
                        break;
                }
                
                // console.log(vector);
                // const rod = new Rod(x*16,y*16);
                // this.addChild(rod);
                
            
            }
        })
    }

    setLevelCollisionType() {
        switch(this.level) {
            case 0:
                this.blockArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    16, 0, 0, 0, 0, 14, 14, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    16, 0, 0, 0, 0, 14, 14, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    16, 16, 0, 0, 0, 16, 16, 16, 16, 16, 16, 16, 16, 16, 0, 0, 0, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    16, 16, 0, 0, 0, 16, 16, 16, 16, 16, 16, 16, 16, 16, 0, 16, 0, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 16, 0, 0, 0, 16, 16, 16, 16, 0, 0, 0, 16, 16, 0, 16, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    16, 16, 0, 0, 0, 16, 16, 16, 16, 0, 16, 0, 16, 16, 0, 16, 0, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    16, 0, 0, 0, 0, 14, 14, 14, 14, 0, 0, 0, 14, 14, 0, 16, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    16, 0, 0, 0, 0, 14, 14, 14, 14, 0, 16, 0, 14, 14, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    16, 16, 16, 16, 16, 16, 16, 16, 16, 0, 0, 0, 16, 16, 16, 16, 16, 0, 0, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                    16, 0, 0, 0, 0, 14, 14, 14, 14, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 14, 14, 14, 14, 14, 0, 0, 16,
                    16, 0, 0, 0, 0, 14, 16, 14, 14, 16, 16, 16, 0, 16, 0, 0, 0, 0, 0, 16, 16, 16, 14, 14, 14, 14, 14, 0, 0, 16,
                    16, 16, 16, 16, 16, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                    16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
                    0, 0, 0, 0, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 7:
                break;
            case 8:
                break;
            case 9:
                break;
            case 10:
                break;
            case 11:
                break;
            
        }

        
    }
}