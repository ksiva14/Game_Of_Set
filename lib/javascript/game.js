// class for creating the game for the user
class Game {
  constructor(player1, player2) {
    this.setup_deck();
    this.current_player = player1;
    this.next_player = player2;
    // start timer
    // this.seconds = 300;
    this.seconds = 5;
    this.counter = setInterval(this.change_time, 1000);
  }

  setup_deck() {
    card_deck.create_card_deck();
    this.deal_cards();
  }

  deal_cards() {
    card_deck.deck_of_cards = this.shuffle(card_deck.deck_of_cards);
    let index = 0;
    //First Row
    index = this.create_row_of_cards(index);
    //Second Row
    this.create_row_of_cards(index);
  }

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

  winner(player1, player2) {
    if (player1.score < player2.score) {
      window.alert(
        `Congratulations! Player2 has won with ${player2.score} sets found!`
      );
    } else if (player1.score > player2.score) {
      window.alert(
        `Congratulations! Player2 has won with ${player1.score} sets found!`
      );
    } else {
      window.alert("It is a Tie with " + player1.score + " sets found!");
    }
  }

  ends() {
    return (
      !card_deck.set_remaining(card_deck.current_deck) &&
      card_deck.deck_of_cards.length == 0 &&
      card_deck.current_deck.length <= 12
    );
  }

  // ends the game by allowing player to restart game
  end_the_game() {
    if (this.ends() || this.seconds < 0) {
      window.alert("The game has ended. Window will be closing in 3 seconds.");
      this.winner(this.current_player, this.next_player);
      // stop timer
      clearInterval(this.counter);
      // end the game
      Cards.remove_all_child();
      gui.restartGameButton.classList.remove("hide");
    }
  }

  change_time() {
    const countdownID = document.getElementById("countdown");
    console.log(game.seconds);
    if (game.seconds < 5) {
      countdownID.style.color = "red";
    }
    countdownID.innerHTML = `${game.seconds}`;
    game.seconds--;
    // game ends if no time is left
    game.end_the_game();
  }
}
