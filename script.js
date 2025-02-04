// Moving "No" Button on Hover
document.getElementById("noButton").addEventListener("mouseover", function() {
    const button = this;
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    button.style.position = "absolute";
    button.style.left = newX + "px";
    button.style.top = newY + "px";
});

// When "Yes" is clicked
document.getElementById("yesButton").addEventListener("click", function () {
    document.getElementById("mainContent").classList.add("hidden"); // Hide question
    document.getElementById("successScreen").classList.remove("hidden"); // Show cat & confetti
    startConfetti(); // Start confetti effect
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
            color: `hsl(${Math.random() * 360}, 100%, 70%)`,
            size: Math.random() * 8 + 2,
            speed: Math.random() * 3 + 1
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((c) => {
            ctx.fillStyle = c.color;
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function updateConfetti() {
        confetti.forEach((c) => {
            c.y += c.speed;
            if (c.y > canvas.height) {
                c.y = 0;
                c.x = Math.random() * canvas.width;
            }
        });
    }

    function animateConfetti() {
        drawConfetti();
        updateConfetti();
        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
}
