// Insurance
function insurance() {
    // document.getElementById("start").hidden = false;
    document.getElementById("betOutput").hidden = false;
    document.getElementById("bet").hidden = false;
    document.getElementById("money").hidden = false;
    document.getElementById("insurance").disabled = true;
    document.getElementById("take-insurance").hidden = false;
    document.getElementById("cancel-insurance").hidden = false;
    // document.getElementById("continue").hidden = true;
    // document.getElementById("userHand").hidden = true;
    // document.getElementById("userComparisonTotal").hidden = true;
    // document.getElementById("dealerHand").hidden = true;
    // document.getElementById("dealerComparisonTotal").hidden = true;
    // document.getElementById("status").hidden = true;

    // Betting code
    document.getElementById("money").innerHTML = "Money: $" + money;
    document.getElementById("betOutput").innerHTML = "Insurance: $" + bet.value;

    bet.oninput = function () {
        document.getElementById("betOutput").innerHTML = "Insurance: $" + this.value;     
    }

    document.getElementById("bet").max = money;
}

function cancelInsurance() {
    document.getElementById("betOutput").hidden = true;
    document.getElementById("bet").hidden = true;
    document.getElementById("money").hidden = true;
    document.getElementById("insurance").disabled = false;
    document.getElementById("take-insurance").hidden = true;
    document.getElementById("cancel-insurance").hidden = true;
}