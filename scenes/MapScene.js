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

// AVATAR
this.avatar = this.physics.add.sprite(600,350,"avatar");
this.avatar.setScale(0.6);

// TECLADO
this.cursors = this.input.keyboard.createCursorKeys();

// DESTINO DEL CLIC
this.targetX = null;
this.targetY = null;

// EVENTO DE CLIC
this.input.on("pointerdown", (pointer) => {

this.targetX = pointer.x;
this.targetY = pointer.y;

});

}

update(){

let speed = 3;

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

this.avatar.x += dx * 0.05;
this.avatar.y += dy * 0.05;

}else{

this.targetX = null;
this.targetY = null;

}

}

}

}
