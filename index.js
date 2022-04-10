
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

const gravity = 0.5;

class Player {
    constructor() {
        this.speed = 10
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
            // this.velocity.y = 0
        }
        
    }
}

class Platform {
    constructor({x, y, image}) {
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

class GenericObject {
    constructor({x, y, image}) {
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

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}


const keys = {
    right: {
        pressed: false
    }, left: {
        pressed: false
    }
}

let scrollOffset = 0


let longPlatformImage = createImage("assets/Ground/Grass/grassLong.png")
let platformImage = createImage("assets/Ground/Grass/grass.png")

let player = new Player()
let platforms = []


let backgroundImage = createImage("assets/Backgrounds/2d-backgrounds/summer/Summer3.png")

let genericObjects = []


function init() {
    longPlatformImage = createImage("assets/Ground/Grass/grassLong.png")
    platformImage = createImage("assets/Ground/Grass/grass.png")

    player = new Player()
    platforms = [
        new Platform({x: 0, y: 465, image: longPlatformImage}),
        new Platform({x: longPlatformImage.width, y: 465, image: longPlatformImage}),
        new Platform({x: longPlatformImage.width * 2 + 300, y: 465, image: longPlatformImage}),
        new Platform({x: longPlatformImage.width * 3 + 300, y: 465, image: longPlatformImage}),

        new Platform({x: platformImage.width* 3, y: 465, image: platformImage}),
    ]
    // new Platform({x: 500, y:200, image: image}


    backgroundImage = createImage("assets/Backgrounds/2d-backgrounds/summer/Summer3.png")

    genericObjects = [
        new GenericObject({x: 0, y: 0, image: backgroundImage})
    ]
}



function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach((genericObject => {
        genericObject.draw()
    }))

    platforms.forEach((platform) => {
        platform.draw()
    })

    player.update()

    if (keys.right.pressed && player.position.x < canvas.width / 2 - player.width) {
        player.velocity.x = player.speed

    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed

            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player.speed * 0.1
            })
        } else if (keys.left.pressed) {
            scrollOffset -= player.speed

            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player.speed * 0.1
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

    // Win condition
    if (scrollOffset > 2000) {
        console.log("You won");
    }

    // Lose condition
    if (player.position.y > canvas.height + player.height) {
        init()
    }
}

init()
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