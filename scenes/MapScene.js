class MapScene extends Phaser.Scene{

constructor(){
super("MapScene")
}

preload(){

this.load.image("mapa","assets/mapa.png")
this.load.image("libro","assets/libro.png")
this.load.image("flecha","assets/flecha.png")

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
this.add.image(600,350,"mapa").setDisplaySize(1200,700)

// PLAYER (usa posición global automáticamente)
this.player = new Player(this, 600, 400)

// LIBRO
this.libro = this.physics.add.image(800,450,"libro").setScale(0.08)

// SI YA FUE RECOGIDO
if(this.game.globalState.mapa.libroRecogido){
this.libro.destroy()
this.libro = null
}

// FLECHA (CAMBIO DE ESCENA)
this.flecha = this.add.image(400,380,"flecha")
.setScale(0.15)
.setInteractive()

this.flecha.on("pointerdown",()=>{

// 🔥 POSICIÓN DE ENTRADA AL OTRO MAPA
this.game.globalState.player.x = 250
this.game.globalState.player.y = 400

this.scene.start("DomiciliosScene")

})

// INPUT
this.keyE = this.input.keyboard.addKey("E")

// ICONO E (minimalista)
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

// SI NO HAY LIBRO
if(!this.libro) return

let dist = Phaser.Math.Distance.Between(
this.player.sprite.x,
this.player.sprite.y,
this.libro.x,
this.libro.y
)

// POSICIÓN DE LA E (encima del personaje)
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

this.game.globalState.mapa.libroRecogido = true

}

}

}
