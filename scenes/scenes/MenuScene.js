class MenuScene extends Phaser.Scene{

constructor(){
super("MenuScene")
}

create(){

this.add.rectangle(600,350,1200,700,0x000000)

// TITULO
this.add.text(600,200,"Juego CRAI",{
font:"48px Arial",
fill:"#ffffff"
}).setOrigin(0.5)

// BOTON INICIAR
let startBtn = this.add.text(600,350,"Iniciar Juego",{
font:"32px Arial",
backgroundColor:"#ffffff",
color:"#000",
padding:10
})
.setOrigin(0.5)
.setInteractive()

startBtn.on("pointerdown",()=>{

// iniciar UI + juego
this.scene.start("MapScene")
this.scene.launch("UIScene")

})

// BOTON CONFIG (placeholder)
this.add.text(600,420,"Configuración",{
font:"28px Arial",
fill:"#aaa"
}).setOrigin(0.5)

}

}
