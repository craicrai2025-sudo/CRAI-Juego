class Inventory {

constructor(scene){

this.scene = scene
this.items = []
this.icons = []
this.open = false

// BOTON MALETA
this.button = scene.add.image(1150,60,"maleta")
.setScale(0.08)
.setDepth(1000)
.setScrollFactor(0)
.setInteractive()

this.button.on("pointerdown",()=>{
this.toggle()
})

// PANEL
this.panel = scene.add.rectangle(600,350,500,350,0x000000,0.7)
.setDepth(999)
.setScrollFactor(0)
.setVisible(false)

// BOTON CERRAR
this.closeButton = scene.add.text(820,200,"X",{font:"28px Arial",fill:"#fff"})
.setDepth(1000)
.setScrollFactor(0)
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
.setDepth(1000)
.setScrollFactor(0)
.setVisible(false)

this.slots.push(slot)
}
}

}

toggle(){

this.open = !this.open

this.panel.setVisible(this.open)
this.closeButton.setVisible(this.open)

this.slots.forEach(s=>s.setVisible(this.open))
this.icons.forEach(i=>i.setVisible(this.open))

}

addItem(texture){

if(this.items.includes(texture)) return

this.items.push(texture)

let index = this.items.length - 1
let slot = this.slots[index]

// ICONO
let icon = this.scene.add.image(slot.x,slot.y,texture)
.setScale(0.08)
.setDepth(1001)
.setScrollFactor(0)
.setInteractive({draggable:true})
.setVisible(this.open)

this.scene.input.setDraggable(icon)

// DRAG
icon.on("drag",(pointer,x,y)=>{
icon.x = x
icon.y = y
})

// SNAP A SLOT
icon.on("dragend",()=>{

let closest = null
let minDist = 99999

this.slots.forEach(s=>{
let d = Phaser.Math.Distance.Between(icon.x,icon.y,s.x,s.y)
if(d < minDist){
minDist = d
closest = s
}
})

// SNAP
icon.x = closest.x
icon.y = closest.y

})

this.icons.push(icon)

}

}
