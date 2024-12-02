import { GameObject } from "./GameObject";
import { clamp } from "./helpers/Clamp";
import { Vector2 } from "./Vector2";

export class Sprite extends GameObject {
    constructor ({
    resource,
    frameSize,
    hFrames,
    vFrames,
    frame,
    scale,
    position,
    animations,
    alpha,
    drawLayer,
    animSpeed,
    }) {
        super({});
        this.drawLayer = drawLayer;
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16,16);
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0,0);
        this.animations = animations ?? null;
        this.alpha = alpha ?? 1.0;
        this.animSpeed = animSpeed ?? 1.0;
        this.buildFrameMap();
    }
    
    buildFrameMap() {
        let frameCount = 0;
        for (let v=0; v < this.vFrames; v++) {
            for (let h=0; h < this.hFrames; h++) {
                this.frameMap.set(
                    frameCount,
                    new Vector2(this.frameSize.x * h,this.frameSize.y * v)
                )
                frameCount++;


            }
        }
        
    }

    step(delta) {
        if (!this.animations) {
            return;
        }

        this.animations.step(delta * this.animSpeed);
        this.frame = this.animations.frame;
    }

    drawImage(ctx, x, y) {
        if (!this.resource.isLoaded) {
            return;
        }

        let frameCoordX = 0;
        let frameCoordY = 0;
        const frame = this.frameMap.get(this.frame);
        if (frame) {
            frameCoordX = frame.x
            frameCoordY = frame.y
        }

        const frameSizeX = this.frameSize.x
        const frameSizeY = this.frameSize.y

        this.alpha = clamp(this.alpha,0,1);
        ctx.globalAlpha = this.alpha;

        ctx.drawImage(
            this.resource.image,
            frameCoordX,
            frameCoordY,
            frameSizeX,
            frameSizeY,
            x,
            y,
            frameSizeX * this.scale,
            frameSizeY * this.scale,

        );


    }
}
