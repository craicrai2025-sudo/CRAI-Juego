class MapScene extends Phaser.Scene {

    constructor(){
        super("MapScene");
    }

    preload(){

        // imágenes
        this.load.image("mapa","assets/mapa.png");
        this.load.image("avatar","assets/avatar.png");

    }

    create(){

        // fondo del mapa
        this.add.image(600,350,"mapa");

        // avatar
        this.avatar = this.physics.add.sprite(600,500,"avatar");

        // click para mover avatar
        this.input.on("pointerdown",(pointer)=>{

            this.tweens.add({
                targets:this.avatar,
                x:pointer.x,
                y:pointer.y,
                duration:800
            });

        });

    }

}
