document.addEventListener("DOMContentLoaded", () => {
  fetchGitHubProjects();

  const voiceBtn = document.getElementById("voice-btn");
  const voiceStatus = document.getElementById("voice-status");

  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    voiceBtn.disabled = true;
    voiceStatus.textContent = "Voice search not supported in this browser.";
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  voiceBtn.addEventListener("click", () => {
    voiceStatus.textContent = "🎧 Listening...";
    recognition.start();
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    voiceStatus.textContent = `Heard: "${transcript}"`;

    filterProjectsByKeyword(transcript);
  };

  recognition.onerror = () => {
    voiceStatus.textContent = "❌ Voice recognition failed.";
  };
});
gsap.utils.toArray("section").forEach(section => {
  gsap.fromTo(
    section,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      }
    }
  );
});
