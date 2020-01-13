// Variables
var money = 500;
var currentBet = 0;
var user_hand_total;
var user_hand;
var dealer_hand_total;
var dealer_hand;
var user_card_counter;
var dealer_card_counter;

// Betting code
document.getElementById("money").innerHTML = "Money: $" + money;
document.getElementById("betOutput").innerHTML = "Bet: $" + bet.value;

bet.oninput = function() {
  document.getElementById("betOutput").innerHTML = "Bet: $" + this.value;
}

document.getElementById("bet").max = money;

function start() {
  // Reset Variables
  user_hand_total = 0;
  user_hand = [];
  dealer_hand_total = 0;
  dealer_hand = [];
  charlie_counter = 0;
  user_card_counter = 0;
  dealer_card_counter = 0;
  
  document.getElementById("status").innerHTML = "Welcome to Blackjack";
  
  // Bet
  currentBet = document.getElementById("bet").value;
  money -= currentBet;
  document.getElementById("money").innerHTML = "Money: $" + money;
  document.getElementById("currentBetOutput").innerHTML = "Currently Betting: $" + currentBet;

  starting_hand();
}

function starting_hand() {
  // Hides buttons
  document.getElementById("hit").hidden = false;
  document.getElementById("stand").hidden = false;
  document.getElementById("double").hidden = false;
  document.getElementById("surrender").hidden = false;
  document.getElementById("start").hidden = true;
  document.getElementById("currentBetOutput").hidden = false;
  document.getElementById("betOutput").hidden = true;
  document.getElementById("bet").hidden = true;
  
  // Disables double down if user doesn't have enough money
  if(money < currentBet) {
    document.getElementById("double").disabled = true;
  }
  
  // User's starting hand
  while(user_card_counter < 2) {
    hit();
  }
  
  // Dealer's starting hand
  while(dealer_card_counter < 2) {
    dealer();
  }
  
  // Hides dealer's second card
  document.getElementById("dealer_hand").innerHTML = "Dealer's Hand: " + dealer_hand[0] + ",?";
  document.getElementById("dealer_hand_total").innerHTML = "Total: " + dealer_hand[0];
  
//   if(dealer_hand[0] === (10 || 11)) {
//     document.getElementById("insurance").disabled = false;
//   }
  
}

function dealer() {
  // Generates dealer's hand
  var dealer_random = Math.floor(Math.random() * 10 + 1);
  dealer_hand_total += dealer_random;
  dealer_hand[dealer_card_counter] = dealer_random;
  
  // Debug
//   dealer_hand = [10,11];
//   dealer_hand_total = 20;
//   user_card_counter = 2;
  
  document.getElementById("dealer_hand").innerHTML = "Dealer's Hand: " + dealer_hand;
  document.getElementById("dealer_hand_total").innerHTML = "Total: " + dealer_hand_total;
  
  // Counter
  dealer_card_counter++;
}

function dealerReveal() {
  // Runs until dealer's hand is 17 or more
  while(dealer_hand_total < 17) {
    dealer();
  }
  
  // Reveals dealer's second card if over 17
  if(dealer_hand_total >= 17) {
    document.getElementById("dealer_hand").innerHTML = "Dealer's Hand: " + dealer_hand;
    document.getElementById("dealer_hand_total").innerHTML = "Total: " + dealer_hand_total;
  }
  
}

function hit() {
  // Disables surrender
  if(user_card_counter >= 2) {
    document.getElementById("surrender").disabled = true;
  }
  
  // Generates random number for user's hand
  var user_random = Math.floor(Math.random() * 10 + 1);
  user_hand_total += user_random;
  user_hand[user_card_counter] = user_random;
  
  // Debug
//   user_hand = [10,10,1];
//   user_hand_total = 21;
//   user_card_counter = 3;
  
  document.getElementById("user_hand").innerHTML = "Your Hand: " + user_hand;
  document.getElementById("user_hand_total").innerHTML = "Total: " + user_hand_total;
  
  // Counters
  user_card_counter++;
  
  // Checks for 21
  if(user_hand_total === 21) {
    stand();
  }
  
  // Checks for bust
  if(user_hand_total > 21) {
    stand();
  }
  
  // Checks for Charlie
  if(user_card_counter === 6 && user_hand_total <= 21) {
    stand();
  }
  
}

