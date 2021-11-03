// Class for graphics
class Cards {
  constructor(color, number, shape, texture, path) {
    this.color = color;
    this.number = number;
    this.shape = shape;
    this.texture = texture;
    this.path = path;
    this.selected = false;
  }

  //Add card to sprite array
  create_card_sprite(card_deck, index) {
    card_deck.displayed_sprites[index] = this;
    //window.alert("TEST3 " + card_deck.displayed_sprites[0].color);
  }

  //Call Back function when card is clicked
  clicked(card_deck, elem) {
    //let elem = document.getElementById((index+1).toString());
    elem.classList.add("card-selected");
    card_deck.select_cards(game.current_player);
  }

  //Remove Border Property After displaying new cards
  remove_property(elem) {
    elem.classList.remove("card-selected");
  }

  //Keep Border Property if card is selected and gui has changed (for example when three new cards are added)
  keep_property(elem) {
    elem.classList.add("card-selected");
  }

  //Behavior of card When Clicked
  /*
   * @param card_deck: current deck of cards that are placed for players to select
   * @param player: the player who has the current turn
   */
  clicked_behavior(card_deck, player) {
    if (!isNan(card_deck.selected_index) && card_deck.index_array.length < 3) {
      card_deck.add_to_selected();
    }
    //Check if 3 cards are selected
    if (
      card_deck.index_array.length == 3 &&
      card_deck.is_set(card_deck.selected_cards)
    ) {
      window.alert("Set is Found!");
      //Replace with new cards
      card_deck.replace_card();
      //Increment player score
      player.increment_score();
      //Remove Border Selection Property
      let counter = 0;
      for (let c of card_deck.selected_cards) {
        c.selected = false;
        this.remove_property(card_deck.array_index[counter]);
        counter++;
      }
      //Clear current cards selection
      card_deck.selected_cards = [];
      card_deck.array_index = [];
    } else if (
      card_deck.index_array.length == 3 &&
      card_deck.is_set(card_deck.selected_cards)
    ) {
      window.alert("Not a Set!");
      //Decrement score
      player.decrement_score();
      let counter = 0;
      for (let c of card_deck.selected_cards) {
        c.selected = false;
        this.remove_property(card_deck.array_index[counter]);
        counter++;
      }
      //Clear current cards selection
      card_deck.selected_cards = [];
      card_deck.array_index = [];
    }
  }

  //add card to selected deck of cards if selected
  add_to_selected(card_deck) {
    c = card_deck.cards_selected[card_deck.selected_index];
    if (card_deck.cards_selected.indexOf(c) != -1) {
      window.alert(
        "Card " +
          card_deck.selected_index +
          1 +
          " has Already Been Selected. Try Another Card"
      );
    } else {
      window.alert(
        "Card " + card_deck.selected_index + 1 + " has been selected."
      );
      //Push the card index into index array
      card_deck.array_index.push(card_deck.selected_index);
      //Push card into cards selected array
      card_deck.cards_selected.push(c);
      c.selected = true;
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
        c_node.id = `${index + 1}`;
        //Get the cards image path
        curr_card = card_deck.current_deck[index];
        c_node.src = curr_card.path;
        //Add to DOM
        r.appendChild(c_node);
        //Add card to sprite array
        this.create_card_sprite(curr_card, card_deck, index);
        if (curr_card.selected) {
          this.keep_property(index);
        } else {
          this.remove_property(index);
        }
        //register on click event
        c_node.addEventListener("click", this.clicked, false);
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
      c_node.id = `${index + 1}`;
      //Get the cards image path
      curr_card = card_deck.current_deck[index];
      c_node.src = curr_card.path;
      //Add to DOM
      r.appendChild(c_node);
      //Add card to sprite array
      this.create_card_sprite(curr_card, card_deck, index);
      if (curr_card.selected) {
        this.keep_property(index);
      } else {
        this.remove_property(index);
      }
      //register on click event
      c_node.addEventListener("click", this.clicked, false);
      index++;
    }
  }
}
