class MapScene extends Phaser.Scene {

constructor(){
super("MapScene");
}

preload(){

this.load.image("mapa","assets/mapa.png");
this.load.image("avatar","assets/avatar.png");

}

create(){

// MAPA
this.add.image(600,350,"mapa");

// AVATAR (empieza en el piso)
this.avatar = this.physics.add.sprite(600,550,"avatar");
this.avatar.setScale(0.6);

// CONTROLES TECLADO
this.cursors = this.input.keyboard.createCursorKeys();

// VARIABLES PARA CLIC
this.targetX = null;
this.targetY = null;

// LIMITES DEL PISO (RECTANGULO CAMINABLE)

this.floorMinX = 50;
this.floorMaxX = 1150;

this.floorMinY = 100;
this.floorMaxY = 300;

// EVENTO DE CLIC

this.input.on("pointerdown",(pointer)=>{

this.targetX = pointer.x;
this.targetY = pointer.y;

});

}

update(){

let speed = 1.5;


// MOVIMIENTO CON TECLADO

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



// MOVIMIENTO CON CLIC

if(this.targetX !== null){

let dx = this.targetX - this.avatar.x;
let dy = this.targetY - this.avatar.y;

let distance = Math.sqrt(dx * dx + dy * dy);

if(distance > 5){

this.avatar.x += dx * 0.02;
this.avatar.y += dy * 0.02;

}else{

this.targetX = null;
this.targetY = null;

}

}



// LIMITES DEL PISO (RECTANGULO)

if(this.avatar.x < this.floorMinX){
this.avatar.x = this.floorMinX;
}

if(this.avatar.x > this.floorMaxX){
this.avatar.x = this.floorMaxX;
}

if(this.avatar.y < this.floorMinY){
this.avatar.y = this.floorMinY;
}

if(this.avatar.y > this.floorMaxY){
this.avatar.y = this.floorMaxY;
}

}

}
