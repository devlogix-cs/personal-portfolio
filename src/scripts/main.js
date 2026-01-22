/* ======================================================
   MAIN JS – FINAL STABLE VERSION
   ====================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ================= THEME TOGGLE ================= */
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  if (toggleBtn) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      root.classList.toggle("dark", savedTheme === "dark");
    } else {
      root.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }

    toggleBtn.addEventListener("click", () => {
      const isDark = root.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  /* ================= GITHUB PROJECTS ================= */
  if (typeof fetchGitHubProjects === "function") {
    fetchGitHubProjects();
  }

  /* ================= ANALYTICS CHART ================= */
  const ctx = document.getElementById("analyticsChart");
  if (ctx && typeof Chart !== "undefined") {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Visitors",
            data: [12, 19, 8, 15, 22, 30, 28],
            tension: 0.4,
            fill: true
          },
          {
            label: "Interactions",
            data: [5, 9, 4, 10, 14, 20, 18],
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#9ca3af" } }
        },
        scales: {
          x: { ticks: { color: "#9ca3af" } },
          y: { ticks: { color: "#9ca3af" } }
        }
      }
    });
  }

  /* ================= AI CHATBOT ================= */
  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const chatMessages = document.getElementById("chat-messages");

  if (chatToggle && chatWindow && chatInput && chatSend && chatMessages) {
    chatToggle.addEventListener("click", () => {
      chatWindow.classList.toggle("hidden");
    });

    chatSend.addEventListener("click", sendMessage);
    chatInput.addEventListener("keydown", e => {
      if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;

      addMessage("You", text);
      chatInput.value = "";

      setTimeout(() => {
        addMessage("Bot", getBotReply(text));
      }, 500);
    }

    function addMessage(sender, text) {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${sender}:</strong> ${text}`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotReply(msg) {
      const q = msg.toLowerCase();

      if (q.includes("skill"))
        return "I have skills in HTML, CSS, Tailwind, JavaScript, Git, DSA, and Node.js basics.";
      if (q.includes("project"))
        return "I’ve built an AI portfolio, GitHub API projects, and student utility apps.";
      if (q.includes("contact"))
        return "You can contact me using the form below or via my GitHub profile.";
      if (q.includes("who") || q.includes("about"))
        return "I'm Sanjay, a CSE student passionate about full-stack development and AI.";

      return "🤖 Try asking about my skills, projects, or contact info!";
    }
  }

  /* ================= CONTACT FORM (WORKING TEST MODE) ================= */
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Message sent successfully!");
      contactForm.reset();
    });
  }
});

/* ================= SERVICE WORKER ================= */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => console.log("Service Worker registered"))
      .catch(err => console.error("SW registration failed", err));
  });
}
