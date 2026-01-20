// src/scripts/main.js

import { loadGitHubProjects } from "./github.js";
import { initVoiceSearch } from "./voiceSearch.js";
import { initThemeToggle } from "./themeToggle.js";
import { trackVisitor } from "./analytics.js";
import { initCharts } from "./charts.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("🚀 Portfolio initializing...");

  // Show sections first
  document.getElementById("projects")?.classList.remove("hidden");
  document.getElementById("analytics")?.classList.remove("hidden");

  // Init core features
  initThemeToggle();
  trackVisitor();

  // Load GitHub projects
  await loadGitHubProjects();

  // Optional features
  initVoiceSearch();
  initCharts();

  console.log("✅ Portfolio fully initialized");
});
