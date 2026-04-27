class ComputerUI extends Phaser.Scene{

constructor(){
super("ComputerUI")
}

create(){

// FONDO OSCURO
this.add.rectangle(600,350,1200,700,0x000000,0.9)

// TITULO
this.add.text(600,80,"Sistema de Domicilios",{
font:"32px Arial",
fill:"#ffffff"
}).setOrigin(0.5)

// ----------------------
// LISTA 1 (SEDE)
// ----------------------

this.sedes = [
"Centro de Domicilios",
"Claustro",
"Quinta de Mutis",
"Emprendimiento",
"Cardioinfantil",
"Médery",
"Nuestra Señora de la Paz"
]

this.sedeIndex = 0

this.sedeText = this.add.text(600,180,this.sedes[this.sedeIndex],{
font:"24px Arial",
backgroundColor:"#fff",
color:"#000",
padding:10
})
.setOrigin(0.5)
.setInteractive()

this.sedeText.on("pointerdown",()=>{
this.sedeIndex = (this.sedeIndex+1) % this.sedes.length
this.sedeText.setText(this.sedes[this.sedeIndex])
})

// ----------------------
// LISTA 2 (ACCION)
// ----------------------

this.acciones = ["Pedir libro","Devolver libro"]
this.accionIndex = 0

this.accionText = this.add.text(600,260,this.acciones[this.accionIndex],{
font:"24px Arial",
backgroundColor:"#fff",
color:"#000",
padding:10
})
.setOrigin(0.5)
.setInteractive()

this.accionText.on("pointerdown",()=>{
this.accionIndex = (this.accionIndex+1) % this.acciones.length
this.accionText.setText(this.acciones[this.accionIndex])
})

// ----------------------
// TEXTO COSTO
// ----------------------

this.add.text(600,320,"Costo: 1 moneda",{
font:"20px Arial",
fill:"#fff"
}).setOrigin(0.5)

// ----------------------
// SLOT MONEDA
// ----------------------

this.coinSlot = this.add.rectangle(600,400,80,80,0xffffff,0.2)
.setStrokeStyle(2,0xffffff)

this.coinPlaced = false

// DETECTAR SI SUELTAN MONEDA
this.input.on("drop",(pointer,gameObject)=>{

if(gameObject.texture.key === "moneda"){

gameObject.x = this.coinSlot.x
gameObject.y = this.coinSlot.y

this.coinPlaced = true

}

})

// ----------------------
// BOTON PEDIR
// ----------------------

this.boton = this.add.text(600,500,"PEDIR",{
font:"28px Arial",
backgroundColor:"#00ff00",
color:"#000",
padding:10
})
.setOrigin(0.5)
.setInteractive()

this.boton.on("pointerdown",()=>{

if(
this.sedes[this.sedeIndex] === "Centro de Domicilios" &&
this.acciones[this.accionIndex] === "Pedir libro" &&
this.coinPlaced
){
this.startMinigame()
}else{
alert("Selección incorrecta o falta moneda")
}

})

// ----------------------
// BOTON CERRAR
// ----------------------

this.add.text(1100,50,"X",{
font:"32px Arial",
fill:"#fff"
})
.setInteractive()
.on("pointerdown",()=>{
this.scene.stop()
})

}

// ----------------------
// MINIJUEGO (TEMPORIZADOR)
// ----------------------

startMinigame(){

this.children.removeAll()

this.add.rectangle(600,350,1200,700,0x000000)

this.timeLeft = 180

this.timerText = this.add.text(600,100,"Tiempo: 180",{
font:"32px Arial",
fill:"#fff"
}).setOrigin(0.5)

// CUENTA REGRESIVA
this.timer = this.time.addEvent({
delay:1000,
loop:true,
callback:()=>{

this.timeLeft--

this.timerText.setText("Tiempo: "+this.timeLeft)

if(this.timeLeft <= 0){
alert("Perdiste, intenta de nuevo")
this.scene.restart()
}

}
})

// BOTON GANAR (placeholder del laberinto)
this.add.text(600,350,"Completar",{
font:"28px Arial",
backgroundColor:"#fff",
color:"#000",
padding:10
})
.setOrigin(0.5)
.setInteractive()
.on("pointerdown",()=>{

// RECOMPENSA
this.game.inventory.addItem("libro")

alert("Pedido completado")

this.scene.stop()

})

}

}
