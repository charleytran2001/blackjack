var user_hand = 0;
var dealer_hand = 0;
var charlie_counter = 1;

starting_hand();

function starting_hand() {
  hit();
  hit();
}

function hit() {
  user_hand += Math.floor(Math.random() * 10 + 1);
  document.getElementById("user_hand").innerHTML = "Your Hand: " + user_hand;
  
  if(user_hand > 21) {
    dealer();
    document.getElementById("dealer_hand").innerHTML = "Dealer's Hand: " + dealer_hand;
    document.getElementById("status").innerHTML = "You Lose";
  }
  
  if(user_hand === 21) {
    stand();
  }
  
  if(charlie_counter === 6 && user_hand <= 21) {
    dealer();
    document.getElementById("dealer_hand").innerHTML = "Dealer's Hand: " + dealer_hand;
    document.getElementById("status").innerHTML = "6-Card Charlie: You Win";
  }
  
  charlie_counter++;
}

function stand() {
  dealer();
  document.getElementById("dealer_hand").innerHTML = "Dealer's Hand: " + dealer_hand;
  
  if(user_hand > dealer_hand) {
    document.getElementById("status").innerHTML = "You Win";
  } else if(user_hand < dealer_hand) {
    document.getElementById("status").innerHTML = "You Lose";
  } else {
    document.getElementById("status").innerHTML = "It's a Tie";
  }
}

function dealer() {
  var check;
  while(dealer_hand <= 21) {
    var deal = Math.floor(Math.random() * 10 + 1);
    dealer_hand += deal;
    console.log(dealer_hand);
    check = deal;
  }
  dealer_hand -= check;
}