let numberOFCards = 16;
let rex = new RegExp('(?<=id/).*(?=/200/)');
let oldCardIndex;
let openCards = 0;
let oldCard;
let correctCards = [];
let match = false;

window.onload= async function loadGame(){
    console.log("DOM Loaded");

    let inCorrectCards = [];
    
    console.log("Creating elements!");
    let imageUrls = await getImageUrls();

    let container = document.createElement('div');
    container.className = "scene scene--card";

    let sideIndex = 1;
    let imagesLeft = 16;
    //For each of the three rows
    for(let y = 1;y <= 4; y++){
        let row = document.createElement('div');
        row.className = "scene scene--card";

        //..place three cards
        for(let x = 1; x <= 4; x++){
            let card = document.createElement('div');
            card.className = "card";

            //..which has a front side with an image
            let frontSide = new Image();
            frontSide.src = 'cardimage.png';
            frontSide.className = "card__face card__face--front";
            frontSide.id = sideIndex.toString();
            sideIndex++;
            card.appendChild(frontSide);

            //..and a back side with a random image
            let backSide = new Image();
            let imageIndex = Math.floor(Math.random() * imagesLeft);
            backSide.src = await imageUrls[imageIndex];
            backSide.className = "card__face card__face--back";
            backSide.id = sideIndex.toString();
            sideIndex++;

            imageUrls.splice(imageIndex,1);
            imagesLeft--;
            console.log("Adding image to card");
            card.appendChild(backSide);
            //..and of course an event listener
            card.addEventListener( 'click', async function() {
                let picture = await card.childNodes[1];
                let url = await picture.getAttribute('src');
                let cardIndex = await url.match(rex);
                switch (openCards) {
                    case 0:
                        console.log("First card!");
                        console.log("Open cards: " + openCards);

                        card.classList.toggle('is-flipped');
                        oldCardIndex = cardIndex.toString();
                        openCards = 1;
                        oldCard = card;
                        break;
                    case 1:
                        console.log("Second card!");
                        console.log("Open cards: " + openCards);

                        if(oldCardIndex != cardIndex){
                            console.log("Not a match...: " + oldCardIndex + " vs " + cardIndex);
                            card.classList.toggle('is-flipped');
                            match = false;
                            inCorrectCards.push(oldCard);
                            inCorrectCards.push(card);
                            match = false;
                        }else{
                            console.log("MATCH: " + oldCardIndex + " vs " + cardIndex);
                            card.classList.toggle('is-flipped');
                            correctCards.push(oldCard);
                            correctCards.push(card);
                            match = true;
                        }                                   
                        openCards = 2;
                        break;
                    case 2:
                        console.log("Third card!");
                        console.log("Open cards: " + openCards);
                        //If two not equal cards was last opened, then flip them.
                        if(!match){
                            console.log("Last pair was NOT a match! Flipping incorrect cards back:");
                            console.log(inCorrectCards[0]);
                            console.log(inCorrectCards[1]);
                            inCorrectCards[0].classList.toggle('is-flipped');
                            inCorrectCards[1].classList.toggle('is-flipped');
                            inCorrectCards = [];
                            openCards = 0;
                        }else{
                            console.log("Last pair was a match! Flipping card");
                            card.classList.toggle('is-flipped');
                            inCorrectCards = [];
                            openCards = 1;
                            oldCard = card;
                            match = false;
                        }


                }
                if(correctCards.length === numberOFCards){
                    console.log(correctCards.length);
                    alert("CONGRATULATIONS!")     ;
                }
            });
            row.appendChild(card);
        }
        container.appendChild(row);
    }
    container.style.position="absolute";
    container.style.marginLeft = "70%";

    let newGameButton = document.createElement('button');
    newGameButton.innerText = "NEW GAME";
    newGameButton.style.position="absolute";
    newGameButton.style.marginLeft = "30%";
    newGameButton.addEventListener('click',async function () {
        document.body.innerHTML = '';
        correctCards = [];
        oldCard = undefined;
        openCards = 0;
        oldCardIndex = 0;
        await loadGame();
    });

    container.appendChild(newGameButton);
    document.body.appendChild(container);

};

async function getImageUrls() {
    console.log("myTestFuncgtion");
    let imageUrls = [];

    for(let i = 0; i < numberOFCards/2; i++){
        let exists = false;
        while(!exists){
            //Pick a random image
            let imageIndex = Math.floor(Math.random() * 1000);
            let url = "https://picsum.photos/id/" + imageIndex + "/200/200";
            //Check if it exists
            let image = await fetch(url,{ method: 'HEAD' });
            exists = await image.ok;
            if(exists){
                //Push two of the same image to the array
                await imageUrls.push(url);
                await imageUrls.push(url);
            }
        }
    }
    return imageUrls.sort(() => Math.random() - 0.5);
}









