class MapScene extends Phaser.Scene{

constructor(){
super("MapScene")
}

preload(){
  
this.load.image("domicilios","assets/centro_domicilios.png")
this.load.image("mapa","assets/mapa.png")
this.load.image("avatar","assets/avatar.png")
this.load.image("flecha","assets/flecha.png")
this.load.image("libro","assets/libro.png")

}

create(){


//Centro de domicilios
this.add.image(600,350,"domicilios")

// MAPA
this.mapa = this.add.image(600,350,"mapa")

// INVENTARIO
this.inventory = new Inventory(this)

// AVATAR
this.avatar = this.physics.add.sprite(600,550,"avatar")
this.avatar.setScale(0.6)

// CONTROLES
this.cursors = this.input.keyboard.createCursorKeys()
this.keyE = this.input.keyboard.addKey("E")

// LIMITES
this.floorMinX = 50
this.floorMaxX = 1150
this.floorMinY = 420
this.floorMaxY = 690

// ICONO INTERACCION
this.interactIcon = this.add.text(
0,
0,
"E",
{
font:"28px Arial",
fill:"#ffffff"
})
.setPadding(6)
.setBackgroundColor("#000000")
.setDepth(300)
.setVisible(false)

// PUERTA
this.flecha = this.add.image(420,450,"flecha")
.setScale(0.15)
.setAngle(-90)

// LIBRO
this.libro = this.add.image(1000,520,"libro")
.setScale(0.08)
.setInteractive()

this.libroRecogido = false

// CLIC LIBRO
this.libro.on("pointerdown",()=>{

this.tryCollectBook()

})

// CLIC PUERTA
this.flecha.setInteractive()

this.flecha.on("pointerdown",()=>{

this.scene.start("DomiciliosScene")

})

}

update(){

let speed = 2.5

// MOVIMIENTO

if(this.cursors.left.isDown) this.avatar.x -= speed
else if(this.cursors.right.isDown) this.avatar.x += speed

if(this.cursors.up.isDown) this.avatar.y -= speed
else if(this.cursors.down.isDown) this.avatar.y += speed

// LIMITES

this.avatar.x = Phaser.Math.Clamp(this.avatar.x,this.floorMinX,this.floorMaxX)
this.avatar.y = Phaser.Math.Clamp(this.avatar.y,this.floorMinY,this.floorMaxY)

// PROFUNDIDAD RPG

this.avatar.setDepth(this.avatar.y)

// DISTANCIA LIBRO

if(!this.libroRecogido){

let dist = Phaser.Math.Distance.Between(
this.avatar.x,
this.avatar.y,
this.libro.x,
this.libro.y
)

if(dist < 80){

this.interactIcon.setPosition(this.libro.x,this.libro.y-40)
this.interactIcon.setVisible(true)

if(Phaser.Input.Keyboard.JustDown(this.keyE)){

this.tryCollectBook()

}

}else{

this.interactIcon.setVisible(false)

}

}

}

// RECOGER LIBRO

tryCollectBook(){

if(this.libroRecogido) return

this.inventory.addItem("libro")

this.libro.destroy()

this.libroRecogido = true

this.interactIcon.setVisible(false)

}

}
