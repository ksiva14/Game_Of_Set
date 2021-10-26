# Class for Deck Object
class Deck
  attr_accessor :deck_of_cards, :current_deck, :cards_selected, :displayed_sprites, :index_array, :selected_index
  attr_reader :numbers

  @@numbers = %w[one two three]
  @@shape = %w[diamond squiggle oval]
  @@texture = %w[solid striped open]
  @@color = %w[red green purple]

  def initialize
    # array of undealt cards
    @deck_of_cards = []
    # array of dealt cards
    @current_deck = []
    # array of cards selected by player
    @cards_selected = []
    # array of sprites displayed to player
    @displayed_sprites = []
    # array containing the index of the card objects selected
    @index_array = []
    @selected_index = -1
  end

  # Creates a deck of 81 cards. Returns a deck of 81 cards containing one of each card in the game
  def create_card_deck
    (0...@@numbers.length).each do |i|
      (0...@@shape.length).each do |j|
        (0...@@texture.length).each do |k|
          (0...@@color.length).each do |l|
            # location of the card sprite in file
            image_path = "images/#{@@color[l]}_#{@@numbers[i]}_#{@@shape[j]}_#{@@texture[k]}.png"
            # creates a card with each of the 4 properties
            @deck_of_cards.push(Cards::SetCard.new(@@color[l], @@numbers[i], @@shape[j], @@texture[k], image_path))
          end
        end
      end
    end
  end

  # clears the current selection of cards
  def clear_selected
    @index_array.clear
    @cards_selected.clear
  end

  # Checks if the array of 3 cards is a set.
  # Parameter cards: list of 3 cards to determine if the 3 are a set
  # Return true/false depending on it cards form a valid set
  def is_set?(cards)
    color = false
    number = false
    shape = false
    texture = false

    # check if all colors are unique OR all colors are the same
    if (cards[0].color == cards[1].color && cards[1].color ==
        cards[2].color && cards[0].color == cards[2].color) ||
       (cards[0].color != cards[1].color && cards[1].color !=
       cards[2].color && cards[0].color != cards[2].color)
      color = true
    end

    # check if all numbers are unique OR all numbers are the same
    if (cards[0].number == cards[1].number && cards[1].number ==
        cards[2].number && cards[0].number == cards[2].number) ||
       (cards[0].number != cards[1].number && cards[1].number !=
       cards[2].number && cards[0].number != cards[2].number)
      number = true
    end

    # check if all shape are unique OR all shaoe are the same
    if (cards[0].shape == cards[1].shape && cards[1].shape ==
        cards[2].shape && cards[0].shape == cards[2].shape) ||
       (cards[0].shape != cards[1].shape && cards[1].shape !=
       cards[2].shape && cards[0].shape != cards[2].shape)
      shape = true
    end

    # check if all texture are unique OR all texture are the same
    if (cards[0].texture == cards[1].texture && cards[1].texture ==
        cards[2].texture && cards[0].texture == cards[2].texture) ||
       (cards[0].texture != cards[1].texture && cards[1].texture !=
       cards[2].texture && cards[0].texture != cards[2].texture)
      texture = true
    end

    # return true if each attribute is unique amonst cards OR the same amongst cards within that category
    color && number && shape && texture
  end

  # Function to check if deck of cards is empty (game ends)
  # Parameter deck: the current deck of cards for which to check the length
  # Return true/false if deck is empty/not
  def deck_empty?(deck)
    deck.length.zero?
  end

  # Function to find if there are any sets remaining in the deck
  # Parameter deck: card deck to determine if set is remaining in deck
  # Returns true/false if there is set remaining/not
  def set_remaining?(deck)
    found_set = false
    i = 0
    while i < deck.length && !found_set
      card1 = deck[i]
      j = i + 1
      while j < deck.length && !found_set
        card2 = deck[j]
        k = j + 1
        while k < deck.length && !found_set
          card3 = deck[k]
          found_set = is_set?([card1, card2, card3])
          k += 1
        end
        j += 1
      end
      i += 1
    end
    found_set
  end

  # keeps track of what cards are selected
  def add_to_selected
    card = @current_deck[@selected_index]
    puts "Card #{@selected_index + 1} has already been selected" if @cards_selected.include? card
    # if card is not selected by player previously, add card
    unless @cards_selected.include? card
      puts "Card #{@selected_index + 1} selected"
      @index_array << selected_index
      @cards_selected << card
    end
  end

  # Determines which card is clicked by the player and perform the click behavior
  # Parameter card_deck: current deck of cards from which to select from
  # Parameter event: GUI event to determine if a particular card is clicked
  # Parameter player: the current player who is selecting
  def select_cards(card_deck, event, player)
    # checks which card is selected by player
    @displayed_sprites.each_index do |i|
      # define dimensions of the card
      card = @current_deck[i]
      card.width = card.x + 100
      card.height = card.y + 56
      @selected_index = i
      # actions when the card sprite is clicked
      card.clicked_behavior(card_deck, player) if card.clicked? event
    end
  end

  # Function to replace with new cards in current deck
  def replace_card
    @index_array.each_index do |i|
      index = @index_array[i].to_i
      # get a new card
      if !deck_empty?(@deck_of_cards) && (@current_deck.length <= 12)
        card = @deck_of_cards.pop
        # set x & y of new card with the x & y of old card
        card.x = @current_deck[index].x
        card.y = @current_deck[index].y
        # replace previous card
        @current_deck[index] = card
        GUI.replace_sprite(card, self, index)
      else
        # If that there are more than 12 cards or deck of cards is empty just delete cards
        # Set the card at the index to nil
        @current_deck[index] = nil
      end
    end
    # Delete all nil objects (the cards to be deleted) from current deck
    @current_deck.compact!
    # Display the updated deck to GUI
    Cards.print_cards(self)
  end
end
