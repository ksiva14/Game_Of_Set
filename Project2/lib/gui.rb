# Class for graphics
class GUI
  # button class for GUI
  class Button
    attr_reader :width, :height, :x, :y

    # creates a button with text using ruby2d
    def initialize(width, height, x, y, text)
      @width = x + width
      @height = y + height
      @x = x
      @y = y
      Rectangle.new x: @x, y: @y, width: width, height: height, color: 'teal'
      Text.new text, x: @x + 10, y: @y + 10, size: 20, color: 'black', z: 1
    end

    # checks if button is clicked
    def clicked?(event)
      (event.x > @x) && (event.x < @width) && (event.y > @y) && (event.y < @height)
    end

    # generate hint for player
    def generate_hint(card_deck, hint_num)
      # vairable to see if a set is found
      found_set = false
      i = 0
      # Iterate through each three pairs of cards
      while i < card_deck.current_deck.length && !found_set
        card1 = card_deck.current_deck[i]
        j = i + 1
        while j < card_deck.current_deck.length && !found_set
          card2 = card_deck.current_deck[j]
          k = j + 1
          while k < card_deck.current_deck.length && !found_set
            card3 = card_deck.current_deck[k]
            found_set = card_deck.is_set?([card1, card2, card3])
            k += 1
          end
          j += 1
        end
        i += 1
      end
      if found_set
        # Display the card numbers that are a set to help users in each hint
        puts "Hint 1: Consider card #{i}!" if hint_num == 1
        puts "Hint 2: Consider card #{i} and #{j}!" if hint_num == 2
        puts "Hint 3: Consider card #{i}, #{j}, and #{k}!" if hint_num == 3
      else
        puts 'No sets found!'
      end
    end

    # Function to add three cards if no set is remaining
    def add_three_cards()
      # Make sure there is cards availible to add
      if card_deck.deck_of_cards.length != 0
        3.times do
          # Get three cards and update current deck
          card = card_deck.deck_of_cards.pop
          card_deck.current_deck << card
        end
        # warn user that there are no more sets
        unless (card_deck.set_remaining? card_deck.current_deck) && !card_deck.deck_of_cards.length.zero?
          puts 'Adding 3 cards as no sets can be found'
        end
        # Display the updated deck to GUI
        Cards.print_cards(card_deck)
      end
    end
  end

  # actions to start the graphic interface
  def initialize
    create_buttons
  end

  attr_reader :hint1_button, :hint2_button, :hint3_button, :add_cards_button

  # creates all the buttons used for graphics
  def create_buttons
    # hint buttons
    @hint1_button = Button.new(95, 45, 750, 50, 'Hint 1')
    @hint2_button = Button.new(95, 45, 750, 100, 'Hint 2')
    @hint3_button = Button.new(95, 45, 750, 150, 'Hint 3')
    # add 3 cards button
    @add_cards_button = Button.new(130, 45, 732, 200, 'Add 3 Cards')
  end

  # replaces the card sprite at index
  def self.replace_sprite(card, card_deck, index)
    # remove sprite from gui
    delete_sprite(card_deck, index)
    # replace sprite
    card.create_card_sprite(card_deck, index)
  end

  # Delete the card sprite
  def self.delete_sprite(card_deck, index)
    card_deck.displayed_sprites[index].remove
  end
end
