import when from "when"

const IMAGES = []
import Cloud from "./assets/1x-cloud.png"
import Obstacle from "./assets/1x-obstacle-large(1).png"
import Restart from "./assets/1x-restart.png"
import Cactus1 from "./assets/CACTUS1.png"
import Cactus2 from "./assets/CACTUS2.png"
import Cactus3 from "./assets/CACTUS3.png"
import Cactus4 from "./assets/CACTUS4.png"
import Cactus5 from "./assets/CACTUS5.png"
import Death from "./assets/death.png"
import Enemy1 from "./assets/enemy1.png"
import Enemy2 from "./assets/enemy2.png"
import Floor from "./assets/floor-1.png"
import Idle from "./assets/Idle.png"
import Jump from "./assets/jump.png"
import Low1 from "./assets/low1.png"
import Low2 from "./assets/low2.png"
import Run1 from "./assets/run1.png"
import Run2 from "./assets/run2.png"
import Sprite from "./assets/sprite.png"

class Images {
    constructor(){
        this.atlas = {}
        this.defer = when.defer()
    }

    init(){
        this.promises = [
            this.load(Cloud, "Cloud"),
            this.load(Obstacle, "Obstacle"),
            this.load(Restart, "Restart"),
            this.load(Cactus1, "Cactus1"),
            this.load(Cactus2, "Cactus2"),
            this.load(Cactus3, "Cactus3"),
            this.load(Cactus4, "Cactus4"),
            this.load(Cactus5, "Cactus5"),
            this.load(Death, "Death"),
            this.load(Enemy1, "Enemy1"),
            this.load(Enemy2, "Enemy2"),
            this.load(Floor, "Floor"),
            this.load(Idle, "Idle"),
            this.load(Jump, "Jump"),
            this.load(Low1, "Low1"),
            this.load(Low2, "Low2"),
            this.load(Run1, "Run1"),
            this.load(Run2, "Run2"),
            this.load(Sprite, "Sprite"),
        ]

        Promise.all(this.promises, () => {
            this.defer.resolve(this.atlas)
        })

        return this.defer.promise
    }

    load(url, id){
        let defer = when.defer()
        let img = new Image()
        img.src = url
        this.atlas[id] = img
        img.onload = function(){
            defer.resolve(img)
        }
        return defer.promise
    }
}

const out = new Images()
export default out