// Variables
var userSoftHandTotal = 0;
var userHardHandTotal = 0;

// Card Generator
var suit = ["Spade", "Clover", "Heart", "Diamond"];
var face = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var deck = [];
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

// Generates random card for user's hand
  var userRandom = Math.floor(Math.random() * 52);
  var cardValue = deck[userRandom].face;
  console.log(cardValue);
  if(cardValue === "Ace") {
    userSoftHandTotal += 1;
    userHardHandTotal += 11;
  } else if(cardValue === "Jack" || cardValue === "Queen" || cardValue === "King") {
    userSoftHandTotal += 10;
    userHardHandTotal += 10;
  } else {
    userSoftHandTotal += cardValue;
    userHardHandTotal += cardValue;
  }

console.log(userSoftHandTotal + " " + userHardHandTotal);