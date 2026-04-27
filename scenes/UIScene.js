class UIScene extends Phaser.Scene{

constructor(){
super("UIScene")
}

preload(){
this.load.image("maleta","assets/maleta.png")
this.load.image("moneda","assets/moneda.png")
this.load.image("libro","assets/libro.png")
}

create(){

this.inventory = new Inventory(this)

// GLOBAL
this.game.inventory = this.inventory

}
}
