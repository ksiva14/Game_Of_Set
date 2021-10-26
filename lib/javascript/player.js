// class for player object
class Player{
    // attr_reader :score, :name

    // creates a scorebord to display on gui
    constructor(name, x, y){
        this.score = 0;
        this.name = name;
        this.player_name_x = x;
        this.player_name_y = y;
        // this.player_name = Text.new "#{@name}: ", x: @player_name_x, y: @player_name_y, size: 20, color: 'black'
        // this.player_score = Text.new @score, x: @player_name_x + 100, y: @player_name_y, size: 20, color: 'black'
    }

    update_score(){

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

}

//   # updates the score on GUI
//   def update_score
//     @player_score.remove
//     @player_score = Text.new @score, x: @player_name_x + 100, y: @player_name_y, size: 20, color: @player_score.color
//   end

//   # 
//   def increment_score
//     @score += 1
//     update_score
//   end

//   # 
//   def decrement_score
//     @score -= 1
//     update_score
//   end

//   # shows which player is selected on GUI
//   def select
//     @player_name.color = 'blue'
//     @player_score.color = 'blue'
//   end

//   # shows which player is not selected on GUI
//   def deselect
//     @player_name.color = 'black'
//     @player_score.color = 'black'
//   end
// end
