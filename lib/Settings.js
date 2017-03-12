//Contiene il valore 0/1 contenuto nel cookie. Se esse non è presente contiene 1(acceso); 
var sound;

var settingsState = {
    
  create: function() {
    settingsState.add.image(0, 0, 'menu_background');
    
    //imposta il frame del settingsTitle
    this.settingsTitle=game.add.image(game.width/2, 200, 'settingsTitle'); 
    this.settingsTitle.anchor.setTo(0.5,0.5);
    
    //imposta il frame della Musica
    this.musicText=game.add.image(game.width/2-200, game.height/2-100, 'musicText'); 
    this.musicText.anchor.setTo(0.5,0.5);
    this.musicText.scale.setTo(0.5,0.5);
      
   //imposta il frame della Home
    this.homeButton = game.add.button(game.width-150, game.height-125, 'homeButton', this.startHome, this);
    this.homeButton.anchor.setTo(0.5, 0.5);
    this.homeButton.scale.setTo(0.5,0.5);
    
    //imposta il frame della Muto
    this.mute=game.add.button(game.width/2+350,game.height/2-100, 'mute', this.toggleSound,this);
    this.mute.anchor.setTo(0.5, 0.5);
    this.mute.scale.setTo(0.5,0.5);
    
    //imposta il frame della frecciaDX
    this.frecciaDX=game.add.image(game.width/2-200, game.height/2+350, 'frecciaDX'); 
    this.frecciaDX.anchor.setTo(0.5,0.5);
    this.frecciaDX.scale.setTo(0.4,0.4);
    this.destra=game.add.image(game.width/2-200, game.height/2+250, 'destra'); 
    this.destra.anchor.setTo(0.5,0.5);
    this.destra.scale.setTo(0.5,0.5);
      
    //imposta il frame della frecciaSX
    this.frecciaSX=game.add.image(game.width/2-650, game.height/2+350, 'frecciaSX'); 
    this.frecciaSX.anchor.setTo(0.5,0.5);
    this.frecciaSX.scale.setTo(0.4,0.4);
    this.sinistra=game.add.image(game.width/2-650, game.height/2+250, 'sinistra'); 
    this.sinistra.anchor.setTo(0.5,0.5);
    this.sinistra.scale.setTo(0.5,0.5);
      
    //imposta il frame della frecciaSU
    this.frecciaSU=game.add.image(game.width/2-425, game.height/2+150, 'frecciaSU'); 
    this.frecciaSU.anchor.setTo(0.5,0.5);
    this.frecciaSU.scale.setTo(0.4,0.4);
    this.salta1=game.add.image(game.width/2-425, game.height/2+50, 'salta'); 
    this.salta1.anchor.setTo(0.5,0.5);
    this.salta1.scale.setTo(0.5,0.5);
      
    //imposta il frame della spaceBar
    this.spaceBar=game.add.image(game.width/2+325, game.height/2+350, 'spaceBar'); 
    this.spaceBar.anchor.setTo(0.5,0.5);
    this.spaceBar.scale.setTo(0.4,0.4);
    this.salta2=game.add.image(game.width/2+325, game.height/2+250, 'salta'); 
    this.salta2.anchor.setTo(0.5,0.5);
    this.salta2.scale.setTo(0.5,0.5);
    
    //Lettura del valore nel cookie;
    sound = parseInt(this.getCookie("volume"), 10);
      
      if (sound===1) {
            //Muto Off
            game.sound.mute = false;
            //Volume ON
            this.mute.frame = 0; 
        }
        else {
            //Muto On
            game.sound.mute = true;
            //Volume OFF
            this.mute.frame = 1;
        }
  },
    
    startHome: function() {
        game.state.start('menu');
  },
    
    // Funzione del momento in cui viene premuto Mute
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