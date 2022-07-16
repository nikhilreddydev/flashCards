const flipBtn = document.querySelector("#flipBtn");
flipBtn.addEventListener("click", flip);

function flip() {
    const card = document.querySelector(".card");
    let list = card.classList;
    list.toggle("flip");
}

const frontRef = document.querySelector(".front h1");
const backRef = document.querySelector(".back h1");

// get card's previous content from localStorage
let card = JSON.parse(localStorage.getItem('card'));

frontRef.textContent = card.front;
backRef.textContent = card.back;

const discardBtn = document.querySelector("#discardBtn");
discardBtn.addEventListener("click", reloadMainPage);

function reloadMainPage() {
    localStorage.removeItem("card");
    let href = "./../index.html";
    location.assign(href);
}

// on save, send a PATCH request to API
const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", patchCard);

// send patch request, then redirect to index.html
async function patchCard() {
    // let hrefToRedirect = saveBtn.getAttribute("href");

    card.front = frontRef.textContent;
    card.back = backRef.textContent;

    console.log(card);
    let url = "https://fast-shelf-28098.herokuapp.com/edit";
    let options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(card)
    }

    await fetch(url, options);
    reloadMainPage();
}