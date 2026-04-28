const config = {
type: Phaser.AUTO,
width: 1200,
height: 700,

physics: {
default: "arcade",
arcade: { debug: false }
},

scene: [MenuScene, MapScene, DomiciliosScene, ComputerUI, UIScene]
}

const game = new Phaser.Game(config)

// ESTADO GLOBAL
game.globalState = {
mapa: { libroRecogido: false },
domicilios: { libroRecogido: false }
}
