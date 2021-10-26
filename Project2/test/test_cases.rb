require 'minitest/autorun'
require '../lib/player'
require '../lib/card'
require '../lib/deck'
require 'ruby2d'

# Test fixture for Player Class

class TestPlayer < Minitest::Test
  
  # Has score attribute
  def test_has_score
    assert_respond_to Player.new('player 1', 50, 100), :score
  end

  # Has name attribute
  def test_has_name
    assert_respond_to Player.new('player 1', 50, 100), :name
  end

  # Remembers score attribute
  def test_remembers_score
    @player = Player.new('player 1', 50, 100)
    assert_equal 0, @player.score
  end

  # Remembers name attribute
  def test_remembers_name
    @player = Player.new('player 1', 50, 100)
    assert_equal 'player 1', @player.name
  end

  # Increment from zero 
  def test_increment_score_from_zero
    @player = Player.new('player 1', 50, 100)
    @player.increment_score
    assert_equal 1, @player.score
  end

  # Increment from nonzero integer
  def test_increment_score_from_nonzero
    @player = Player.new('player 1', 50, 100)
    3.times do
      @player.increment_score
    end
    assert_equal 3, @player.score
  end

  # Decrement to nonzero integer
  def test_decrement_score_to_nonzero
    @player = Player.new('player 1', 50, 100)
    3.times do
      @player.increment_score
    end
    @player.decrement_score
    assert_equal 2, @player.score
  end

  # Decrement to zero
  def test_decrement_score_to_zero
    @player = Player.new('player 1', 50, 100)
    @player.increment_score
    @player.decrement_score
    assert_equal 0, @player.score
  end

end


#Test Fixture for Card Class

class TestCard < Minitest::Test
  
  def setup
    @card = Cards::SetCard.new('red','three','oval','squiggle',"lib/images/red_three_oval_squiggle.png")
  end

  # Has color attribute
  def test_has_color
    assert_respond_to @card, :color
  end

  # Has number attribute
  def test_has_number
    assert_respond_to @card, :number 
  end

  # Has shape attribute
  def test_has_shape
    assert_respond_to @card, :shape
  end

  # Has texture attribute
  def test_has_texture
    assert_respond_to @card, :texture
  end

  # Remembers Color Attribute
  def test_color
    assert_equal 'red', @card.color
  end

  # Remembers Number Attribute
  def test_remembers_number
    assert_equal 'three', @card.number
  end

  # Remembers Shape Attribute
  def test_remembers_shape
    assert_equal 'oval', @card.shape 
  end 

  # Remembers Texture Attribute
  def test_remembers_texture
    assert_equal 'squiggle', @card.texture
  end

end

class TestDeck < Minitest::Test
  def setup
    #Deck object to check initial attributes
    @deck = Deck.new
    #Deck object to check create card deck
    @deck_test1 = Deck.new
    #Deck to check clear function
    @deck_test2 = Deck.new
    #Deck to test is set
    @deck_test3 = Deck.new
    #Deck to test if deck is empty
    @deck_test4 = Deck.new
    #Deck to test if set is remaining
    @deck_test5 = Deck.new
  end
  #Test if deck of cards is empty intially
  def test_deck_of_cards
    assert_empty @deck.deck_of_cards
  end
  #Test if current deck is empty intially
  def test_current_deck
    assert_empty @deck.current_deck
  end
  #Test if cards selected is empty initially 
  def test_cards_selected
    assert_empty @deck.cards_selected
  end
  #Test if 81 cards are created for game
  def test_create_card_deck
    @deck_test1.create_card_deck
    assert_equal 81, @deck_test1.deck_of_cards.length
    #Check if correct number of properties (for one property color = red to make sure distribution of cards is right)
    red = 0
    @deck_test1.deck_of_cards.each do |card|
        if card.color == 'red'
            red += 1
        end
    end
    #Will have exactly 27 of each property
    assert_equal 27, red
  end
  #Test case to make sure cards selected and indexes array are cleared
  def test_clear_selected
    @deck_test2.clear_selected
    assert_empty @deck_test2.cards_selected
    assert_empty @deck_test2.index_array
  end

  #Test case for is_set
  def test_is_set
    #Test for set of three cards that are a set
    @deck_test3.current_deck << Cards::SetCard.new('red','three','oval','striped', '')
    @deck_test3.current_deck << Cards::SetCard.new('red','two','oval','striped', '')
    @deck_test3.current_deck << Cards::SetCard.new('red','one','oval','striped', '')
    res = @deck_test3.is_set? @deck_test3.current_deck
    assert_equal true, res
    #Test case for set of three cards that are not a set
    @deck_test3.current_deck.clear
    @deck_test3.current_deck << Cards::SetCard.new('purple','three','oval','striped', '')
    @deck_test3.current_deck << Cards::SetCard.new('red','two','oval','striped', '')
    @deck_test3.current_deck << Cards::SetCard.new('red','one','oval','striped', '')
    res = @deck_test3.is_set? @deck_test3.current_deck
    assert_equal false, res
    #Test a challenging input where all attributes are different but still is a set
    @deck_test3.current_deck.clear
    @deck_test3.current_deck << Cards::SetCard.new('purple','three','oval','solid', '')
    @deck_test3.current_deck << Cards::SetCard.new('red','two','squiggle','striped', '')
    @deck_test3.current_deck << Cards::SetCard.new('green','one','diamond','open', '')
    res = @deck_test3.is_set? @deck_test3.current_deck
    assert_equal true, res
  end

  #Test case for if deck is empty
  def test_deck_empty
    #Test deck that is empty
    @deck_test4.deck_of_cards.clear
    assert_equal true, @deck_test4.deck_empty?(@deck_test4.deck_of_cards)
    #Test deck that is not empty
    @deck_test4.deck_of_cards << Cards::SetCard.new('purple','three','oval','striped', '')
    assert_equal false, @deck_test4.deck_empty?(@deck_test4.deck_of_cards)
  end
  #Test if set is remaining
  def test_set_remaining
    #Test for a case that set is remaining
    @deck_test5.current_deck << Cards::SetCard.new('red','three','oval','striped', '')
    @deck_test5.current_deck << Cards::SetCard.new('red','two','oval','striped', '')
    @deck_test5.current_deck << Cards::SetCard.new('red','one','oval','striped', '')
    res = @deck_test5.set_remaining? @deck_test5.current_deck
    assert_equal true, res
    #Test for a case that set is not remaining
    @deck_test5.current_deck.clear
    @deck_test5.current_deck << Cards::SetCard.new('purple','three','oval','striped', '')
    @deck_test5.current_deck << Cards::SetCard.new('red','two','oval','striped', '')
    @deck_test5.current_deck << Cards::SetCard.new('red','one','oval','striped', '')
    res = @deck_test5.set_remaining? @deck_test5.current_deck
    assert_equal false, res
  end

end
