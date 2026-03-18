class UIScene extends Phaser.Scene{

constructor(){
super("UIScene")
}

create(){

// INVENTARIO GLOBAL (UNA SOLA VEZ)
this.inventory = new Inventory(this)

// 🔥 HACERLO GLOBAL
this.game.inventory = this.inventory

}

}
