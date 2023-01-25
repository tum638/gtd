import { Fact, CardHolder , Card, Game} from "./pieces.js"
// Grab main element from DOM
const main = document.querySelector(".main");
const body = document.querySelector("body");
const startButton = document.getElementById("start-btn");
const music = document.getElementById("music");
// music.play();


//create new instance of fact

const fact = new Fact();

//append title and message of fact to main element
main.appendChild(fact.getHeading());
main.appendChild(fact.getRandomFact());

startButton.addEventListener("click", () => {
    const cardHolder = new CardHolder();
    body.appendChild(cardHolder.display());
    cardHolder.display();
    cardHolder.showInstructions();
})

class Player {
    constructor() {
        this.score = 0;

    }
}









