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

// 🔥 INVENTARIO GLOBAL
if(!this.game.globalInventory){
this.game.globalInventory = new Inventory(this)
this.inventory = this.game.globalInventory
}else{
this.inventory = this.game.globalInventory
this.inventory.scene = this
}

// AVATAR
this.player = this.physics.add.sprite(600,550,"avatar")
.setScale(0.6)

// CONTROLES
this.cursors = this.input.keyboard.createCursorKeys()
this.keyE = this.input.keyboard.addKey("E")

// LIBRO EN EL SUELO
this.libro = this.add.image(900,520,"libro")
.setScale(0.08)
.setInteractive()

this.libroRecogido = false

// ICONO E
this.iconE = this.add.text(0,0,"E",{
font:"22px Arial",
fill:"#ffffff"
})
.setBackgroundColor("#000000")
.setPadding(5)
.setVisible(false)

// CLICK LIBRO
this.libro.on("pointerdown",()=>{
this.recogerLibro()
})

// TEXTO VOLVER
this.add.text(30,650,"Presiona E para volver",{
font:"20px Arial",
fill:"#ffffff"
})

}

update(){

let speed = 2.5

// MOVIMIENTO
if(this.cursors.left.isDown) this.player.x -= speed
if(this.cursors.right.isDown) this.player.x += speed
if(this.cursors.up.isDown) this.player.y -= speed
if(this.cursors.down.isDown) this.player.y += speed

// INTERACCION LIBRO
if(!this.libroRecogido){

let dist = Phaser.Math.Distance.Between(
this.player.x,
this.player.y,
this.libro.x,
this.libro.y
)

if(dist < 80){

this.iconE.setPosition(this.libro.x,this.libro.y - 40)
this.iconE.setVisible(true)

if(Phaser.Input.Keyboard.JustDown(this.keyE)){
this.recogerLibro()
}

}else{
this.iconE.setVisible(false)
}

}

// VOLVER AL MAPA
if(Phaser.Input.Keyboard.JustDown(this.keyE)){
this.scene.start("MapScene")
}

}

recogerLibro(){

if(this.libroRecogido) return

this.inventory.addItem("libro")

this.libro.destroy()
this.libroRecogido = true

this.iconE.setVisible(false)

}

}
