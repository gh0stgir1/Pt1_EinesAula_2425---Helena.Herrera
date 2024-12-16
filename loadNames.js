let noms = [];

document.getElementById("load-names").addEventListener("click", async () => {
    try {
        const response = await fetch("noms.txt");
        const text = await response.text();
        noms = text.split("\n").map(nom => nom.trim()).filter(nom => nom);

        if (noms.length) {
            alert("Noms carregats correctament!");
        } else {
            alert("El fitxer està buit o no és accessible.");
        }
    } catch (error) {
        console.error("Error en carregar noms:", error);
        alert("No s'ha pogut carregar el fitxer de noms.");
    }
});
