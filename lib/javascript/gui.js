// Class for graphics
class GUI {
  constructor() {}

  generate_hint() {
    // vairable to see if a set is found
    let found_set = false;
    let i = 0;
    // Iterate through each three pairs of cards
    while (i < card_deck.current_deck.length && !found_set) {
      let card1 = card_deck.current_deck[i];
      let j = i + 1;
      while (j < card_deck.current_deck.length && !found_set) {
        let card2 = card_deck.current_deck[j];
        let k = j + 1;
        while (k < card_deck.current_deck.length && !found_set) {
          let card3 = card_deck.current_deck[k];
          if(card_deck.is_set([card1, card2, card3]){
            found_set = true;
          }
          k++;
        }
        j++;
      }
      i++;
    }



  }

  add_three_cards() {}
  create_buttons() {}
  replace_sprite() {}
  delete_sprite() {}
}



    //       if found_set
    //         // Display the card numbers that are a set to help users in each hint
    //         puts "Hint 1: Consider card //{i}!" if hint_num == 1
    //         puts "Hint 2: Consider card //{i} and //{j}!" if hint_num == 2
    //         puts "Hint 3: Consider card //{i}, //{j}, and //{k}!" if hint_num == 3
    //       else
    //         puts 'No sets found!'
    //       end
    //     end