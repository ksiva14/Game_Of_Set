// class for player object
class Player {
  // creates a scorebord to display on html
  constructor(playerNum) {
    // initialize variables
    this.playerDiv = document.getElementsByClassName("players")[playerNum];
    this.scoreDiv = document.getElementsByClassName("player-score")[playerNum];
    this.score = 0;
    // console.log(this.playerDiv);
    // display score
    this.update_score();
    // event listeners for selectors maybe???
    // this.playerDiv.addEventListener("click", this.select);
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
    this.playerDiv.classList.add("selected");
  }

  // shows which player is not selected
  deselect() {
    this.playerDiv.classList.remove("selected");
  }
}

let player1 = new Player(0);
let player2 = new Player(1);
player1.increment_score();
player2.increment_score();
player2.increment_score();
