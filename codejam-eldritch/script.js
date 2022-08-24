const ancientCards = document.querySelectorAll('.ancient-card');
let activeAncient = {};
let lastCard = document.createElement('div');
let deck = document.createElement('div');
deck.classList.add('deck');
lastCard.classList.add('last-card');
const deckContainer = document.querySelector('.deck-container');
let shuffleButton = document.createElement('button');
let cardDeck = [];
const dots = document.querySelectorAll('.dot')

import brownCards from './data/mythicCards/brown/index.js';
import blueCards from './data/mythicCards/blue/index.js';
import greenCards from './data/mythicCards/green/index.js';
import ancientsData from './data/ancients.js';

for (let i = 0; i < ancientCards.length; i++){
    ancientCards[i].style.backgroundImage = `url(${ancientsData[i].cardFace})`
}

shuffleButton.classList.add('shuffle-button')
shuffleButton.innerHTML = 'Замешать колоду';

ancientCards.forEach((val)=>{
    val.addEventListener('click',() => {
        toggleActive(val);
    })
})

shuffleButton.addEventListener('click', shuffleCards);
deck.addEventListener('click',switchCard);

function toggleActive(val){
    if (val.classList.contains('active')){
        return
    }
    else{
        ancientCards.forEach((value)=>{
            value.classList.remove('active')
        })
        val.classList.add('active');
        deckContainer.innerHTML = ''
        deckContainer.append(shuffleButton);
        dots.forEach((val)=> {val.innerHTML = ''})
    }
}

function getRandomInd(max) {
    const num = Math.floor(Math.random() * max);
    return num
}

function findActiveAncient(){
    let ancientActiveLink = '';
    ancientCards.forEach((value)=>{
        if (value.classList.contains('active')){
            ancientActiveLink = value.style.backgroundImage.split('"')[1];
        }
    })
    ancientsData.forEach((val)=>{
        if (val.cardFace === ancientActiveLink){
            activeAncient = val
        }
    })
}

function createDeck(){
    findActiveAncient();
    const greenAmount = activeAncient.firstStage.greenCards + activeAncient.secondStage.greenCards + activeAncient.thirdStage.greenCards
    const brownAmount = activeAncient.firstStage.brownCards + activeAncient.secondStage.brownCards + activeAncient.thirdStage.brownCards
    const blueAmount = activeAncient.firstStage.blueCards + activeAncient.secondStage.blueCards + activeAncient.thirdStage.blueCards
    let greenDeck = getCardArray(greenCards,greenAmount);
    let brownDeck = getCardArray(brownCards, brownAmount);
    let blueDeck = getCardArray(blueCards,blueAmount);
    let firstStageArr = [getCardArray(greenDeck,activeAncient.firstStage.greenCards), getCardArray(brownDeck,activeAncient.firstStage.brownCards),getCardArray(blueDeck,activeAncient.firstStage.blueCards)]
    greenDeck = filterOneDeck (greenDeck, firstStageArr, 0)
    brownDeck = filterOneDeck (brownDeck, firstStageArr, 1)
    blueDeck = filterOneDeck (blueDeck, firstStageArr, 2)
    let secondStageArr = [getCardArray(greenDeck,activeAncient.secondStage.greenCards), getCardArray(brownDeck,activeAncient.secondStage.brownCards),getCardArray(blueDeck,activeAncient.secondStage.blueCards)]
    greenDeck = filterOneDeck (greenDeck, secondStageArr, 0)
    brownDeck = filterOneDeck (brownDeck, secondStageArr, 1)
    blueDeck = filterOneDeck (blueDeck, secondStageArr, 2)
    let thirdStageArr = [getCardArray(greenDeck,activeAncient.thirdStage.greenCards), getCardArray(brownDeck,activeAncient.thirdStage.brownCards),getCardArray(blueDeck,activeAncient.thirdStage.blueCards)]
    const firstStageCards = unpackCards(firstStageArr)
    const secondStageCards = unpackCards(secondStageArr)
    const thirdStageCards = unpackCards(thirdStageArr)
    cardDeck = [thirdStageCards, secondStageCards, firstStageCards] 
    return cardDeck
}

const stageContainers = document.querySelectorAll('.stage-container')

function countStageCards(stage, containerInd) {
    let greenCount = 0;
    let blueCount = 0;
    let brownCount = 0;
    for (let card of stage){
        if (card.color === 'green'){
            greenCount += 1
        } else if (card.color === 'blue'){
            blueCount +=1
        } else if (card.color === 'brown'){
            brownCount += 1
        }
    }
    const greenDot = stageContainers[containerInd].querySelector('.green')
    const blueDot = stageContainers[containerInd].querySelector('.blue')
    const brownDot = stageContainers[containerInd].querySelector('.brown')

    greenDot.innerHTML = greenCount;
    blueDot.innerHTML = blueCount;
    brownDot.innerHTML = brownCount
}

function trackCards(){
    countStageCards(cardDeck[2], 0)
    countStageCards(cardDeck[1], 1)
    countStageCards(cardDeck[0], 2)
}

function shuffleCards(){
    lastCard.style.backgroundImage = ''
    createDeck();
    deckContainer.innerHTML = ''
    deckContainer.append(deck)
    deckContainer.append(lastCard)    
    trackCards()
}

function switchCard(){
    let card = {}
    if (cardDeck[2].length > 0){
        card = getRandomCard(cardDeck[2])
        cardDeck[2] = cardDeck[2].filter(val => val !== card)
        lastCard.style.backgroundImage = `url(${card.cardFace})`
    }else if (cardDeck[1].length > 0 && cardDeck[2].length === 0){
        card = getRandomCard(cardDeck[1])
        cardDeck[1] = cardDeck[1].filter(val => val !== card)
        lastCard.style.backgroundImage = `url(${card.cardFace})`
    } else if (cardDeck[0].length > 0 && cardDeck[1].length === 0){
        card = getRandomCard(cardDeck[0])
        cardDeck[0] = cardDeck[0].filter(val => val !== card)
        lastCard.style.backgroundImage = `url(${card.cardFace})`
    } else if (cardDeck[0].length === 0) {
        deck.style.display = 'none'
    }
    trackCards()
}

function unpackCards(stage){
    let arr = []
    for (let val of stage){
        arr.push(...val)
    }
    return arr
}

function filterOneDeck (deck, stageArr, ind){
    for (let i = 0; i < stageArr[ind].length; i++){
        deck = deck.filter(val=> val !== stageArr[ind][i]) 
    }
    return deck
}

function getRandomCard(array){
    return array[getRandomInd(array.length)]
}

function getCardArray(cardsArray, amount) {
    let colorArray = [];
    let filteredCards = cardsArray;
    for (let i = 0; i < amount; i++){
        let randomCard = getRandomCard(filteredCards)
        colorArray.push(randomCard);
        filteredCards = filteredCards.filter( val => val !== randomCard);
    }
    return colorArray
}