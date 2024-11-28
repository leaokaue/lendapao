import { events } from "../Events";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/hero";
import { Level } from "../objects/Level/Level";
import { NPC } from "../objects/Npc/Npcs";
import { Rod } from "../objects/Rod/Rod";
import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { TALKED_TO_A } from "../StoryFlags";
import { Vector2 } from "../Vector2";
import { CaveLevel1 } from "./CaveLevel1";
import { LevelCollision } from "./collision/LevelCollision";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(1),gridCells(3))

export class OutdoorLevel1 extends Level {
    constructor(params = {}) {
        super({});

        this.background = new Sprite({
            resource: resources.images.sky,
            frameSize: new Vector2(320,180)
          })
        
        const groundSprite = new Sprite({
        resource: resources.images.mapateste,
        frameSize: new Vector2(30*16,20*16)
        })


        this.addChild(groundSprite);

        const exit = new Exit(gridCells(1),gridCells(2))
        this.addChild(exit);

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
        const hero = new Hero(this.heroStartPosition.x,this.heroStartPosition.y);
        this.addChild(hero);

        const rod = new Rod(gridCells(10),gridCells(6))
        this.addChild(rod);

        const collision = new LevelCollision(30,30,0);
        this.walls = collision.walls;
        this.dangerSpaces = collision.wildSpots;
       
        this.type = 0;
        this.enviroment = 0;
        this.enemies = [0];

        this.addChild(collision);

        const npc1 = new NPC(gridCells(4),gridCells(2),{
            content: [
                {
                    string : "Você não pode passar.",
                    required:[TALKED_TO_A]
                },
                {
                    string : "Pare de tentar.",
                    addsFlag: TALKED_TO_A
                },
            ],
            portraitFrame: 1
        });
        this.addChild(npc1);

        // this.walls.add('64,48');
    }

    ready() {
        events.on("HERO_EXITS",this, () => {
            events.emit("CHANGE_LEVEL",new CaveLevel1({
                heroPosition: new Vector2(gridCells(7),gridCells(2))
            }))
        })
     
    }

    getBattleContent() {
        return {
            type : this.type,
            enviroment : this.enviroment,
            enemies: this.enemies,
            
        }
    }
    
}


