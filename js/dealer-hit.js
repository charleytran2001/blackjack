// Generates dealer's hand
function dealerHit() {
    // var dealerRandom = Math.floor(Math.random() * cardsInDeck);
    var dealerRandom = Math.floor(Math.random() * 1);
    console.log(dealerRandom);
    var cardValue = deck[dealerRandom].face;

    if (cardValue === "A") {
        dealerHand[dealerCardCounter] = deck[dealerRandom].suit + " " + deck[dealerRandom].face;
        dealerSoftHandTotal += 11;
        if (dealerSoftHandTotal > 21) {
            dealerSoftHandTotal -= 10;
        }
        dealerHardHandTotal += 1;
        deck.splice(dealerRandom, 1);
      
        // Insurance
        if (dealerCardCounter === 0) {
            document.getElementById("insurance").hidden = false;
        }
    } else if (cardValue === "J" || cardValue === "Q" || cardValue === "K") {
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
    if (dealerSoftHandTotal > 21) {
        dealerComparisonTotal = dealerHardHandTotal;
    }

    // Counter
    dealerCardCounter++;
    cardsInDeck--;

    // document.getElementById("dealerHardHandTotal").innerHTML = "Total: " + dealerHardHandTotal;
    // document.getElementById("dealerSoftHandTotal").innerHTML = "Soft Total: " + dealerSoftHandTotal;
    document.getElementById("dealerComparisonTotal").innerHTML = "Total: ?";
}