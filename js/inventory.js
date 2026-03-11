class Inventory {

constructor(scene){

this.scene = scene;
this.items = [];

this.text = scene.add.text(
20,
20,
"Inventario: vacío",
{
font: "20px Arial",
fill: "#ffffff",
backgroundColor: "#000000"
}
).setScrollFactor(0);

}

addItem(item){

this.items.push(item);
this.updateUI();

}

updateUI(){

if(this.items.length === 0){

this.text.setText("Inventario: vacío");

}else{

this.text.setText("Inventario: " + this.items.join(", "));

}

}

}
