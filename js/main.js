const config = {
type: Phaser.AUTO,
width: 1200,
height: 700,

physics: {   // 🔥 ESTO FALTABA
default: "arcade",
arcade: {
debug: false
}
},

scene: [MapScene, DomiciliosScene, UIScene]
}

const game = new Phaser.Game(config)

// ESTADO GLOBAL
game.globalState = {
mapa: { libroRecogido: false },
domicilios: { libroRecogido: false }
}

// INICIAR UI
game.scene.start("UIScene")
