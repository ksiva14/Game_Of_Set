require 'ruby2d'
require_relative 'player'

# class for creating the game for the user
class Game
  attr_accessor :card_deck, :current_player, :player1, :player2

  # actions to start the game
  def initialize
    setup_deck
    create_player
    @current_player = @player1
  end

  # create a deck and deals 12 cards
  def setup_deck
    @card_deck = Deck.new
    @card_deck.create_card_deck
    deal_cards
  end

  # creates 2 players
  def create_player
    @player1 = Player.new 'Player1', 50, 20
    @player2 = Player.new 'Player2', 300, 20
    @player1.select
  end

  # changes the current player
  # Parameter player_num: new player to be switched to 
  def change_current_player(player_num)
    case player_num
    when 1
      @current_player = @player1
      @player1.select
      @player2.deselect
    when 2
      @current_player = @player2
      @player2.select
      @player1.deselect
    end
  end

  # Creates a row of cards
  # Parameter x: x coordinate of GUI for which to create 
  # Parameter y: y coordinate of GUI for which to create
  # Parameter index: current index in displayed sprites for which to add card 
  def create_row_of_cards(x, y, index)
    6.times do
      # get 1 card object
      card = @card_deck.deck_of_cards.pop
      @card_deck.current_deck << card
      # keep track of x and y position of the card
      card.x = x
      card.y = y
      card.create_card_sprite(card_deck, index)
      # update x (card width is 100)
      x += 110
      index += 1
    end
    index
  end

  # Shuffle and remove 12 cards(2 rows of 6) to display to player
  def deal_cards
    @card_deck.deck_of_cards.shuffle!
    index = 0
    # starting coords for the first row
    x_coord = 50
    y_coord = 50
    # create first row of cards
    index = create_row_of_cards(x_coord, y_coord, index)

    # starting coords for the second row
    # leave space for first row (card height is 56)
    y_coord += 56
    # create second row of cards
    create_row_of_cards(x_coord, y_coord, index)
  end

  # warnings for the player
  def user_warnings
    # warn user that the game has ended
    puts 'The Game has ended.' if ends?
  end

  # determine who the winner is.
  def winner
    if @player1.score < @player2.score
      puts "Congratulations! Player2 has won with #{@player2.score} sets found!"
    elsif @player1.score > @player2.score
      puts "Congratulations! Player1 has won with #{@player1.score} sets found!"
    else
      puts "It is a tie with #{@player1.score} sets found!"
    end
  end

  # Function to see if Game ends
  # Returns true/false if game is over/not
  def ends?
    # no sets remaining, no cards left
    !@card_deck.set_remaining?(@card_deck.current_deck) && @card_deck.deck_of_cards.length == 0 && @card_deck.current_deck.length <= 12
  end
end
