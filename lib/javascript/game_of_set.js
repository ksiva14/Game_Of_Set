//Main Game Of Set Javascript File
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
      window.alert("Clicked!");
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
        } else if ((card_deck.index_array.length == 3) && (card_deck.is_set(card_deck.selected_cards))) {
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
        window.alert("Card " + card_deck.selected_index + 1 + " has Already Been Selected. Try Another Card");
      } else {
        window.alert("Card " + card_deck.selected_index + 1 + " has been selected.");
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
            c_node.id = `${index+1}`;
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
        c_node.id = `${index+1}`;
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
      this.displayed_sprites = [];
      this.array_index = [];
      this.selected_index = -1;
    }
  
    /* clears the current selection of cards */
    create_card_deck() {
      for (let i = 0; i < this.numbers.length; i++) {
        for (let j = 0; j < this.shape.length; j++) {
          for (let k = 0; k < this.texture.length; k++) {
            for (let l = 0; l < this.color.length; l++) {
              let image_path = "lib/images/" + this.color[l] + "_" + this.numbers[i] + "_" + this.shape[j] + "_" + this.texture[k] + ".png";
              this.deck_of_cards.push(new Cards(this.color[l], this.numbers[i], this.shape[j], this.texture[k], image_path));
            }
          }
        }
      }
    }
  
    /* Checks if the array of 3 cards is a set.
    Parameter cards: list of 3 cards to determine if the 3 are a valid set
    Return true/false depending on it cards form a valid set */
    is_set (cards) {
      let color = false;
      let number = false;
      let shape = false;
      let texture = false;
  
      /* check if all colors are unique OR all colors are the same */
      if ((cards[0].color == cards[1].color && cards[1].color == 
        cards[2].color && cards[0].color == cards[2].color) || 
        (cards[0].color != cards[1].color && cards[1].color != 
        cards[2].color && cards[0].color != cards[2].color)) { 
          color = true;
        }
  
      /* check if all numbers are unique OR all numbers are the same */
      if ((cards[0].number == cards[1].number && cards[1].number ==
        cards[2].number && cards[0].number == cards[2].number) ||
        (cards[0].number != cards[1].number && cards[1].number !=
        cards[2].number && cards[0].number != cards[2].number)) {
          number = true;
      }
  
      /* check if all shape are unique OR all shaoe are the same */
      if ((cards[0].shape == cards[1].shape && cards[1].shape ==
        cards[2].shape && cards[0].shape == cards[2].shape) ||
        (cards[0].shape != cards[1].shape && cards[1].shape !=
        cards[2].shape && cards[0].shape != cards[2].shape)) {
          shape = true;
        }
  
      /* check if all texture are unique OR all texture are the same */
      if ((cards[0].texture == cards[1].texture && cards[1].texture ==
        cards[2].texture && cards[0].texture == cards[2].texture) ||
        (cards[0].texture != cards[1].texture && cards[1].texture !=
        cards[2].texture && cards[0].texture != cards[2].texture)) {
          texture = true;
      }
  
      /* return true if each attribute is unique amonst cards OR the same amongst cards within that category */
      return color && number && shape && texture;
    }
  
    /* Function to check if deck of cards is empty (game ends)
    Parameter deck: the current deck of cards for which to check the length
    Return true/false if deck is empty/not */
    deck_empty (deck) {
      return this.deck.length == 0;
    }
  
    /* Function to find if there are any sets remaining in the deck
    Parameter deck: card deck to determine if set is remaining in deck
    Returns true/false if there is set remaining/not */
    set_remaining (deck) {
      let found_set = false;
      let i = 0;
      while (i < deck.length && !found_set) {
        card1 = deck[i];
        j = i + 1;
        while (j < deck.length && !found_set) {
          card2 = deck[j];
          k = j + 1;
          while (k < deck.length && !found_set) {
            card3 = deck[k];
            found_set = is_set([card1, card2, card3]);
            k += 1;
          }
          j += 1;
        }
        i += 1;
      }
      return found_set;
    }
    
    /* Determines which card is clicked by the player and perform the click behavior
    Parameter card_deck: current deck of cards from which to select from
    Parameter event: GUI event to determine if a particular card is clicked
    Parameter player: the current player who is selecting */
    select_cards(player) {
      /* checks which card is selected by player */
      let index = 0;
      this.displayed_sprites.forEach( i => {
        /* define dimensions of the card */
        let card = this.current_deck[index];
        this.selected_index = index;
        /* actions when the card sprite is clicked */
        //Check if card has been clicked by checking border property
        //console.log("ID: " + (index+1).toString());
        let elem = document.getElementById((index+1).toString());
        if (elem != null && elem.classList.contains("card-selected")) {
          card.clicked_behavior(this, player);
        }
        index++;
      });
    }
  
    /* Function to replace with new cards in current deck */
    replace_card () {
      this.index_array.forEach( i => {
        let index = parseInt(this.index_array[i]);
        /* get a new card */
        if (!deck_empty(this.deck_of_cards) && (this.current_deck.length <= 12)) {
          let card = this.deck_of_cards.pop();
          /* replace previous card */
          this.current_deck[index] = card;
          GUI.replace_sprite(card, self, index);
        } else {
          /* If that there are more than 12 cards or deck of cards is empty just delete cards
          Set the card at the index to nil */
          this.current_deck[index] = null;
        }
      });
      /* Delete all nil objects (the cards to be deleted) from current deck */
      this.current_deck.filter(n => n);
      /* Display the updated deck to GUI */
      Cards.print_cards(self);
    }
  
  }
