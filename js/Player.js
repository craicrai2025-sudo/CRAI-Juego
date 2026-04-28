class Player {

constructor(scene, x, y){

this.scene = scene

// USAR POSICIÓN GLOBAL
let startX = scene.game.globalState.player.x
let startY = scene.game.globalState.player.y

this.sprite = scene.physics.add.sprite(startX, startY, "walk1")
.setScale(0.6)

// ANIMACIÓN
this.frames = ["walk1","walk2","walk3","walk4","walk5","walk6"]
this.currentFrame = 0
this.timer = 0

this.cursors = scene.input.keyboard.createCursorKeys()

}

update(){

let moving = false

if(this.cursors.left.isDown){
this.sprite.x -= 3
moving = true
}
else if(this.cursors.right.isDown){
this.sprite.x += 3
moving = true
}

if(this.cursors.up.isDown){
this.sprite.y -= 3
moving = true
}
else if(this.cursors.down.isDown){
this.sprite.y += 3
moving = true
}

// ANIMACIÓN
if(moving){

this.timer++

if(this.timer > 10){

this.currentFrame++

if(this.currentFrame >= this.frames.length){
this.currentFrame = 0
}

this.sprite.setTexture(this.frames[this.currentFrame])
this.timer = 0

}

}else{
this.sprite.setTexture("walk1")
}

// 🔥 GUARDAR POSICIÓN SIEMPRE
this.scene.game.globalState.player.x = this.sprite.x
this.scene.game.globalState.player.y = this.sprite.y

}

}
