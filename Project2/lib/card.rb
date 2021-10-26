# contains all classes and methods related to cards
module Cards
  # Class for Card Object
  class SetCard
    attr_reader :color, :number, :shape, :texture, :image_path
    attr_accessor :x, :y, :width, :height

    # Constructor Init
    def initialize(color, number, shape, texture, path)
      @color = color
      @number = number
      @shape = shape
      @texture = texture
      @image_path = path
      @x = -1
      @y = -1
      @width = 0
      @height = 0
    end

    # Creates an array of card image
    # Parameter card_deck: current deck of cards for game state
    # Parameter index: current place in deck to add card
    def create_card_sprite(card_deck, index)
      card_deck.displayed_sprites[index] = Sprite.new(
        @image_path.to_s,
        x: @x,
        y: @y
      )
    end

    # checks if card is clicked
    # Parameter event: GUI event to determine if a card was clicked
    # Returns true/false if a valid card is clicked/not
    def clicked?(event)
      (event.x > @x) && (event.x < @width) && (event.y > @y) && (event.y < @height)
    end

    # behavior of card when it is clicked on gui
    # Parameter card_deck: current deck of cards for game state
    # Parameter player: current player selected in the game
    def clicked_behavior(card_deck, player)
      # add the cards if not already selected
      card_deck.add_to_selected if (card_deck.selected_index.is_a? Integer) && (card_deck.index_array.length < 3)
      # check if length is 3 after adding
      if (card_deck.index_array.length == 3) && (card_deck.is_set? card_deck.cards_selected)
        puts 'Set Found'
        # replace cards
        card_deck.replace_card
        # increment score
        player.increment_score
        # clear selection after set is found
        card_deck.clear_selected
      elsif (card_deck.index_array.length == 3) && !(card_deck.is_set? card_deck.cards_selected)
        puts 'Sorry, not a set!'
        player.decrement_score
        # clear selection
        card_deck.clear_selected
      end
    end
  end

  # Function to Display all the cards on GUI (6 cards on each row)
  # Parameter card_deck: current deck of cards for game state
  def self.print_cards(card_deck)
    # Get number of rows needed
    num_rows = card_deck.current_deck.length / 6
    # Init x and y location on gui
    x_loc = 50
    y_loc = 50
    # Start index from position 0
    index = 0
    # Delete all the old sprite objects
    card_deck.displayed_sprites.each_index do |i|
      card_deck.displayed_sprites[i].remove
    end
    # Clear the sprite array
    card_deck.displayed_sprites.clear
    # For each row except the last one keep displaying 6 cards on each row
    num_rows.times do
      x_loc = 50
      6.times do
        # Get card and set new x and y location
        card = card_deck.current_deck[index]
        card.x = x_loc
        card.y = y_loc
        # Create sprite object to display card
        card.create_card_sprite(card_deck, index)
        index += 1
        x_loc += 110
      end
      # update y location each row
      y_loc += 56
    end
    # Set back to original x location
    x_loc = 50
    # Display the last cards on the last row
    (index...card_deck.current_deck.length).each do |pos|
      card = card_deck.current_deck[pos]
      card.x = x_loc
      card.y = y_loc
      card.create_card_sprite(card_deck, pos)
      x_loc += 110
    end
  end
end
