//First state
/*var poszombie = [[1675,720],[2100,600],[3650,720]];
var posmonster = [[5800,550],[8300,450],[9400,720]];
var poskiller = [[9250,650],[4300,720]];
var rifiuti = [[400,700],[1000,300],[2330,570],[2300,320],[2630,110],[3000,620],[3500,700],[4420,620],[4900,680],[6190,590],[7200,550],[8630,650],[9100,730],[9650,570],[10000,540],[10500,740]];
var tiporifiuto = ['scarpa','mela','lisca','lattina'];*/
var life = 3
var finish;
//var score=0;
var level3_1 = {
    create : function () {
        game.world.resize (10830, 1080);
        finish = false;
        this.dead=false;
        life=3;
        this.background = game.add.image (0,0,'sfondoaria');
        game.world.width = 10830;
        game.stage.backgroundColor = "#ffffff";
        this.cursor = game.input.keyboard.createCursorKeys ();
        this.createworld ();
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
        this.makeemitter();
        //this.emitter.gravity.y = 1000;
        var hidder = game.add.image (0,game.world.height,'blank');
        hidder.fixedToCamera = true;
        game.camera.follow (this.player);
        var nuvole =game.add.image (0,1080,'nuvole');
        nuvole.anchor.setTo (0,1);
        this.playerdead=false;
        game.time.events.loop(500, this.out, this);
        
    },
    
    update : function (){
        game.physics.arcade.collide (this.player,this.limit);
        if (pause===false&&life>0&&!finish){
           this.movePlayer(); 
        }
        if (this.player.body.velocity.x<20&&this.player.body.velocity.x>-20){
            this.player.angle=0;
        }
        this.blockcamera();
        this.player.body.collideWorldBounds = false;
        game.physics.arcade.collide (this.player, this.muro);
        this.lifeLabel.text = 'LIFE: '+ life;
        
    }, 
    
    //Funzioni secondarie
    createPlayer : function () {
        this.player = game.add.sprite (100,0,'player');
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
        this.player.body.gravity.y = 1000;
        this.player.body.setSize (35,38,0,15);
    },
    movePlayer: function() { // If the left arrow key is pressed 
    if (this.cursor.left.isDown) { 
        this.emitter.setYSpeed (200);
        this.emitter.setXSpeed (100);
        this.emitter.x = this.player.x+20;
        this.emitter.y = this.player.y+10;
        this.emitter.start (true, 1000,null,3);
        this.player.angle=-20;
    // Move the player to the left 
    // The velocity is in pixels per second
        this.player.body.velocity.x = -300;
        this.player.frame = 9;
        game.add.tween (this.player.body.velocity).to({x:0},1000).start();
        this.left=true;
    // If the right arrow key is pressed 
    }else if (this.cursor.right.isDown) { 
        this.emitter.setYSpeed (200);
        this.emitter.setXSpeed (-100);
        this.emitter.x = this.player.x-20;
        this.emitter.y = this.player.y+10;
        this.emitter.start (true, 1000,null,3);
        this.player.angle=20
        this.left=false;
        // Move the player to the right 
        this.player.body.velocity.x = 300;
        this.player.frame = 0;
        game.add.tween (this.player.body.velocity).to({x:0},1000).start();
        
        }      
            // If the up arrow key is pressed and the player is on the ground 
        if ((space.isDown||this.cursor.up.isDown)) { 
                // Move the player upward (jump)
                /*if (this.left){
                    this.player.animations.play('jumpL');
                    this.player.frame = 13;
                    this.small ();
                } else{
                    this.player.animations.play ('jumpR');
                    this.player.frame = 12;
                    this.small ();
                }*/
            if (!(this.cursor.right.isDown||this.cursor.left.isDown)){
            this.verticale.setYSpeed (200);
            if (this.player.body.velocity.x==0)
                this.verticale.setXSpeed (-100,100);
                else
                this.verticale.setXSpeed (this.player.body.velocity.x*-1.5);
                
                if(this.left){
                    this.verticale.x = this.player.x+20;
                    this.verticale.y = this.player.y+10;
                } else {
                    this.verticale.x = this.player.x-20;
                    this.verticale.y = this.player.y+10;
                }
            this.verticale.start (true, 1000,null,3);
            }
                this.player.body.velocity.y = -300;
        }
    },
    createworld : function () {
        score = 0;
        this.scorelabel = game.add.text (10,10, 'SCORE: 0', {font: '28px Arial', fill: '#ffffff', fontWeight :'bold'});
        this.lifeLabel = game.add.text (200,10,'LIFE: 0', {font: '28px Arial', fill:'red', fontWeight: 'bold'});
        this.lifeLabel.fixedToCamera = true;
        this.createPlayer();
        this.limit = game.add.sprite (-20,0,'limit');
        game.physics.arcade.enableBody (this.limit);
        this.limit.body.immovable = true; 
        this.limit.fixedToCamera = true;
        this.lifebar = game.add.image (320,25,'lifebar');
        this.lifebar.anchor.setTo (0,0.5);
        this.reallife = game.add.image (320,25,'reallife');
        this.reallife.anchor.setTo (0,0.5);
        this.lifebar.fixedToCamera=true;
        this.reallife.fixedToCamera=true;
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
        //game.state.start ('level3_1');
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
                game.state.start ('level3_1');
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
            game.state.start ('level3_1');
        },
    gameovery : function (){
        game.add.tween(this.reallife.scale).to({x: 0.33*life, y:1},1000).start();
        //game.state.start ('level3_1');
        if (life===0&&!this.dead){
            game.camera.flash(0xf44242,5000);
            this.schermata = game.add.image (game.camera.x-100,0,'pausa');
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
    next : function () {
        console.log(score);
        game.state.start ('finalScore',true,false,score);
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
    setCookie: function (volumec, sound, scadenza){
		var giorno = new Date();
		giorno.setTime(giorno.getTime() + (parseInt(scadenza)*24*60*60*1000));
		var scad= giorno.toUTCString();
		document.cookie= volumec+"="+sound+"p"+";expires="+scad+";path=/";    
	},
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
    out : function () {
        if (!this.player.inWorld&&!this.playerdead){
            this.playerdead=true;
            life--;
            game.camera.shake (0.01,100);
            game.camera.flash (0xf44242,500)
            game.add.tween(this.reallife.scale).to({x: 0.33*life, y:1},1000).start();
            if (life==0){
                this.gameovery();
            }else {
                this.respawn();
            }
        }
        
        },
    respawn : function () {
            this.countdown = 3;           
            this.timer = game.add.text (game.camera.x+game.width/2,game.height/2,'RESPAWN IN: 3',{font: "38px Arial", fill: "#ffffff"});
            this.timers = game.time.events.loop (1000,this.countdownf,this);
            this.timer.anchor.setTo (0.5);
        },
    countdownf:function () {
                this.countdown--;
                this.timer.text = 'RESPAWN IN: '+this.countdown;
                //this.timer.text = 'RESPAWN IN: '+this.countdown;
                if (this.countdown==0){
                    game.time.events.remove (this.timers);
                    this.player.position.y = 200;
                    this.player.body.velocity.y=0;
                    this.timer.kill();
                    this.playerdead=false;
                }

            },  
    makeemitter : function () {
        this.emitter = game.add.emitter (0,0,2000);
        this.emitter.setScale (0.2,1,0.2,1,800);
        this.verticale = game.add.emitter (0,0,2000);
        this.verticale.setScale (0.2,1,0.2,1,800);
        this.emitter.makeParticles ('part');
        this.verticale.makeParticles ('part')
    },
    };
