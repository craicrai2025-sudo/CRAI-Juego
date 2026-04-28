<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Juego CRAI</title>

<script src="https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.js"></script>

</head>
<body>

<script src="js/inventory.js"></script>

<script src="scenes/MenuScene.js"></script>
<script src="scenes/MapScene.js"></script>
<script src="scenes/DomiciliosScene.js"></script>
<script src="scenes/ComputerUI.js"></script> <!-- 🔥 FALTABA -->
<script src="scenes/UIScene.js"></script>
const config = {
type: Phaser.AUTO,
width: 1200,
height: 700,

physics: {
default: "arcade",
arcade: { debug: false }
},

scene: [MenuScene, MapScene, DomiciliosScene, UIScene, ComputerUI] // 🔥 AQUÍ
}

const game = new Phaser.Game(config)

game.globalState = {
mapa: { libroRecogido: false },
domicilios: { libroRecogido: false }
}
<script src="js/main.js"></script>

</body>
</html>
