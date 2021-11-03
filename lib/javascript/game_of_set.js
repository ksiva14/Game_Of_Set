//Main Game Of Set Javascript File

//---------Actual Game Logic --------- //
//Introduce users to game//
window.alert("Welcome to Game of Set");
let player1 = new Player(0);
let player2 = new Player(1);
let card_deck = new Deck();
let game = new Game(card_deck, player1, player2);
let gui = new GUI();
