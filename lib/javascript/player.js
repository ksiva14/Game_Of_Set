// class for player object
class Player{
    // attr_reader :score, :name

    // creates a scorebord to display on gui
    constructor(name, x, y){
        this.score = 0;
        //maybe change to document write for name
        this.name = name;
    }

    update_score(){
        //write to a certain div in html to display score
    }
    
    // add player score
    increment_score(){
        this.score++;
        update_score()
    }

    // minus player score
    decrement_score(){
        this.score--;
        update_score()
    }

    //use event listener for these 2 functions!!
    // shows which player is selected
    select(){ 

    }
    // shows which player is not selected 
    deselect(){

    }
}
