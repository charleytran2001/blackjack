// Variables
  var user_hand_total;
  var user_hand;
  var dealer_hand_total;
  var dealer_hand;
  var charlie_counter;
  var user_card_counter;
  var dealer_card_counter;

function reset() {
  // Reset Variables
  user_hand_total = 0;
  user_hand = [];
  dealer_hand_total = 0;
  dealer_hand = [];
  charlie_counter = 0;
  user_card_counter = 0;
  dealer_card_counter = 0;
  
  document.getElementById("status").innerHTML = "Welcome to Blackjack";

  starting_hand();
}

function starting_hand() {
  document.getElementById("reset").innerHTML = "Reset";
  document.getElementById("hit").disabled = false;
  document.getElementById("stand").disabled = false;
  document.getElementById("reset").disabled = true;
  
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
  
  if(user_hand_total === 21) {
    stand();
  }
}

function hit() {
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
  charlie_counter++;
  user_card_counter++;
  
  // Checks for stuff
  if(user_hand_total > 21) {
    stand();
    document.getElementById("status").innerHTML = "Bust: You Lose";
  }
  
  if(user_hand_total === 21 && dealer_card_counter >= 2) {
    stand();
  }
  
  if(charlie_counter === 6 && user_hand_total <= 21) {
    stand();
    document.getElementById("status").innerHTML = "6-Card Charlie: You Win";
  } 
  
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

function stand() {
  // Runs until dealer's hand is 17 or more
  while(dealer_hand_total < 17) {
    dealer();
  }
  
  // Reveals dealer's second card if over 17
  if(dealer_hand_total >= 17) {
    document.getElementById("dealer_hand").innerHTML = "Dealer's Hand: " + dealer_hand;
    document.getElementById("dealer_hand_total").innerHTML = "Total: " + dealer_hand_total;
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
  
  // Checks for victor
  if(user_hand_total > dealer_hand_total) {
    document.getElementById("status").innerHTML = "You Win";
  } else if(user_hand_total < dealer_hand_total) {
    document.getElementById("status").innerHTML = "You Lose";
  } else {
    document.getElementById("status").innerHTML = "It's a Tie";
  }
  
  // Checks if dealer's hand goes over 21
  if(dealer_hand_total > 21) {
    document.getElementById("status").innerHTML = "Dealer Bust: You Win";
  }
  
  // Checks for Blackjack
  if(user_hand_total === 21 && user_card_counter === 2 && dealer_hand_total === 21 && dealer_card_counter === 2) {
    document.getElementById("status").innerHTML = "Double Blackjack: Tie";
  } else if(user_hand_total === 21 && user_card_counter === 2) {
    document.getElementById("status").innerHTML = "Blackjack: You Win";
  } else if(dealer_hand_total === 21 && dealer_card_counter === 2) {
    document.getElementById("status").innerHTML = "Dealer Blackjack: You Lose";
  } 
  
  // Disables/Enables buttons
  document.getElementById("hit").disabled = true;
  document.getElementById("stand").disabled = true;
  document.getElementById("reset").disabled = false;
  
  // Debug
//   console.log("Dealer" + dealer_hand);
//   console.log(dealer_hand_total);
//   console.log(dealer_card_counter);
  
//   console.log("User" + user_hand);
//   console.log(user_hand_total);
//   console.log(user_card_counter);
  
}
