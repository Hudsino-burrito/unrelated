document.addEventListener("DOMContentLoaded", function () {
    // Ensure only the start screen is visible at the beginning
    document.getElementById("mainContent").classList.remove("hidden");
    document.getElementById("successScreen").classList.add("hidden");

    // iPhone Safari fix for autoplay audio
    const bgMusic = document.getElementById("bgMusic");
    document.body.addEventListener("click", function playAudio() {
        bgMusic.play();
        document.body.removeEventListener("click", playAudio); // Play once when interacted
    });
});

// Moving "No" Button on Hover (Safari-friendly)
document.getElementById("noButton").addEventListener("mouseover", function () {
    const button = this;
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    button.style.position = "fixed"; // Works better on Safari
    button.style.left = newX + "px";
    button.style.top = newY + "px";
});

// When "Yes" is clicked, switch to success screen
document.getElementById("yesButton").addEventListener("click", function () {
    document.getElementById("mainContent").classList.add("hidden");
    document.getElementById("successScreen").classList.remove("hidden");
    startConfetti();
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

