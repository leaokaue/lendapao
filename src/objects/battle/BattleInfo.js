import { Animations } from "../../Animations";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { resources } from "../../Resource";
import { Vector2 } from "../../Vector2";
import { BATTLE_IDLE } from "../Hero/heroAnimation";

class BattleInfo {
    constructor(){
        this.enemies = {

        carrot : {
            name : "Cenouro",
            stats : {
                hp : 100,
                maxHP : 100,
                shield : 0,
                maxShield : 10,
                shieldRegen : 0,
                level : 1,
                attackSpeed : 1,
                cooldown : 8,
                maxCooldown : 6,
            },
            moves : {swipe : "swipe",},
            resource : resources.images.cenouroBattle,
            frameSize : new Vector2(16,16),
            hFrames : 3,
            vFrames : 1,
            frame : 0,
            animations : new Animations({
                idle: new FrameIndexPattern(BATTLE_IDLE)})    
        }
    }

    this.player = {
        name : "Pão",
        stats : {
            hp : 100,
            maxHP : 100,
            shield : 0,
            maxShield : 50,
            shieldRegen : 0,
            level : 1,
        },
        moves : {},
        resource : resources.images.paoBattle,
        frameSize : new Vector2(16,16),
        hFrames : 3,
        vFrames : 1,
        frame : 0,
        animations : new Animations({
            idle : new FrameIndexPattern(BATTLE_IDLE)})     
    }
}}

export const battleInfo = new BattleInfo();
