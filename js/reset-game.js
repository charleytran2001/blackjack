// Reset Function
function resetGame() {
    // Hides and unhides elements when game starts
    document.getElementById("start").hidden = true;
    document.getElementById("betOutput").hidden = true;
    document.getElementById("bet").hidden = true;
    document.getElementById("money").hidden = true;
    document.getElementById("hit").hidden = false;
    document.getElementById("stand").hidden = false;
    document.getElementById("insurance").disabled = false;
    document.getElementById("surrender").hidden = false;
    document.getElementById("double").hidden = false;
    document.getElementById("surrender").disabled = false;
    document.getElementById("double").disabled = false;
    document.getElementById("userHand").hidden = false;
    document.getElementById("userComparisonTotal").hidden = false;
    document.getElementById("dealerHand").hidden = false;
    document.getElementById("dealerComparisonTotal").hidden = false;
    document.getElementById("currentBetOutput").hidden = false;
    document.getElementById("status").hidden = false;
    document.getElementById("status").innerHTML = "";

    // Bet
    currentBet = document.getElementById("bet").value;
    money -= currentBet;
    document.getElementById("money").innerHTML = "Money: $" + money;
    document.getElementById("currentBetOutput").innerHTML = "Currently Betting: $" + currentBet;

    // Resets variables
    // Deck variables
    deck = [];
    cardsInDeck = 52;

    // User hand variables
    userHand = [];
    userSoftHandTotal = 0;
    userHardHandTotal = 0;
    userComparisonTotal = 0;
    userCardCounter = 0;

    // Dealer hand variables
    dealerHand = [];
    dealerSoftHandTotal = 0;
    dealerHardHandTotal = 0;
    dealerComparisonTotal = 0;
    dealerCardCounter = 0;

    // Creates a new deck and hits twice for the user and dealer
    newDeck();
    hit();
    hit();
    dealerHit();
    dealerHit();

    // Disables double down if user doesn't have enough money
    if (money < currentBet) {
        document.getElementById("double").disabled = true;
    }

    // Hides dealer's second card
    document.getElementById("dealerHand").innerHTML = "Dealer's Hand: " + dealerHand[0] + ", ?";
  
}