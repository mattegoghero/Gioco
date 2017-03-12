var world3State= {
    
 create:function() {
    
    game.add.image(0,0, 'backgroundload');
    
    //Primo livello del mondo sempre sbloccato
    mondo1_1=game.add.button(game.width/2-300,game.height/2,'lvl1verde',this.flvl3_1,this);
    
    //lettura del valore del cookie L1 true/false.
    var status_level= this.getCookie_L1("mondo3");
    if(status_level == "true"){
        mondo1_2=game.add.button(game.width/2+300,game.height/2,'lvl2verde',this.flvl3_2,this);
    }else{
        mondo1_2=game.add.button(game.width/2+300,game.height/2,'lvl2verde',this.error,this);
    }
    
    mondo1_reset=game.add.button(0,0,'button',this.freset,this);
    game.add.text(300,300,"Mondo 3:");
    mondo1_1.anchor.setTo(0.5,0.5);
    mondo1_2.anchor.setTo(0.5,0.5);
    setTimeout (this.wait,100);
 },
        
    error: function(){
        alert("Livello Bloccato!");
    },
    
    flvl3_1: function(){
        
        game.state.start('level3_1');
    },  
    flvl3_2: function(){ 
        game.state.start('level3_2');
    },    
    freset: function(){ 
        game.state.start('worldSelect');
    },
    
     wait : function () {
    },
    
    /*Impostazione COOKIE*/
    getCookie_L1: function(cname){
        var name= cname+"=";
        var decodeCookie= decodeURIComponent(document.cookie);
        var point= decodeCookie.indexOf(name);
        point= point + name.length;
        while(decodeCookie.charAt(point) != "!"){
            point= point+1;
        }
        
        var endpoint = point;
        while(decodeCookie.charAt(endpoint) != "$"){
            endpoint= endpoint+1;
        }
        
        var status= decodeCookie.substring(point, endpoint);
    },
};