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