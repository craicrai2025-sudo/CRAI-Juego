const config = {

type: Phaser.AUTO,
width: 1200,
height: 700,

physics:{
default:"arcade"
},

scene:[
MapScene,
DomiciliosScene,
UIScene
]

}

const game = new Phaser.Game(config)

// 🔥 INVENTARIO GLOBAL
game.globalInventory = null

//Inventario
callbacks: {
postBoot: function (game) {
game.scene.start("UIScene")
}
}
