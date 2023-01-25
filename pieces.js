
const body = document.querySelector("body");
var timeStamp = 0;
// Colors for different aspects of the app
const COLORS = {
    textColorDark: "#FFFDD0",
    buttonColor: "#D96C06",
    buttonColorHover: "#ea8a30",
    divPadding: "2rem",
    buttonTextColorHover: "#001220",
    divBackgroundColor: "#FFFDD0",
    frameColor: "black"
}
 
     
export class Fact {
    
    constructor() {
        // create a new heading
        this.title = document.createElement("h1");
        // add text to heading
        this.title.style.fontWeight = 100;

        this.title.textContent = "Welcome to Memoir Maze!";
        // create new paragraph
        this.message = document.createElement("p");
        this.message.style.marginTop = "2rem";
        // add initial text to paragraph
        this.message.textContent = "Did you know..."
        this.startAPIcalls();
    }  
    // get the heading of the random facts div
    getHeading() {
        // returns current heading of the random fact
        return this.title;
    }
    getRandomFact() {
        // returns current message of the random fact
        return this.message
    }
    changeTiTle() {
        //changes title of fact
    }
    changeMessage() {
        //changes message of fact
    }
    callNinja() {
        // make API call to Ninja
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2a489d18e6msh168fa71dd34e5bcp1f4931jsn15e0ef6bce8f',
            'X-RapidAPI-Host': 'facts-by-api-ninjas.p.rapidapi.com'
        }
    }
    fetch('https://facts-by-api-ninjas.p.rapidapi.com/v1/facts', options)
	.then(response => response.json())
        .then(data => {
            const randomFact = data[0].fact

            this.message.textContent = randomFact;
            this.title.textContent = "Did You Know";
        })
	.catch(err => console.error(err));
}
    startAPIcalls() {
        // make an API call every 10 seconds.
        setInterval(() => {
            this.callNinja();

        }, 10000);
    }
   
}
export class Game {
    // initialize game attributes
    constructor() {
        this.attempts = 0;
        this.cards = [];
        this.scoreCount = 0;
        this.unclickedCards = []
        this.firstCardFlipped = false;
        this.firstCard = null;
        this.secondCard = null;
        this.score = document.createElement("h1")
        this.score.style.color = "black";
        this.score.style.gridColumn = "1 / 5";
        this.score.style.gridRow = "1";
        this.matches = 0;
        this.score.innerHTML = `(SCORE: <span style="color: green">0</span>) (ATTEMPTS: 0) (MATCHES: <span style="color: green">0</span>)`;
        
    }
    // check if the cards that have been clicked have the same image
    checkMatch() {
        if (this.firstCard.imageId === this.secondCard.imageId) {
            // increment match variable
            this.matches++;
            this.scoreCount += 10;
            return true;
        } else {
            return false;
        }
    }
    // disable matched cards
    disableCards() {
        this.firstCard.getCard().style.pointerEvents = "none";
        this.secondCard.getCard().style.pointerEvents = "none";
        let removedfirst = this.unclickedCards.splice(this.firstCard.imageId, 1);
        let removedsecond = this.unclickedCards.splice(this.secondCard.imageId, 1);

    }
    activateCards() {

    }
    // Check if the game is over
    isGameOver() {
        // check to see if six matches have been made (the game is over)
        if (this.matches === 6) {
            // return true if game is over.
            return true;
        } else {
            // return false if game is in progress.
            return false;
        }
    }
    play() {

    }
    async getCardImages() {
        // link to random dogs API endpoint
        const url = "https://dog.ceo/api/breeds/image/random/6"

        async function fetchData() {
            // initialize images list
            const images = []
            // store the response in a variable named response.
            const response = await fetch(url, { method: "GET" });
            // convert the response to json.
            const data = await response.json();
            // add image urls to images list.
            for (let i = 0; i < 6; i++) {
                images.push({ id: i + 1, url: data.message[i] })
            }
            // return list of images
            return images
            
        }
        const data = await fetchData();
        // return data
        return data
    }
    // check if user already has a flipped card.
    hasFlippedCard() {
        return this.firstCardFlipped;
    }
    getScore() {
        return this.score;
    }
    // create the cards
    async createCards() {
        // store images in images variable
        const images = await this.getCardImages();
        // loop six times and create cards, add event listeners to cards
        for (let i = 0; i < 6; i++) {
            let card1 = new Card(images[i]);
            let card2 = new Card(images[i]);
            card1.getCard().addEventListener("click", () => {
                if (Date.now() - timeStamp < 300) {
                    return;
                }
                card1.flipCard();
                if (!this.hasFlippedCard()) {
                    // first card flipped
                    this.firstCardFlipped = true;
                    this.firstCard = card1;
                    this.firstCard.getCard().style.pointerEvents = "none";
                } else {
                    this.attempts++
                    // second card flipped
                    this.firstCardFlipped = false;
                    this.secondCard = card1;
                    this.firstCard.getCard().style.pointerEvents = "auto";

                    // check match 
                    if (this.checkMatch() === true) {
                        this.scoreCount += 10
                        this.disableCards();
                        if (this.isGameOver()) {
                            if (localStorage.getItem("HighScore") < this.scoreCount) {
                                localStorage.setItem("HighScore", this.scoreCount)
                            }
                            this.score.innerHTML = `Your Score was <span style="color: green">${this.scoreCount}</span> in <span style="color: green">${this.attempts}</span> attempts. HighScore: <span style="color: green">${localStorage.getItem("HighScore")}</span>`
                        } else {
                            this.score.innerHTML = `(SCORE: <span style="color: green">${this.scoreCount}</span>) (ATTEMPTS: ${this.attempts}) (MATCHES: <span style="color: green">${this.matches}</span>)`;
                        }
                             
                           
                            
                    } else {
                        setTimeout(() => {
                            if (this.attempts > 6) {
                                this.scoreCount = this.scoreCount - 2
                            }
                            this.firstCard.getCard().style.transform = "rotateY(0deg)";
                            this.firstCard.getCard().style.transformOrigin = "center";
                            this.firstCard.getCard().style.transition = "transform 0.5s";
                            this.firstCard.frontpicture.style.transform = "rotateY(0deg)";
                            this.firstCard.setBackSide();
                            this.secondCard.getCard().style.transform = "rotateY(0deg)";
                            this.secondCard.getCard().style.transformOrigin = "center";
                            this.secondCard.getCard().style.transition = "transform 0.5s";
                            this.secondCard.frontpicture.style.transform = "rotateY(0deg)";
                            this.secondCard.setBackSide();
                            this.firstCard = null;
                            this.secondCard = null;
                            this.score.innerHTML = `(SCORE: <span style="color: green">${this.scoreCount}</span>) (ATTEMPTS: ${this.attempts}) (MATCHES: <span style="color: green">${this.matches}</span>)`;
                        }, 900);
                            
                           
                    }
                        
                }
               timeStamp = Date.now();     
            }
                
            );
            card2.getCard().addEventListener("click", (event) => {
                if (Date.now() - timeStamp < 300) {
                    return;
                }
                    card2.flipCard();
                    if (!this.hasFlippedCard()) {
                        // first card flipped
                        this.firstCardFlipped = true;
                        this.firstCard = card2;
                        this.firstCard.getCard().style.pointerEvents = "none";
                    } else {
                        // second card flipped
                        this.attempts++;
                        this.firstCardFlipped = false;
                        this.secondCard = card2;
                        this.firstCard.getCard().style.pointerEvents = "auto";
                        
                        if (this.checkMatch() === true) {
                            this.scoreCount += 10;
                            this.disableCards();
                            if (this.isGameOver()) {
                                 if (localStorage.getItem("HighScore") < this.scoreCount) {
                                localStorage.setItem("HighScore", this.scoreCount)
                                }
                                this.score.innerHTML = `GAME OVER! Your Score was <span style="color: green">${this.scoreCount}</span> in <span style="color: green">${this.attempts}</span> attempts. HighScore: <span style="color: green">${localStorage.getItem("HighScore")}</span>`
                            } else {
                                this.score.innerHTML = `(SCORE: <span style="color: green">${this.scoreCount}</span>) (ATTEMPTS: ${this.attempts}) (MATCHES: <span style="color: green">${this.matches}</span>)`;
                            }
                        } else {

                            setTimeout(() => {
                                if (this.attempts > 6) {
                                    this.scoreCount = this.scoreCount - 5
                                }
                                
                                this.firstCard.getCard().style.transform = "rotateY(0deg)";
                                this.firstCard.getCard().style.transformOrigin = "center";
                                this.firstCard.getCard().style.transition = "transform 0.5s";
                                this.firstCard.frontpicture.style.transform = "rotateY(0deg)";
                                this.firstCard.setBackSide();
                                this.secondCard.getCard().style.transform = "rotateY(0deg)";
                                this.secondCard.getCard().style.transformOrigin = "center";
                                this.secondCard.getCard().style.transition = "transform 0.5s";
                                this.secondCard.frontpicture.style.transform = "rotateY(0deg)";
                                this.secondCard.setBackSide();
                                
                                this.firstCard = null;
                                this.secondCard = null;
                                this.score.innerHTML = `(SCORE: <span style="color: green">${this.scoreCount}</span>) (ATTEMPTS: ${this.attempts}) (MATCHES: <span style="color: green">${this.matches}</span>)`;
                            }, 900);
                            
                        }
                        
                    }
                timeStamp = Date.now();   
                }
            );
            card1.getCard().addEventListener("mousedown", () => {
                card1.getCard().style.transform = "scale(0.97)";
                card1.getCard().style.transition = "transform 0.15s";
            })
            card1.getCard().addEventListener("mouseup", () => {
                card1.getCard().style.transform = "scale(1)";
                card1.getCard().style.transition = "transform 0.15s";
            });
            card2.getCard().addEventListener("mousedown", () => {
                card2.getCard().style.transform = "scale(0.97)";
                card2.getCard().style.transition = "transform 0.15s";
            });
            card2.getCard().addEventListener("mouseup", () => {
                card2.getCard().style.transform = "scale(1)";
                card2.getCard().style.transition = "transform 0.15s";
            });
                
                
                
            this.cards.push(card1);
            this.unclickedCards.push(card1);
            this.cards.push(card2);
            this.unclickedCards.push(card2)
        }
    
        return this.cards
    
    }

