class MenuScene extends Phaser.Scene{

constructor(){
super("MenuScene")
}

create(){

this.add.rectangle(600,350,1200,700,0x000000)

this.add.text(600,200,"Juego CRAI",{
font:"48px Arial",
fill:"#fff"
}).setOrigin(0.5)

let start = this.add.text(600,350,"Iniciar Juego",{
font:"32px Arial",
backgroundColor:"#fff",
color:"#000",
padding:10
})
.setOrigin(0.5)
.setInteractive()

start.on("pointerdown",()=>{
this.scene.start("MapScene")
this.scene.launch("UIScene")
})

}
}
