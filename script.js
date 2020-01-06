var user_hand_total = 0;
var user_hand = "";
var dealer_hand_total = 0;
var dealer_hand = "";
var charlie_counter = 1;

starting_hand();

function starting_hand() {
  hit();
  hit();
}

function hit() {
  var user_random = Math.floor(Math.random() * 10 + 1);
  user_hand_total += user_random;
  user_hand += user_random + " ";
  document.getElementById("user_hand_total").innerHTML = "Your Hand: " + user_hand_total;
  
  if(user_hand_total > 21) {
    dealer();
    document.getElementById("dealer_hand_total").innerHTML = "Dealer's Hand: " + dealer_hand_total;
    document.getElementById("status").innerHTML = "You Lose";
  }
  
  if(user_hand_total === 21) {
    stand();
  }
  
  if(charlie_counter === 6 && user_hand_total <= 21) {
    dealer();
    document.getElementById("dealer_hand_total").innerHTML = "Dealer's Hand: " + dealer_hand_total;
    document.getElementById("status").innerHTML = "6-Card Charlie: You Win";
  }
  
  document.getElementById("user_hand").innerHTML = user_hand;
  
  charlie_counter++;
}

function stand() {
  dealer();
  document.getElementById("dealer_hand_total").innerHTML = "Dealer's Hand: " + dealer_hand_total;
  
  if(user_hand_total > dealer_hand_total) {
    document.getElementById("status").innerHTML = "You Win";
  } else if(user_hand_total < dealer_hand_total) {
    document.getElementById("status").innerHTML = "You Lose";
  } else {
    document.getElementById("status").innerHTML = "It's a Tie";
  }
}

function dealer() {
  var check;
  while(dealer_hand_total <= 21) {
    var dealer_random = Math.floor(Math.random() * 10 + 1);
    var deal = dealer_random;
    dealer_hand_total += deal;
    dealer_hand += dealer_random + " ";
    check = deal;
  }
  dealer_hand_total -= check;
  
  document.getElementById("dealer_hand").innerHTML = dealer_hand;
}