const apiURL = "https://striveschool-api.herokuapp.com/api/product/";
const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZDk4NmU3MDMzNzAwMTUzMTZkZDQiLCJpYXQiOjE3NDA0Mjk3NDAsImV4cCI6MTc0MTYzOTM0MH0.DtKRcaFpnihtCrd7cd9z3aPVtUND7VrKqJB3PZ9JC04";


function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Funzione per recuperare i dettagli del prodotto
async function fetchProductDetails() {
    const productId = getProductIdFromURL();
    if (!productId) {
        console.error("Errore: ID prodotto non trovato!");
        return;
    }

    try {
        const response = await fetch(`${apiURL}${productId}`, {
            headers: { Authorization: bearerToken }
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        const product = await response.json();

        // Selezioniamo gli elementi da aggiornare
        document.querySelector(".card-img-top").src = product.imageUrl;
        document.querySelector(".display-5").textContent = product.name;
        document.querySelector(".lead").textContent = product.description;
        document.querySelector(".fs-5 span:last-child").textContent = `$${product.price.toFixed(2)}`;
    } catch (error) {
        console.error("Errore nel recupero del prodotto:", error);
    }
}

// Esegui la funzione al caricamento della pagina
document.addEventListener("DOMContentLoaded", fetchProductDetails);



