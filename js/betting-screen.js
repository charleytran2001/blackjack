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

    // Checks for game over
    gameover();
}