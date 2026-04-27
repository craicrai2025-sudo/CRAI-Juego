class MapScene extends Phaser.Scene{

constructor(){
super("MapScene")
}

preload(){
this.load.image("mapa","assets/mapa.png")
this.load.image("avatar","assets/avatar.png")
this.load.image("libro","assets/libro.png")
this.load.image("flecha","assets/flecha.png")
}

create(){

this.add.image(600,350,"mapa").setDisplaySize(1200,700)

// AVATAR (más grande)
this.avatar = this.physics.add.image(200,300,"avatar").setScale(0.6)

// LIBRO
if(!this.game.globalState.mapa.libroRecogido){
this.libro = this.physics.add.image(500,300,"libro").setScale(0.08)
}

// FLECHA

this.flecha = this.add.image(150,500,"flecha")
.setScale(0.1)
.setInteractive()

this.flecha.on("pointerdown",()=>{
this.scene.start("DomiciliosScene")
})

// CONTROLES
this.cursors = this.input.keyboard.createCursorKeys()
this.keyE = this.input.keyboard.addKey("E")

// ICONO E
this.iconE = this.add.text(0,0,"E",{
font:"20px Arial",
fill:"#fff",
backgroundColor:"#000"
}).setPadding(4).setVisible(false)

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

//DIALOGO 1
  this.dialogBox = this.add.rectangle(600,600,1000,120,0x000000,0.8)
.setVisible(false)

this.dialogText = this.add.text(150,560,"",{
font:"20px Arial",
fill:"#fff",
wordWrap:{width:900}
}).setVisible(false)

showDialog(text){

this.dialogBox.setVisible(true)
this.dialogText.setVisible(true)
this.dialogText.setText(text)

this.input.once("pointerdown",()=>{
this.dialogBox.setVisible(false)
this.dialogText.setVisible(false)
})

}

// INICIO AUTOMÁTICO
this.time.delayedCall(500,()=>{

this.showDialog("Bienvenido al CRAI. Explora y encuentra libros.")

})

// POSICION E
this.iconE.setPosition(this.avatar.x-10,this.avatar.y-60)
this.iconE.setVisible(dist < 80)

// RECOGER
if(dist < 80 && Phaser.Input.Keyboard.JustDown(this.keyE)){

this.game.inventory.addItem("libro")

this.libro.destroy()
this.libro = null
this.game.globalState.mapa.libroRecogido = true

}

}

}
