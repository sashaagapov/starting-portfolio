document.addEventListener("DOMContentLoaded", () => {
  // --- 1. INTRO & CHOICE LOGIC ---
  const intro = document.getElementById("intro-cinematic");
  const typedTextSpan = document.getElementById("typed-text");
  const cursorSpan = document.querySelector(".cursor");
  const choiceContainer = document.getElementById("choice-container");
  const btnRed = document.getElementById("btn-red");
  const btnBlue = document.getElementById("btn-blue");

  const textSequence = [
    "WAKE UP, NEO...",
    "THE MATRIX HAS YOU...",
    "CHOOSE YOUR REALITY.",
  ];
  let lineIndex = 0;
  let charIndex = 0;

  // Typing Effect
  function typeText() {
    if (!typedTextSpan) return;
    if (lineIndex < textSequence.length) {
      if (charIndex < textSequence[lineIndex].length) {
        typedTextSpan.textContent += textSequence[lineIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, Math.random() * 50 + 50);
      } else {
        if (lineIndex < textSequence.length - 1) {
          setTimeout(() => {
            typedTextSpan.textContent = "";
            charIndex = 0;
            lineIndex++;
            typeText();
          }, 1000);
        } else {
          // TEXT FINISHED -> SHOW PILLS
          setTimeout(() => {
            if (cursorSpan) cursorSpan.style.display = "none";
            if (choiceContainer) {
              choiceContainer.style.display = "flex";
            }
          }, 500);
        }
      }
    }
  }

  // Start Typing
  setTimeout(typeText, 1000);

  // --- BUTTON HANDLERS ---

  // RED PILL: OPEN PORTFOLIO
  if (btnRed) {
    btnRed.addEventListener("click", () => {
      // Hide buttons
      choiceContainer.style.display = "none";
      typedTextSpan.textContent = "ACCESS GRANTED.";
      typedTextSpan.style.color = "#0aff5d";

      // Glitch and Open
      intro.classList.add("intro-glitch");
      setTimeout(() => {
        intro.classList.remove("intro-glitch");
        intro.classList.add("intro-fade-out");
        setTimeout(() => {
          intro.style.display = "none";
        }, 800);
      }, 1000);
    });
  }

  // BLUE PILL: REJECT REALITY (Reload)
  if (btnBlue) {
    btnBlue.addEventListener("click", () => {
      choiceContainer.style.display = "none";
      typedTextSpan.textContent = "IGNORANCE IS BLISS...";
      typedTextSpan.style.color = "#00e1ff";

      setTimeout(() => {
        location.reload(); // Reloads page to restart the loop
      }, 1500);
    });
  }

  // --- 2. REST OF THE PORTFOLIO LOGIC ---

  // Matrix BG
  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    const chars = "01010101AGAPOV_EPAM_JS";
    const drops = [];
    const fontSize = 14;
    const columns = window.innerWidth / fontSize;
    for (let i = 0; i < columns; i++) drops[i] = 1;
    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const style = getComputedStyle(document.body);
      const primaryColor =
        style.getPropertyValue("--primary").trim() || "#0aff5d";
      ctx.fillStyle = primaryColor;
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
    }
    setInterval(drawMatrix, 50);
  }

  // Projects Loader
  const projectsData = [
    { title: "Portfolio v1", desc: "HTML/CSS Basics", status: "Completed" },
    { title: "JS Calculator", desc: "DOM Logic", status: "In Progress" },
    { title: "University DB", desc: "C++ Structures", status: "Academic" },
  ];
  async function loadProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;
    container.innerHTML = '<div class="loader"></div>';
    await new Promise((resolve) => setTimeout(resolve, 1500));
    container.innerHTML = "";
    projectsData.forEach((proj) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
                <h3 style="color:#fff; margin-bottom:5px;">${proj.title}</h3>
                <p style="font-size:0.85rem; color:#aaa;">${proj.desc}</p>
                <span style="font-size:0.7rem; background:rgba(10,255,93,0.1); padding:2px 6px; border-radius:4px; margin-top:8px; display:inline-block;">${proj.status}</span>
            `;
      container.appendChild(card);
    });
  }
  loadProjects();
  const refreshBtn = document.getElementById("refresh-btn");
  if (refreshBtn) refreshBtn.addEventListener("click", loadProjects);

  // Terminal
  const termToggle = document.getElementById("terminal-toggle");
  const termModal = document.getElementById("terminal-modal");
  const termInput = document.getElementById("term-input");
  const termOutput = document.getElementById("term-output");
  const closeTerm = document.getElementById("close-terminal");

  function toggleTerminal() {
    if (!termModal) return;
    const isHidden =
      termModal.style.display === "none" || termModal.style.display === "";
    termModal.style.display = isHidden ? "flex" : "none";
    if (isHidden && termInput) setTimeout(() => termInput.focus(), 100);
  }
  if (termToggle) termToggle.addEventListener("click", toggleTerminal);
  if (closeTerm) closeTerm.addEventListener("click", toggleTerminal);
  if (termModal)
    termModal.addEventListener("click", () => {
      if (termInput) termInput.focus();
    });
  if (termInput) {
    termInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const command = this.value.toLowerCase().trim();
        this.value = "";
        processCommand(command);
      }
    });
  }
  function processCommand(cmd) {
    const userLine = document.createElement("div");
    userLine.innerHTML = `<span style="color:var(--primary)">user$</span> ${cmd}`;
    termOutput.appendChild(userLine);
    let response = "";
    switch (cmd) {
      case "help":
        response = "Available: about, skills, contact, clear, date";
        break;
      case "about":
        response = "I am Oleksandr, Software Engineering student.";
        break;
      case "skills":
        response = "[ 'HTML', 'CSS', 'JS', 'C++', 'C#' ]";
        break;
      case "contact":
        response = "Scrolling to contact form...";
        const form = document.querySelector("form");
        if (form) form.scrollIntoView({ behavior: "smooth" });
        break;
      case "date":
        response = new Date().toString();
        break;
      case "clear":
        termOutput.innerHTML = "";
        return;
      default:
        response = `Unknown command: ${cmd}. Type 'help'.`;
    }
    const respLine = document.createElement("div");
    respLine.innerHTML = `<span style="color:#ccc">=> ${response}</span><br><br>`;
    termOutput.appendChild(respLine);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  // Scroll Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  });
  document
    .querySelectorAll(".glass-card")
    .forEach((el) => observer.observe(el));
});
