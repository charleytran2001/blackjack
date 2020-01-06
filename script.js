var user_hand_total = 0;
var user_hand = [];
var dealer_hand_total = 0;
var dealer_hand = [];
var charlie_counter = 0;
var user_card_counter = 0;
var dealer_card_counter = 0;

starting_hand();

function starting_hand() {
  // User's starting hand
  while(user_card_counter < 2) {
    hit();
  }
  
  // Dealer's starting hand
  dealer();
  
  // Checks for blackjack
  if(user_hand_total === 21) {
    dealer();
    if(dealer_hand_total === 21) {
      document.getElementById("status").innerHTML = "Double Blackjack: Tie";
    } else {
      document.getElementById("status").innerHTML = "Blackjack: You Win";
    }
  }
  
}

function hit() {
  // Generates random number for user's hand
  var user_random = Math.floor(Math.random() * 10 + 1);
  user_hand_total += user_random;
  user_hand[user_card_counter] = user_random;
  document.getElementById("user_hand").innerHTML = "Your Hand: " + user_hand;
  document.getElementById("user_hand_total").innerHTML = "Total: " + user_hand_total;
  
  // Counters
  charlie_counter++;
  user_card_counter++;
  
  // Checks for stuff
  if(user_hand_total > 21) {
    dealer();
    document.getElementById("status").innerHTML = "Bust: You Lose";
  }
  
  if(user_hand_total === 21) {
    stand();
  }
  
  if(charlie_counter === 6 && user_hand_total <= 21) {
    dealer();
    document.getElementById("status").innerHTML = "6-Card Charlie: You Win";
  } 
  
}

function dealer() {
    // Generates dealer's hand
    var dealer_random = Math.floor(Math.random() * 10 + 1);
    dealer_hand_total += dealer_random;
    dealer_hand[dealer_card_counter] = dealer_random;
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
  
  // Checks if dealer's hand goes over 21. If so, subtracts one card.
  var dealer_remove = dealer_hand[dealer_card_counter - 1];
  if(dealer_hand_total > 21) {
    dealer_hand_total_bust = dealer_hand_total;
    dealer_hand_total -= dealer_remove;
    dealer_hand.pop();
    document.getElementById("dealer_hand").innerHTML = "Dealer's Hand: " + dealer_hand + " || " + dealer_remove;
    document.getElementById("dealer_hand_total").innerHTML = "Total: " + dealer_hand_total + " || " + dealer_hand_total_bust;
  }
  
  // Checks for victor
  if(user_hand_total > dealer_hand_total) {
    document.getElementById("status").innerHTML = "You Win";
  } else if(user_hand_total < dealer_hand_total) {
    document.getElementById("status").innerHTML = "You Lose";
  } else {
    document.getElementById("status").innerHTML = "It's a Tie";
  }
  
}
