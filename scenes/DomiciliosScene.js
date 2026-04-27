class DomiciliosScene extends Phaser.Scene{

constructor(){
super("DomiciliosScene")
}

preload(){
this.load.image("domicilios","assets/domicilios.png")
this.load.image("avatar","assets/avatar.png")
this.load.image("libro","assets/libro.png")
this.load.image("computador","assets/computador.png")
}

create(){

this.add.image(600,350,"domicilios").setDisplaySize(1200,700)

// AVATAR
this.avatar = this.physics.add.image(200,300,"avatar").setScale(0.6)

// LIBRO
if(!this.game.globalState.domicilios.libroRecogido){
this.libro = this.physics.add.image(800,500,"libro").setScale(0.08)
}

// CONTROLES
this.cursors = this.input.keyboard.createCursorKeys()
this.keyE = this.input.keyboard.addKey("E")

//Pantalla domicilio
this.computador = this.physics.add.image(300,300,"computador")
.setScale(0.3)
  
// ICONO E
this.iconE = this.add.text(0,0,"E",{
font:"20px Arial",
fill:"#fff",
backgroundColor:"#000"
}).setPadding(4).setVisible(false)

}

update(){

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

this.iconE.setPosition(this.avatar.x-10,this.avatar.y-60)
this.iconE.setVisible(dist < 80)

if(dist < 80 && Phaser.Input.Keyboard.JustDown(this.keyE)){

this.game.inventory.addItem("libro")

this.libro.destroy()
this.libro = null
this.game.globalState.domicilios.libroRecogido = true

}

}

}
