class UIScene extends Phaser.Scene{

constructor(){
super("UIScene")
}

preload(){
this.load.image("maleta","assets/maleta.png")
}

create(){

this.inventory = new Inventory(this)

// GLOBAL
this.game.inventory = this.inventory

}

}
