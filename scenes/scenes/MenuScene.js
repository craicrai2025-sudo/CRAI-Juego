class MenuScene extends Phaser.Scene{

constructor(){
super("MenuScene")
}

preload(){
this.load.image("mapa","assets/mapa.png")
this.load.image("npc","assets/avatar.png") // luego cambias por tu personaje real
}

create(){

// FONDO
this.add.image(600,350,"mapa").setDisplaySize(1200,700)

// OSCURO
this.add.rectangle(600,350,1200,700,0x000000,0.5)

// TITULO
this.add.text(420,120,"CRAI AVENTURA",{
font:"48px Arial",
fill:"#fff"
})

// BOTON INICIAR
let iniciar = this.add.text(500,300,"INICIAR JUEGO",{
font:"32px Arial",
backgroundColor:"#00aa00",
padding:15
}).setInteractive()

// BOTON CONFIG
let config = this.add.text(500,380,"CONFIGURACIÓN",{
font:"28px Arial",
backgroundColor:"#555",
padding:15
}).setInteractive()

// HOVER
[iniciar, config].forEach(btn=>{
btn.on("pointerover",()=>btn.setScale(1.1))
btn.on("pointerout",()=>btn.setScale(1))
})

// CLICK INICIAR
iniciar.on("pointerdown",()=>{
this.startDialog()
})

}

// 🔥 DIÁLOGO TIPO POKEMON
startDialog(){

// LIMPIAR MENU
this.children.removeAll()

// PERSONAJE
this.add.image(250,450,"npc").setScale(0.4)

// CAJA TEXTO
this.box = this.add.rectangle(600,600,1000,150,0x000000,0.8)
this.text = this.add.text(150,550,"Bienvenido al CRAI...",{
font:"22px Arial",
fill:"#fff",
wordWrap:{width:900}
})

// TEXOS
this.dialogs = [
"Bienvenido al CRAI.",
"Aquí podrás explorar servicios.",
"Aprenderás a solicitar libros.",
"¡Buena suerte!"
]

this.index = 0

// AVANZAR CON CLICK
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
