var loadingState = {
    preload : function (){
        this.loadScene ();
        game.load.image('menu_background', '../assets/menu_background.png');
        game.load.image('logoGame', '../assets/logoGame.png');
        game.load.image('playButton', '../assets/play.png');
        game.load.image('settingsButton', '../assets/opzioni.png', 200, 50);
        game.load.audio('menuMusic', '../assets/menuMusic.wav');
        game.load.image('menu_background', '../assets/menu_background.png');
        game.load.spritesheet('mute', '../assets/on_off.png',705/2,317);
        game.load.spritesheet('mute1', '../assets/on_off1.png',705/2,317);
        game.load.image('homeButton', '../assets/homeButton.png');
        game.load.image('settingsTitle', '../assets/settingsTitle.png');
        game.load.image('musicText', '../assets/musicText.png');
        game.load.image('destra', '../assets/destra.png');
        game.load.image('sinistra', '../assets/sinistra.png');
        game.load.image('salta', '../assets/salta.png');
        game.load.image('frecciaDX', '../assets/frecciaDX.png');
        game.load.image('frecciaSX', '../assets/frecciaSX.png');
        game.load.image('frecciaSU', '../assets/frecciaSU.png');
        game.load.image('spaceBar', '../assets/spaceBar.png');
        game.load.image ('limit', '../assets/murocam.png');
        game.load.image ('tileset', '../World/Oceano/level1/tiles.png');
        game.load.image ('scenariodef','../World/Terra/scenariodef.png');
        game.load.image ('background','../World/Terra/background.jpg');
        game.load.image ('gear', '../assets/Gear.png');
        game.load.image ('resume', '../assets/resume.png');
        game.load.image ('restart', '../assets/restart.png');
        game.load.image ('quit' ,'../assets/quit.png');
        game.load.image ('lifebar' ,'../assets/lifebar.png');
        game.load.image ('reallife' ,'../assets/reallife.png');
        game.load.image ('pausa', '../assets/pausa_scritta.png');
        game.load.image ('pausascritta', '../assets/pausa.png');
        game.load.image ('lattina', '../assets/lattina.png');
        game.load.image ('part', '../assets/particella.png');
        game.load.image ('lisca', '../assets/lisca.png');
        game.load.image ('mela', '../assets/mela.png');
        game.load.image ('sfondoaria', '../World/Aria/sfondoaria.png');
        game.load.image ('nuvole', '../World/Aria/nuvole.png');
        game.load.image ('half', '../assets/half.jpg');
        game.load.image ('clean', '../assets/clean.jpg');
        game.load.image ('dirty', '../assets/dirty.jpg');
        game.load.image ('blank', '../assets/blank.png');
        game.load.image ('scarpa', '../assets/scarpa.png');
        game.load.image ('button1', '../assets/terra-2.png');
        game.load.image ('button1_1', '../assets/terra-2-2.png');
        game.load.image ('button2', '../assets/acqua-2.png');
        game.load.image ('button2_1', '../assets/acqua-2-2.png');
        game.load.image ('button3', '../assets/Vento.png');
        game.load.image ('button3_1', '../assets/Vento-2.png');
        game.load.image ('lvl1verde' ,'../assets/liv1verde.png');
        game.load.image ('lvl2verde' ,'../assets/liv2verde.png');
        game.load.image ('lvl1giallo' ,'../assets/liv1.png');
        game.load.image ('lvl2giallo' ,'../assets/liv2.png');
        game.load.image ('button', '../assets/button.png');
        game.load.spritesheet ('player','../assets/walle.png',35,54);
        game.load.spritesheet ('acquamove','../assets/acquamove.png',2204,36);
        game.load.spritesheet ('zombie','../assets/zombie.png',20,33);
        game.load.spritesheet ('monster','../assets/monster.png',18,28);
        game.load.spritesheet ('killer','../assets/killer.png',41,42);
        game.load.spritesheet ('worldselect','../assets/selectworld.png',1000,121.5,3);
        game.load.tilemap ('map2_1','../World/Oceano/level1/Mappa.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.tilemap ('map1_1','../World/Terra/Mappa.json',null,Phaser.Tilemap.TILED_JSON); 
        game.load.tilemap ('map1_2','../World/Terra/Mappa2.json',null,Phaser.Tilemap.TILED_JSON); 
        game.load.tilemap ('Nemici1_1','../World/Terra/Nemici.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.tilemap ('Nemici1_2','../World/Terra/Nemici2.json',null,Phaser.Tilemap.TILED_JSON);
    },
    create : function () {
        //alert ("Loading");
        
        setTimeout (this.wait,1000);
    },
     wait : function () {
        game.state.start ('menu');
    },
    loadScene () {
      var bg= game.add.sprite(0,0, 'backgroundload');
        bg.scale.setTo(1,1);
        var scritta =game.add.sprite (game.width/2+120,game.height/2,'loading');
        var loadS = scritta.animations.add('loadS');
        scritta.animations.play('loadS',2,true);
        scritta.anchor.setTo(0.5,0.5);
        scritta.scale.setTo(0.5,0.5);
        var walle = game.add.sprite(game.width/2-210,game.height/2-20, 'walle');
        var load = walle.animations.add('load');
        walle.animations.play('load', 3.4, true);
        walle.anchor.setTo(0.5,0.5);
         
    },
};