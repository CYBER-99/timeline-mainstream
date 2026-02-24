// ===============================
// ELEMENTS
// ===============================

const passwordSection = document.getElementById("passwordSection");
const mainSection = document.getElementById("mainSection");

const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const passwordError = document.getElementById("passwordError");

const output = document.getElementById("output");
const choiceBtn = document.getElementById("choiceBtn");

const terminalFrame = document.getElementById("terminalFrame");
const terminalScreen = document.getElementById("terminalScreen");

const memoryLayer = document.getElementById("memoryLayer");
const anniversaryLayer = document.getElementById("anniversaryLayer");

const ambientSound = document.getElementById("ambientSound");
const clickSound = document.getElementById("clickSound");
const swellSound = document.getElementById("swellSound");
const transitionSound = document.getElementById("transitionSound");

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

const PASSWORD = "1805";

// ===============================
// AUDIO SETTINGS
// ===============================

ambientSound.volume = 0.35;
clickSound.volume = 0.4;
swellSound.volume = 0.6;
transitionSound.volume = 0.6;

// ===============================
// STARFIELD
// ===============================

let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStars() {
  stars = [];
  const count = Math.floor(window.innerWidth / 6);

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.3
    });
  }
}
createStars();

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.fillStyle = "white";
    ctx.globalAlpha = Math.random();
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
  });

  requestAnimationFrame(animateStars);
}
animateStars();

// ===============================
// UTILITIES
// ===============================

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollToBottom() {
  terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

function typeLine(text, className = "") {
  return new Promise(resolve => {

    const line = document.createElement("div");
    line.className = "line " + className;
    output.appendChild(line);

    let i = 0;

    function type() {
      if (i < text.length) {
        line.textContent += text.charAt(i);
        i++;
        scrollToBottom();
        setTimeout(type, 35);
      } else {
        resolve();
      }
    }

    type();
  });
}

// ===============================
// PASSWORD LOGIC
// ===============================

unlockBtn.addEventListener("click", () => {

  if (passwordInput.value === PASSWORD) {

    clickSound.play().catch(()=>{});
    ambientSound.play().catch(()=>{});

    passwordSection.classList.remove("active");
    passwordSection.classList.add("hidden");

    mainSection.classList.remove("hidden");
    mainSection.classList.add("active");

    runCinematic();

  } else {
    passwordError.classList.remove("hidden");
  }
});

// ===============================
// MAIN CINEMATIC
// ===============================

async function runCinematic() {

  await wait(800);

  await typeLine("You searched for the alternate timeline.");
  await wait(1200);

  await typeLine("Simulating reality without her...");
  await wait(1000);

  await typeLine("Career trajectory: Stable.");
  await wait(800);

  await typeLine("Emotional index: Controlled.");
  await wait(800);

  await typeLine("Growth rate: Linear.");
  await wait(1000);

  await typeLine("Analyzing deeper variables...");
  await wait(1000);

  transitionSound.play().catch(()=>{});
  document.body.classList.add("glitch");
  await wait(400);
  document.body.classList.remove("glitch");

  await typeLine("ERROR: Core variable missing.", "error");
  await wait(1200);

  await typeLine("Identifying missing entity...");
  await wait(1000);

  await typeLine("Mah Raichuu.", "success");
  await wait(1800);

  await typeLine("Recalculating alternate timelines...");
  await wait(1000);

  await typeLine("All alternate timelines unstable.", "error");
  await wait(1500);

  await typeLine("Only one stable timeline detected.");
  await wait(1200);

  document.body.classList.add("warm");

  await typeLine("The one where she exists.");
  await wait(1500);

  await typeLine("Trajectory confirmed.");
  await wait(1500);

  choiceBtn.classList.remove("hidden");
}

// ===============================
// FINAL CHOICE
// ===============================

choiceBtn.addEventListener("click", async () => {

  clickSound.play().catch(()=>{});
  swellSound.play().catch(()=>{});

  choiceBtn.disabled = true;
  choiceBtn.style.opacity = "0";
  choiceBtn.style.transition = "opacity 1.5s ease";

  await wait(1500);

  await typeLine("Evolution synchronized.");
  await wait(1200);

  await typeLine("There was never an alternate timeline.");
  await wait(1500);

  await typeLine("Only this one.");
  await wait(1500);

  await typeLine("And I choose it.");
  await wait(2000);

  // Fade terminal frame
  terminalFrame.classList.add("fade-out");

  await wait(2500);

  // Reveal memory
  memoryLayer.classList.add("show");

  await wait(3000);

  // Reveal anniversary text
  anniversaryLayer.classList.add("show");
});