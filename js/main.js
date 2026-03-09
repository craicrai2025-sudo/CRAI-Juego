const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    parent: 'game',
    scene: [MapScene]
};

const game = new Phaser.Game(config);
