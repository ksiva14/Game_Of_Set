// class for player object
class Player {
  constructor(div) {
    this.scoreDiv = div;
    this.score = 0;
    this.update_score();
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

  //   //use event listener for these 2 functions!!
  //   // shows which player is selected
  //   select() {}
  //   // shows which player is not selected
  //   deselect() {}
}

let scoreboard = document.getElementsByClassName("player-score");

let player1 = new Player(scoreboard[0]);
let player2 = new Player(scoreboard[1]);
// player1.increment_score();
// player2.increment_score();
// player2.increment_score();
