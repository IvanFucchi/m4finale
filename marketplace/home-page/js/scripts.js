document.addEventListener("DOMContentLoaded", async function () {
    const apiURL = "https://striveschool-api.herokuapp.com/api/product/";
    const bearerToken =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZDk4NmU3MDMzNzAwMTUzMTZkZDQiLCJpYXQiOjE3NDA0Mjk3NDAsImV4cCI6MTc0MTYzOTM0MH0.DtKRcaFpnihtCrd7cd9z3aPVtUND7VrKqJB3PZ9JC04";

    const productsContainer = document.querySelector("#mainSection .row"); // Contenitore delle card

    async function fetchProducts() {
        try {
            const response = await fetch(apiURL, {
                method: "GET",
                headers: {
                    Authorization: bearerToken, // Aggiungiamo il Bearer Token
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Errore HTTP! Status: ${response.status}`);
            }

            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error("Errore nel caricamento dei prodotti:", error);
        }
    }

    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }
    
    function renderProducts(products) {
        productsContainer.innerHTML = ""; // Pulisce eventuali contenuti esistenti
        products.forEach((product) => {
            const cardHTML = `
                <div class="col mb-5">
                    <div class="card h-100">
                        <!-- Product image -->
                        <img class="card-img-top" src="${product.imageUrl}" alt="${product.name}" />
                        <!-- Product details -->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name -->
                                <h5 class="fw-bolder">${product.name}</h5>
                                <!-- Product description -->
                                <p class="text-muted">${truncateText(product.description, 100)}</p>
                                <!-- Product price -->
                                <p class="fw-bold">$${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <!-- Product actions -->
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
    }
    

    fetchProducts();
});