    showAll() {
        // show all the backside of all the cards.
        this.cards.forEach((card) => {
            
            card.getCard().style.pointerEvents = "none";
            card.getCard().style.transform = "rotateY(180deg)";
            card.getCard().style.transformOrigin = "center";
            card.getCard().style.transition = "transform 0.5s";
            card.getFrontPicture().style.transform = "rotateY(180deg)";
            card.setFrontSide();
        })
    }
    hideAll() {
        // hide the backside of all the cards.
        console.log(this.unclickedCards.length)
        this.cards.forEach((card) => {
            this.matches = 0;
            this.attempts = 0;
            this.scoreCount = 0;
            card.getCard().style.pointerEvents = "auto";
           card.getCard().style.transform = "rotateY(0deg)";
            card.getCard().style.transformOrigin = "center";
            card.getCard().style.transition = "transform 0.5s";
            card.getFrontPicture().style.transform = "rotateY(0deg)";
            card.setBackSide(); 
        })
    }
   
    
}
export class CardHolder {
    // initialize cardholder variable.
    constructor(props) {
        const game = new Game();
        this.game = game;
        this.frame = document.createElement("div");
        this.frame.style.position = "fixed";
        this.frame.style.zIndex = 1;
        this.frame.style.width = "100vw";
        this.frame.style.height = "100vh";
        this.frame.style.left = 0;
        this.frame.style.top = 0;
        this.frame.style.backgroundColor = COLORS.frameColor;
        this.frame.style.opacity = 1;
        this.cardholder = document.createElement("div");
        this.cardholder.style.position = "absolute";
        this.cardholder.style.width = "90vw";
        this.cardholder.style.height = "90vh";
        this.cardholder.style.top = "50%";
        this.cardholder.style.left = "50%";
        this.cardholder.style.maxWidth = "800px";
        this.cardholder.style.zIndex = 2;
        this.cardholder.style.backgroundColor = COLORS.divBackgroundColor;
        this.cardholder.style.borderRadius = "1.2rem";
        this.cardholder.style.perspective = "40em";
        this.cardholder.style.transform = "translate(-50%, -50%)";
        this.frame.appendChild(this.cardholder);

    }
    // diplay the game canvas
    display() {
        if (this.frame.style.display) {
            this.frame.style.removeProperty("display");
        }
        return this.frame;
    }
    // hide the game canvas
    hide() {
        this.frame.style.display = "none";
    }
    // show game instructions
    showInstructions() {
        this.cardholder.style.textAlign = "center";
        this.cardholder.style.padding = "2rem";
        this.cardholder.style.display = "flex";
        this.cardholder.style.flexDirection = "column";
        this.cardholder.style.justifyContent = "space-between";
        this.cardholder.style.alignItems = "center";
        const header = document.createElement("h1");
        const nextCancelButton = document.createElement("div");
        nextCancelButton.style.display = "flex";
        nextCancelButton.style.width = "18em";
        nextCancelButton.style.height = "2em";
        nextCancelButton.style.backgroundColor = "none";
        const nextButton = document.createElement("div")
        const cancelButton = document.createElement("div")

        const instructions = document.createElement("p")
        nextButton.style.color = "white";
        nextButton.style.backgroundColor = COLORS.buttonColor;
        nextButton.style.width = "50%";
        nextButton.style.height = "100%";
        nextButton.style.display = "flex";
        nextButton.style.alignItems = "center";
        nextButton.style.justifyContent = "center";
        nextButton.innerHTML = "NEXT";
        cancelButton.style.color = "white";
        cancelButton.style.backgroundColor = "#001220";
        cancelButton.style.display = "flex";
        cancelButton.style.alignItems = "center";
        cancelButton.style.justifyContent = "center";
        cancelButton.style.width = "50%"
        cancelButton.style.height = "100%"
        cancelButton.innerHTML = "CANCEL";
        header.style.color = "black";
        header.style.fontWeight = "600";
        header.style.fontSize = "3rem";
        instructions.style.color = "black";
        cancelButton.addEventListener("mouseenter", () => {
            cancelButton.style.backgroundColor = "#2d353a";
        })
        cancelButton.addEventListener("mouseleave", () => {
             cancelButton.style.backgroundColor = "#001220";
        })
        cancelButton.addEventListener("click", () => {
            this.hide();
        })
        nextButton.addEventListener("click", () => {
            this.hideInstructions(header, instructions, nextCancelButton)
            this.showGame();
            this.addCardsToTemplate();
        })
        nextButton.addEventListener("mouseenter", () => {
            nextButton.style.backgroundColor = "#ea8a30";
        })
        nextButton.addEventListener("mouseleave", () => {
            nextButton.style.backgroundColor = COLORS.buttonColor;
        })
        header.textContent = "MATCH THE IDENTICAL CARDS!";
        instructions.textContent = `
        The objective of the memory game is to match pairs of cards that have the same image or pattern on them.
        The game board is set up with a number of cards face down. The Player makes tries by flipping over two cards at a time.
        If the cards match, they remain face up on the board. If the cards do not match, they are flipped back over. 
        The goal is to remember the location of each card and match as many pairs as possible in the least amount of turns. 
        The game is over when all pairs have been matched!
        `;
        // check if the cardholder has child nodes already
        if (this.cardholder.hasChildNodes()) {
            // hide the instructions
            this.hideInstructions(header, instructions, nextButton);
        }
        // otherwise child object has no children yet, addd instructions.
        nextCancelButton.appendChild(cancelButton);
        nextCancelButton.appendChild(nextButton);
        this.cardholder.appendChild(header);
        this.cardholder.appendChild(instructions);
        this.cardholder.appendChild(nextCancelButton);
    }
    // hide game instructions
    hideInstructions(header, instructions, nextCancelButton) {

        this.cardholder.removeChild(header);
        this.cardholder.removeChild(instructions);
        this.cardholder.removeChild(nextCancelButton);
        this.cardholder.style.removeProperty("text-align");
        this.cardholder.style.removeProperty("flex");
        this.cardholder.style.removeProperty("flex-direction");
        this.cardholder.style.removeProperty("justify-content");
        this.cardholder.style.removeProperty("align-items");


    }
    // show game canvas
    showGame() {
        this.cardholder.style.display = "grid";
        this.cardholder.style.textAlign = "center";
        this.cardholder.style.gap = "1rem";
        this.cardholder.style.gridTemplateAreas = '"score score score score" "1 2 3 4" "5 6 7 8" "9 10 11 12" "empty footer footer empty"';
        this.cardholder.style.gridTemplateColumns = "repeat(4, 1fr)";
        this.cardholder.style.gridTemplateRows = "0.8fr 3fr 3fr 3fr 1.2fr"; 
        const restartButton = document.createElement("div");
        const quitButton = document.createElement("div");
        const showallButton = document.createElement("div");
        showallButton.style.display = "flex";
        showallButton.style.justifyContent = "center";
        showallButton.style.alignItems = "center";
        showallButton.style.backgroundColor = "green";
        showallButton.style.color = "white";
        showallButton.textContent = "SHOW ALL";
        showallButton.addEventListener("mouseenter", () => {
            showallButton.style.backgroundColor = "#006400";
        })
        showallButton.addEventListener("mouseleave", () => {
            showallButton.style.backgroundColor = "green";
        })
        showallButton.addEventListener("click", () => {
            this.game.showAll();
        })
        this.showall = showallButton
        const hideallButton = document.createElement("div")
        hideallButton.style.display = "flex";
        hideallButton.style.justifyContent = "center";
        hideallButton.style.alignItems = "center";
        hideallButton.style.backgroundColor = "green";
        hideallButton.style.color = "white";
        hideallButton.textContent = "HIDE ALL";
        hideallButton.addEventListener("mouseenter", () => {
            hideallButton.style.backgroundColor = "#006400";
        })
        hideallButton.addEventListener("mouseleave", () => {
            hideallButton.style.backgroundColor = "green"
        })
        hideallButton.addEventListener("click", () => {
            this.game.hideAll();
        })
        this.hideall = hideallButton;
        quitButton.textContent = "QUIT";
        restartButton.textContent = "RESTART";
        const restartQuitDiv = document.createElement("div");
        restartQuitDiv.style.divBackgroundColor = "none";
        restartQuitDiv.style.width = "100%";
        restartQuitDiv.style.height = "100%";
        restartQuitDiv.style.display = "flex";
        restartButton.style.display = "flex";
        quitButton.style.display = "flex";
        quitButton.style.justifyContent = "center";
        quitButton.style.alignItems = "center";
        restartButton.style.display = "flex";
        restartButton.style.justifyContent = "center";
        restartButton.style.alignItems = "center";
        quitButton.style.backgroundColor = "#001220";
        quitButton.style.color = "white";
        quitButton.style.width = "50%";
        quitButton.style.height = "100%"
        restartButton.style.width = "50%";
        restartButton.style.height = "100%"
        restartButton.style.backgroundColor = "#D96C06";
        restartButton.addEventListener("mouseenter", () => {
            restartButton.style.backgroundColor = "#ea8a30"
        })
        restartButton.addEventListener("mouseleave", () => {
            restartButton.style.backgroundColor = "#D96C06"
        })
        quitButton.addEventListener("mouseenter", () => {
            quitButton.style.backgroundColor = "#2d353a"
         })
        quitButton.addEventListener("mouseleave", () => {
            quitButton.style.backgroundColor = "#001220"
        })
        quitButton.addEventListener("click", () => {
            this.hide();
        })
        restartButton.addEventListener("click", () => {
            this.hide();
        })
        
        
        
        restartQuitDiv.style.gridColumn = "2 / 4";
        restartQuitDiv.style.gridRow = "5";
        showallButton.style.gridColumn = "1 / 2"
        showallButton.style.gridRow = "5";
        hideallButton.style.gridRow = "5";
        showallButton.style.gridColumn = "4 / 5";
        restartQuitDiv.append(quitButton);
        restartQuitDiv.append(restartButton);
        this.cardholder.appendChild(this.game.score);
        this.cardholder.appendChild(restartQuitDiv);
        this.cardholder.appendChild(showallButton);
        this.cardholder.appendChild(hideallButton);
        // this.cardholder.appendChild(card);
    }
    // hide game canvas
    hideGame() {
        this.hide()
    }
    
