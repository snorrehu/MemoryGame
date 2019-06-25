let numberOFCards = 16;

window.onload=async function(){
    console.log("DOM Loaded");

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
            card.addEventListener( 'click', function() {
                card.classList.toggle('is-flipped');
            });
            row.appendChild(card);
        }
        container.appendChild(row);
    }
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









