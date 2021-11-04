// Class for Deck Object
class Deck {
  constructor() {
    this.numbers = ["one", "two", "three"];
    this.shape = ["diamond", "squiggle", "oval"];
    this.texture = ["solid", "striped", "open"];
    this.color = ["red", "green", "purple"];
    this.deck_of_cards = [];
    this.current_deck = [];
    this.cards_selected = [];
    this.displayed_cards = [];
    this.array_index = [];
    this.selected_index = -1;
  }

  /* clears the current selection of cards */
  create_card_deck() {
    for (let i = 0; i < this.numbers.length; i++) {
      for (let j = 0; j < this.shape.length; j++) {
        for (let k = 0; k < this.texture.length; k++) {
          for (let l = 0; l < this.color.length; l++) {
            let image_path = `lib/images/${this.color[l]}_${this.numbers[i]}_${this.shape[j]}_${this.texture[k]}.png`;
            this.deck_of_cards.push(
              new Cards(
                this.color[l],
                this.numbers[i],
                this.shape[j],
                this.texture[k],
                image_path
              )
            );
          }
        }
      }
    }
  }

  // Checks if the array of 3 cards is a set.
  is_set(cards) {
    let color = false;
    let number = false;
    let shape = false;
    let texture = false;

    /* check if all colors are unique OR all colors are the same */
    if (
      (cards[0].color == cards[1].color &&
        cards[1].color == cards[2].color &&
        cards[0].color == cards[2].color) ||
      (cards[0].color != cards[1].color &&
        cards[1].color != cards[2].color &&
        cards[0].color != cards[2].color)
    ) {
      color = true;
    }

    /* check if all numbers are unique OR all numbers are the same */
    if (
      (cards[0].number == cards[1].number &&
        cards[1].number == cards[2].number &&
        cards[0].number == cards[2].number) ||
      (cards[0].number != cards[1].number &&
        cards[1].number != cards[2].number &&
        cards[0].number != cards[2].number)
    ) {
      number = true;
    }

    /* check if all shape are unique OR all shaoe are the same */
    if (
      (cards[0].shape == cards[1].shape &&
        cards[1].shape == cards[2].shape &&
        cards[0].shape == cards[2].shape) ||
      (cards[0].shape != cards[1].shape &&
        cards[1].shape != cards[2].shape &&
        cards[0].shape != cards[2].shape)
    ) {
      shape = true;
    }

    /* check if all texture are unique OR all texture are the same */
    if (
      (cards[0].texture == cards[1].texture &&
        cards[1].texture == cards[2].texture &&
        cards[0].texture == cards[2].texture) ||
      (cards[0].texture != cards[1].texture &&
        cards[1].texture != cards[2].texture &&
        cards[0].texture != cards[2].texture)
    ) {
      texture = true;
    }

    /* return true if each attribute is unique amonst cards OR the same amongst cards within that category */
    return color && number && shape && texture;
  }

  /* Function to check if deck of cards is empty (game ends)
    Parameter deck: the current deck of cards for which to check the length
    Return true/false if deck is empty/not */
  deck_empty(deck) {
    return deck.length == 0;
  }

  /* Function to find if there are any sets remaining in the deck
    Parameter deck: card deck to determine if set is remaining in deck
    Returns true/false if there is set remaining/not */
  set_remaining(deck) {
    let found_set = false;
    let i = 0;
    while (i < deck.length && !found_set) {
      let card1 = deck[i];
      let j = i + 1;
      while (j < deck.length && !found_set) {
        let card2 = deck[j];
        let k = j + 1;
        while (k < deck.length && !found_set) {
          let card3 = deck[k];
          found_set = this.is_set([card1, card2, card3]);
          k += 1;
        }
        j += 1;
      }
      i += 1;
    }
    return found_set;
  }

  //  Determines which card is clicked by the player and perform the click behavior
  select_cards(elem) {
    /* checks which card is selected by player */
    let index = parseInt(elem.id) - 1;
    this.displayed_cards.forEach((i) => {
      let card = this.current_deck[index];
      this.selected_index = index;
      //Check if card has been clicked by checking border property
      let elem = document.getElementById((index + 1).toString());
      if (elem != null && elem.classList.contains("card-selected")) {
        card.clicked_behavior();
      }
      index++;
    });
  }

  /* Function to replace with new cards in current deck */
  replace_card() {
    let card = new Cards();
    this.array_index.forEach((i) => {
      let index = parseInt(i);
      /* get a new card */
      if (
        !this.deck_empty(this.deck_of_cards) &&
        this.current_deck.length <= 12
      ) {
        let card = this.deck_of_cards.pop();
        /* replace previous card */
        this.current_deck[index] = card;
        card.create_card_sprite(this, index);
      } else {
        /* If that there are more than 12 cards or deck of cards is empty just delete cards
          Set the card at the index to nil */
        this.current_deck[index] = null;
        this.displayed_cards[index] = null;
      }
    });
    /* Delete all nil objects (the cards to be deleted) from current deck */
    this.current_deck = this.current_deck.filter((n) => n);
    this.displayed_cards = this.displayed_cards.filter((n) => n);
    /* Display the updated deck to GUI */
    card.print_cards(this);
  }

  //add card to selected deck of cards if selected
  add_to_selected() {
    let c = card_deck.current_deck[card_deck.selected_index];
    if (card_deck.cards_selected.indexOf(c) == -1) {
      //Push the card index into index array
      card_deck.array_index.push(card_deck.selected_index);
      //Push card into cards selected arrayW
      card_deck.cards_selected.push(c);
      c.selected = true;
    }
  }
}
