const apiURL = "https://striveschool-api.herokuapp.com/api/product/";
const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZDk4NmU3MDMzNzAwMTUzMTZkZDQiLCJpYXQiOjE3NDA0Mjk3NDAsImV4cCI6MTc0MTYzOTM0MH0.DtKRcaFpnihtCrd7cd9z3aPVtUND7VrKqJB3PZ9JC04";
let productsArray = []; // Array globale per contenere i prodotti

const productsContainer = document.querySelector("#mainSection .row"); // Contenitore delle card

// 🔹 Fetch per ottenere i prodotti dall'API
async function fetchProducts() {
    try {
        const response = await fetch(apiURL, {
            method: "GET",
            headers: {
                Authorization: bearerToken,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }

        productsArray = await response.json(); // Salviamo i prodotti nell'array globale
        renderProducts(productsArray); // Renderizziamo le card
    } catch (error) {
        console.error("Errore nel caricamento dei prodotti:", error);
    }
}

// 🔹 Funzione per accorciare il testo delle descrizioni
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// 🔹 Funzione per mostrare i prodotti nel DOM
function renderProducts(products) {
    if (!productsContainer) {
        console.error("Elemento productsContainer non trovato!");
        return;
    }

    productsContainer.innerHTML = ""; // Pulisce eventuali contenuti esistenti
    products.forEach((product) => {
        const cardHTML = `
            <div class="col mb-5">
                <div class="card h-100 product-card" data-id="${product._id}">
                    <img class="card-img-top" src="${product.imageUrl}" alt="${product.name}" />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${product.name}</h5>
                            <p class="text-muted">${truncateText(product.description, 100)}</p>
                            <p class="fw-bold">$${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += cardHTML;
    });

    // 🔹 Aggiungiamo il click su ogni card per andare alla pagina dettaglio
    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            window.location.href = `/marketplace/item-detail/detail.html?id=${productId}`;
        });
    });
}

// 🔹 Avvia il recupero dei prodotti
document.addEventListener("DOMContentLoaded", fetchProducts);

// 🔹 Funzione per cambiare lo sfondo in modo casuale
function setRandomBackground() {
    const imageCount = 12;
    const randomIndex = Math.floor(Math.random() * imageCount) + 1;
    const randomImage = `/marketplace/img/wallpaper/bg${randomIndex}.webp`;

    const bg1 = document.getElementById("bg1");
    const bg2 = document.getElementById("bg2");

    if (!bg1 || !bg2) {
        console.error("Gli elementi bg1 e bg2 non sono stati trovati!");
        return;
    }

    const activeBg = bg1.style.opacity === "1" ? bg1 : bg2;
    const hiddenBg = activeBg === bg1 ? bg2 : bg1;

    hiddenBg.style.backgroundImage = `url('${randomImage}')`;
    hiddenBg.style.opacity = "1";
    activeBg.style.opacity = "0";
}

setInterval(setRandomBackground, 5000); // Cambia immagine ogni 5 secondi
document.addEventListener("DOMContentLoaded", setRandomBackground);
