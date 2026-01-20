document.addEventListener("DOMContentLoaded", () => {
  /* ================= THEME TOGGLE ================= */
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

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

  /* ================= GITHUB PROJECTS ================= */
  fetchGitHubProjects();

  /* ================= ANALYTICS CHART ================= */
  const ctx = document.getElementById("analyticsChart");

  if (ctx) {
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
          legend: {
            labels: {
              color: "#9ca3af"
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#9ca3af" }
          },
          y: {
            ticks: { color: "#9ca3af" }
          }
        }
      }
    });
  }
});
