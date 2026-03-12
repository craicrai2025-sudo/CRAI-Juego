class Inventory {

constructor(scene){

this.scene = scene
this.items = []

this.open = false
this.icons = []

// BOTON LIBRO
this.button = scene.add.image(1150,60,"libro")
.setScale(0.07)
.setDepth(500)
.setInteractive()

this.button.on("pointerdown",()=>{

this.toggle()

})

// PANEL INVENTARIO
this.panel = scene.add.rectangle(
600,
350,
500,
350,
0x000000,
0.8
)
.setDepth(400)
.setVisible(false)

// BOTON CERRAR
this.closeButton = scene.add.text(
820,
200,
"X",
{
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
let index = 0

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

index++

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

let index = this.items.length-1

let slot = this.slots[index]

let icon = this.scene.add.image(
slot.x,
slot.y,
texture
)
.setScale(0.08)
.setDepth(402)
.setInteractive({draggable:true})
.setVisible(this.open)

this.scene.input.setDraggable(icon)

this.scene.input.on("drag",(pointer,obj,x,y)=>{

obj.x = x
obj.y = y

})

this.icons.push(icon)

}

}

}

}
