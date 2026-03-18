const config = {

type: Phaser.AUTO,
width: 1200,
height: 700,

physics:{
default:"arcade"
},

scene:[
MapScene,
DomiciliosScene
]

}

const game = new Phaser.Game(config)

// 🔥 INVENTARIO GLOBAL
game.globalInventory = null
