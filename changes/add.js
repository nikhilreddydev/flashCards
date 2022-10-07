const flipBtn = document.querySelector("#flipBtn");
flipBtn.addEventListener("click", flip);

function flip() {
    const card = document.querySelector(".card");
    let list = card.classList;
    list.toggle("flip");
}

const frontRef = document.querySelector(".front h1");
const backRef = document.querySelector(".back h1");

frontRef.textContent = "Front";
backRef.textContent = "Back";

// on discard, reload the main page
const discardBtn = document.querySelector("#discardBtn");
discardBtn.addEventListener("click", reloadMainPage);

function reloadMainPage() {
    let href = "./../index.html";
    location.assign(href);
}

// on save, send a POST request to API
const saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener('click', postCard);

// send post request, then redirect to index.html
async function postCard() {
    let hrefToRedirect = saveBtn.getAttribute("href");

    let newCard = {
        "front": frontRef.textContent,
        "back": backRef.textContent,
    }
    
    let url = "https://cute-cyan-lemur-cap.cyclic.app/add";
    let options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newCard)
    }

    await fetch(url, options);
    reloadMainPage();
}