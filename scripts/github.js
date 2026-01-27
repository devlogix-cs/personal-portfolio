const GITHUB_USERNAME = "devlogix-cs";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

let allRepos = [];

async function fetchGitHubProjects() {
  const loading = document.getElementById("projects-loading");
  const error = document.getElementById("projects-error");
  const container = document.getElementById("projects-container");

  try {
    const response = await fetch(GITHUB_API_URL);
    if (!response.ok) throw new Error("GitHub API error");

    const repos = await response.json();

    allRepos = repos.filter(repo => !repo.fork);

    renderProjects(allRepos.slice(0, 6));

    loading.classList.add("hidden");
    container.classList.remove("hidden");

  } catch (err) {
    console.error(err);
    loading.classList.add("hidden");
    error.classList.remove("hidden");
  }
}

function renderProjects(repos) {
  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  repos.forEach(repo => {
    const card = document.createElement("div");
    card.className = "project-card fade-in";

    card.innerHTML = `
      <h3 class="project-title">${repo.name}</h3>
      <p class="project-text">
        ${repo.description || "No description provided."}
      </p>

      <div class="mt-4 text-sm flex justify-between text-gray-500">
        <span>⭐ ${repo.stargazers_count}</span>
        <span>🍴 ${repo.forks_count}</span>
        <span>🧠 ${repo.language || "N/A"}</span>
      </div>

      <a href="${repo.html_url}" target="_blank"
        class="inline-block mt-4 text-blue-500 hover:underline">
        View on GitHub →
      </a>
    `;

    container.appendChild(card);
  });
}

function filterProjectsByKeyword(keyword) {
  const filtered = allRepos.filter(repo =>
    (repo.name + repo.description + repo.language)
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  renderProjects(filtered.length ? filtered : allRepos.slice(0, 6));
}
