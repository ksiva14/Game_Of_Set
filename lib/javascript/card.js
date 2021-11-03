// class for card objects
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
    card_deck.displayed_cards[index] = this;
    //window.alert("TEST3 " + card_deck.displayed_cards[0].color);
  }

  //Call Back function when card is clicked
  clicked(card_deck, elem) {
    //let elem = document.getElementById((index+1).toString());
    elem.classList.add("card-selected");
    card_deck.select_cards(gui.selected_player, elem);
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
  clicked_behavior() {
    if (!isNaN(card_deck.selected_index) && card_deck.array_index.length < 3) {
      card_deck.add_to_selected(card_deck);
    }
    //Check if 3 cards are selected
    if (
      card_deck.array_index.length == 3 &&
      card_deck.is_set(card_deck.cards_selected)
    ) {
      window.alert("Set is Found!");
      //Replace with new cards
      card_deck.replace_card();
      //Increment player score
      game.current_player.increment_score();
      //Remove Border Selection Property
      for (let c of card_deck.cards_selected) {
        c.selected = false;
      }
      //Clear current cards selection
      card_deck.cards_selected = [];
      card_deck.array_index = [];
    } else if (
      card_deck.array_index.length == 3 &&
      !card_deck.is_set(card_deck.cards_selected)
    ) {
      window.alert("Not a Set!");
      //Decrement score
      game.current_player.decrement_score();
      for (let c of card_deck.cards_selected) {
        c.selected = false;
      }
      let cards_to_revert = document.getElementsByClassName("card-selected");
      for (let i = 0; i < 3; i++) {
        this.remove_property(cards_to_revert[0]); // Note: cards_to_revert shrinks as remove_property is called, so remove element at 0
      }

      //Clear current cards selection
      card_deck.cards_selected = [];
      card_deck.array_index = [];
    }
  }

  // //add card to selected deck of cards if selected
  // add_to_selected(card_deck) {
  //   let c = card_deck.current_deck[card_deck.selected_index];
  //   if (card_deck.cards_selected.indexOf(c) == -1) {
  //     //Push the card index into index array
  //     card_deck.array_index.push(card_deck.selected_index);
  //     //Push card into cards selected array
  //     card_deck.cards_selected.push(c);
  //     c.selected = true;
  //   }
  // }

  //function to display cards on html page
  print_cards(card_deck) {
    //Get the number of rows that can display 6 cards
    let num_cards = Math.floor(card_deck.current_deck.length / 6);
    //Clear sprites array
    card_deck.displayed_cards = [];
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
        let curr_card = card_deck.current_deck[index];
        c_node.src = curr_card.path;
        //Add to DOM
        r.appendChild(c_node);
        //Add card to sprite array
        this.create_card_sprite(card_deck, index);
        if (curr_card.selected) {
          this.keep_property(c_node);
        }
        //register on click event
        c_node.addEventListener("click", () =>
          curr_card.clicked(card_deck, c_node)
        );
        index++;
      }
    }
    //Display last row
    //Create html child for last row
    let r;
    if (index < card_deck.current_deck.length) {
      r = document.createElement("div");
      r.classList.add("card-container-row");
      elem.appendChild(r);
    }
    for (let k = index; k < card_deck.current_deck.length; k++) {
      //html for each image
      let c_node = document.createElement("img");
      c_node.classList.add("card");
      c_node.id = `${index + 1}`;
      //Get the cards image path
      let curr_card = card_deck.current_deck[index];
      c_node.src = curr_card.path;
      //Add to DOM
      r.appendChild(c_node);
      //Add card to sprite array
      this.create_card_sprite(card_deck, index);
      if (curr_card.selected) {
        this.keep_property(c_node);
      }
      //register on click event
      c_node.addEventListener("click", () =>
        curr_card.clicked(card_deck, c_node)
      );
      index++;
    }
  }
}