// class for creating the game for the user
class Game {
    constructor(card_deck, player1, player2) {
      this.setup_deck(card_deck);
      this.create_player(player1);
      this.current_player = player1;
      window.alert("done");
    }
  
    setup_deck(card_deck) {
      card_deck.create_card_deck();
      this.deal_cards(card_deck);
    }
  
    create_player(player1) {
      player1.select();
    }
  
    create_row_of_cards(card_deck, index) {
      //Create html child for each row 
      let elem = document.getElementById("card-container");
      let r = document.createElement("div");
      r.classList.add("card-container-row");
      elem.appendChild(r);
      for (let i = 0; i < 6; i++) {
        let c = card_deck.deck_of_cards.pop();
        card_deck.current_deck.push(c)
        c.create_card_sprite(card_deck, index);
        let c_node = document.createElement("img");
        c_node.classList.add("card");
        c_node.id = `${index+1}`;
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
  
    deal_cards(deck) {
      deck.deck_of_cards = this.shuffle(deck.deck_of_cards);
      let index = 0;
      //First Row
      index = this.create_row_of_cards(deck, index)
      //Second Row
      this.create_row_of_cards(deck, index);
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
          array[randomIndex], array[currentIndex]];
      }
      
      return array;
      
    }
  
    change_current_player(player_num, player1, player2) {
      switch(player_num) {
        case 1:
          this.current_player = player1;
          player1.select();
          player1.deselect();
          break;
        case 2: 
          this.current_player = player2;
          player2.select();
          player2.deselect();
          break;
      }
    }
  
  
    user_warnings(){
      if(this.ends()){
        window.alert("The game has ended");
      }
    }
  
    winner(player1, player2) {
      if (player1.score() < player2.score()) {
        window.alert("Congratulations! Player2 has won with " + player2.score() + " sets found!");
      } else if (player1.score() > player2.score()) {
        window.alert("Congratulations! Player1 has won with " + player1.score() + " sets found!");
      } else {
        window.alert("It is a Tie with " + player1.score() + " sets found!");
      }
    }
  
    ends(card_deck){
      return !card_deck.set_remaining(card_deck.current_deck) && card_deck.deck_of_cards.length == 0 && card_deck.current_deck.length <= 12;
    }
  }
  // Class for graphics
