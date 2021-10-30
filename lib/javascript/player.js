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

let player1 = new Player(0);
let player2 = new Player(1);
