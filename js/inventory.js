class Inventory {

constructor(scene){

this.scene = scene
this.items = []
this.icons = []

this.open = false

// BOTÓN INVENTARIO
this.button = scene.add.image(1150,60,"maleta")
.setScale(0.07)
.setDepth(500)
.setInteractive()

this.button.on("pointerdown",()=>{
this.toggle()
})

// PANEL
this.panel = scene.add.rectangle(600,350,500,350,0x000000,0.85)
.setDepth(400)
.setVisible(false)

// TOOLTIP
this.tooltip = scene.add.text(0,0,"",{
font:"18px Arial",
fill:"#ffffff",
backgroundColor:"#000000"
})
.setPadding(5)
.setDepth(500)
.setVisible(false)

// BOTÓN CERRAR
this.closeButton = scene.add.text(820,200,"X",{
font:"28px Arial",
fill:"#ffffff"
})
.setDepth(401)
.setInteractive()
.setVisible(false)

this.closeButton.on("pointerdown",()=>{
this.toggle()
})

// SLOTS
this.slots = []

let startX = 450
let startY = 260

for(let row=0;row<2;row++){
for(let col=0;col<5;col++){

let slot = scene.add.rectangle(
startX + col*80,
startY + row*80,
60,
60,
0xffffff,
0.15
)
.setStrokeStyle(2,0xffffff)
.setDepth(401)
.setVisible(false)

this.slots.push(slot)

}
}

// DRAG GLOBAL (solo una vez)
scene.input.on("drag",(pointer,obj,x,y)=>{
obj.x = x
obj.y = y
})

// SNAP AL SOLTAR
scene.input.on("dragend",(pointer,obj)=>{

let closest = this.getClosestSlot(obj.x,obj.y)

if(closest){
obj.x = closest.x
obj.y = closest.y
}

})

}

toggle(){

this.open = !this.open

this.panel.setVisible(this.open)
this.closeButton.setVisible(this.open)

this.slots.forEach(s=>s.setVisible(this.open))
this.icons.forEach(i=>i.setVisible(this.open))

}

addItem(texture){

// evitar duplicados
if(this.items.includes(texture)) return

this.items.push(texture)

let index = this.items.length - 1
let slot = this.slots[index]

// crear icono
let icon = this.scene.add.image(slot.x,slot.y,texture)
.setScale(0.08)
.setDepth(402)
.setInteractive({draggable:true})
.setVisible(this.open)

// HOVER
icon.on("pointerover",()=>{

icon.setScale(0.1)

this.tooltip.setText(texture)
this.tooltip.setPosition(icon.x,icon.y - 40)
this.tooltip.setVisible(true)

})

icon.on("pointerout",()=>{

icon.setScale(0.08)
this.tooltip.setVisible(false)

})

this.icons.push(icon)

}

getClosestSlot(x,y){

let minDist = 9999
let closest = null

this.slots.forEach(slot=>{

let dist = Phaser.Math.Distance.Between(x,y,slot.x,slot.y)

if(dist < minDist){
minDist = dist
closest = slot
}

})

return closest

}

}
