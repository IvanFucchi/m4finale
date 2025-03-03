function setRandomBackground() {
    const imageCount = 12; // Numero totale di immagini nella cartella
    const randomIndex = Math.floor(Math.random() * imageCount) + 1;
    const randomImage = `/marketplace/img/bg${randomIndex}.jpg`; 

    const bg1 = document.getElementById("bg1");
    const bg2 = document.getElementById("bg2");

    if (!bg1 || !bg2) {
        console.error("Gli elementi bg1 e bg2 non sono stati trovati!");
        return;
    }

    // Trova quale div è attualmente visibile
    const activeBg = bg1.style.opacity === "1" ? bg1 : bg2;
    const hiddenBg = activeBg === bg1 ? bg2 : bg1;

    // Cambia l'immagine del div nascosto
    hiddenBg.style.backgroundImage = `url('${randomImage}')`;

    // Fai il cross-fade tra i due div
    hiddenBg.style.opacity = "1";
    activeBg.style.opacity = "0";
}

setInterval(setRandomBackground, 5000); // Cambia immagine ogni 5 secondi

document.addEventListener("DOMContentLoaded", setRandomBackground);

