// class for creating the game for the user
class Game {
  constructor() {}


  user_warnings(){
    if(ends){
      window.alert("The game has ended");
    }
  }
  ends(){
    return !card_deck.set_remaining(card_deck.current_deck) && card_deck.deck_of_cards.length == 0 && card_deck.current_deck.length <= 12;
  }
}













}
