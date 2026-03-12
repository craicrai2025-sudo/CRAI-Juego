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

// ESCRITORIO (capa frontal)
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
this.keyE = this.input.keyboard.addKey("E");

// LIMITES
this.floorMinX = 50;
this.floorMaxX = 1150;
this.floorMinY = 420;
this.floorMaxY = 690;


// MENSAJE INTERACCION
this.interactText = this.add.text(
520,
620,
"",
{
font:"22px Arial",
fill:"#ffffff",
backgroundColor:"#000000"
}
).setDepth(300);


// FLECHA PUERTA
this.flecha = this.add.image(420,450,"flecha")
.setScale(0.15)
.setAngle(-90)
.setDepth(3);


// LIBRO
this.libro = this.add.image(1000,520,"libro")
.setScale(0.08)
.setDepth(1);


// OBJETO ACTUAL
this.currentInteractable = null;

}

update(){

let speed = 2.5;


// MOVIMIENTO

if(this.cursors.left.isDown){
this.avatar.x -= speed;
}

else if(this.cursors.right.isDown){
this.avatar.x += speed;
}

if(this.cursors.up.isDown){
this.avatar.y -= speed;
}

else if(this.cursors.down.isDown){
this.avatar.y += speed;
}


// LIMITES

this.avatar.x = Phaser.Math.Clamp(this.avatar.x,this.floorMinX,this.floorMaxX);
this.avatar.y = Phaser.Math.Clamp(this.avatar.y,this.floorMinY,this.floorMaxY);


// PROFUNDIDAD RPG

this.avatar.setDepth(this.avatar.y);


// DETECTAR OBJETOS CERCANOS

this.currentInteractable = null;
this.interactText.setText("");

let distanceLibro = Phaser.Math.Distance.Between(
this.avatar.x,
this.avatar.y,
this.libro.x,
this.libro.y
);

if(distanceLibro < 80){

this.currentInteractable = "libro";
this.interactText.setText("Presiona E para recoger libro");

}


let distancePuerta = Phaser.Math.Distance.Between(
this.avatar.x,
this.avatar.y,
this.flecha.x,
this.flecha.y
);

if(distancePuerta < 80){

this.currentInteractable = "puerta";
this.interactText.setText("Presiona E para entrar");

}


// PRESIONAR E

if(Phaser.Input.Keyboard.JustDown(this.keyE)){

if(this.currentInteractable === "libro"){

this.inventory.addItem("libro");

this.libro.destroy();

}

if(this.currentInteractable === "puerta"){

this.scene.start("DomiciliosScene");

}

}

}

}
