class MapScene extends Phaser.Scene{

constructor(){
super("MapScene")
}

preload(){

this.load.image("mapa","assets/mapa.png")
this.load.image("avatar","assets/avatar.png")
this.load.image("flecha","assets/flecha.png")
this.load.image("libro","assets/libro.png")

}

create(){

// FONDO
this.add.image(600,350,"mapa")

// INVENTARIO
this.inventory = new Inventory(this)

// AVATAR
this.avatar = this.physics.add.sprite(600,550,"avatar")
.setScale(0.6)

// CONTROLES
this.cursors = this.input.keyboard.createCursorKeys()
this.keyE = this.input.keyboard.addKey("E")

// LIMITES
this.minX = 50
this.maxX = 1150
this.minY = 420
this.maxY = 690

// LIBRO
this.libro = this.add.image(1000,520,"libro")
.setScale(0.08)
.setInteractive()

this.libroRecogido = false

// FLECHA
this.flecha = this.add.image(420,450,"flecha")
.setScale(0.15)
.setAngle(-90)
.setInteractive()

// ICONO E
this.iconE = this.add.text(0,0,"E",{
font:"24px Arial",
fill:"#ffffff"
})
.setBackgroundColor("#000")
.setPadding(5)
.setVisible(false)

// CLICK LIBRO
this.libro.on("pointerdown",()=>{
this.recogerLibro()
})

// CLICK PUERTA
this.flecha.on("pointerdown",()=>{
this.scene.start("DomiciliosScene")
})

}

update(){

let speed = 2.5

// MOVIMIENTO
if(this.cursors.left.isDown) this.avatar.x -= speed
if(this.cursors.right.isDown) this.avatar.x += speed
if(this.cursors.up.isDown) this.avatar.y -= speed
if(this.cursors.down.isDown) this.avatar.y += speed

// LIMITES
this.avatar.x = Phaser.Math.Clamp(this.avatar.x,this.minX,this.maxX)
this.avatar.y = Phaser.Math.Clamp(this.avatar.y,this.minY,this.maxY)

// PROFUNDIDAD
this.avatar.setDepth(this.avatar.y)

// DETECCION LIBRO
if(!this.libroRecogido){

let dist = Phaser.Math.Distance.Between(
this.avatar.x,this.avatar.y,
this.libro.x,this.libro.y
)

if(dist < 80){

this.iconE.setPosition(this.libro.x,this.libro.y-40)
this.iconE.setVisible(true)

if(Phaser.Input.Keyboard.JustDown(this.keyE)){
this.recogerLibro()
}

}else{
this.iconE.setVisible(false)
}

}

}

recogerLibro(){

if(this.libroRecogido) return

this.inventory.addItem("libro")
this.libro.destroy()
this.libroRecogido = true

}
