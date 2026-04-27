class MenuScene extends Phaser.Scene{

constructor(){
super("MenuScene")
}

preload(){
this.load.image("mapa","assets/mapa.png")
this.load.image("npc","assets/avatar.png")
}

create(){

this.add.image(600,350,"mapa").setDisplaySize(1200,700)
this.add.rectangle(600,350,1200,700,0x000000,0.5)

this.add.text(400,120,"CRAI AVENTURA",{font:"48px Arial",fill:"#fff"})

// BOTONES
let iniciar = this.add.text(500,300,"INICIAR JUEGO",{
font:"32px Arial",
backgroundColor:"#00aa00",
padding:15
}).setInteractive()

let config = this.add.text(500,380,"CONFIGURACIÓN",{
font:"28px Arial",
backgroundColor:"#555",
padding:15
}).setInteractive()

[iniciar, config].forEach(btn=>{
btn.on("pointerover",()=>btn.setScale(1.1))
btn.on("pointerout",()=>btn.setScale(1))
})

iniciar.on("pointerdown",()=>{
this.startDialog()
})

}

// DIÁLOGO
startDialog(){

this.children.removeAll()

this.add.image(250,450,"npc").setScale(0.4)

this.box = this.add.rectangle(600,600,1000,150,0x000000,0.8)

this.text = this.add.text(150,550,"Bienvenido al CRAI...",{
font:"22px Arial",
fill:"#fff",
wordWrap:{width:900}
})

this.dialogs = [
"Bienvenido al CRAI.",
"Aquí podrás explorar servicios.",
"Aprenderás a solicitar libros.",
"¡Buena suerte!"
]

this.index = 0

this.input.on("pointerdown",()=>{

this.index++

if(this.index < this.dialogs.length){
this.text.setText(this.dialogs[this.index])
}else{
this.scene.start("MapScene")
}

})

}

}
