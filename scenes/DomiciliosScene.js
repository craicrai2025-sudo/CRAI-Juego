class DomiciliosScene extends Phaser.Scene{

constructor(){
super("DomiciliosScene")
}

preload(){

this.load.image("domicilios","assets/centro_domicilios.png")
this.load.image("avatar","assets/avatar.png")
this.load.image("libro","assets/libro.png")

}

create(){

// FONDO
this.add.image(600,350,"domicilios")

// AVATAR
this.player = this.physics.add.sprite(600,550,"avatar")
.setScale(0.6)

// CONTROLES
this.cursors = this.input.keyboard.createCursorKeys()

// LIBRO
this.libro = this.add.image(900,520,"libro")
.setScale(0.08)
.setInteractive()

this.libro.on("pointerdown",()=>{

this.player.x = this.libro.x - 50
this.player.y = this.libro.y

this.libro.destroy()

})

// TEXTO
this.keyE = this.input.keyboard.addKey("E")

this.add.text(30,650,"Presiona E para volver",{
font:"20px Arial",
fill:"#ffffff"
})

}

update(){

let speed = 2.5

if(this.cursors.left.isDown) this.player.x -= speed
if(this.cursors.right.isDown) this.player.x += speed
if(this.cursors.up.isDown) this.player.y -= speed
if(this.cursors.down.isDown) this.player.y += speed

if(Phaser.Input.Keyboard.JustDown(this.keyE)){
this.scene.start("MapScene")
}

}

}
