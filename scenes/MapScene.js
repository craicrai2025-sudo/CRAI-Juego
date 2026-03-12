class MapScene extends Phaser.Scene {

constructor(){
super("MapScene");
}

preload(){

this.load.image("mapa","assets/mapa.png");
this.load.image("avatar","assets/avatar.png");
this.load.image("flecha","assets/flecha.png");
this.load.image("libro","assets/libro.png");

}

create(){

// MAPA
this.mapa = this.add.image(600,350,"mapa").setDepth(0);

// CAPA DEL ESCRITORIO (parte frontal)
this.escritorioFront = this.add.rectangle(
600,
450,
400,
120,
0x000000,
0
).setDepth(5);


// INVENTARIO
this.inventory = new Inventory(this);

// AVATAR
this.avatar = this.physics.add.sprite(600,550,"avatar");
this.avatar.setScale(0.6);

// CONTROLES
this.cursors = this.input.keyboard.createCursorKeys();

// VARIABLES MOVIMIENTO
this.targetX = null;
this.targetY = null;
this.targetObject = null;

this.input.on("pointerdown",(pointer)=>{

this.targetX = pointer.x;
this.targetY = pointer.y;
this.targetObject = null;

});

// LIMITES
this.floorMinX = 50;
this.floorMaxX = 1150;
this.floorMinY = 420;
this.floorMaxY = 690;


// FLECHA
this.flecha = this.add.image(420,450,"flecha")
.setScale(0.15)
.setAngle(-90)
.setDepth(3)
.setInteractive();

this.flecha.on("pointerdown",()=>{

this.scene.start("DomiciliosScene");

});


// LIBRO
this.libro = this.add.image(1000,520,"libro")
.setScale(0.08)
.setDepth(1)
.setInteractive();

this.libro.on("pointerdown",()=>{

this.targetX = this.libro.x;
this.targetY = this.libro.y;
this.targetObject = this.libro;

});

}

update(){

let speed = 2.5;


// MOVIMIENTO TECLADO

if(this.cursors.left.isDown){

this.avatar.x -= speed;
this.targetX = null;

}

else if(this.cursors.right.isDown){

this.avatar.x += speed;
this.targetX = null;

}

if(this.cursors.up.isDown){

this.avatar.y -= speed;
this.targetX = null;

}

else if(this.cursors.down.isDown){

this.avatar.y += speed;
this.targetX = null;

}


// MOVIMIENTO CLIC

if(this.targetX !== null){

let dx = this.targetX - this.avatar.x;
let dy = this.targetY - this.avatar.y;

let distance = Math.sqrt(dx*dx + dy*dy);

if(distance > 10){

this.avatar.x += dx * 0.02;
this.avatar.y += dy * 0.02;

}else{

if(this.targetObject){

this.inventory.addItem("libro");

this.targetObject.destroy();
this.targetObject = null;

}

this.targetX = null;
this.targetY = null;

}

}


// LIMITES

this.avatar.x = Phaser.Math.Clamp(this.avatar.x,this.floorMinX,this.floorMaxX);
this.avatar.y = Phaser.Math.Clamp(this.avatar.y,this.floorMinY,this.floorMaxY);


// PROFUNDIDAD AUTOMÁTICA (clave del efecto RPG)

this.avatar.setDepth(this.avatar.y);

}
