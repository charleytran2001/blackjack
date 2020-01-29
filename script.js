// Variables
var deck;
var cardsInDeck;

var userHand;
var userSoftHandTotal;
var userHardHandTotal;
var userComparisonTotal;
var userCardCounter;

var dealerHand;
var dealerSoftHandTotal;
var dealerHardHandTotal;
var dealerComparisonTotal;
var dealerCardCounter;

// Card Generator
function newDeck() {
  var suit = ["♠", "♥", "♣", "♦"];
  var face = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  var cardCounter = 0;

  for(var i = 0; i < suit.length; i++) {
    for(var j = 0; j < face.length; j++) {
      var card = {
        suit: suit[i],
        face: face[j]
      }
      deck[cardCounter] = card;
      cardCounter++;
    }
  }
}

// Generates random card for user's hand
function hit() {
  var userRandom = Math.floor(Math.random() * cardsInDeck);
  var cardValue = deck[userRandom].face;
  if(cardValue === "A") {
    userHand[userCardCounter] = deck[userRandom].suit + " " + deck[userRandom].face;
    userSoftHandTotal += 11;
    userHardHandTotal += 1;
    deck.splice(userRandom, 1);
  } else if(cardValue === "J" || cardValue === "Q" || cardValue === "K") {
    userHand[userCardCounter] = deck[userRandom].suit + " " + deck[userRandom].face;
    userSoftHandTotal += 10;
    userHardHandTotal += 10;
    deck.splice(userRandom, 1);
  } else {
    userHand[userCardCounter] = deck[userRandom].suit + " " + deck[userRandom].face;
    userSoftHandTotal += cardValue;
    userHardHandTotal += cardValue;
    deck.splice(userRandom, 1);
  }
  
  // User Comparison
  userComparisonTotal = userSoftHandTotal;
  if(userSoftHandTotal > 21) {
    userComparisonTotal = userHardHandTotal;
  }
  
  // Counters
  userCardCounter++;
  cardsInDeck--;
  
  document.getElementById("userHand").innerHTML = "Your Hand: " + userHand;
  document.getElementById("userHardHandTotal").innerHTML = "Total: " + userHardHandTotal;
  document.getElementById("userSoftHandTotal").innerHTML = "Soft Total: " + userSoftHandTotal;
  document.getElementById("userComparisonTotal").innerHTML = "Comparison Total: " + userComparisonTotal;
}

// Generates dealer's hand
function dealerHit() {
  var dealerRandom = Math.floor(Math.random() * 52);
  var cardValue = deck[dealerRandom].face;
  
  if(cardValue === "A") {
    dealerHand[dealerCardCounter] = deck[dealerRandom].suit + " " + deck[dealerRandom].face;
    document.getElementById("dealerSoftHandTotal").hidden = false;
    dealerSoftHandTotal += 11;
    dealerHardHandTotal += 1;
    deck.splice(dealerRandom, 1);
  } else if(cardValue === "J" || cardValue === "Q" || cardValue === "K") {
    dealerHand[dealerCardCounter] = deck[dealerRandom].suit + " " + deck[dealerRandom].face;
    dealerSoftHandTotal += 10;
    dealerHardHandTotal += 10;
    deck.splice(dealerRandom, 1);
  } else {
    dealerHand[dealerCardCounter] = deck[dealerRandom].suit + " " + deck[dealerRandom].face;
    dealerSoftHandTotal += cardValue;
    dealerHardHandTotal += cardValue;
    deck.splice(dealerRandom, 1);
  }
  
  // Dealer Comparison
  dealerComparisonTotal = dealerSoftHandTotal;
  if(dealerSoftHandTotal > 21) {
    dealerComparisonTotal = dealerHardHandTotal;
  }
  
  // Counter
  dealerCardCounter++;
  cardsInDeck--;
  
  document.getElementById("dealerHand").innerHTML = "Dealer's Hand: " + dealerHand;
  document.getElementById("dealerHardHandTotal").innerHTML = "Total: " + dealerHardHandTotal;
  document.getElementById("dealerSoftHandTotal").innerHTML = "Soft Total: " + dealerSoftHandTotal;  
  document.getElementById("dealerComparisonTotal").innerHTML = "Comparison Total: " + dealerComparisonTotal;
}

function reset() {
  deck = [];
  cardsInDeck = 52;
  
  userHand = [];
  userSoftHandTotal = 0;
  userHardHandTotal = 0;
  userComparisonTotal = 0;
  userCardCounter = 0;
  
  dealerHand = [];
  dealerSoftHandTotal = 0;
  dealerHardHandTotal = 0;
  dealerComparisonTotal = 0;
  dealerCardCounter = 0;
  
  newDeck();
  hit();
  hit();
  dealerHit();
  dealerHit();
}

reset();

// Hides dealer's second card
document.getElementById("dealerHand").innerHTML = "Dealer's Hand: " + dealerHand[0] + ",?";