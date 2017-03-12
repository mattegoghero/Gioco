//Contiene il valore 0/1 contenuto nel cookie. Se esse non è presente contiene 1(acceso); 
var sound_1; 

//Serve come flag per la verifica del sound solo al primo avvio;
var start_sound=0;

var menuState = {
    
  create: function() {
    
    var background=game.add.image(game.width/2, game.height/2, 'menu_background');       
    background.anchor.setTo(0.5, 0.5);
      
    //Caricamento della muscia
    this.music = game.add.audio('menuMusic');
    this.music.loop = true;
    
    //La faccio partire solo al primo avvio non tutte le volte che passa alla schermata menu;
    if(start_sound === 0){
        start_sound++;
        
        //primo avvio faccio partire la musica;
        this.music.play();
        //Lettura del valore nel cookie;
        sound_1 = parseInt(this.getCookie("volume"), 10);
        if (sound_1===1) {
            //Muto off;
            game.sound.mute = false;
        }else {
            //Muto on;
            game.sound.mute = true;
        }
    }
      
    //imposta il frame del Logo
    this.logoGame=game.add.image(500, game.height/2, 'logoGame'); 
    this.logoGame.anchor.setTo(0.5,0.5);
    this.logoGame.scale.setTo(0.6,0.6);
    
    //imposta il frame Play
    this.playButton = game.add.button(game.width/2+400, game.height/2-100, 'playButton', this.startNext, this);
      this.playButton.anchor.setTo(0.5, 0.5);
      //this.playButton.scale.setTo(0.4,0.4);
      
    //imposta il frame Opzioni
    this.settingsButton = game.add.button(game.width/2+400, game.height/2+200, 'settingsButton', this.startSettings, this);
      this.settingsButton.anchor.setTo(0.5, 0.5);
      this.settingsButton.scale.setTo(0.5,0.5);
  },
  
    //Funzione di ricerca del cookie;
    getCookie: function (volumec){
		var name = volumec+"=";
		var decodeCookie= decodeURIComponent(document.cookie);
		var point= decodeCookie.indexOf(name);
        sound_1=1;
        
		if(point == -1){
			return sound_1;
		}else{
			point= point+name.length;
			var endpoint= point;
			while(decodeCookie.charAt(endpoint) != 'p'){
				endpoint=endpoint+1;
			}
				
			sound_1= decodeCookie.substring(point, endpoint);
			return sound_1;
        }
    },  

  // passo alla schermata dei livelli
  startNext: function() {
      game.state.start('worldSelect');
  },
      
  // passo alla schermata delle opzioni
  startSettings: function() {

    game.state.start('settings');
  },
			
};