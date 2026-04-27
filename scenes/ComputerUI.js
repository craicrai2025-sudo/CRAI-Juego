class ComputerUI extends Phaser.Scene{

constructor(){
super("ComputerUI")
}

create(){

this.add.rectangle(600,350,1200,700,0x000000,0.9)

this.add.text(600,80,"Sistema de Domicilios",{font:"32px Arial",fill:"#fff"}).setOrigin(0.5)

this.sedes = ["Centro de Domicilios","Claustro","Quinta"]
this.sedeIndex = 0

this.sedeText = this.add.text(600,180,this.sedes[0],{
font:"24px Arial",
backgroundColor:"#fff",
color:"#000",
padding:10
})
.setOrigin(0.5)
.setInteractive()

this.sedeText.on("pointerdown",()=>{
this.sedeIndex = (this.sedeIndex+1)%this.sedes.length
this.sedeText.setText(this.sedes[this.sedeIndex])
})

this.acciones = ["Pedir libro","Devolver libro"]
this.accionIndex = 0

this.accionText = this.add.text(600,260,this.acciones[0],{
font:"24px Arial",
backgroundColor:"#fff",
color:"#000",
padding:10
})
.setOrigin(0.5)
.setInteractive()

this.accionText.on("pointerdown",()=>{
this.accionIndex = (this.accionIndex+1)%this.acciones.length
this.accionText.setText(this.acciones[this.accionIndex])
})

this.coinPlaced = false

this.add.text(600,320,"Costo: 1 moneda",{font:"20px Arial",fill:"#fff"}).setOrigin(0.5)

this.coinSlot = this.add.rectangle(600,400,80,80,0xffffff,0.2)

this.boton = this.add.text(600,500,"PEDIR",{
font:"28px Arial",
backgroundColor:"#0f0",
color:"#000",
padding:10
})
.setOrigin(0.5)
.setInteractive()

this.boton.on("pointerdown",()=>{

if(
this.sedes[this.sedeIndex]==="Centro de Domicilios" &&
this.acciones[this.accionIndex]==="Pedir libro"
){
this.startTimer()
}else{
alert("Opciones incorrectas")
}

})

this.add.text(1100,50,"X",{font:"32px Arial",fill:"#fff"})
.setInteractive()
.on("pointerdown",()=> this.scene.stop())

}

startTimer(){

this.children.removeAll()

this.timeLeft = 180

this.timerText = this.add.text(600,200,"Tiempo: 180",{font:"32px Arial",fill:"#fff"}).setOrigin(0.5)

this.time.addEvent({
delay:1000,
loop:true,
callback:()=>{
this.timeLeft--
this.timerText.setText("Tiempo: "+this.timeLeft)

if(this.timeLeft<=0){
alert("Perdiste")
this.scene.restart()
}
}
})

// BOTON GANAR
this.add.text(600,400,"Completar",{font:"28px Arial",backgroundColor:"#fff",color:"#000"})
.setOrigin(0.5)
.setInteractive()
.on("pointerdown",()=>{
this.game.inventory.addItem("libro")
alert("Libro recibido")
this.scene.stop()
})

}

}
