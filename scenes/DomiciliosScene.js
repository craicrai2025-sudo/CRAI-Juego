class DomiciliosScene extends Phaser.Scene {

constructor(){
super("DomiciliosScene")
}

preload(){

this.load.image("domicilios","assets/centro domicilios.png")
this.load.image("avatar","assets/avatar.png")
this.load.image("libro","assets/libro.png")

}

create(){

// FONDO
this.add.image(600,350,"domicilios").setDisplaySize(1200,700)

// AVATAR
this.avatar = this.physics.add.image(300,400,"avatar").setScale(0.6)

// LIBRO
this.libro = this.physics.add.image(900,500,"libro").setScale(0.08)

// ESTADO GLOBAL
if(this.game.globalState.domicilios.libroRecogido){
this.libro.destroy()
this.libro = null
}

// INPUT
this.cursors = this.input.keyboard.createCursorKeys()
this.keyE = this.input.keyboard.addKey("E")
this.keyBack = this.input.keyboard.addKey("ESC")

// ICONO E
this.iconE = this.add.text(0,0,"E",{
font:"18px Arial",
fill:"#fff",
backgroundColor:"#000"
})
.setPadding(4)
.setVisible(false)

}

update(){

// VOLVER
if(Phaser.Input.Keyboard.JustDown(this.keyBack)){
this.scene.start("MapScene")
}

// MOVIMIENTO
if(this.cursors.left.isDown) this.avatar.x -= 3
if(this.cursors.right.isDown) this.avatar.x += 3
if(this.cursors.up.isDown) this.avatar.y -= 3
if(this.cursors.down.isDown) this.avatar.y += 3

// SI NO HAY LIBRO
if(!this.libro) return

let dist = Phaser.Math.Distance.Between(
this.avatar.x,
this.avatar.y,
this.libro.x,
this.libro.y
)

// POSICIÓN E
this.iconE.setPosition(this.avatar.x-10,this.avatar.y-60)

// MOSTRAR
this.iconE.setVisible(dist < 80)

// RECOGER
if(dist < 80 && Phaser.Input.Keyboard.JustDown(this.keyE)){

this.game.inventory.addItem("libro")

this.libro.destroy()
this.libro = null

this.game.globalState.domicilios.libroRecogido = true

}

}

}
