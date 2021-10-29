// Class for graphics
class GUI {
  constructor() {}

  generate_hint(hint_num) {
    // vairable to see if a set is found
    let found_set = false;
    let i = 0;
    // Iterate through each three pairs of cards
    while (i < game.current_deck.length && !found_set) {
      let card1 = game.current_deck[i];
      let j = i + 1;
      while (j < game.current_deck.length && !found_set) {
        let card2 = game.current_deck[j];
        let k = j + 1;
        while (k < game.current_deck.length && !found_set) {
          let card3 = game.current_deck[k];
          if (game.is_set([card1, card2, card3])) {
            found_set = true;
          }
          k++;
        }
        j++;
      }
      i++;
    }
    if (found_set) {
      // Display the card numbers that are a set to help users in each hint
      switch (hint_num) {
        case 1:
          window.alert(`Hint 1: Consider card ${i}`);
        case 2:
          window.alert(`Hint 2: Consider card ${i} and ${j}!`);
        case 3:
          window.alert(`Hint 3: Consider card ${i}, ${j}, and ${k}!`);
        default:
        //
      }
    } else {
      // puts 'No sets found!'
    }
  }

  add_three_cards() {}
  create_buttons() {}
  replace_sprite() {}
  delete_sprite() {}
}
