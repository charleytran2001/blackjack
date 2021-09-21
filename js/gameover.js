// Game over message
function gameover() {
    if (money <= 0) {
        document.getElementById("hit").hidden = true;
        document.getElementById("stand").hidden = true;
        document.getElementById("start").hidden = true;
        document.getElementById("double").hidden = true;
        document.getElementById("insurance").hidden = true;
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
            case 7:
                document.getElementById("gameover").innerHTML = "You brought great dishonor to your family and committed sudoku. You died. THE END";
                break;
        }
        //     document.getElementById("status").innerHTML = " You died. THE END";
        //     document.getElementById("status").innerHTML = " You died. THE END";
        //     document.getElementById("status").innerHTML = " You died. THE END";
        //     document.getElementById("status").innerHTML = " You died. THE END";
    }
}