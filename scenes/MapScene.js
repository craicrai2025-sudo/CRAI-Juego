class MapScene extends Phaser.Scene{

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
this.add.image(600,350,"mapa");

// INVENTARIO
this.inventory = new Inventory(this);

// AVATAR
this.avatar = this.physics.add.sprite(600,550,"avatar");
this.avatar.setScale(0.6);

// CONTROLES
this.cursors = this.input.keyboard.createCursorKeys();

// MOVIMIENTO CON CLIC
this.targetX = null;
this.targetY = null;

this.input.on("pointerdown",(pointer)=>{

this.targetX = pointer.x;
this.targetY = pointer.y;

});

// LIMITES PISO
this.floorMinX = 50;
this.floorMaxX = 1150;
this.floorMinY = 420;
this.floorMaxY = 680;


// FLECHA PUERTA IZQUIERDA

this.flecha = this.add.image(200,450,"flecha")
.setScale(0.2)
.setInteractive();

this.flecha.on("pointerdown",()=>{

this.scene.start("DomiciliosScene");

});


// LIBRO EN ESTANTERIA

this.libro = this.add.image(1050,450,"libro")
.setScale(0.2)
.setInteractive();

this.libro.on("pointerdown",()=>{

this.inventory.addItem("Libro biblioteca");

this.libro.destroy();

});

}

update(){

let speed = 2.5;


// TECLADO

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


// CLIC

if(this.targetX !== null){

let dx = this.targetX - this.avatar.x;
let dy = this.targetY - this.avatar.y;

let distance = Math.sqrt(dx*dx + dy*dy);

if(distance > 5){

this.avatar.x += dx*0.02;
this.avatar.y += dy*0.02;

}else{

this.targetX = null;
this.targetY = null;

}

}


// LIMITES

this.avatar.x = Phaser.Math.Clamp(this.avatar.x,this.floorMinX,this.floorMaxX);
this.avatar.y = Phaser.Math.Clamp(this.avatar.y,this.floorMinY,this.floorMaxY);

}

}
