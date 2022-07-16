const flipBtn = document.querySelector("#flipBtn");
flipBtn.addEventListener("click", flip);

function flip() {
    const card = document.querySelector(".card");
    let list = card.classList;
    list.toggle("flip");
}

const frontRef = document.querySelector(".front h1");
const backRef = document.querySelector(".back h1");

frontRef.textContent = "Add Front content here";
backRef.textContent = "Back Content";

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

    console.log(newCard);
    let url = "http://localhost:3000/add";
    let options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(newCard)
    }

    await fetch(url, options)
    window.location.href = hrefToRedirect;
}