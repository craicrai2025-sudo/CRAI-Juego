class DomiciliosScene extends Phaser.Scene {

constructor(){
super("DomiciliosScene");
}

preload(){

this.load.image("room","assets/room.png");
this.load.image("pc","assets/computador.png");
this.load.image("silla","assets/silla.png");
this.load.image("libro","assets/libro.png");
this.load.image("buzon","assets/buzon.png");

}

create(){

// FONDO
this.add.image(600,350,"room");

// TITULO
this.add.text(420,40,"Centro de domicilios",{fontSize:"32px",fill:"#000"});


// COMPUTADOR

this.pc = this.add.image(300,420,"pc");
this.pc.setInteractive();


// SILLA

this.add.image(300,500,"silla");


// LIBRO EN EL PISO

this.libro = this.add.image(900,550,"libro");
this.libro.setScale(0.3);
this.libro.setInteractive();


// BUZON

this.buzon = this.add.rectangle(600,500,100,120,0x888888);
this.buzon.setInteractive();


// INVENTARIO VISUAL

this.inventoryText = this.add.text(20,650,"Inventario: "+gameInventory.join(", "),{
fontSize:"18px",
fill:"#000"
});


// RECOGER LIBRO

this.libro.on("pointerdown",()=>{

gameInventory.push("Libro encontrado");

this.libro.destroy();

this.inventoryText.setText("Inventario: "+gameInventory.join(", "));

});


// PEDIR LIBRO EN PC

this.pc.on("pointerdown",()=>{

this.showOrderInterface();

});


// RECOGER LIBRO DEL BUZON

this.buzon.on("pointerdown",()=>{

if(this.bookReady){

gameInventory.push("Libro domicilio");

this.bookReady = false;

this.inventoryText.setText("Inventario: "+gameInventory.join(", "));

}

});

}

showOrderInterface(){

let panel = this.add.rectangle(600,350,400,300,0xffffff)
.setStrokeStyle(3,0x000000);

let text = this.add.text(470,300,"Solicitar libro a domicilio",{
fontSize:"20px",
fill:"#000"
});

let button = this.add.rectangle(600,400,200,50,0x00aa00)
.setInteractive();

let label = this.add.text(540,385,"Pedir libro",{fontSize:"18px",fill:"#fff"});


button.on("pointerdown",()=>{

this.bookReady = true;

panel.destroy();
text.destroy();
button.destroy();
label.destroy();

});

}

}
