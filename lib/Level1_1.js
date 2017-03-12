//First state
var poszombie = [[1675,720],[2100,600],[3650,720]];
var posmonster = [[5800,550],[8300,450],[9400,720]];
var poskiller = [[9250,650],[4300,720]];
var rifiuti = [[400,700],[1000,300],[2330,570],[2300,320],[2630,110],[3000,620],[3500,700],[4420,620],[4900,680],[6190,590],[7200,550],[8630,650],[9100,730],[9650,570],[10000,540],[10500,740]];
var tiporifiuto = ['scarpa','mela','lisca','lattina'];
var life = 3
var finish;
//var score=0;
var level1_1 = {
    create : function () {
        finish = false;
        this.dead=false;
        life=3;
        game.physics.arcade.TILE_BIAS = 40
        game.add.image (0,-10,'background');
        game.stage.backgroundColor = "#ffffff";
        this.map = game.add.tilemap ('map1_1');
        this.map.addTilesetImage ('scenariodef');
        this.scenario = this.map.createLayer ('Scenario');
        this.cursor = game.input.keyboard.createCursorKeys ();
        this.createworld ();
        this.createrifiuti();
        this.createenemy ();
        //game.time.events.loop (2200, this.addEnemy, this);
        space = game.input.keyboard.addKey (Phaser.Keyboard.SPACEBAR);
        Pbutton = game.input.keyboard.addKey (Phaser.Keyboard.P);
        Rbutton = game.input.keyboard.addKey (Phaser.Keyboard.R);
        this.scorelabel.fixedToCamera = true;
        this.pauseButton = game.add.button (game.width-40,40,'gear',this.pause,this);
        this.pauseButton.fixedToCamera = true;
        this.pauseButton.scale.setTo (0.2); this.pauseButton.anchor.setTo(0.5,0.5);
        this.pauseButton.onInputOver.add (this.rotateButton,this);
        this.pauseButton.onInputOut.add (this.rotateButton,this);
        this.emitter = game.add.emitter (0,0,20);
        this.emitter.makeParticles (tiporifiuto);
        this.emitter.setYSpeed (-400);
        this.emitter.setXSpeed (100,-100);
        this.emitter.gravity.y = 200;
        var hidder = game.add.image (0,game.world.height,'blank');
        hidder.fixedToCamera = true;
    },
    
    update : function (){
        game.physics.arcade.collide (this.player, this.mondo);
        game.physics.arcade.collide (this.wastes, this.mondo);
        game.physics.arcade.collide (this.zombies, this.mondo);
        game.physics.arcade.collide (this.monsters, this.mondo);
        game.physics.arcade.collide (this.killers, this.mondo);
        game.physics.arcade.collide (this.monsters, this.enemyLimit);
        game.physics.arcade.collide (this.zombies, this.enemyLimit);
        game.physics.arcade.collide (this.killers, this.enemyLimit);
        if (pause===false&&life>0&&!finish){
           this.movePlayer(); 
        }
        game.physics.arcade.overlap (this.player, this.zombies, this.playerdie, null, this);
        game.physics.arcade.overlap (this.player, this.monsters, this.playerdie, null, this);
        game.physics.arcade.overlap (this.player, this.killers, this.playerdie, null, this);
        game.physics.arcade.overlap (this.player, this.water, this.acquaalert, null, this);
        game.physics.arcade.overlap (this.player, this.wastes, this.takewaste, null, this);
        game.physics.arcade.overlap (this.player, this.endPoint, this.complete, null, this);
        this.blockcamera();
        this.player.body.collideWorldBounds = true;
        game.physics.arcade.collide (this.player, this.muro);
        //console.log ('Player= ',this.player.position.x);
        //console.log (game.paused);
        this.lifeLabel.text = 'LIFE: '+ life;
        this.animateZombie ();
        this.animateMonster ();
        this.animateKiller ();
    }, 
    
    //Funzioni secondarie
    createPlayer : function () {
        this.player = game.add.sprite (100,720,'player');
        this.player.animations.add ('right',[3,4],8,true);
        this.player.animations.add('left',[5,6],8,true);
        this.player.animations.add ('jumpR',[10,11,10,12],1,true);
        this.player.animations.add ('jumpL',[15,14,15,13],1,true);
        this.player.scale.setTo (1.7,1.7);
        //cambio l'ancoraggio del personaggio
        this.player.anchor.setTo(0.5,0.5);
        //abilito la fisica del giocatore
        game.physics.arcade.enable (this.player);
        //imposto una fisica verticale
        this.player.body.gravity.y = 2000;
        this.player.body.setSize (35,38,0,15);
    },
    movePlayer: function() { // If the left arrow key is pressed 
    if (this.cursor.left.isDown) { 
    // Move the player to the left 
    // The velocity is in pixels per second
    
    if (!this.player.body.onFloor())
        this.player.frame = 13;
    else
        this.player.animations.play('left');
    if (!(this.player.position.x<this.camera.x+30))
        this.player.body.velocity.x = -300;
    else
        this.player.body.velocity.x = 0;
    this.left = true;
    }
    // If the right arrow key is pressed 
    else if (this.cursor.right.isDown) { 
        // Move the player to the right 
        this.player.body.velocity.x = 300;
        if (!this.player.body.onFloor()){
            this.small();
            this.player.frame = 12;
        }else{
            this.player.animations.play('right');
        }
        this.left = false;
        }
        // If neither the right or left arrow key is pressed 
        else { // Stop the player 
            this.player.body.velocity.x = 0; 
            if (this.left)
                if (this.player.body.onFloor()){
                    this.player.frame = 9;
                    this.big();
                }else{
                    this.player.frame = 13;
                    this.small ();
                }else{
                if (this.player.body.onFloor()){
                    this.player.frame = 0;
                    this.big();
                }else{
                    this.player.frame = 12;
                    this.small ();
                }
                }
        }
        if (this.cursor.up.isDown||space.isDown){
            lag++;
        }
        if (lag===1||lag===30){
            // If the up arrow key is pressed and the player is on the ground 
            if ((space.isDown||this.cursor.up.isDown)&&cont<2) { 
                // Move the player upward (jump)
                if (this.left){
                    this.player.animations.play('jumpL');
                    this.player.frame = 13;
                    this.small ();
                } else{
                    this.player.animations.play ('jumpR');
                    this.player.frame = 12;
                    this.small ();
                }
                this.player.body.velocity.y = -800;
                cont++;
            } 
        }else {
             if (this.player.body.onFloor()){
                  cont=0;
                lag=0;
             }
        }
        if (lag>=1&&lag<29){
            lag++;
        };
    },
    createworld : function () {
        score = 0;
        this.scorelabel = game.add.text (10,10, 'SCORE: 0', {font: '28px Arial', fill: '#ffffff', fontWeight :'bold'});
        this.lifeLabel = game.add.text (200,10,'LIFE: 0', {font: '28px Arial', fill:'red', fontWeight: 'bold'});
        this.lifeLabel.fixedToCamera = true;
        this.createPlayer();
        this.water = game.add.group ();
        var acquapos = [0,2166,4350,6700,9450];
        for (i=0;i<acquapos.length;i++){
            this.acquamove = game.add.sprite(acquapos[i],762,'acquamove',0,this.water);
            this.acquamove.animations.add ('move',[0,1,2],3,true);
            this.acquamove.animations.play ('move');
        };
        game.physics.arcade.enable (this.water);
        this.mondo = this.map.createLayer ('Mondo');
        this.acqua = this.map.createLayer ('Acqua');
        
        this.mondo.resizeWorld();
        this.map.setCollisionBetween (0,500);
        this.limit = game.add.sprite (0,0,'limit');
        game.physics.arcade.enableBody (this.limit);
        this.limit.body.immovable = true; 
        this.limit.fixedToCamera = true;
        this.nemici = game.add.tilemap ('Nemici1_1');
        this.nemici.addTilesetImage ('scenariodef');
        this.nemici.setCollisionBetween (0,1000);
        this.enemyLimit = this.nemici.createLayer ('Nemici');
        this.enemyLimit.alpha = 0;
        this.lifebar = game.add.image (320,25,'lifebar');
        this.lifebar.anchor.setTo (0,0.5);
        this.reallife = game.add.image (320,25,'reallife');
        this.reallife.anchor.setTo (0,0.5);
        this.lifebar.fixedToCamera=true;
        this.reallife.fixedToCamera=true;
        this.endPoint = game.add.sprite (10800,700,'');
        game.physics.arcade.enable (this.endPoint);
        this.mute=game.add.button(game.width-120,40, 'mute1', this.toggleSound,this);
        this.mute.fixedToCamera = true;
        this.mute.anchor.setTo(0.5);
        this.mute.scale.setTo(0.2);
        
    },
    playerdie : function (player,enemy) {
        if (enemy.key=='killer'){
            if (score > 0 ){
                enemy.kill();
                if (score>9)
                score=score-10;
                else
                score=score-5;
                this.emitter.x = this.player.x;
                this.emitter.y = this.player.y;
                this.emitter.start (true,5000,null,5);
            }            
            this.scorelabel.text = 'SCORE: '+score;
        }else{
        life--;
        enemy.kill();
        game.camera.shake (0.01,100);
        game.camera.flash (0xf44242,500)
        game.add.tween(this.reallife.scale).to({x: 0.33*life, y:1},1000).start();
        //game.state.start ('level1_1');
        if (life===0){
            game.camera.flash(0xf44242,1500);
            this.schermata = game.add.image (game.camera.x-100,0,'pausa');
            this.schermata.height = 950;
            this.gameover = game.add.text (game.camera.x+960,game.height/2, 'GAMEOVER', {font: '72px Arial', fill: '#ffffff', fontWeight :'bold'});
            this.gameover.anchor.setTo (0.5);
            this.player.body.velocity.x=0;
            this.emitter.x = this.player.x;
            this.emitter.y = this.player.y;
            this.emitter.start (true, 5000,null,20);
            this.player.alpha = 0;
            setTimeout (this.reset,5000);
            }
        };
    },
    takewaste : function (player,waste) {
        waste.kill();
        score += 5;
        this.scorelabel.text = 'SCORE: ' + score;
    },
    complete : function () {
            game.camera.fade (0x000000,5000); 
            if (!finish)
            setTimeout(this.next,5000);
            finish=true;
        },   
    createenemy : function () {
        this.zombies = game.add.group();
        this.monsters = game.add.group();
        this.killers = game.add.group();
        
        for (i=0;i<poszombie.length;i++){
            game.add.sprite(poszombie[i][0],poszombie[i][1],'zombie',0,this.zombies);
        }
        game.physics.arcade.enable (this.zombies);
        this.zombies.forEach (function(zombie){
            zombie.scale.setTo (1.5);
            zombie.animations.add ('rightZ',[0,1,2],5,true);
            zombie.animations.add ('leftZ',[3,4,5],5,true);
            zombie.body.velocity.x = 100;
            zombie.body.gravity.y = 100;
            zombie.body.bounce.x = 1;
            zombie.body.setSize (20,32);
        })
        
        for (i=0;i<posmonster.length;i++){
            game.add.sprite(posmonster[i][0],posmonster[i][1],'monster',0,this.monsters);
        }
        game.physics.arcade.enable (this.monsters);
        this.monsters.forEach (function(monster){
            monster.scale.setTo (1.5);
            monster.animations.add ('rightM',[0,1,2],2,true);
            monster.animations.add ('leftM',[5,4,3],2,true);
            monster.body.velocity.x = 300;
            monster.body.gravity.y = 100;
            monster.body.bounce.x = 1;
            monster.body.setSize (18,30);
        });
        
        for (i=0;i<poskiller.length;i++){
            game.add.sprite(poskiller[i][0],poskiller[i][1],'killer',0,this.killers);
        }
        game.physics.arcade.enable (this.killers);
        this.killers.forEach (function(killer){
            killer.scale.setTo (1.5);
            killer.animations.add ('rightK',[0,1,2,3,4,5],12,true);
            killer.animations.add ('leftK',[11,10,9,8,7,6],12,true);
            killer.body.velocity.x = 200;
            killer.body.gravity.y = 400;
            killer.body.bounce.x = 1;
        })
    },
    blockcamera : function () {
      if (this.player.position.x>game.camera.x+game.width/2+1){
          game.camera.follow (this.player,Phaser.Camera.FOLLOW_LOCKON, 0.1,0.1);
      } else {
          if (game.camera.x<this.camerax){
              game.camera.follow (!this.player);
          }
      }
    this.camerax = game.camera.x;
    },
    pause : function () {
        game.paused = true;
        this.schermata = game.add.image (game.camera.x,0,'pausa');
        this.schermata.height = 950;
        this.pausascritta = game.add.image (game.camera.x+game.width/2,200,'pausascritta');
        this.pausascritta.anchor.setTo (0.5);
        this.pausascritta.scale.setTo (0.8);
        //imposta il frame della Muto
        this.buttons = game.add.group ();
        this.resumeBtn = game.add.sprite(game.camera.x+game.width/2,400,'resume',0,this.buttons);
        this.restartBtn = game.add.sprite (game.camera.x+game.width/2,600,'restart',0,this.buttons);
        this.quitBtn = game.add.sprite (game.camera.x+game.width/2,800,'quit',0,this.buttons);
        this.input.onDown.add(this.clicked,this);
        this.buttons.forEach (function (button){
            button.anchor.setTo (0.5);
        })
        
    },
    small : function () {
        this.player.body.setSize (30,38,0,15);
    },
    big : function () {
        this.player.body.setSize (35,38,0,15);
    },
    clicked : function () {
        if (game.paused){
            if (this.resumeBtn.getBounds().contains(this.game.input.x,this.game.input.y)){
                this.game.paused = false;
                this.buttons.forEach(function(button){
                    button.kill ();
                })
                this.schermata.kill();
                this.pausascritta.kill();
            } else {
                if (this.restartBtn.getBounds().contains(this.game.input.x,this.game.input.y)){
                this.game.paused = false;
                game.state.start ('level1_1');
                this.buttons.forEach(function(button){
                    button.kill ();
                })
                } else {
                    if (this.quitBtn.getBounds().contains(this.game.input.x,this.game.input.y)){
                this.game.paused = false;
                game.state.start ('worldSelect');
                this.buttons.forEach(function(button){
                    button.kill ();
                })
                };
                }
            }
        }
    },
    rotateButton : function () {
        if (this.pauseButton.angle === 0)
            this.pauseButton.angle = 30;
        else
            this.pauseButton.angle = 0;
    },
    reset :function () {
            game.state.start ('level1_1');
        },
    acquaalert: function () {
        life=0;
        this.gameovery();
    },
    gameovery : function (){
        game.add.tween(this.reallife.scale).to({x: 0.33*life, y:1},1000).start();
        //game.state.start ('level1_1');
        if (life===0&&!this.dead){
            game.camera.flash(0xf44242,5000);
            this.schermata = game.add.image (game.camera.x-100,0,'pausa');
            this.schermata.height = 950;
            this.gameover = game.add.text (game.camera.x+960,game.height/2, 'GAMEOVER', {font: '72px Arial', fill: '#ffffff', fontWeight :'bold'});
            this.gameover.anchor.setTo (0.5);
            this.player.body.velocity.x=0;
            this.emitter.x = this.player.x;
            this.emitter.y = this.player.y;
            this.emitter.start (true, 5000,null,20)
            setTimeout (this.reset,5000);
            dead = true;
            };
    },
    animateZombie : function () {
        this.zombies.forEach (function(zombie){
            if (zombie.body.velocity.x<0)
                zombie.animations.play ('rightZ');
            else
                zombie.animations.play ('leftZ');
        })
    },
    animateMonster : function () {
        this.monsters.forEach (function(monster){
            if (monster.body.velocity.x<0)
                
                monster.animations.play ('rightM');
            else
                monster.animations.play ('leftM');
        })
    },
    animateKiller : function () {
        this.killers.forEach (function(killer){
            if (killer.body.velocity.x<0)
                
                killer.animations.play ('leftK');
            else
                killer.animations.play ('rightK');
        })
    },
    createrifiuti : function () {
        var lunghezza = tiporifiuto.length-1;
        this.wastes = game.add.group ();
        for (i=0; i<rifiuti.length; i++){
            game.add.sprite (rifiuti[i][0],rifiuti[i][1],tiporifiuto[game.rnd.integerInRange(0,lunghezza)],0,this.wastes);
        }
        game.physics.arcade.enable (this.wastes);
        this.wastes.forEach (function (waste){
            waste.body.gravity.y = 1000;
            waste.anchor.setTo (0.5,1);
        });
    },
    next : function () {
        
        console.log(score);
        game.state.start ('finalScore');
    },
    toggleSound: function() {
        if(sound === 0){
			sound=1;
            this.mute.frame = 0;
            game.sound.mute = false;
        }
        else{
			sound=0; 
            this.mute.frame = 1;
            game.sound.mute = true;        
        }
        //Nuovo valore del cookie;
        this.setCookie("volume", sound, 30);
    },
    
    //Imposto i valori del cookie;
    setCookie: function (volumec, sound, scadenza){
		var giorno = new Date();
		giorno.setTime(giorno.getTime() + (parseInt(scadenza)*24*60*60*1000));
		var scad= giorno.toUTCString();
		document.cookie= volumec+"="+sound+"p"+";expires="+scad+";path=/";    
	},
    
    //Funzione di ricerca del cookie;
	getCookie: function (volumec){
		var name = volumec+"=";
		var decodeCookie= decodeURIComponent(document.cookie);
		var point= decodeCookie.indexOf(name);
        sound=1;
        
		if(point == -1){
			return sound;
		}else{
			point= point+name.length;
			var endpoint= point;
			while(decodeCookie.charAt(endpoint) != 'p'){
				endpoint=endpoint+1;
			}
				
			sound= decodeCookie.substring(point, endpoint);
			return sound;
        }
    },
    };
