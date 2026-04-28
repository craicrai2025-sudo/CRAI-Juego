class DomiciliosScene extends Phaser.Scene {

constructor(){
super("DomiciliosScene")
}

preload(){

this.load.image("domicilios","assets/centro domicilios.png")
this.load.image("libro","assets/libro.png")

// FRAMES DEL PERSONAJE
this.load.image("walk1","assets/walk1.png")
this.load.image("walk2","assets/walk2.png")
this.load.image("walk3","assets/walk3.png")
this.load.image("walk4","assets/walk4.png")
this.load.image("walk5","assets/walk5.png")
this.load.image("walk6","assets/walk6.png")

}

create(){

// FONDO
this.add.image(600,350,"domicilios").setDisplaySize(1200,700)

// PLAYER (usa posición global automáticamente)
this.player = new Player(this, 300, 400)

// LIBRO
this.libro = this.physics.add.image(900,500,"libro").setScale(0.08)

// ESTADO GLOBAL
if(this.game.globalState.domicilios.libroRecogido){
this.libro.destroy()
this.libro = null
}

// INPUT
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

// PLAYER (movimiento + animación + guardado posición)
this.player.update()

// VOLVER AL MAPA (con posición controlada)
if(Phaser.Input.Keyboard.JustDown(this.keyBack)){

// 🔥 POSICIÓN DE REGRESO AL MAPA
this.game.globalState.player.x = 600
this.game.globalState.player.y = 450

this.scene.start("MapScene")
}

// SI NO HAY LIBRO
if(!this.libro) return

let dist = Phaser.Math.Distance.Between(
this.player.sprite.x,
this.player.sprite.y,
this.libro.x,
this.libro.y
)

// POSICIÓN ICONO (sobre el personaje)
this.iconE.setPosition(
this.player.sprite.x - 10,
this.player.sprite.y - 60
)

// MOSTRAR E SOLO CERCA
this.iconE.setVisible(dist < 80)

// RECOGER LIBRO
if(dist < 80 && Phaser.Input.Keyboard.JustDown(this.keyE)){

this.game.inventory.addItem("libro")

this.libro.destroy()
this.libro = null

this.game.globalState.domicilios.libroRecogido = true

}

}

}
