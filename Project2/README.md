# PG3901-Project1_GameOfSets

## Description

This project is the classic card game, "Set". Graphics are implemented so the players can easily choose and visualize what cards make a set. 

## Contributors
[Zheng Ji Tan](https://github.com/Just-ZJ), [Karthick Sivasubramanian](https://github.com/ksiva14), [Tyler Frantz](https://github.com/tylerfrantz), [Justin King](https://github.com/jking3019)

## Install
Make sure you have installed
- ruby | [Course Website](http://web.cse.ohio-state.edu/~giles.25/3901/resources/vm-install.html) | [Official Website](https://www.ruby-lang.org/en/documentation/installation/)
- [ruby2d](https://www.ruby2d.com/learn/get-started/):
```
sudo apt install libsdl2-dev libsdl2-image-dev libsdl2-mixer-dev libsdl2-ttf-dev
gem install ruby2d
```

## How to Play
  *  Number of Players: 2
  *  To play a game, run these 2 commands:

    cd lib
    ruby lib/game_of_set.rb
   *  A set consists of three cards satisfying all of these conditions:

    They all have the same number or have three different numbers.
    They all have the same shape or have three different shapes.
    They all have the same shading or have three different shadings.
    They all have the same color or have three different colors.
 *  Switch between players by pressing `1` or `2` on your keyboard. (The selected player would be shown in blue)
 *  Click on any 3 cards that you think are a set, these cards will be checked.
    - If they are a set, a point will be added for the player shown in blue
    - If they are not a set, a point will be decremented for the player shown in blue
  *  If both players decide that there are no sets, press the `Add 3 Cards` button  and 3 cards will be added.
  *  If there are no sets in the cards that are displayed, 3 cards will be added as well.
  *  If you want a hint, press the `Hint 1`, `Hint 2`, or `Hint3` button.
     - `Hint 1`: Lets you know of 1 card that is part of a set
     - `Hint 2`: Lets you know of 2 card that is part of a set
     - `Hint 3`: Lets you know of 3 card that is part of a set
  *  The game will end when whichever condition happens first:
     - All 81 cards in the deck have been dealt and no more sets can be found.
     - When 5 minutes have passed since the game started.
  *  The player with the highest score wins!

## Challenges Faced
Many challenges were faced when creating this project. We switched structures to hold the cards many times, moving through lists, objects, and arrays. Using a new language, Ruby, and a new environment, Ubuntu, created many roadblocks and speed bumps while creating this project. 

## Future Technologies
If we had more time, we would want to add a couple things to our game. 
 * A popup message to display everything that was displayed to the terminal
 * Minigames where 1 player could race against a clock to find as many sets as they can and finding 1 set as fast as they can to refine their set finding skills would add new dimensions to our project. 
 * A computer to play against so the user doesn't need to find other players to play with
 * Add different difficulties where the user could pick how hard they want the game to be, and the harder they choose, the less amount of hints and time they would have. 



## Test Cases
Make sure you have installed
- [minitest](https://docs.ruby-lang.org/en/2.0.0/MiniTest.html#module-MiniTest-label-INSTALL-3A)
```
gem install minitest
```
  *  To run the test cases, ensure that you are in the test folder and run:

    ruby test_cases.rb 






