// Variables
var money = 50;
var currentBet = 0;

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
    var suit = ["♠", "♡", "♣", "♢"];
    var face = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    var cardCounter = 0;

    for (var i = 0; i < suit.length; i++) {
        for (var j = 0; j < face.length; j++) {
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
    if (cardValue === "A") {
        userHand[userCardCounter] = deck[userRandom].suit + " " + deck[userRandom].face;
        userSoftHandTotal += 11;
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

    // Disables surrender and double down if card count goes over 2
    if (userCardCounter > 2) {
        document.getElementById("surrender").disabled = true;
        document.getElementById("double").disabled = true;
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

// Generates dealer's hand
function dealerHit() {
    var dealerRandom = Math.floor(Math.random() * cardsInDeck);
    var cardValue = deck[dealerRandom].face;

    if (cardValue === "A") {
        dealerHand[dealerCardCounter] = deck[dealerRandom].suit + " " + deck[dealerRandom].face;
        dealerSoftHandTotal += 11;
        dealerHardHandTotal += 1;
        deck.splice(dealerRandom, 1);
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

// Stand Function
function stand() {
    document.getElementById("hit").hidden = true;
    document.getElementById("stand").hidden = true;
    document.getElementById("surrender").hidden = true;
    document.getElementById("double").hidden = true;
    document.getElementById("continue").hidden = false;
    document.getElementById("currentBetOutput").hidden = true;

    // Runs until dealer's hand is 17 or more
    while (dealerComparisonTotal < 17) {
        dealerHit();
    }

    // Reveals dealer's second card if over 17
    if (dealerComparisonTotal >= 17) {
        document.getElementById("dealerHand").innerHTML = "Dealer's Hand: " + dealerHand;
        // document.getElementById("dealerHardHandTotal").innerHTML = "Total: " + dealerHardHandTotal;
        // document.getElementById("dealerSoftHandTotal").innerHTML = "Soft Total: " + dealerSoftHandTotal;
        document.getElementById("dealerComparisonTotal").innerHTML = "Total: " + dealerComparisonTotal;
    }

    // Checks for Blackjack
    if (userComparisonTotal === 21 && userCardCounter === 2 && dealerComparisonTotal === 21 && dealerCardCounter === 2) {
        document.getElementById("status").innerHTML = "Double Blackjack: Tie";
        money += currentBet * 1;
        document.getElementById("money").innerHTML = "Money: $" + money;
    } else if (userComparisonTotal === 21 && userCardCounter === 2) {
        document.getElementById("status").innerHTML = "Blackjack: You Win";
        money += currentBet * 2.5;
        document.getElementById("money").innerHTML = "Money: $" + money;
    } else if (dealerComparisonTotal === 21 && dealerCardCounter === 2) {
        document.getElementById("status").innerHTML = "Dealer Blackjack: You Lose";

        // Checks for Charlie
    } else if (userCardCounter === 6 && userComparisonTotal <= 21 && dealerCardCounter === 6 && dealerComparisonTotal <= 21) {
        if (userComparisonTotal === dealerComparisonTotal) {
            document.getElementById("status").innerHTML = "Double 6-Card Charlie: Tie";
            money += currentBet * 1;
            document.getElementById("money").innerHTML = "Money: $" + money;
        } else if (userComparisonTotal > dealerComparisonTotal) {
            document.getElementById("status").innerHTML = "Double 6-Card Charlie - You Have The Larger Hand: You Win";
            money += currentBet * 2;
            document.getElementById("money").innerHTML = "Money: $" + money;
        } else if (dealerComparisonTotal > userComparisonTotal) {
            document.getElementById("status").innerHTML = "Double 6-Card Charlie - The Dealer Has The Larger Hand: You Lose";
            document.getElementById("money").innerHTML = "Money: $" + money;
        }
    } else if (userCardCounter === 6 && userComparisonTotal <= 21) {
        document.getElementById("status").innerHTML = "6-Card Charlie: You Win";
        money += currentBet * 2;
        document.getElementById("money").innerHTML = "Money: $" + money;
    } else if (dealerCardCounter === 6 && dealerComparisonTotal <= 21) {
        document.getElementById("status").innerHTML = "Dealer 6-Card Charlie: You Lose";
        document.getElementById("money").innerHTML = "Money: $" + money;

        // Checks if user busted
    } else if (userComparisonTotal > 21) {
        document.getElementById("status").innerHTML = "Bust: You Lose";

        // Checks if dealer busted
    } else if (dealerComparisonTotal > 21) {
        document.getElementById("status").innerHTML = "Dealer Bust: You Win";
        money += currentBet * 2;
        document.getElementById("money").innerHTML = "Money: $" + money;

        // Checks for victor
    } else if (userComparisonTotal > dealerComparisonTotal) {
        document.getElementById("status").innerHTML = "You Win";
        money += currentBet * 2;
        document.getElementById("money").innerHTML = "Money: $" + money;
    } else if (userComparisonTotal < dealerComparisonTotal) {
        document.getElementById("status").innerHTML = "You Lose";
        document.getElementById("money").innerHTML = "Money: $" + money;
    } else {
        document.getElementById("status").innerHTML = "It's a Tie";
        money += currentBet * 1;
        document.getElementById("money").innerHTML = "Money: $" + money;
    }

}

// Double Down
function double() {
    // Doubles bet
    money -= currentBet;
    currentBet *= 2;
    document.getElementById("money").innerHTML = "Money: $" + money;
    document.getElementById("currentBetOutput").innerHTML = "Currently Betting: $" + currentBet;
    hit();
    stand();
}

// Surrender
function surrender() {
    document.getElementById("hit").hidden = true;
    document.getElementById("stand").hidden = true;
    document.getElementById("surrender").hidden = true;
    document.getElementById("double").hidden = true;
    document.getElementById("continue").hidden = false;
    document.getElementById("currentBetOutput").hidden = true;
    // Lose half the initial wager
    document.getElementById("status").innerHTML = "Surrendered";
    money += currentBet * 0.5;
    document.getElementById("money").innerHTML = "Money: $" + money;
}



// Reset Function
function reset() {
    // Hides and unhides elements when game starts
    document.getElementById("start").hidden = true;
    document.getElementById("betOutput").hidden = true;
    document.getElementById("bet").hidden = true;
    document.getElementById("money").hidden = true;
    document.getElementById("hit").hidden = false;
    document.getElementById("stand").hidden = false;
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

// Starts the game
bettingScreen();

// Loads betting screen
function bettingScreen() {
    document.getElementById("start").hidden = false;
    document.getElementById("betOutput").hidden = false;
    document.getElementById("bet").hidden = false;
    document.getElementById("money").hidden = false;
    document.getElementById("continue").hidden = true;
    document.getElementById("userHand").hidden = true;
    document.getElementById("userComparisonTotal").hidden = true;
    document.getElementById("dealerHand").hidden = true;
    document.getElementById("dealerComparisonTotal").hidden = true;
    document.getElementById("status").hidden = true;

    // Betting code
    document.getElementById("money").innerHTML = "Money: $" + money;
    document.getElementById("betOutput").innerHTML = "Bet: $" + bet.value;

    bet.oninput = function () {
        document.getElementById("betOutput").innerHTML = "Bet: $" + this.value;     
    }

    document.getElementById("bet").max = money;

    // Game over message
    if (money <= 0) {
        document.getElementById("hit").hidden = true;
        document.getElementById("stand").hidden = true;
        document.getElementById("start").hidden = true;
        document.getElementById("double").hidden = true;
        document.getElementById("surrender").hidden = true;
        document.getElementById("betOutput").hidden = true;
        document.getElementById("bet").hidden = true;
        document.getElementById("currentBetOutput").hidden = true;
        document.getElementById("status").innerHTML = "You ran out of money";

        var deathmessage = Math.floor(Math.random() * 5 + 1);
        switch (deathmessage) {
            case 1:
                document.getElementById("gameover").innerHTML = "Ashamed of yourself, you went home and commited toaster bath. You died. THE END";
                break;
            case 2:
                document.getElementById("gameover").innerHTML = "The dealer shoots you for losing. You died. THE END";
                break;
            case 3:
                document.getElementById("gameover").innerHTML = "You smoke a cig to relieve the stress of wasting all your savings on Blackjack. Unfortunately for you, you got lung cancer and died. THE END";
                break;
            case 4:
                document.getElementById("gameover").innerHTML = "You tripped on your way out of the casino and snapped your neck. You died. THE END";
                break;
            case 5:
                document.getElementById("gameover").innerHTML = "As you were walking out of the casino, a meteor hits you. You died. THE END";
                break;
            case 6:
                document.getElementById("gameover").innerHTML = "You second you got into your car to leave, it blew up. You died. THE END";
                break;
        }
        //     document.getElementById("status").innerHTML = " You died. THE END";
        //     document.getElementById("status").innerHTML = " You died. THE END";
        //     document.getElementById("status").innerHTML = " You died. THE END";
        //     document.getElementById("status").innerHTML = " You died. THE END";
    }
}