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