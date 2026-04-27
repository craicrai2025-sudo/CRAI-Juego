class MenuScene extends Phaser.Scene{

constructor(){
super("MenuScene")
}

create(){

this.add.rectangle(600,350,1200,700,0x000000)

this.add.text(500,200,"Juego CRAI",{
font:"48px Arial",
fill:"#ffffff"
})

let start = this.add.text(520,350,"Iniciar Juego",{
font:"32px Arial",
fill:"#00ffcc"
}).setInteractive()

start.on("pointerdown",()=>{
this.scene.start("MapScene")
this.scene.launch("UIScene")
})

}
}
