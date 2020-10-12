require('normalize.css/normalize.css');
require('./styles/index.scss');

import Mouse from "./utils/mouse"
import Easing from "./utils/easing"
import Run1 from "./assets/run1.png"
import Run2 from "./assets/run2.png"
import Low1 from "./assets/low1.png"
import Low2 from "./assets/low2.png"
import Jump from "./assets/jump.png"
import Floor from "./assets/floor-1.png"
import Cactus1 from "./assets/CACTUS1.png"
import Cactus2 from "./assets/CACTUS2.png"
import Cactus3 from "./assets/CACTUS3.png"
import Cactus4 from "./assets/CACTUS4.png"
import Cactus5 from "./assets/CACTUS5.png"

const canvas = document.querySelector('.main-canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d")

let run1 = new Image();
run1.src = Run1;

let run2 = new Image();
run2.src = Run2;

let low1 = new Image();
low1.src = Low1;

let low2 = new Image();
low2.src = Low2;

let jump = new Image();
jump.src = Jump;

let floor = new Image();
floor.src = Floor;

let cactus1 = new Image();
cactus1.src = Cactus1;
let cactus2 = new Image();
cactus2.src = Cactus2;
let cactus3 = new Image();
cactus3.src = Cactus3;
let cactus4 = new Image();
cactus4.src = Cactus4;
let cactus5 = new Image();
cactus5.src = Cactus5;

let frameCount = 0;
let frameAnimationCount;
let yPos = 0;
let yAcc = 0;

let score = 0;
const scr = document.getElementById("score");

let runSpeed = 5;

const g = 1;

let state = "running";

let assets = [cactus1, cactus2, cactus3, cactus4, cactus5]
let objects = [];

class obj {
    constructor() {
        this.image = cactus1;
        this.x = canvas.width;
        this.enemy = false;
    }
}

const update = () => {
    requestAnimationFrame(update)
    canvas.width = canvas.width;
    frameCount++;
    score += runSpeed / 10;
    scr.textContent = "Score: " + Math.floor(score);
    ctx.translate(0, canvas.height / 2);
    frameAnimationCount = frameCount % 16


    doPhysics();
    renderFloor();
    spawnObjects();
    renderObjects();
    renderDino();
}




requestAnimationFrame(update)

function renderObjects() {
    objects.forEach(object => {
        if (object.x < -20) {
            objects.splice(0, 1);
            return;
        }
        object.x -= runSpeed;
        ctx.drawImage(object.image, object.x, 0)

        if (Math.abs(object.x - 300) < 10 && yPos > -20) {
            console.log("DEAD")
            score = 0;
        }
    });
}

function spawnObjects() {
    if (Math.random() < 0.99) return;

    let i = Math.floor(Math.random() * assets.length);

    let o = new obj();

    o.image = assets[i]
    objects.push(o);
}

function doPhysics() {
    yAcc += g;
    yPos = Math.min(yPos + yAcc, 0);
    if (state == "jumping" && yPos == 0) {
        state = "running"
        console.log("landed")
    }
}

function renderDino() {


    let img;
    switch (state) {
        case "running":
            if (frameAnimationCount < 8) {
                ctx.drawImage(run1, 300, yPos, 44, 44);
            }
            else {
                ctx.drawImage(run2, 300, yPos, 44, 44);
            }
            break;
        case "jumping":
            ctx.drawImage(jump, 300, yPos, 44, 44);
            break;
        case "ducking":
            if (frameAnimationCount < 8) {
                ctx.drawImage(low1, 300, yPos + 15, 118 / 2, 67 / 2);
            }
            else {
                ctx.drawImage(low2, 300, yPos + 15, 119 / 2, 69 / 2);
            }
            break;
        default:
            break;

    }

}


function renderFloor() {
    let amount = Math.floor(canvas.width / 591)
    for (let i = 0; i <= amount + 1; i++) {
        ctx.drawImage(floor, i * 591 - (frameCount * runSpeed % 591), 44, 591, 7);
    }
}


document.addEventListener('keydown', (event) => {
    const code = event.keyCode;
    if ((code == 32 || code == 38) && state == "running") {
        state = "jumping"
        yAcc = -15;
        return;
    }
    if ((code == 17 || code == 40) && state == "running") {
        state = "ducking"
        return;
    }
}, false);

document.addEventListener('keyup', (event) => {
    const code = event.keyCode;
    if (code == 17 || code == 40) {
        state = "running"
        return;
    }
}, false);