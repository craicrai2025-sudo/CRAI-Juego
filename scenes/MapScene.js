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

// AVATAR (MAS GRANDE)
this.avatar = this.physics.add.image(600,350,"avatar").setScale(0.6)

// LIBRO
this.libro = this.physics.add.image(500,400,"libro").setScale(0.08)

if(this.game.globalState.mapa.libroRecogido){
this.libro.destroy()
}

// FLECHA
this.flecha = this.add.image(150,500,"flecha")
.setScale(0.1)
.setInteractive()

this.flecha.on("pointerdown",()=>{
this.scene.start("DomiciliosScene")
})

// INPUT
this.cursors = this.input.keyboard.createCursorKeys()
this.keyE = this.input.keyboard.addKey("E")

// ICONO E
this.iconE = this.add.text(0,0,"E",{font:"20px Arial",fill:"#fff"})
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
this.avatar.x,this.avatar.y,
this.libro.x,this.libro.y
)

this.iconE.setPosition(this.avatar.x-10,this.avatar.y-60)
this.iconE.setVisible(dist < 80)

if(dist < 80 && Phaser.Input.Keyboard.JustDown(this.keyE)){
this.game.inventory.addItem("libro")
this.libro.destroy()
this.game.globalState.mapa.libroRecogido = true
}

}
}
