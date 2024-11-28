import { Animations } from "../../Animations";
import { events } from "../../Events";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { GameObject } from "../../GameObject";
import { gridCells, isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/MoveTowards";
import { DOWN, LEFT, RIGHT, UP } from "../../Input";
import { randiRange} from "../../helpers/Random";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { PICK_UP, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./heroAnimation";


export class Hero extends GameObject {
    constructor(x,y) {
        super({
            position: new Vector2(x,y)
        });

        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32,32),
            position : new Vector2(-8,-16),
        })

        this.addChild(shadow);

        this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(32,32),
            hFrames: 3,
            vFrames: 8,
            frame: 4,
            position : new Vector2(-8,-16),
            animations : new Animations({
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkUp : new FrameIndexPattern(WALK_UP),
                walkLeft : new FrameIndexPattern(WALK_LEFT),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
                standDown: new FrameIndexPattern(STAND_DOWN),
                standUp : new FrameIndexPattern(STAND_UP),
                standLeft : new FrameIndexPattern(STAND_LEFT),
                standRight: new FrameIndexPattern(STAND_RIGHT),
                pickUp: new FrameIndexPattern(PICK_UP),
            })
        })
        this.addChild(this.body);
        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
        this.itemPìckupTime = 0;
        this.itemPickupShell = null;
        this.isLocked = false;
        this.tilesUntilBattle = randiRange(1,1);
        this.inDanger = false;


        events.on("HERO_PICKS_UP_ITEM",this,data => {
          this.onItemPickup(data)
        })
    }

    ready() {
      events.on("START_TEXT_BOX",this,() => {
        this.isLocked = true;
        this.standAnimation()
      })
      events.on("END_TEXT_BOX",this,() => {
        this.isLocked = false;
        this.standAnimation()
      })
      
      events.on("START_BATTLE",this,() => {
        this.isLocked = true;
        console.log("battle start")
        this.standAnimation()
      })
      events.on("END_BATTLE",this,() => {
        this.isLocked = false;
        console.log("battle ended")
        this.standAnimation()
      })

    }

    step(delta,root) {
      
      if (this.isLocked) {
        return;
      }

      const input = root.input;
      if (input?.getActionJustPressed("Space")) {

        const objAtPosition = this.parent.children.find(child => {
          return child.position.matches(this.position.toNeighbor(this.facingDirection))
        })

        if (objAtPosition) {
          events.emit("HERO_REQUESTS_ACTION",objAtPosition);

        }
      }


      if (this.itemPìckupTime > 0) {
        this.handleItemPickup(delta)
        return;
      }

      const distance = moveTowards(this, this.destinationPosition, 1)
      const hasArrived = distance <= 0;

      if (hasArrived) {
        this.tryDanger(root);
        this.tryMove(root);
      }
      
      //this.roundPosition()
      
      this.tryEmitPosition()
        
        
    }

    handleItemPickup(delta) {

      this.itemPìckupTime -= delta;
      this.body.animations.play("pickUp")

      if (this.itemPìckupTime <= 0) {
        this.itemPickupShell.destroy()
      }
    }

    onItemPickup({image, position}) {
      console.log("item Picked Up")
      this.destinationPosition = position.duplicate();

      this.itemPìckupTime = 1200;

      this.itemPickupShell = new GameObject({});
      this.itemPickupShell.addChild(new Sprite({
        resource: image,
        position: new Vector2(0,-18)
      }))
      this.addChild(this.itemPickupShell);
    }

    randomizeDangerTiles() {
      this.tilesUntilBattle = randiRange(5,12);
    }

    tryDanger(root) {
      if (this.inDanger) {
        this.inDanger = false;
        this.tilesUntilBattle -= 1;

        if (this.tilesUntilBattle <= 0) {
          events.emit("HERO_ENTER_BATTLE",root?.level);
          this.randomizeDangerTiles();
          console.log("hero now enters battle");
        }

      }
    }

    isSpaceDanger(spaces,x,y) {

      const str = `${x},${y}`;
      const isSpaceDangerous = spaces.has(str);
  
      return isSpaceDangerous;
    }

    tryEmitPosition() {

      if (this.lastX === this.position.x && this.lastY === this.position.y) {
        return;
      }

      this.lastX = this.position.x;
      this.lastY = this.position.y;

      events.emit("HERO_POSITION",this.position)
    }

    tryMove(root){
        if (this.isLocked) {
          return;
        }

        const {input} = root;

        if (!input.direction) {
      
          this.standAnimation()
          return;
        }
      
        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        const gridSize = 16;
      
        if (input.direction === DOWN) {
          nextY += gridCells(1);
          this.body.animations.play("walkDown")
        }
      
        if (input.direction === UP) {
          nextY -= gridCells(1);
          this.body.animations.play("walkUp")
        }
      
        if (input.direction === LEFT) {
          nextX -= gridCells(1);
          this.body.animations.play("walkLeft")
        }
      
        if (input.direction === RIGHT) {
          this.body.animations.play("walkRight")
          nextX += gridCells(1);
        }
      
        this.facingDirection = input.direction ?? this.facingDirection;
      
        const spaceIsFree = isSpaceFree(root.level?.walls,nextX,nextY)
        const isSpaceDangerous = this.isSpaceDanger(root.level?.dangerSpaces,nextX,nextY)

        const solidBodyAtSpace = this.parent.children.find(c => {
          return c.isSolid && c.position.x === nextX && c.position.y === nextY
        })


        if (isSpaceDangerous) {
          this.inDanger = true;
          console.log("in danger")
        }


        if (spaceIsFree && !solidBodyAtSpace) {
          this.destinationPosition.x = nextX;
          this.destinationPosition.y = nextY;
          
        }
      
    };

    standAnimation() {
      if (this.facingDirection === LEFT) {this.body.animations.play("standLeft")};
      if (this.facingDirection === RIGHT) {this.body.animations.play("standRight")};
      if (this.facingDirection === UP) {this.body.animations.play("standUp")};
      if (this.facingDirection === DOWN) {this.body.animations.play("standDown")};
    }

}