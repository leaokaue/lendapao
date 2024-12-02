import { Tween } from "@tweenjs/tween.js";
import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { awaitTimeout } from "../../helpers/AwaitTimeout";
import { lerp } from "../../helpers/Lerp";
import { moveTowards } from "../../helpers/MoveTowards";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { BattleHud } from "./BattleHud/BattleHud";
import { Combatant } from "./Combatant";
import { battleInfo } from "./BattleInfo";
import { BattleHero } from "./BattleHero";
import { BattleEnemy } from "./BattleEnemy";
import { randiRange } from "../../helpers/Random";

export class Battle extends GameObject {
    constructor(type,enviroment,enemies) {
        super({
            position : new Vector2(0,0)
        });
        this.type = type;
        this.enviroment = enviroment;
        this.enemies = enemies;

        this.canScroll = false;
        this.bg1 = null;
        this.bg2 = null;
        this.bgSpeed = 120;
        this.timeToScroll = 1000;

        this.transitioning = true;
        this.transitionOpaque = false;

        this.locked = true;

        this.drawLayer = "HUD";

        this.exiting = false;

        this.hud = null;

        this.player = [];

        this.enemies = [];

        const battleNode = new GameObject({
            drawLayer : "HUD",
        });

        this.addChild(battleNode)

        this.battleObject = battleNode;

        const transition = new Sprite({
            resource : resources.images.battleTransition,
            frameSize : new Vector2(320,180),
            alpha : 0.0,

        });

        this.transitionObject = transition;

        this.addChild(transition);
    }


    async ready() {
        events.on("BATTLE_EVENT",this, (eventCaller,callerRequest) => {
            this.addEvent(eventCaller,callerRequest)
        })

        this.addCombatants()
        this.addBattleSprites()

        await awaitTimeout(400)

        this.locked = false;
    }

    step(delta,root) {
        this.handleTransition(delta);

        this.parallaxBG(delta);

        const input = root.input;

        if (!this.locked) {
            this.handleEnemyActions(delta,root);
            this.handlePlayerActions(delta,root);
        }

        if (input?.getActionJustPressed("Escape")) {
            if (!this.exiting) {
                this.exiting = true;
                this.endBattle()
                return;
            }
        }

        
        
    }

    handleInput() {
    
    }


    addCombatants() {
        this.addPlayer()
        this.addEnemies()
    }

    addEvent(request) {
        const event = new BattleEvent(request,this);
        console.log(request);
    }

    async addPlayer() {
        let b = this.battleObject;

        const h = new BattleHero({
            ...battleInfo.player,
            position : new Vector2(60,75),
        },
        this,
        )

        this.player = h;
        await awaitTimeout(1900)
        b.addChild(h);
    }

    async addEnemies() {
        let b = this.battleObject;

        const randi = [...Array(randiRange(1,1)).keys()]

        randi.forEach((int,index) => {

            const rEnemy = this.getRandomEnemy();
            const rPosition = this.getEnemyPosition(randi.length,index);
            const rID = this.getRandomID();

            const e = new BattleEnemy({
                ...rEnemy,
                position : rPosition,
                id : rID
            },this)

            this.enemies.push(e)
        });

        await awaitTimeout(1900)

        this.enemies.forEach(enemy => {
            b.addChild(enemy);
        })
        
    }

    getRandomEnemy() {
        return battleInfo.enemies["carrot"]
    }

    getRandomID() {
        return randiRange(0,10000000000);
    }

    getEnemyPosition(size,enemy) {
        switch (size) {
            case 1:
                switch (enemy) {
                    case 0:
                        return new Vector2(260,75);
                }
            case 2:
                switch (enemy) {
                    case 0:
                        return new Vector2(250,55);
                    case 1:
                        return new Vector2(260,95);
                }
            case 3:
                switch (enemy) {
                    case 0:
                        return new Vector2(260,55);
                    case 1:
                        return new Vector2(270,95);
                    case 2:
                        return new Vector2(230,75);
                }
            case 4:
                switch (enemy) {
                    case 0:
                        return new Vector2(270,55);
                    case 1:
                        return new Vector2(280,95);
                    case 2:
                        return new Vector2(220,50);
                    case 3:
                        return new Vector2(230,90);
                }
        }
    }

    handlePlayerActions(delta,root) {
        if (this.locked) return;

        this.handleInput()
        this.handlePlayerCooldowns(delta,root)
    }

    handlePlayerCooldowns(delta,root) {

    }

    handleEnemyActions(delta,root) {
        if (this.locked) return;

        this.enemies.forEach(enemy => {
            enemy.handleAction(delta,root)
        })
    }

    handleTransition(delta) {
        const t = this.transitionObject;
        if (this.transitioning) {
            if (t.alpha <= 1.0) {
                // t.alpha += (delta / 1000) * 2;
                t.alpha = lerp(t.alpha,1.0,(delta / 1000) * 7)
            }

        } else {
            if (t.alpha >= 0.0) {
                t.alpha = lerp(t.alpha,0.0,(delta / 1000) * 7)
            }
        }
    }

    async addBattleSprites() {
        let b = this.battleObject;
        console.log("created battle sprite")
        b.hide();
        const back1 = new Sprite({
            resource : resources.images.sky,
            frameSize : new Vector2(320,180)
        })

        const back2 = new Sprite({
            resource : resources.images.sky,
            frameSize : new Vector2(320,180),
            position : new Vector2(315,0)
        })

        const ground = new Sprite({
            resource : resources.images.battleGround0,
            frameSize : new Vector2(320,192)
        })



        const hud = new BattleHud({})

        this.transitioning = !false
    
        await awaitTimeout(200)

        this.transitioning = !true

        await awaitTimeout(200)

        this.transitioning = !false

        await awaitTimeout(150)

        this.transitioning = !true

        await awaitTimeout(150)

        this.transitioning = !false

        await awaitTimeout(1200)

        b.show();

        b.addChild(back1);
        b.addChild(back2);
        this.bg1 = back1
        this.bg2 = back2
        this.canScroll = true;
        b.addChild(ground);
        b.addChild(hud)

        await awaitTimeout(500)

        this.transitioning = false;

    }

    async endBattle() {
        this.transitioning = true;
        await awaitTimeout(1200)
        this.battleObject.destroy()
        this.transitioning = false;
        await awaitTimeout(1200)
        events.emit("END_BATTLE",this)
        this.destroy()
    }


    parallaxBG(delta) {
        if (!this.canScroll) return;

        if (this.timeToScroll > 0) {
            this.timeToScroll -= delta * this.bgSpeed
        } else {
        this.timeToScroll = 1000
        let bg1 = this.bg1;

        if (bg1.position.x > -315) {
            bg1.position.x -= 1.0
        } else {
            bg1.position.x = 315
        }

        let bg2 = this.bg2;
        
        if (bg2.position.x > -315) {
            bg2.position.x -= 1.0
        } else {
            bg2.position.x = 315
        }}
    }
    // fade in black screen,

    // show background
    // show battle menu
    // health bar, spice bar
    // battlehero character
    // battlenpc character
    //


}