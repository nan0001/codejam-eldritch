const ancientCards = document.querySelectorAll('.ancient-card');
let activeAncient = {};

import ancientsData from './data/ancients.js';

for (let i = 0; i < ancientCards.length; i++){
    ancientCards[i].style.backgroundImage = `url(${ancientsData[i].cardFace})`
}

import brownCards from './data/mythicCards/brown/index.js';
import blueCards from './data/mythicCards/blue/index.js';
import greenCards from './data/mythicCards/green/index.js';

const cards = {
    brownCards,
    blueCards,
    greenCards
}

ancientCards.forEach((val)=>{
    val.addEventListener('click',() => {
        toggleActive(val);
        findActiveAncient();
        console.log(activeAncient)
    })
})

function toggleActive(val){
    if (val.classList.contains('active')){
        return
    }
    else{
        ancientCards.forEach((value)=>{
            value.classList.remove('active')
        })
        val.classList.add('active')
    }
}

function getRandomInd(max) {
    const num = Math.floor(Math.random() * (max + 1));
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