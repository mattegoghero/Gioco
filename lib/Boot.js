var bootState = {
    preload : function () {
        game.load.image('backgroundload','../assets/loading1.png');
        game.load.spritesheet('walle', '../assets/loading.png', 145, 134.2,5);
        game.load.spritesheet('loading', '../assets/scrittaloading2.png', 898, 121.5,3);
    },
    create : function () {
        //alert ("boot");
        //inzializzo la fisica del gioco
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMinMax(game.width/4,game.height/4,game.width*2,game.height*2);
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        setTimeout (this.wait,100);
        game.physics.startSystem (Phaser.Physics.ARCADE); 
        game.renderer.renderSession.roundPixels = true;
        
    },
    wait : function () {
        game.state.start ('loading');
    },
};