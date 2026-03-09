class MapScene extends Phaser.Scene {

constructor(){
super("MapScene");
}

preload(){

this.load.image("mapa","assets/mapa.png");
this.load.image("avatar","assets/avatar.png");

}

create(){

this.add.image(600,350,"mapa");

this.avatar = this.physics.add.sprite(600,350,"avatar");
this.avatar.setScale(0.6);

this.cursors = this.input.keyboard.createCursorKeys();

}

update(){

if(this.cursors.left.isDown){
this.avatar.x -= 3;
}
else if(this.cursors.right.isDown){
this.avatar.x += 3;
}

if(this.cursors.up.isDown){
this.avatar.y -= 3;
}
else if(this.cursors.down.isDown){
this.avatar.y += 3;
}

}

}
