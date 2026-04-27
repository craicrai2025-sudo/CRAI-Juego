const config = {
type: Phaser.AUTO,
width: 1200,
height: 700,

physics: {
default: "arcade",
arcade: {
debug: false
}
},

scene: [MenuScene, MapScene, DomiciliosScene, UIScene]
}

const game = new Phaser.Game(config)

// ESTADO GLOBAL
game.globalState = {
mapa: { libroRecogido: false },
domicilios: { libroRecogido: false },
inventory: []
}

// INICIAR
game.scene.start("MenuScene")
game.scene.start("UIScene")
