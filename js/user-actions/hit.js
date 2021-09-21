// Generates random card for user's hand
function hit() {
    var userRandom = Math.floor(Math.random() * cardsInDeck);
    var cardValue = deck[userRandom].face;
    if (cardValue === "A") {
        userHand[userCardCounter] = deck[userRandom].suit + " " + deck[userRandom].face;
        userSoftHandTotal += 11;
        if (userSoftHandTotal > 21) {
            userSoftHandTotal -= 10;
        }
        userHardHandTotal += 1;
        deck.splice(userRandom, 1);
    } else if (cardValue === "J" || cardValue === "Q" || cardValue === "K") {
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

    // Disables surrender, double down, and insurance if card count goes over 2
    if (userCardCounter >= 2) {
        document.getElementById("surrender").disabled = true;
        document.getElementById("double").disabled = true;
        document.getElementById("insurance").disabled = true;
    }

    // User Comparison
    userComparisonTotal = userSoftHandTotal;
    if (userSoftHandTotal > 21) {
        userComparisonTotal = userHardHandTotal;
    }

    // Counters
    userCardCounter++;
    cardsInDeck--;

    document.getElementById("userHand").innerHTML = "Your Hand: " + userHand;
    // document.getElementById("userHardHandTotal").innerHTML = "Total: " + userHardHandTotal;
    // document.getElementById("userSoftHandTotal").innerHTML = "Soft Total: " + userSoftHandTotal;
    document.getElementById("userComparisonTotal").innerHTML = "Total: " + userComparisonTotal;

    // // Checks for 21
    // if (user_hand_total === 21) {
    //   stand();
    // }

    // Checks for bust
    if (userComparisonTotal > 21) {
        stand();
    }

    // Checks for Charlie
    if (userCardCounter === 6 && userComparisonTotal <= 21) {
        stand();
    }

}