function stand() { 
  // Checks for Blackjack
  dealerReveal();
  if(user_hand_total === 21 && user_card_counter === 2 && dealer_hand_total === 21 && dealer_card_counter === 2) {
    document.getElementById("status").innerHTML = "Double Blackjack: Tie";
    money += currentBet * 1;
    document.getElementById("money").innerHTML = "Money: $" + money;
    reset();
  } else if(user_hand_total === 21 && user_card_counter === 2) {
      document.getElementById("status").innerHTML = "Blackjack: You Win";
      money += currentBet * 2.5;
      document.getElementById("money").innerHTML = "Money: $" + money;
      reset();
  } else if(dealer_hand_total === 21 && dealer_card_counter === 2) {
      document.getElementById("status").innerHTML = "Dealer Blackjack: You Lose";
      reset();
    
  // Checks for Charlie
  } else if(user_card_counter === 6 && user_hand_total <= 21 && dealer_card_counter === 6 && dealer_hand_total <= 21) {
      if(user_hand_total === dealer_hand_total) {
        document.getElementById("status").innerHTML = "Double 6-Card Charlie: Tie";
        money += currentBet * 1;
        document.getElementById("money").innerHTML = "Money: $" + money;
        reset();
      } else if(user_hand_total > dealer_hand_total) {
        document.getElementById("status").innerHTML = "Double 6-Card Charlie - You Have The Larger Hand: You Win";
        money += currentBet * 2;
        document.getElementById("money").innerHTML = "Money: $" + money;
        reset();
      } else if(dealer_hand_total > user_hand_total) {
        document.getElementById("status").innerHTML = "Double 6-Card Charlie - The Dealer Has The Larger Hand: You Lose";
        document.getElementById("money").innerHTML = "Money: $" + money;
        reset();
      }
  } else if(user_card_counter === 6 && user_hand_total <= 21) {
      document.getElementById("status").innerHTML = "6-Card Charlie: You Win";
      money += currentBet * 2;
      document.getElementById("money").innerHTML = "Money: $" + money;
      reset();
  } else if(dealer_card_counter === 6 && dealer_hand_total <= 21) {
      document.getElementById("status").innerHTML = "Dealer 6-Card Charlie: You Lose";
      document.getElementById("money").innerHTML = "Money: $" + money;
      reset();
    
  // Checks if user busted
  } else if(user_hand_total > 21) {
      document.getElementById("status").innerHTML = "Bust: You Lose";
      reset();
    
  // Checks if dealer busted
  } else if(dealer_hand_total > 21) {
      document.getElementById("status").innerHTML = "Dealer Bust: You Win";
      money += currentBet * 2;
      document.getElementById("money").innerHTML = "Money: $" + money;
      reset();
    
  // Checks for victor
  } else if(user_hand_total > dealer_hand_total) {
      document.getElementById("status").innerHTML = "You Win";
      money += currentBet * 2;
      document.getElementById("money").innerHTML = "Money: $" + money;
      reset();
  } else if(user_hand_total < dealer_hand_total) {
      document.getElementById("status").innerHTML = "You Lose";
      document.getElementById("money").innerHTML = "Money: $" + money;
      reset();
  } else {
    document.getElementById("status").innerHTML = "It's a Tie";
    money += currentBet * 1;
    document.getElementById("money").innerHTML = "Money: $" + money;
    reset();
  }
  
  // Old Code
//   // Checks if dealer's hand goes over 21. If so, subtracts one card.
//   var dealer_remove = dealer_hand[dealer_card_counter - 1];
//   if(dealer_hand_total > 21) {
//     dealer_hand_total_bust = dealer_hand_total;
//     dealer_hand_total -= dealer_remove;
//     dealer_hand.pop();
//     document.getElementById("dealer_hand").innerHTML = "Dealer's Hand: " + dealer_hand + " || " + dealer_remove;
//     document.getElementById("dealer_hand_total").innerHTML = "Total: " + dealer_hand_total + " || " + dealer_hand_total_bust;
//   }
 
  // Debug
//   console.log("Dealer" + dealer_hand);
//   console.log(dealer_hand_total);
//   console.log(dealer_card_counter);
  
//   console.log("User" + user_hand);
//   console.log(user_hand_total);
//   console.log(user_card_counter);

}

function double() {
  // Doubles bet
  money -= currentBet;
  currentBet *= 2;
  document.getElementById("money").innerHTML = "Money: $" + money;
  document.getElementById("currentBetOutput").innerHTML = "Currently Betting: $" + currentBet;
  hit();
  stand();
}

function surrender() {
  // Lose half the initial wager
  dealerReveal();
  document.getElementById("status").innerHTML = "Surrendered";
  money += currentBet * 0.5;
  document.getElementById("money").innerHTML = "Money: $" + money;
  reset();
}

function reset() {
  // Resets bet
  currentBet = 0;
  document.getElementById("currentBetOutput").innerHTML = "Currently Betting: $" + currentBet;
  document.getElementById("bet").max = money;
  
  // Disables/Enables buttons
  document.getElementById("hit").hidden = true;
  document.getElementById("stand").hidden = true;
  document.getElementById("double").hidden = true;
  document.getElementById("double").disabled = false;
  document.getElementById("start").hidden = false;
  document.getElementById("currentBetOutput").hidden = true;
  document.getElementById("betOutput").hidden = false;
  document.getElementById("bet").hidden = false;
  document.getElementById("surrender").hidden = true;
  document.getElementById("surrender").disabled = false;
  
  // Game over message
  if(money <= 0) {
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
    switch(deathmessage) {
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