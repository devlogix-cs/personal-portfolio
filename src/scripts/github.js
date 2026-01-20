// src/scripts/github.js

const GITHUB_USERNAME = "sanjay-1221342"; // 🔴 change if needed

export async function loadGitHubProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=9`
    );

    if (!response.ok) throw new Error("GitHub API error");

    const repos = await response.json();

    if (!repos.length) {
      showFallback(grid);
      return;
    }

    repos.forEach(repo => {
      grid.appendChild(createProjectCard(repo));
    });

    document.getElementById("searchResultsCount").textContent =
      `${repos.length} projects`;

  } catch (err) {
    console.error("❌ GitHub fetch failed:", err);
    showFallback(grid);
  }
}

function createProjectCard(repo) {
  const div = document.createElement("div");
  div.className = "project-card";

  div.innerHTML = `
    <div class="h-48 rounded-2xl bg-slate-700 flex items-center justify-center mb-6">
      <i class="fas fa-code text-3xl text-white/60"></i>
    </div>
    <h3 class="text-2xl font-bold mb-2">${repo.name}</h3>
    <p class="text-white/60 mb-4 line-clamp-2">
      ${repo.description || "No description"}
    </p>
    <div class="flex justify-between items-center text-sm">
      <span>⭐ ${repo.stargazers_count}</span>
      <a href="${repo.html_url}" target="_blank" class="text-blue-400">
        View Code →
      </a>
    </div>
  `;
  return div;
}

function showFallback(grid) {
  grid.innerHTML = `
    <div class="text-center text-white/60 col-span-full">
      Unable to load GitHub projects.
    </div>
  `;
}
