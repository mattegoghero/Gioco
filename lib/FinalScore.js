var finalScoreState = {
    
    create : function (){
        var target = rifiuti.length*5;
        if (score<target/3)
            game.add.image(0,0,'dirty');
        else
            if(score>target*0,66)
                game.add.image(0,0,'clean');
            else
                game.add.image(0,0,'half');
        game.input.onDown.add(this.select,this);
    },
    update : function () {
    },
    select : function () {
        game.state.start ('worldSelect');
    }
}