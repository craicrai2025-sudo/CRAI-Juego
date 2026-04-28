class MapScene extends Phaser.Scene{

constructor(){
super("MapScene")
}

preload(){
this.load.image("mapa","assets/mapa.png")
this.load.image("avatar","assets/avatar.png")
this.load.image("libro","assets/libro.png")
this.load.image("flecha","assets/flecha.png")
this.load.image("walk1","assets/walk1.png")
this.load.image("walk2","assets/walk2.png")
this.load.image("walk3","assets/walk3.png")
this.load.image("walk4","assets/walk4.png")
this.load.image("walk5","assets/walk5.png")
this.load.image("walk6","assets/walk6.png")
}

create(){

this.add.image(600,350,"mapa").setDisplaySize(1200,700)

// AVATAR MÁS GRANDE (x3 aprox)
this.avatar = this.physics.add.image(600,400,"avatar").setScale(0.6)

// LIBRO
this.libro = this.physics.add.image(800,450,"libro").setScale(0.08)

if(this.game.globalState.mapa.libroRecogido){
this.libro.destroy()
}

// FLECHA
this.flecha = this.add.image(200,500,"flecha")
.setScale(0.15)
.setInteractive()

this.flecha.on("pointerdown",()=>{
this.scene.start("DomiciliosScene")
})

// INPUT
this.cursors = this.input.keyboard.createCursorKeys()
this.keyE = this.input.keyboard.addKey("E")

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

// MOVIMIENTO
if(this.cursors.left.isDown) this.avatar.x -= 3
if(this.cursors.right.isDown) this.avatar.x += 3
if(this.cursors.up.isDown) this.avatar.y -= 3
if(this.cursors.down.isDown) this.avatar.y += 3

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
this.game.globalState.mapa.libroRecogido = true

}

}

}
