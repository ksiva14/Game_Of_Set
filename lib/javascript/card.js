// Class for graphics
class Cards {
  constructor(color, number, shape, texture, path) {
    this.color = color;
    this.number = number;
    this.shape = shape;
    this.texture = texture; 
    this.path = path; 
    //Get the class of the card and add register event handler
    //this.cardDiv = document.getElementByClass
  }

  //Add card to sprite array
  create_card_sprite(card, card_deck, index) {
    card_deck.displayed_sprites[index] = card;
  }

  //Call Back function when card is clicked
  clicked(card) {

  }

  //Behavior of card When Clicked
  /*
  * @param card_deck: current deck of cards that are placed for players to select
  * @param player: the player who has the current turn
  */
  clicked_behavior(card_deck, player) {
      if ((!isNan(card_deck.selected_index)) && (card_deck.index_array.length < 3)) {
        card_deck.add_to_selected();
      }
      //Check if 3 cards are selected
      if ((card_deck.index_array.length == 3) && (card_deck.is_set(card_deck.selected_cards))) {
        window.alert("Set is Found!");
        //Replace with new cards
        card_deck.replace_card();
        //Increment player score
        player.increment_score();
        //Clear current cards selection
        card_deck.selected_cards = [];
      } else if ((card_deck.index_array.length == 3) && (card_deck.is_set(card_deck.selected_cards))) {
        window.alert("Not a Set!");
        //Decrement score
        player.decrement_score();
        //Clear current cards selection
        card_deck.selected_cards = [];
      }
  }

  //add card to selected deck of cards if selected
  add_to_selected(card_deck) {
    c = card_deck.cards_selected[card_deck.selected_index];
    if (card_deck.cards_selected.indexOf(card) != -1) {
      window.alert("Card " + card_deck.selected_index + 1 + " has Already Been Selected. Try Another Card");
    } else {
      window.alert("Card " + card_deck.selected_index + 1 + " has been selected.");
      //Push the card index into index array
      card_deck.array_index.push(card_deck.selected_index);
      //Push card into cards selected array
      card_deck.cards_selected.push(c);
    }
  }
 
  //function to display cards on html page
  print_cards(card_deck) {
    //Get the number of rows that can display 6 cards
    num_cards = Math.floor(card_deck.current_deck.length / 6);
    //Clear sprites array
    card_deck.displayed_sprites = [];
    //Remove all child nodes of card container 
    let elem = document.getElementById("card-container");
    let child = elem.lastElementChild;
    while (child) {
      elem.removeChild(child);
      child = elem.lastElementChild;
    }
    let index = 0;
    //Now create each row and display 6 cards on each row
    for (let i = 0; i < num_cards; i++) {
      //Create html child for each row 
      let r = document.createElement("div");
      r.classList.add("card-container-row");
      elem.appendChild(r);
      for (let j = 0; j < 6; j++) {
          let c_node = document.createElement("img");
          c_node.classList.add("card");
          //Get the cards image path
          curr_card = card_deck.current_deck[index];
          c_node.src = curr_card.path;
          //Add to DOM
          r.appendChild(c_node);
          //Add card to sprite array
          this.create_card_sprite(curr_card, card_deck, index);
          index++;
      }
    }
    //Display last row
    for (let k = index; k < card_deck.current_deck.length; k++) {
      //Create html child for last row 
      let r = document.createElement("div");
      r.classList.add("card-container-row");
      elem.appendChild(r);
      //html for each image
      let c_node = document.createElement("img");
      c_node.classList.add("card");
      //Get the cards image path
      curr_card = card_deck.current_deck[index];
      c_node.src = curr_card.path;
      //Add to DOM
      r.appendChild(c_node);
      //Add card to sprite array
      this.create_card_sprite(curr_card, card_deck, index);
      index++;
  }
}
}
