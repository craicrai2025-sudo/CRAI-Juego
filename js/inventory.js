class Inventory {

constructor(scene){

this.scene = scene;
this.items = [];
this.icons = [];

// fondo inventario
this.background = scene.add.rectangle(
1000,
80,
340,
120,
0x000000,
0.6
).setDepth(200);

// slots
this.slots = [];

for(let i=0;i<5;i++){

let slot = scene.add.rectangle(
880 + (i*65),
80,
55,
55,
0xffffff,
0.2
)
.setStrokeStyle(2,0xffffff)
.setDepth(201);

this.slots.push(slot);

}

}

addItem(texture){

let index = this.items.length;

this.items.push(texture);

let icon = this.scene.add.image(
880 + (index*65),
80,
texture
)
.setScale(0.08)
.setDepth(202)
.setInteractive({ draggable:true });

this.scene.input.setDraggable(icon);

this.scene.input.on("drag",(pointer,gameObject,dragX,dragY)=>{

gameObject.x = dragX;
gameObject.y = dragY;

});

this.icons.push(icon);

}

}
