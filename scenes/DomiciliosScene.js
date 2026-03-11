class DomiciliosScene extends Phaser.Scene{

constructor(){
super("DomiciliosScene");
}

preload(){

this.load.image("fondo2","assets/mapa.png");
this.load.image("avatar","assets/avatar.png");
this.load.image("libro","assets/libro.png");

}

create(){

this.add.image(600,350,"fondo2");

// INVENTARIO
this.inventory = new Inventory(this);

// AVATAR
this.avatar = this.physics.add.sprite(600,550,"avatar");
this.avatar.setScale(0.6);

// CONTROLES
this.cursors = this.input.keyboard.createCursorKeys();

// LIBRO EN PISO

this.libro = this.add.image(900,550,"libro")
.setScale(0.2)
.setInteractive();

this.libro.on("pointerdown",()=>{

this.inventory.addItem("Libro encontrado");

this.libro.destroy();

});


// COMPUTADOR

this.computador = this.add.rectangle(
200,
500,
100,
80,
0x444444
).setInteractive();

this.add.text(160,450,"Computador");

this.computador.on("pointerdown",()=>{

alert("Aquí se pedirá el libro a domicilio");

});


// BUZON

this.buzon = this.add.rectangle(
600,
500,
80,
80,
0xaa0000
).setInteractive();

this.add.text(570,450,"Buzón");

this.buzon.on("pointerdown",()=>{

this.inventory.addItem("Libro del domicilio");

});


// VOLVER

this.volver = this.add.text(
20,
650,
"Volver a biblioteca",
{font:"20px Arial",fill:"#ffffff"}
).setInteractive();

this.volver.on("pointerdown",()=>{

this.scene.start("MapScene");

});

}

update(){

let speed = 2.5;

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

}

}
