class UIScene extends Phaser.Scene{

constructor(){
super("UIScene")
}

preload(){
this.load.image("maleta","assets/maleta.png")
}

create(){

this.inventory = new Inventory(this)
this.game.inventory = this.inventory

// RESTAURAR INVENTARIO
let saved = this.game.globalState.inventory

saved.forEach(item=>{
this.inventory.addItem(item)
})

}

}
