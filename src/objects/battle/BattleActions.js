
class BattleActions {
    constructor(){
        this.enemyActions = {
            swipe: {
                name: "Swipe",
                success : [
                    { type : "textMessage", text : "{ENEMY} swipes!"},
                    { type : "animation", text : "enemyLunge"},
                    { type : "effect", effect : "swipe"},
                    { type : "damagePlayerShield", sDamage : 15.0},
                    { type : "damagePlayer", damage : 40.0},
                ]
            }
        }
}}

export const battleActions = new BattleActions();
