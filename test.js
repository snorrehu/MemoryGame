

window.onload=function () {
    let card = document.querySelector('.card');
    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
    });
};