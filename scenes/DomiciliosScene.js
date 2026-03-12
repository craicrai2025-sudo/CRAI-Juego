class DomiciliosScene extends Phaser.Scene{

constructor(){
super("DomiciliosScene")
}

preload(){

this.load.image("avatar","assets/avatar.png")

}

create(){

this.add.rectangle(600,350,1200,700,0x333333)

this.add.text(
420,
100,
"Centro de domicilios",
{
font:"40px Arial",
fill:"#ffffff"
})

this.avatar = this.physics.add.sprite(600,550,"avatar")
this.avatar.setScale(0.6)

this.cursors = this.input.keyboard.createCursorKeys()

this.keyE = this.input.keyboard.addKey("E")

this.add.text(
30,
650,
"Presiona E para volver",
{
font:"24px Arial",
fill:"#ffffff"
})

}

update(){

let speed = 2.5

if(this.cursors.left.isDown) this.avatar.x -= speed
else if(this.cursors.right.isDown) this.avatar.x += speed

if(this.cursors.up.isDown) this.avatar.y -= speed
else if(this.cursors.down.isDown) this.avatar.y += speed

if(Phaser.Input.Keyboard.JustDown(this.keyE)){

this.scene.start("MapScene")

}

}

}
