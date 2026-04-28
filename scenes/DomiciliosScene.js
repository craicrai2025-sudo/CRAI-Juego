class DomiciliosScene extends Phaser.Scene{

constructor(){
super("DomiciliosScene")
}

preload(){

this.load.image("domicilios","assets/centro_domicilios.png") // ✅ CORREGIDO
this.load.image("avatar","assets/avatar.png")
this.load.image("libro","assets/libro.png")
this.load.image("computador","assets/computador.png")

}

create(){

this.add.image(600,350,"domicilios").setDisplaySize(1200,700)

// AVATAR
this.avatar = this.physics.add.image(300,400,"avatar").setScale(0.6)

// COMPUTADOR
this.computador = this.physics.add.image(200,350,"computador").setScale(0.2)

// LIBRO
this.libro = this.physics.add.image(900,500,"libro").setScale(0.08)

if(this.game.globalState.domicilios.libroRecogido){
this.libro.destroy()
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

this.currentTarget = null

}

update(){

if(this.keyBack.isDown){
this.scene.start("MapScene")
}

// MOVIMIENTO
if(this.cursors.left.isDown) this.avatar.x -= 3
if(this.cursors.right.isDown) this.avatar.x += 3
if(this.cursors.up.isDown) this.avatar.y -= 3
if(this.cursors.down.isDown) this.avatar.y += 3

this.iconE.setPosition(this.avatar.x-10,this.avatar.y-60)

// DISTANCIAS
let nearLibro = this.libro && Phaser.Math.Distance.Between(
this.avatar.x,this.avatar.y,this.libro.x,this.libro.y
) < 80

let nearPC = Phaser.Math.Distance.Between(
this.avatar.x,this.avatar.y,this.computador.x,this.computador.y
) < 80

// PRIORIDAD
if(nearPC){
this.currentTarget = "pc"
this.iconE.setVisible(true)
}
else if(nearLibro){
this.currentTarget = "libro"
this.iconE.setVisible(true)
}
else{
this.currentTarget = null
this.iconE.setVisible(false)
}

// INTERACCIÓN
if(this.currentTarget && Phaser.Input.Keyboard.JustDown(this.keyE)){

if(this.currentTarget === "libro"){
this.game.inventory.addItem("libro")
this.libro.destroy()
this.game.globalState.domicilios.libroRecogido = true
}

if(this.currentTarget === "pc"){
this.scene.launch("ComputerUI")
}

}

}
