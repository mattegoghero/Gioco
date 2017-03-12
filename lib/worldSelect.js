var worldSelectState = {
    
 create:function() {
    
    game.add.image(0,0, 'backgroundload');
        var sw =game.add.sprite (game.width/2,game.height/2-400,'worldselect');
        var loadw = sw.animations.add('loadw');
        sw.animations.play('loadw',2,true);
        sw.anchor.setTo(0.5,0.5);
        sw.scale.setTo(0.5,0.5);
     
     
    //Set dei Cookie con i valori iniziali (Da togliere in seguito);
    this.resetCookie();
    //Primo mondo sempre sbloccato
    level1_1=game.add.button(game.width/2-400,game.height/2,'button1',this.fworld1,this);
    
    //lettura del valore del cookie Mondo2 true/false.
    var lock_word2= this.getCookie_M("mondo2");
    if(lock_word2 != "false"){
        level1_2=game.add.button(game.width/2,game.height/2,'button2',this.fworld2,this);
    }else{
        level1_2=game.add.button(game.width/2,game.height/2,'button2_1',this.errror,this);
    }
    
    //Lettura del cookie Mondo3 true/false
    var lock_word3= this.getCookie_M("mondo3");
    if(lock_word3 != "false"){
        level2_1=game.add.button(game.width/2+400,game.height/2,'button3',this.fworld3,this);
    }else{
        level2_1=game.add.button(game.width/2+400,game.height/2,'button3_1',this.errror,this);
    }       
    level1_1.anchor.setTo(0.5,0.5);
    level1_2.anchor.setTo(0.5,0.5);
    level2_1.anchor.setTo(0.5,0.5);
    setTimeout (this.wait,100);
},
    
    errror: function(){
        alert("Mondo Bloccato!");
    },
    
    fworld1: function(){
        
        game.state.start('world1');
    },
    
    fworld2: function(){
        
        game.state.start('world2');
    },
    
    fworld3: function(){
        game.state.start('world3');
    },
    
     wait : function () {
    },
    
    /*Impostazione COOKIE*/
    setCookie_M1: function (cname, world, level2, scadenza){
        var giorno= new Date();
        giorno.setTime(giorno.getTime() + (parseInt(scadenza * 24*60*60*1000)));
        var scad= giorno.toUTCString();
        document.cookie= cname+"="+world+"!"+level2+"$;expires="+scad+";path=/";
    },
    
    setCookie_M2: function (cname, world, level2, scadenza){
        var giorno= new Date();
        giorno.setTime(giorno.getTime() + (parseInt(scadenza * 24*60*60*1000)));
        var scad= giorno.toUTCString();
        document.cookie= cname+"="+world+"!"+level2+"$;expires="+scad+";path=/";
    },
    
    setCookie_M3: function (cname, world, level2, scadenza){
        var giorno= new Date();
        giorno.setTime(giorno.getTime() + (parseInt(scadenza * 24*60*60*1000)));
        var scad= giorno.toUTCString();
        document.cookie= cname+"="+world+"!"+level2+"$;expires="+scad+";path=/";
    },
    
    getCookie_M: function(cname){
        var name= cname+"=";
        var decodeCookie= decodeURIComponent(document.cookie);
        var point= decodeCookie.indexOf(name);
        point= point + name.length;
        var endpoint = point;
        while(decodeCookie.charAt(endpoint) != "!"){
            endpoint= endpoint+1;
        }
        var mondo= decodeCookie.substring(point, endpoint);
        return mondo;
    },
    
    //Set dei Cookie con i valori iniziali (Da togliere in seguito);
    resetCookie: function(){
        this.setCookie_M1("mondo1",true,true,30);
        this.setCookie_M2("mondo2",true,false,30);
        this.setCookie_M3("mondo3",true,false,30);
    },
    
};