    async addCardsToTemplate() {
        let positions = [[2, 1], [2, 2], [2, 3], [2, 4], [3, 1], [3, 2], [3, 3], [3, 4], [4, 1], [4, 2], [4, 3], [4, 4]];
        let cards = await this.game.createCards();
        let max = 12;
        let i = 0
        while (max > 0) {
            
            let index = Math.floor(Math.random() * max);
            let card = cards[i].getCard();
            i++;
            let pos = positions[index];
            let removed = positions.splice(index, 1)
            card.style.gridColumn = `${pos[1]} / ${pos[1] + 1}`;
            card.style.gridRow = `${pos[0]}`;
            this.cardholder.appendChild(card);
            max--;

        } 
    }
}
export class Player {
    constructor(props) {
        this.name = props.name
    }
}




export class Card {
    constructor(props) {
        
        this.card = document.createElement("div");
        const backImage = new Image();
        this.backpicture = backImage;
        const frontImage = new Image();
        this.frontpicture = frontImage;
        backImage.src = "images/shubham-dhage-t0Bv0OBQuTg-unsplash.jpg";
        backImage.alt = "Back Image";
        backImage.style.width = "100%";
        backImage.style.height = "100%"
        backImage.style.position = "absolute";
        backImage.style.display = "block";
        backImage.style.backfaceVisibility = "hidden";
        // backImage.style.transform = "rotateY(0deg)";
        this.imageId = props.id
        frontImage.src = props.url
        frontImage.alt = "Front Image";
        frontImage.style.width = "100%";
        frontImage.style.height = "100%";
        frontImage.style.position = "absolute";
        frontImage.style.display = "block";
        frontImage.style.backfaceVisibility = "hidden";
        // frontImage.style.transform = "rotateY(0deg)";
        this.card.style.width = "100%";
        this.card.style.height = "100%";
        this.card.style.overflow = "visible";
        this.card.style.position = "relative";
        this.card.style.transform = "scale(1) rotateY(0deg)";
        this.card.style.transformStyle = "preserve-3d";
        this.card.isBackSide = true;
        this.card.appendChild(frontImage);
        this.card.appendChild(backImage);
        
            
    }
    getCard() {
        return this.card;
    }
    
    isBackOnBackSide() {
        return this.card.isBackSide;
    }
    setBackSide() {
        this.card.isBackSide = true;
    }
    setFrontSide() {
        this.card.isBackSide = false;
    }
    getFrontPicture() {
        return this.frontpicture;
    }
    getBackPicture() {
        return this.backpicture;
    }
    
    flipCard() {
        if (this.isBackOnBackSide() === true) {
            this.card.style.transform = "rotateY(180deg)";
            this.card.style.transformOrigin = "center";
            this.card.style.transition = "transform 0.5s";
            this.frontpicture.style.transform = "rotateY(180deg)";
            this.setFrontSide();
        } else if (this.isBackOnBackSide() === false) {
            this.card.style.transform = "rotateY(0deg)";
            this.card.style.transformOrigin = "center";
            this.card.style.transition = "transform 0.5s";
            this.frontpicture.style.transform = "rotateY(0deg)";
            this.setBackSide();
        }
    }
}



