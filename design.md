# Question Being Addressed

<p>Can the classic memory game be made a bit more interesting by using a different set of images of your favorite dogs each time you play the game?
When not playing the game, is it possible to autonomously generate random
did you know facts every 15seconds.</p>

## Overview of the memory game
<p>The objective of the memory game is to match pairs of cards that have the same image or pattern on them.
        The game board is set up with a number of cards face down. The Player makes tries flipping over two cards at a time.
        If the cards match, they remain face up on the board. If the cards do not match, they are flipped back over. 
        The goal is to remember the location of each card and match as many pairs as possible in the least amount of turns. 
        The game is over when all pairs have been matched!</p>

## API's in use

1. [Facts by API-Ninjas]("https://rapidapi.com/apininjas/api/facts-by-api-ninjas/")
2. [Dog API]("https://rapidapi.com/apininjas/api/facts-by-api-ninjas/")

## Languages to be used

1. HTML
2. Javascript
3. CSS

## Dependancies

<p>No dependancies. I will be making use of link tags though,
but I will not be importing external</p>

## Pseudocode classes

1. Game Class - contains different methods that control the game.
2. Card Class - implementation of the blueprint card I will be using for the the memory game and its associated method attributes and data attributes.
3. Cardholder Class - implementatation of the game canvas and its associated method and data attributes.
4. Player Class - implementation of the player of the game.
5. Fact class - contains the implementation of the random facts
    that will be called every 15 seconds.
   
   The methods that will be making the API calls are particularly
   are <code>GetCardImages()</code> in the game class and 
   <code>callNinja()</code> in the Fact class.





