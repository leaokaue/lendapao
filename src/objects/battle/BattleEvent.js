import { GameObject } from "../../GameObject";

export class BattleEvent extends GameObject{
    constructor(request,battle) {
        this.request = request;
        this.battle = battle;

        this.tweens = [];
    }

    async ready() {
        if (this.request.type === typeof "enemyAction") {
            this.enemyAction(this.request.actions,this.request.id)
        }

        if (this.request.type === typeof "playerAction") {
            this.enemyAction(this.request.actions)
        }
    }

    step(delta, root) {

    }


    playerActions(actions) {

    }

    damageEnemy() {

    }

    useSpice() {
        
    }

    recoverShield() {

    }

    recoverHealth() {

    }

    recoverSpice() {

    }

    enemyAction(actions,id) {
        actions.forEach(type => {
            if (this.request.type === typeof "textMessage") {
                this.enemyAction(this.request.actions,this.request.id)
            } else  if (this.request.type === typeof "animation") {

            } else  if (this.request.type === typeof "effect") {

            } else  if (this.request.type === typeof "damagePlayer") {

            } else  if (this.request.type === typeof "damagePlayerShield") {

            } else  if (this.request.type === typeof "template") {

            } else  if (this.request.type === typeof "template") {

            }
        });
    }

    textMessage(text) {
        console.log(text)
    }

    animation() {

    }

    effect() {

    }

    damagePlayer() {

    }

    damagePlayerShield() {

    }

}