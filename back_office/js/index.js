console.log("ciao");

const Bearer = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjZDk4NmU3MDMzNzAwMTUzMTZkZDQiLCJpYXQiOjE3NDA0Mjk3NDAsImV4cCI6MTc0MTYzOTM0MH0.DtKRcaFpnihtCrd7cd9z3aPVtUND7VrKqJB3PZ9JC04";

// Seleziona il tbody della tabella
const outputElement = document.getElementById("output");

// Funzione per caricare i dati dalla API e renderizzarli in tabella
const fetchData = () => {
    const options = {
        headers: {
            Authorization: Bearer
        }
    };  

    fetch("https://striveschool-api.herokuapp.com/api/product/", options)
        .then(response => {
            console.log(response.status);
            if (!response.ok) {
                throw new Error("Errore nel caricamento dei dati");
            }
            return response.json();
        })
        .then(data => {
                console.log("Dati ricevuti:", data);
                if (!data || data.length === 0) {
                    console.warn("Nessun dato ricevuto dalla API.");
                    return;
                }

            // Controlla che l'elemento esista
            if (!outputElement) {
                
                console.error("Elemento con ID 'output' non trovato nel DOM.");
                return;
            }

            

            // Svuota la tabella prima di renderizzare i nuovi dati
            outputElement.innerHTML = "";

            const elements = data.map(({ _id, name, description, brand, imageUrl, price }) => {
                const tr = document.createElement("tr");
                tr.dataset.id = _id; // Aggiunge un attributo data-id per il riferimento

                // Colonna azioni
                const actionTd = document.createElement("td");
                const buttonContainer = document.createElement("div");
                buttonContainer.className = "d-flex justify-content-between align-items-center w-100 gap-2 h-100";

                const editButton = document.createElement("button");
                editButton.className = "btn btn-info btn-sm d-flex justify-content-center align-items-center edit-button";
                editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';
                editButton.dataset.id = _id;

                /*
                const deleteButton = document.createElement("button");
                deleteButton.className = "btn btn-danger btn-sm d-flex justify-content-center align-items-center delete-button";
                deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
                deleteButton.dataset.id = _id;
                */

                // Aggiunge i bottoni al container e alla cella
                buttonContainer.append(editButton, /*deleteButton*/);
                actionTd.appendChild(buttonContainer);
                tr.appendChild(actionTd);

                // Creazione delle altre colonne dinamiche della Tabella dei prodotti
                const nameTd = document.createElement("td");
                nameTd.textContent = name;
                nameTd.classList.add("text-truncate-custom");


                const descriptionTd = document.createElement("td");
                descriptionTd.textContent = description;
                descriptionTd.classList.add("text-truncate-custom"); // Aggiunge la classe per l'elipsis..

                /*const descriptionTd = document.createElement("td");
                descriptionTd.textContent = description;
                // descriptionTd.classList = "text-truncate"*/
                const brandTd = document.createElement("td");
                brandTd.textContent = brand;


                const imageTd = document.createElement("td");
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = name;
                img.classList.add("img-fluid", "rounded", "table-img");
                imageTd.appendChild(img);

                const idTd = document.createElement("td");
                idTd.textContent = _id;

                const priceTd = document.createElement("td");
                priceTd.textContent = `${price} €`;


                // Aggiunge le celle alla riga
                tr.append(idTd, nameTd, descriptionTd, brandTd, imageTd, priceTd,actionTd);

                return tr;
            });

            // Aggiunge tutte le righe alla tabella
            outputElement.append(...elements);

            // Dopo aver creato la tabella, aggiunge gli event listener ai bottoni delete ed edit
            attachDeleteEventListeners();
            attachEditEventListeners();
        })
        .catch(error => console.error("Errore:", error));
};

document.addEventListener("DOMContentLoaded", fetchData);

// Funzione per eliminare un prodotto con una richiesta DELETE
const deleteProduct = (id) => {
    if (!confirm("Sei sicuro di voler eliminare questo prodotto?")) return;

    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: Bearer
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Errore nell'eliminazione del prodotto");
        }
        console.log(`Prodotto con ID ${id} eliminato`);
        // Dopo l'eliminazione, ricarica la lista aggiornata
        fetchData();
    })
    .catch(error => console.error("Errore:", error));
};

// Funzione per aggiungere event listener ai bottoni delete
const attachDeleteEventListeners = () => {
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = event.currentTarget.dataset.id;
            deleteProduct(productId);
        });
    });
};

// Funzione per aggiungere event listener ai bottoni edit
const attachEditEventListeners = () => {
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = event.currentTarget.dataset.id;
            window.location.href = `product.html?id=${productId}`;
        });
    });
};

// Esegui fetch quando il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", fetchData);

//toggle sidebar
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script per sidebar caricato!");

    const sidebar = document.getElementById("accordionSidebar"); // Sidebar
    const toggleButton = document.getElementById("sidebarToggleTop"); // Bottone di toggle

    if (toggleButton && sidebar) {
        console.log("Bottone trovato, aggiungo evento...");

        toggleButton.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            console.log("Bottone cliccato! Stato attuale:", sidebar.classList.contains("toggled"));

            if (sidebar.classList.contains("toggled")) {
                sidebar.classList.remove("toggled"); // ❌ Chiude la sidebar
                document.body.classList.remove("sidebar-toggled");
                console.log("Sidebar CHIUSA");
            } else {
                sidebar.classList.add("toggled"); // ✅ Apre la sidebar
                document.body.classList.add("sidebar-toggled");
                console.log("Sidebar APERTA");
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth >= 768) { // Cambia a seconda del breakpoint che usi
                console.log("Schermo grande, sidebar riattivata");
                sidebar.classList.remove("toggled"); // Rimuove la classe per mostrare la sidebar
                document.body.classList.remove("sidebar-toggled");
            }
        });


    } else {
        console.error("❌ Sidebar o bottone non trovati!");
    }
});


  document.getElementById("accordionSidebar").style.display = "block";
document.getElementById("accordionSidebar").style.transform = "translateX(0)";


