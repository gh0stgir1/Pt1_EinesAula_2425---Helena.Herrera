let names = [];

document.getElementById("loadNames").addEventListener("click", () => {
  fetch("noms.txt")
    .then((response) => response.text())
    .then((data) => {
      names = data.split("\n").filter((name) => name.trim() !== "");
      alert("Noms carregats correctament!");
    })
    .catch((error) => console.error("Error carregant els noms:", error));
});
