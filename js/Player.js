class Player {

constructor(scene, x, y){

this.scene = scene

this.sprite = scene.physics.add.sprite(x,y,"walk1")
.setScale(0.6)

// ANIMACIÓN MANUAL
this.frames = ["walk1","walk2","walk3","walk4","walk5","walk6"]
this.currentFrame = 0
this.timer = 0

// CONTROLES
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

}

}
