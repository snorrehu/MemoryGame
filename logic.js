

var cardIdCounter = 1;
var numberOfCards = 9;

/**
 * I populate an array of images to be used as cards, choosing from an image database of over 1000 images
 * @returns {Array}
 */
function getCards() {
    var imageArray = [];
    for(i = cardIdCounter; i <= cardIdCounter+4; i++){
        //Get a new card:
        var card = new Image();
        card.src = "https://picsum.photos/id/" + i + "/200/200";
        //Push two of the same card to the deck:
        imageArray.push(card);
        imageArray.push(card);
        //Increment the counter to make sure no card is used twice during the same session (just a cool feature)
        cardIdCounter++;
    }
    return imageArray;
}

function decorateGame(){
    var cards = getCards();
    var counter = 0;

    var testCard = new Image();
    testCard.src="https://picsum.photos/id/1/200/200";
    document.getElementById("11").appendChild(testCard);
}
window.onload=function(){
    for(i = 1;i <=numberOfCards; i++ ){
        console.info(i.toString());
        let card = document.getElementById(i.toString()); //Use let to allow for block scoped variable
        card.addEventListener( 'click', function() {
            card.classList.toggle('is-flipped');
        });
    }
};
