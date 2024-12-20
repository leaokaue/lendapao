class Resources {
    constructor() {
        this.toLoad = {
            sky: "/sprites/sky.png",
            ground: "/sprites/ground.png",
            hero: "/sprites/hero-sheet.png",
            shadow: "/sprites/shadow.png",
            rod: "/sprites/rod.png",
            paocara: "/sprites/paocara.png",
            pao: "/sprites/pao.png",
            mapateste: "/sprites/maps/mapateste.png",
            cave: "/sprites/cave.png",
            caveGround: "/sprites/cave-ground.png",
            exit: "/sprites/exit.png",
            knight: "/sprites/knight-sheet-1.png",
            sign : "/sprites/sign.png",
            textbox : "/sprites/text-box.png",
            fontWhite : "/sprites/sprite-font-white.png",
            fontNum : "/sprites/numberfont-4px.png",
            portraits : "/sprites/portraits-sheet.png",
            battleTransition : "/sprites/battle/BattleTransition.png",
            battleMenuBG : "/sprites/battle/BattleMenuBG.png",
            battleButton : "/sprites/battle/BattleButton.png",
            battleButtonArrow : "/sprites/battle/BattleButtonArrow.png",
            battleMenuFG : "/sprites/battle/BattleMenuFG.png",
            battleMenuDetails : "/sprites/battle/BattleDetails.png",
            battleGround0 : "/sprites/battle/MapaBatalha0.png",
            HUDTest : "/sprites/battle/HUDTest.png",
            barraVida : "/sprites/battle/barras/BarraVida.png",
            barraEscudo : "/sprites/battle/barras/BarraEscudo.png",
            barraTempero : "/sprites/battle/barras/BarraTempero.png",
            barraAtaque : "/sprites/battle/barras/BarraAtaque.png",
            barraCulinaria : "/sprites/battle/barras/BarraCulinaria.png",
            barraItem : "/sprites/battle/barras/BarraItem.png",
            cenouro: "/sprites/cenouro.png",
            cenouroBattle : "/sprites/battle/cenourobattle.png",
            paoBattle : "/sprites/battle/paobattle.png"
            

        }

        this.images = {};

        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true
            }
        })

    }
}

export const resources = new Resources();