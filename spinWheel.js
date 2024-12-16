let angleActual = 0;

document.getElementById("spin").addEventListener("click", () => {
    if (noms.length === 0) {
        alert("Carrega els noms abans de girar la ruleta.");
        return;
    }

    const canvas = document.getElementById("ruleta");
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;

    // Divideix la ruleta segons el nombre de noms
    const sliceAngle = (2 * Math.PI) / noms.length;

    // Dibuixa la ruleta
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    noms.forEach((nom, i) => {
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(
            radius,
            radius,
            radius,
            i * sliceAngle,
            (i + 1) * sliceAngle
        );
        ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff9900";
        ctx.fill();
        ctx.stroke();

        // Text al segment
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(i * sliceAngle + sliceAngle / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        ctx.font = "16px Arial";
        ctx.fillText(nom, radius / 2, 5);
        ctx.restore();
    });

    // Gira la ruleta
    const spins = Math.floor(Math.random() * 10) + 3;
    const targetAngle = Math.random() * 2 * Math.PI;
    const totalAngle = 2 * Math.PI * spins + targetAngle;

    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;

        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const progress = Math.min(elapsed / 3000, 1);
        const currentAngle = angleActual + easeOut(progress) * totalAngle;

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(currentAngle);
        ctx.drawImage(canvas, -radius, -radius);
        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            angleActual = currentAngle % (2 * Math.PI);
            const selectedIndex = Math.floor(noms.length - (angleActual / sliceAngle)) % noms.length;
            document.querySelector("#selected-name span").textContent = noms[selectedIndex];
        }
    }

    requestAnimationFrame(animate);
});
