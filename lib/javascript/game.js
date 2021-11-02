// class for creating the game for the user
class Game {
  constructor() {
    this.setup_deck();
    this.create_player();
    this.current_player = player1;
  }

  setup_deck() {
    let card_deck = Deck.new();
    card_deck.create_card_deck();
    this.deal_cards();
  }

  create_player() {
    let player1 = new Player(0);
    let player2 = new Player(1);
    player1.select;
  }

  create_row_of_cards(index) {
    //Create html child for each row 
    let elem = document.getElementById("card-container");
    let r = document.createElement("div");
    r.classList.add("card-container-row");
    elem.appendChild(r);
    for (let i = 0; i < 6; i++) {
      c = card_deck.deck_of_cards.pop();
      card_deck.current_deck.push(c);
      Cards.create_card_sprite(c, card_deck, index);
      let c_node = document.createElement("img");
      c_node.classList.add("card");
      c_node.id = `${index+1}`;
      //Get the cards image path
      curr_card = card_deck.current_deck[index];
      c_node.src = curr_card.path;
      //Add to DOM
      r.appendChild(c_node);
      if (curr_card.selected) {
        Cards.keep_property(index);
      } else {
        Cards.remove_property(index);
      }
      //register on click event
      c_node.addEventListener("click", Cards.clicked, false);
      index++;
    }
    return index;
  }

  deal_cards() {
    this.shuffle(current_deck.deck_of_cards);
    index = 0;
    //First Row
    index = this.create_row_of_cards(index);
    //Second Row
    this.create_row_of_cards(index);
  }

  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  change_current_player(player_num) {
    switch(player_num) {
      case 1:
        this.current_player = player1;
        player1.select();
        player1.deselect();
        break;
      case 2: 
        this.current_player = player2;
        player2.select();
        player2.deselect();
        break;
    }
  }


  user_warnings(){
    if(ends){
      window.alert("The game has ended");
    }
  }

  winner() {
    if (player1.score() < player2.score()) {
      window.alert("Congratulations! Player2 has won with " + player2.score() + " sets found!");
    } else if (player1.score() > player2.score()) {
      window.alert("Congratulations! Player1 has won with " + player1.score() + " sets found!");
    } else {
      window.alert("It is a Tie with " + player1.score() + " sets found!");
    }
  }
  
  ends(){
    return !card_deck.set_remaining(card_deck.current_deck) && card_deck.deck_of_cards.length == 0 && card_deck.current_deck.length <= 12;
  }
}













}
