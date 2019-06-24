let numberOFCards = 16;

window.onload=async function(){
    console.log("DOM Loaded");

    console.log("Creating elements!");
    let imageUrls = await getImageUrls();

    let page = document.getElementById("page");
    let usedIndexes = [];
    let sideIndex = 1;
    let imagesLeft = 16;
    //For each of the three rows
    for(let y = 1;y <= 4; y++){
        let row = document.createElement('div');
        row.className = "row";

        //..place three columns
        for(let x = 1; x <= 4; x++){
            let column = document.createElement('div');
            column.className = "column";

            //..that has a card
            let card = document.createElement('div');
            card.className = "card";
            column.appendChild(card); //Append the card so that it exists in the DOM when you try to append sides

            //..which has a front side
            let frontSide = document.createElement('div');
            frontSide.className = "card__face card__face--";
            frontSide.id = sideIndex.toString();
            sideIndex++;
            //..with an image:
            let frontImage = new Image();
            frontImage.src = 'cardimage.png';
            frontImage.style.maxHeight = "100%";
            frontImage.style.maxWidth = "100%";
            frontSide.appendChild(frontImage);
            card.appendChild(frontSide);

            //..and a back side
            let backside = document.createElement('div');
            backside.className = "card__face card__face--back";
            backside.id = sideIndex;
            sideIndex++;
            //..with a random image:
            let backImage = document.createElement('img');
            let imageIndex = Math.floor(Math.random() * imagesLeft);
            backImage.src = await imageUrls[imageIndex];

            imageUrls.splice(imageIndex,1);
            imagesLeft--;
            console.log("Adding image to card");
            backside.appendChild(backImage);

            card.appendChild(backside);
            //..and of course an event listener
            card.addEventListener( 'click', function() {
                card.classList.toggle('is-flipped');
            });
            row.appendChild(column);
        }
        row.style.height = "25%";
        page.appendChild(row);
    }

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









