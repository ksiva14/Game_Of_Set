# Implementation for Game of Set
# Authors: Karthick Sivasubramanian, Justin King, Tyler Frantz, Zheng Ji Tan

require 'ruby2d'
require_relative 'game'
require_relative 'card'
require_relative 'deck'
require_relative 'gui'

# Introduce User(s) to Game
puts 'Welcome to Game of Set!'
game = Game.new
graphics = GUI.new

# **********************************************************************************************************************
# **************************************************** Start of ruby2d stuff *******************************************
# **********************************************************************************************************************
# ruby window settings
set title: 'The Game Of Set'
set background: 'lime'
set width: 1000
set height: 850

# time before game starts so it can be compared to current time for timer
time_before = Time.now.to_i

# mouse event for when the player click on the cards
on :mouse_down do |event|
  # decide what cards are selected
  game.card_deck.select_cards(game.card_deck, event, game.current_player)

  # generate hints
  graphics.hint1_button.generate_hint(game.card_deck, 1) if graphics.hint1_button.clicked? event
  graphics.hint2_button.generate_hint(game.card_deck, 2) if graphics.hint2_button.clicked?  event
  graphics.hint3_button.generate_hint(game.card_deck, 3) if graphics.hint3_button.clicked?  event

  # adds 3 more cards if button is clicked
  if (graphics.add_cards_button.clicked? event) || !(game.card_deck.set_remaining? game.card_deck.current_deck)
    # warn user that there are no more sets
    if !(game.card_deck.set_remaining? game.card_deck.current_deck) && !game.ends?
      puts 'Adding 3 cards as no sets can be found'
    end
    # button is clicked
    if (graphics.add_cards_button.clicked? event) && !game.card_deck.deck_of_cards.length.zero?
      puts 'Adding 3 cards...'
    elsif game.card_deck.deck_of_cards.length.zero?
      puts 'Deck is Empty. No more cards can be added.'
    end
    graphics.add_cards_button.add_three_cards(game.card_deck)
  end

  # warns user when no sets can be found & when the game has ended
  game.user_warnings
  game.winner if game.ends?
  close if game.ends?
end

# Keyboard event to handle player switch
on :key_down do |event|
  # A key was pressed
  selection = event.key[event.key.length - 1].to_i
  game.change_current_player(1) if selection == 1
  game.change_current_player(2) if selection == 2
end

# how long the players have to play the game
game_time = 300
# continually erase timer and replace it with current time left in game.
# if the time now - the time before (time_now - time before = current time) is greater than the time
# the user have to play, close the window and tell the users the game is over
update do
  Rectangle.new(x: 750, y: 20, width: 225, height: 25, color: 'lime')
  current_time = time_before + game_time - Time.now.to_i
  Text.new("Timer: #{current_time} seconds left", x: 750, y: 20, color: 'red')
  if Time.now.to_i - time_before > game_time
    close
    game.winner
    puts 'You have run out of time, the game is over'
  end
end

# display window for ruby2d
show
# **********************************************************************************************************************
# **************************************************** End of ruby2d stuff *******************************************
# **********************************************************************************************************************
