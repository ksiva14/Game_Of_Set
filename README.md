# PG3901-Project1_GameOfSets

## Description

This project is the classic card game, "Set". Graphics are implemented so the players can easily choose and visualize what cards make a set. It takes our previous game of set in Ruby, and uses javascript, html, and css to replace ruby2d that we used for graphics.


## Contributors
[Zheng Ji Tan](https://github.com/Just-ZJ), [Karthick Sivasubramanian](https://github.com/ksiva14), [Tyler Frantz](https://github.com/tylerfrantz), [Justin King](https://github.com/jking3019)


## How to Play
  *  Number of Players: 2
  *  To play a game, run this command:

    node lib/javascript/game_of_set.js
    open index.html

   *  A set consists of three cards satisfying all of these conditions:

    They all have the same number or have three different numbers.
    They all have the same shape or have three different shapes.
    They all have the same shading or have three different shadings.
    They all have the same color or have three different colors.
 *  Switch between players by pressing the "Change Players" button. (The selected player would be shown in blue)
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
Many challenges were faced when creating this project. Learning Javascript quickly and weaving that with css and html was a challenge just trying to beat the clock. We were stuggling to debug because a couple of us forgot about dev tools, but once we found them things went much smoother. Working in classes in other files wasn't heavily documented on the internet so that took us a bit of time as well.

## Future Technologies
If we had more time, we would want to add a couple things to our game. 
 * Minigames where 1 player could race against a clock to find as many sets as they can and finding 1 set as fast as they can to refine their set finding skills would add new dimensions to our project. 
 * A computer to play against so the user doesn't need to find other players to play with
 * Add different difficulties where the user could pick how hard they want the game to be, and the harder they choose, the less amount of hints and time they would have. 



## Test Cases
Giles told us that we did not need testing, but would like to see it. We made a couple test cases using the ruby gem watir. 
Make sure you have installed
- [minitest](https://docs.ruby-lang.org/en/2.0.0/MiniTest.html#module-MiniTest-label-INSTALL-3A)
```
gem install minitest
```
- [watir](https://rubygems.org/gems/watir/versions/6.19.1)
```
gem install watir
```
  *  To run the test cases, ensure that you are in the test folder and run:

    ruby test_cases.rb 







