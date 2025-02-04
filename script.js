// Ensure the page starts on the question screen
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("mainContent").classList.remove("hidden");  // Show question screen
    document.getElementById("successScreen").classList.add("hidden");   // Hide success screen
});

// Moving "No" Button on Hover
document.getElementById("noButton").addEventListener("mouseover", function () {
    const button = this;
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    button.style.position = "absolute";
    button.style.left = newX + "px";
    button.style.top = newY + "px";
});

// When "Yes" is clicked, switch to success screen and show confetti
document.getElementById("yesButton").addEventListener("click", function () {
    document.getElementById("mainContent").classList.add("hidden");    // Hide the question screen
    document.getElementById("successScreen").classList.remove("hidden"); // Show the cat GIF
    startConfetti(); // Start confetti animation
});

// Confetti Effect
function startConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * confettiCount,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((c) => {
            ctx.beginPath();
            ctx.fillStyle = c.color;
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
            ctx.fill();
        });

        updateConfetti();
    }

    function updateConfetti() {
        confetti.forEach((c) => {
            c.y += Math.sin(c.d) + 1;
            c.x += Math.cos(c.d);
            c.tiltAngle += c.tiltAngleIncremental;
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}
