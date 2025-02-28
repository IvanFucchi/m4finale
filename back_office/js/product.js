console.log("Caricamento pagina prodotto...");



const Bearer =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZDk4NmU3MDMzNzAwMTUzMTZkZDQiLCJpYXQiOjE3NDA0Mjk3NDAsImV4cCI6MTc0MTYzOTM0MH0.DtKRcaFpnihtCrd7cd9z3aPVtUND7VrKqJB3PZ9JC04";
;

// Funzione per ottenere l'ID del prodotto dall'URL
const getProductIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id"); // Restituisce l'ID se presente, altrimenti null
};

// Funzione per ottenere i dettagli del prodotto dall'API e popolare il form
const fetchProductById = (id) => {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        headers: {
            Authorization: Bearer
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Errore nel caricamento del prodotto");
        }
        return response.json();
    })
    .then(product => {
        console.log("Prodotto ricevuto:", product);
        populateForm(product);
        console.log(product)
    })
    .catch(error => console.error("Errore:", error));
};

// Funzione per riempire il form con i dati del prodotto
const populateForm = (product) => {
    document.getElementById("productName").value = product.name || "";
    document.getElementById("productDescription").value = product.description || "";
    document.getElementById("productBrand").value = product.brand || "";
    document.getElementById("productImageUrl").value = product.imageUrl || "";
    document.getElementById("productPrice").value = product.price || "";

    // Cambia il titolo e il bottone
     document.getElementById("formTitle").textContent = "Update Product Info";
     document.getElementById("submitBtn").textContent = "Save Changes";
};

// Funzione per inviare i dati (POST per creazione, PUT per modifica)
const handleFormSubmit = (event) => {
    event.preventDefault(); // Evita il refresh della pagina

    const productId = getProductIdFromUrl();
    const isEditing = productId !== null;

    const formData = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        brand: document.getElementById("productBrand").value,
        imageUrl: document.getElementById("productImageUrl").value,
        price: parseFloat(document.getElementById("productPrice").value) // Assicura che sia un numero
    };

    console.log("Dati inviati:", formData);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", Bearer);
    myHeaders.append("Content-Type", "application/json");

    const endpoint = isEditing 
        ? `https://striveschool-api.herokuapp.com/api/product/${productId}`
        : "https://striveschool-api.herokuapp.com/api/product/";
    
    const method = isEditing ? "PUT" : "POST";

    fetch(endpoint, {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(formData),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Errore nella ${isEditing ? 'modifica' : 'creazione'} del prodotto`);
        }
        return response.json();
    })
    .then((result) => {
        console.log(`Prodotto ${isEditing ? 'modificato' : 'creato'}:`, result);
        alert(`Prodotto ${isEditing ? 'aggiornato' : 'creato'} con successo!`);
        window.location.href = "index.html"; // Reindirizza alla lista dei prodotti
    })
    .catch((error) => console.error(error));
};

// Quando la pagina è caricata, controlla se deve modificare o creare un prodotto
document.addEventListener("DOMContentLoaded", () => {
    const productId = getProductIdFromUrl();
    if (productId) {
        fetchProductById(productId); // Se c'è un ID, carica i dati per modificarli
    }

    // Aggiunge l'evento submit al form
    document.getElementById("productForm").addEventListener("submit", handleFormSubmit);
});


