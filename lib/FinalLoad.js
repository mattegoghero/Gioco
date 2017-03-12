var game = new Phaser.Game (1920,1080,Phaser.CANVAS);

//Variabili globali
var cont = 0;
var lag = 0;
var camerax = 0;
var score = 0;
var pause = false;

//Aggiunta di tutti gli stati
game.state.add ('boot', bootState);
game.state.add ('loading', loadingState);
game.state.add ('settings', settingsState);
game.state.add ('menu', menuState);
game.state.add ('finalScore', finalScoreState);
game.state.add ('level1_1', level1_1);
game.state.add ('level1_2', level1_2);
game.state.add ('worldSelect', worldSelectState);
game.state.add ('world1', world1State);
game.state.add ('world2', world2State);
game.state.add ('world3', world3State);
//game.state.add ('level2_1', level2_1);
game.state.add ('level3_1', level3_1);






//Avvio del boot
game.state.start ('boot');