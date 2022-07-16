// make card flip on clip
const card = document.querySelector(".card");
card.addEventListener("click", flip);

let flipped = false;
function flip() {
    const list = card.classList;
    list.toggle("flip");
    flipped = !flipped;
}

// fetch the cards from database
let cards = [];
let i;

loadCards();

function loadCards() {
    let url = "http://localhost:3000/";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            cards = data;
            i = 0;
            setCardContent(cards, i);
        });
}

// functionality when navigation buttons are clicked
const prevBtn = document.querySelector("#left");
const nextBtn = document.querySelector("#right");

prevBtn.addEventListener("click", moveLeft);
nextBtn.addEventListener("click", moveRight);

function moveLeft() {
    if(cards.length == 0 || i == 0)
        return;

    if(flipped) {
        flip();
    }
    setCardContent(cards, --i);
}

function moveRight() {
    if(cards.length == 0 || i == cards.length - 1)
        return;
    
    if(flipped) {
        flip();
    }

    setCardContent(cards, ++i);
}

function setCardContent(cards, i) {
    const frontRef = document.querySelector(".front h1");
    const backref = document.querySelector(".back h1");
    let frontContent, backContent;
    if(cards.length == 0) {
        frontContent = backContent = "Sorry, No cards in database";
    } else {
        frontContent = cards[i].front;
        backContent = cards[i].back;
    }

    frontRef.textContent = frontContent;
    backref.textContent = backContent;
}

// when edit btn is clicked, save card object in localStorage, then direct to edit.html
const editbtn = document.querySelector("#editBtn");
editbtn.addEventListener("click", setCardInLocalStorage);

function setCardInLocalStorage() {
    let href = editbtn.getAttribute("href");

    localStorage.setItem('card', JSON.stringify(cards[i]));

    window.location.href = href;
}

// delete the card from database and also from cards array
const deleteBtn = document.querySelector("#deleteBtn");
deleteBtn.addEventListener("click", deleteCard);

async function deleteCard() {
    let url = "http://localhost:3000/delete"

    let options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'DELETE',
        body: JSON.stringify(cards[i]),
    };

    await fetch(url, options);
    loadCards();
}