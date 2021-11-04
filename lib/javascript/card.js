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
  }

  //Call Back function when card is clicked
  clicked(card_deck, elem) {
    if (this.selected) {
      this.remove_property(elem);
      this.remove_card(elem);
      this.selected = false;
    } else {
      this.keep_property(elem);
    
    card_deck.select_cards(elem);}
    console.log(card_deck.array_index);
    console.log(card_deck.cards_selected);
  }

  remove_card(elem) {
    card_deck.array_index.splice(card_deck.array_index.indexOf(elem.id - 1), 1);
    card_deck.cards_selected.splice(card_deck.cards_selected.indexOf(this), 1);
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
      card_deck.add_to_selected();
    }
    //Check if 3 cards are selected
    if (
      card_deck.array_index.length == 3 &&
      card_deck.is_set(card_deck.cards_selected)
    ) {
      window.alert("Set is Found!");
      //Replace with new cards
      card_deck.replace_card();
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

  // display cards to html
  print_cards(card_deck) {
    //Get the number of rows that can display 6 cards
    let num_cards = Math.floor(card_deck.current_deck.length / 6);
    //Clear sprites array
    card_deck.displayed_cards = [];
    //Remove all child nodes of card container
    let elem = document.getElementById("card-container");
    this.remove_all_child();
    let index = 0;
    //Now create each row and display 6 cards on each row
    for (let i = 0; i < num_cards; i++) {
      index = this.recreate_row_of_cards(index);
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
      this.create_card_img(index, r);
      index++;
    }
  }

  // removes all <img> from .card-container
  remove_all_child() {
    //Remove all child nodes of card container
    let elem = document.getElementById("card-container");
    let child = elem.lastElementChild;
    //remove all but the first child (prevent restart-game button from being removed)
    while (elem.childElementCount > 1 && child) {
      elem.removeChild(child);
      child = elem.lastElementChild;
    }
  }

  // creates a row of 6 cards inside .card-container
  recreate_row_of_cards(index) {
    let elem = document.getElementById("card-container");
    //Create html child for each row
    let r = document.createElement("div");
    r.classList.add("card-container-row");
    elem.appendChild(r);
    for (let j = 0; j < 6; j++) {
      this.create_card_img(index, r);
      index++;
    }
    return index;
  }

  // creates a <img> tag for card
  create_card_img(index, r) {
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
  }
}
