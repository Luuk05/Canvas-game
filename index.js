
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

const gravity = 0.5;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 80
        this.height = 80
    }

    draw() {
        c.fillStyle="red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
        
    }
}

class Platform {
    constructor({x, y, width, height, image}) {
        this.position = {
            x: x,
            y: y
        }

        this.image = image;
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const image = new Image()
image.src = "assets/Ground/Grass/grassLong.png"

const player = new Player()
const platforms = [new Platform({x: 0, y: 465, image: image}), new Platform({x: image.width, y: 465, image: image})]
// new Platform({x: 500, y:200, image: image}


player.update()
const keys = {
    right: {
        pressed: false
    }, left: {
        pressed: false
    }
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height)

    platforms.forEach((platform) => {
        platform.draw()
    })

    player.update()

    if (keys.right.pressed && player.position.x < canvas.width / 2 + player.width) {
        player.velocity.x = 5

    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach((platform) => {
                platform.position.x -= 5
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach((platform) => {
                platform.position.x += 5
            })
        }
    }

    //platform collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width
            ) {
            player.velocity.y = 0
        }
    })

    if (scrollOffset > 2000) {
        console.log("You won");
    }
}

animate()

window.addEventListener("keydown", (event) => {

    switch (event.key) {
        case "a":
            console.log("left");
            keys.left.pressed = true
            break
        case "s":
            console.log("down");
            break
        case "d":
            console.log("right");
            keys.right.pressed = true
            break
        case "w":
            console.log("up");
            player.velocity.y -= 15;
            break
        
    }
})

window.addEventListener("keyup", (event) => {

    switch (event.key) {
        case "a":
            console.log("left");
            keys.left.pressed = false
            break
        case "s":
            console.log("down");
            break
        case "d":
            console.log("right");
            keys.right.pressed = false
            break
        case "w":
            console.log("up");
            break
        
    }
})