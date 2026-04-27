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

this.avatar = this.physics.add.image(200,300,"avatar").setScale(0.6)

this.libro = this.physics.add.image(800,500,"libro").setScale(0.08)

if(this.game.globalState.domicilios.libroRecogido){
this.libro.destroy()
}

// COMPUTADOR
this.computador = this.physics.add.image(300,300,"computador").setScale(0.3)

// INPUT
this.cursors = this.input.keyboard.createCursorKeys()
this.keyE = this.input.keyboard.addKey("E")

this.iconE = this.add.text(0,0,"E",{font:"20px Arial",fill:"#fff"})
.setVisible(false)

}

update(){

if(this.cursors.left.isDown) this.avatar.x -= 3
if(this.cursors.right.isDown) this.avatar.x += 3
if(this.cursors.up.isDown) this.avatar.y -= 3
if(this.cursors.down.isDown) this.avatar.y += 3

// INTERACCION COMPUTADOR
let distPC = Phaser.Math.Distance.Between(
this.avatar.x,this.avatar.y,
this.computador.x,this.computador.y
)

this.iconE.setPosition(this.avatar.x-10,this.avatar.y-60)
this.iconE.setVisible(distPC < 80)

if(distPC < 80 && Phaser.Input.Keyboard.JustDown(this.keyE)){
this.scene.launch("ComputerUI")
}

}
}
