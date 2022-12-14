const newDeckBtn = document.getElementById('new-deck')
const drawBtn = document.getElementById('draw-cards')
const cardsContainer = document.getElementById('cards')
const header = document.getElementById('header')
const remainingCards = document.getElementById('remaining-cards')

let card1score = 0
let card2score = 0
let deckId =''

let handleClick = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            remainingCards.innerText = 52
            })
}

function cardToNumber(card){
    let value =''
    switch(card.value){
       case "JACK":
           value = 11;
           break
       case "QUEEN":
           value= 12;
           break
       case "KING":
           value = 13;
           break
       case "ACE":
           value = 14;
           break
       default:
       value = Number(card.value)
}
return value
}

function highest(card1, card2){
   let value1 = cardToNumber(card1)
   let value2 = cardToNumber(card2)
   if(value1 < value2){
        card2score++
        document.getElementById('card-two-score').innerText = card2score
        return "You Win"
    } else if(value1 > value2){
        card1score++
        document.getElementById('card-one-score').innerText = card1score
        return "Computer Wins"
    }  else {
        return "It's a tie"
    }      
}

function drawCard(){
    if(deckId){
        
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            let card1 = data.cards[0]
            cardsContainer.children[2].innerHTML =`<img class="card-image"src='${card1.image}'>`
            let card2 = data.cards[1]
            cardsContainer.children[3].innerHTML =`<img class="card-image"src='${card2.image}'>`
            header.innerText = highest(card1,card2)

            
            remainingCards.innerText = data.remaining
          

            if (data.remaining === 0) {
                drawBtn.disabled = true
                if(card2score > card1score){
                    header.innerText = 'Game Over - You Win'
                } else if(card2score < card1score){
                    header.innerText = 'Game Over - The Computer Wins'
                }  else {
                    return "Game Over - It's a tie"
                } 
            }
          
        })
                
    } else {
        alert("Please press 'New Deck' before drawing cards for the first time 🙂")
    }

}


newDeckBtn.addEventListener('click', handleClick)
drawBtn.addEventListener('click',drawCard)






