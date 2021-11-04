// Class for graphics
class GUI {
  constructor() {
    this.addButtonListener();
  }

  // add event listeners for all the buttons
  addButtonListener() {
    // add event listeners to each hint button
    this.hintButtons = document.getElementsByClassName("hints");
    for (let i = 0; i < this.hintButtons.length; i++) {
      this.hintButtons[i].addEventListener("click", () => {
        this.generate_hint(i + 1);
      });
    }
    // add event listeners to add 3 cards button
    this.add3cardsButton = document.getElementById("add-3-cards");
    this.add3cardsButton.addEventListener("click", () =>
      this.add_three_cards()
    );
    // add event listener to change players button
    this.changePlayerButton = document.getElementById("change-player");
    this.changePlayerButton.addEventListener("click", () =>
      this.change_player()
    );
    // add event listener to restart game button
    this.restartGameButton = document.getElementById("restart-game");
    this.restartGameButton.addEventListener("click", () => this.restart_game());
  }

  // switch between player1 and player2
  change_player() {
    let player_num = game.current_player.playerNum;
    switch (player_num + 1) {
      case 1:
        game.next_player = player1;
        game.current_player = player2;
        break;
      case 2:
        game.next_player = player2;
        game.current_player = player1;
        break;
    }
    // reflect who is selected on html
    game.next_player.deselect();
    game.current_player.select();
  }

  // generate hint if button is clicked
  generate_hint(hint_num) {
    // vairable to see if a set is found
    let found_set = false;
    let i = 0;
    let j = 0;
    let k = 0;
    // Iterate through each three pairs of cards
    while (i < card_deck.current_deck.length && !found_set) {
      let card1 = card_deck.current_deck[i];
      j = i + 1;
      while (j < card_deck.current_deck.length && !found_set) {
        let card2 = card_deck.current_deck[j];
        k = j + 1;
        while (k < card_deck.current_deck.length && !found_set) {
          let card3 = card_deck.current_deck[k];
          if (card_deck.is_set([card1, card2, card3])) {
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
          break;
        case 2:
          window.alert(`Hint 2: Consider card ${i} and ${j}!`);
          break;
        case 3:
          window.alert(`Hint 3: Consider card ${i}, ${j}, and ${k}!`);
          break;
        default:
          window.alert(`Error!!!`);
      }
    } else {
      window.alert(`No sets found!`);
    }
  }

  // Function to add three cards if no set is remaining
  add_three_cards() {
    //  Make sure there is cards availible to add
    if (card_deck.deck_of_cards.length != 0) {
      // Get three cards and update current deck
      for (let i = 0; i < 3; i++) {
        let card = card_deck.deck_of_cards.pop();
        card_deck.current_deck.push(card);
      }
      //  warn user that there are no more sets
      if (
        !card_deck.set_remaining(card_deck.current_deck) &&
        card_deck.deck_of_cards.length == 0
      ) {
        window.alert(`Adding 3 cards as no sets can be found`);
      }
      // Display the updated deck to GUI
      Cards.print_cards(card_deck);
    }
  }

  restart_game() {
    // hide button
    this.restartGameButton.classList.add("hide");
    window.alert("Welcome to Game of Set");

    player1 = new Player(0);
    player2 = new Player(1);
    card_deck = new Deck();
    game = new Game(player1, player2);
  }
}