class GUI {
    constructor() {
      // add event listeners to each hint button
      this.hintButtons = document.getElementsByClassName("hints");
      for (let i = 0; i < this.hintButtons.length; i++) {
        this.hintButtons[i].addEventListener("click", () =>
          this.generate_hint(i + 1)
        );
      }
      // add event listeners to add 3 cards button
      this.add3cardsButton = document.getElementById("add-3-cards");
      this.add3cardsButton.addEventListener("click", () =>
        this.add_three_cards(card_deck)
      );
    }
  
    //TODO: After the rest has finished - need to change variables
    generate_hint(hint_num) {
      // vairable to see if a set is found
      let found_set = false;
      let i = 0;
      let j;
      let k;
      // Iterate through each three pairs of cards
      while (i < game.current_deck.length && !found_set) {
        let card1 = game.current_deck[i];
        j = i + 1;
        while (j < game.current_deck.length && !found_set) {
          let card2 = game.current_deck[j];
          k = j + 1;
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
            window.alert(`Error!!!`);
        }
      } else {
        window.alert(`No sets found!`);
      }
    }
  
    //TODO: After the rest has finished - need to change variables
    // Function to add three cards if no set is remaining
    add_three_cards(card_deck) {
      //  Make sure there is cards availible to add
      if (card_deck.deck_of_cards.length != 0) {
        // Get three cards and update current deck
        for (let i = 0; i < 3; i++) {
          card = card_deck.deck_of_cards.pop();
          card_deck.current_deck.push(card);
        }
        //  warn user that there are no more sets
        if (
          !set_remaining(card_deck.current_deck) &&
          card_deck.deck_of_cards.length == 0
        ) {
          window.alert(`Adding 3 cards as no sets can be found`);
        }
        // Display the updated deck to GUI
        print_cards(card_deck);
      }
    }
  
    //TODO: After the rest has finished - may need to write to html
    // replaces the card at index
    replace_sprite(card, card_deck, index) {
      // remove sprite from gui
      delete_sprite(card_deck, index);
      // replace sprite
      Cards.create_card_sprite(card, card_deck, index);
    }
  
    //TODO: After the rest has finished - may need to remove from html
    // remove the card at index
    delete_sprite(card_deck, index) {
      card_deck.displayed_sprites.splice(index, 1);
    }
  }
  /*
  let gui = new GUI();
  */
 // class for player object
class Player {
    // creates a scorebord to display on html
    constructor(playerNum) {
      // initialize variables
      this.playerNum = playerNum;
      this.playerDiv = document.getElementsByClassName("players")[playerNum];
      this.scoreDiv = document.getElementsByClassName("player-score")[playerNum];
      this.score = 0;
      // display score
      this.update_score();
      // add eventlisteners
      this.playerDiv.addEventListener("click", () => this.select());
    }
  
    //changes score of player in html
    update_score() {
      this.scoreDiv.innerHTML = `${this.score}`;
    }
  
    // add player score
    increment_score() {
      this.score++;
      this.update_score();
    }
  
    // minus player score
    decrement_score() {
      this.score--;
      this.update_score();
    }
  
    // shows which player is selected
    select() {
      //deselect all other players
      let tmp = document.getElementsByClassName("players");
      for (let i = 0; i < tmp.length; i++) {
        tmp[i].classList.remove("selected");
      }
      // select this player
      this.playerDiv.classList.add("selected");
    }
  
    // shows which player is not selected
    deselect() {
      this.playerDiv.classList.remove("selected");
    }
  }
  /*
  let player1 = new Player(0);
  let player2 = new Player(1);
  */
  
  
  
//---------Actual Game Logic --------- //
//Introduce users to game//
window.alert("Welcome to Game of Set");
//let gui = new GUI();
let card_deck = new Deck();
let player1 = new Player(0);
let player2 = new Player(1);
let game = new Game(card_deck, player1, player2);
