class UIScene extends Phaser.Scene {

constructor(){
super("UIScene")
}

preload(){

// ICONO INVENTARIO (maleta)
this.load.image("maleta","assets/maleta.png")

}

create(){

// CREAR INVENTARIO GLOBAL (UNA SOLA VEZ)
if(!this.game.inventory){
this.inventory = new Inventory(this)
this.game.inventory = this.inventory
}else{
this.inventory = this.game.inventory
}

// IMPORTANTE: asegurar que el inventario quede visible siempre
this.children.bringToTop(this.inventory.button)

}

update(){
// No necesitas nada aquí por ahora
}

}
