// class for creating the game for the user
class Game {
  constructor(player1, player2) {
    // start timer
    this.seconds = 300;
    document.getElementById("countdown").innerHTML = this.seconds;
    this.counter = setInterval(this.change_time, 1000);
    this.setup_deck();
    this.current_player = player1;
    this.next_player = player2;
    this.current_player.select();
    this.next_player.deselect();
  }
  // Initialize on screendeck by creating deck of card objects and dealing to screen
  setup_deck() {
    card_deck.create_card_deck();
    this.deal_cards();
  }

  // Deal cards to screen
  deal_cards() {
    card_deck.deck_of_cards = this.shuffle(card_deck.deck_of_cards);
    let index = 0;
    //First Row
    index = this.create_row_of_cards(index);
    //Second Row
    this.create_row_of_cards(index);
  }

  // Create new row of cards on screen beginning at next available spot
  create_row_of_cards(index) {
    //Create html child for each row
    let elem = document.getElementById("card-container");
    let r = document.createElement("div");
    r.classList.add("card-container-row");
    elem.appendChild(r);
    for (let i = 0; i < 6; i++) {
      let c = card_deck.deck_of_cards.pop();
      card_deck.current_deck.push(c);
      c.create_card_sprite(card_deck, index);
      let c_node = document.createElement("img");
      c_node.classList.add("card");
      c_node.id = `${index + 1}`;
      //Get the cards image path
      let curr_card = card_deck.current_deck[index];
      c_node.src = curr_card.path;
      //Add to DOM
      r.appendChild(c_node);
      if (curr_card.selected) {
        curr_card.keep_property(c_node);
      }
      //register on click event
      c_node.addEventListener("click", () => c.clicked(card_deck, c_node));
      index++;
    }
    return index;
  }

  // Shuffle card deck
  shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // Determine winner based on ending game scores
  winner(player1, player2) {
    if (player1.score < player2.score) {
      window.alert(
        `Congratulations! Player2 has won with ${player2.score} sets found!`
      );
    } else if (player1.score > player2.score) {
      window.alert(
        `Congratulations! Player1 has won with ${player1.score} sets found!`
      );
    } else {
      window.alert("It is a Tie with " + player1.score + " sets found!");
    }
  }

  // Determine if game is over
  ends() {
    return (
      !card_deck.set_remaining(card_deck.current_deck) &&
      card_deck.deck_of_cards.length == 0 &&
      card_deck.current_deck.length <= 12
    );
  }

  // ends the game by allowing player to restart game
  end_the_game() {
    if (this.ends() || this.seconds < 1) {
      window.alert("The game has ended.");
      this.winner(this.current_player, this.next_player);
      // stop timer
      clearInterval(this.counter);
      // clear remaining cards
      new Cards().remove_all_child();
      // show restart button
      gui.hide_buttons();
    }
  }

  // Update on screen timer and set to red if time is almost out
  change_time() {
    game.seconds--;
    const countdownID = document.getElementById("countdown");
    if (game.seconds < 5) {
      document.getElementById("timer").style.color = "red";
    }
    countdownID.innerHTML = `${game.seconds}`;

    // game ends if no time is left
    game.end_the_game();
  }
}
