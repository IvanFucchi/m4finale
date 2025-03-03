const apiURL = "https://striveschool-api.herokuapp.com/api/product/";
const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZDk4NmU3MDMzNzAwMTUzMTZkZDQiLCJpYXQiOjE3NDA0Mjk3NDAsImV4cCI6MTc0MTYzOTM0MH0.DtKRcaFpnihtCrd7cd9z3aPVtUND7VrKqJB3PZ9JC04";



let productsArray = [];
const productId = getProductIdFromURL();

function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}


async function fetchProductDetails() {

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


        document.querySelector(".card-img-top").src = product.imageUrl;
        document.querySelector(".display-5").textContent = product.name;
        document.querySelector(".lead").textContent = product.description;
        document.querySelector(".fs-5 span:last-child").textContent = `$${product.price.toFixed(2)}`;
    } catch (error) {
        console.error("Errore nel recupero del prodotto:", error);
    }
}


document.addEventListener("DOMContentLoaded", fetchProductDetails);



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

        return await response.json();

    } catch (error) {
        console.error("Errore nel caricamento dei prodotti:", error);
    }
}

function renderRelatedProducts() {
    const relatedProductsContainer = document.getElementById("relatedProducts");
    if (!relatedProductsContainer) {
        console.error("Elemento #relatedProductsCard non trovato!");
        return;
    }

    fetchProducts().then(res => {


        const mainProduct = res.find(product => product._id === productId);


        const relatedProducts = res.filter(product => product.brand === mainProduct.brand && product._id !== mainProduct._id);

        if (relatedProducts.length === 0) {
            relatedProductsContainer.innerHTML = "<p>Nessun prodotto correlato disponibile.</p>";
            return;
        }

        relatedProductsContainer.innerHTML = "";
        relatedProducts.forEach((product) => {
            const cardHTML = `
            <div class="col mb-5">
                <div class="card h-100 product-card" data-id="${product._id}">
                    <img class="card-img-top" src="${product.imageUrl}" alt="${product.name}" />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${product.name}</h5>
                            <p class="fw-bold">$${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <a class="btn btn-outline-dark mt-auto" href="detail.html?id=${product._id}">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
            relatedProductsContainer.innerHTML += cardHTML;
        });

    })


}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(renderRelatedProducts(), 1000);
});
