

window.onload=async function(){
    console.log("Creating elements!");

    let page = document.getElementById("page");
    let usedIndexes = [];
    let sideIndex = 1;
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
            let imageIndex = Math.floor(Math.random() * 1000);


            while (usedIndexes.indexOf(imageIndex)>=0){
                imageIndex = Math.floor(Math.random() * 1000);
            }

            let imageExists = false;
            while(!imageExists){
                let imageUrl = "https://picsum.photos/id/" + imageIndex + "/200/200";
                try {
                    backImage.src = imageUrl;
                    imageExists = true;
                }catch (e) {
                    console.log("Could not load image");
                    imageIndex = Math.floor(Math.random() * 1000);
                    imageExists = false;
                }
            }

            usedIndexes.push(imageIndex);

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







