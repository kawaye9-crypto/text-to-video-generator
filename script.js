const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const videoPreview = document.getElementById('videoPreview');
const textPrompt = document.getElementById('textPrompt');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const progressPct = document.getElementById('progressPct');
const previewPane = document.getElementById('previewPane');

const API_URL = "http://localhost:4000/api/generate-video";

generateBtn.addEventListener('click', () => {
  const prompt = textPrompt.value.trim();
  if (!prompt) {
    alert("Please enter a prompt.");
    return;
  }

  // Reset UI states
  progressBar.style.width = "0%";
  progressPct.innerText = "0%";
  progressContainer.classList.remove("hidden");
  previewPane.classList.add("hidden");
  downloadBtn.classList.add("hidden");
  downloadBtn.removeAttribute('href');
  downloadBtn.removeAttribute('download');

  generateBtn.disabled = true;
  generateBtn.innerText = "Generating...";

  // Simulated progress for frontend
  let fakeProgress = 0;
  const progressInterval = setInterval(() => {
    fakeProgress += Math.floor(Math.random() * 6) + 2;
    if (fakeProgress > 95) fakeProgress = 95;
    progressBar.style.width = fakeProgress + "%";
    progressPct.innerText = fakeProgress + "%";
  }, 300);

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  })
    .then(res => {
      if (!res.ok) throw new Error("Network response was not OK");
      return res.json();
    })
    .then(data => {
      clearInterval(progressInterval);
      progressBar.style.width = "100%";
      progressPct.innerText = "100%";

      const videoUrl = data.videoUrl;
      videoPreview.src = videoUrl;
      videoPreview.load();
      previewPane.classList.remove("hidden");

      downloadBtn.href = videoUrl;
      downloadBtn.download = "generated-video.mp4";
      downloadBtn.classList.remove("hidden");

      generateBtn.disabled = false;
      generateBtn.innerText = "Generate Video";
    })
    .catch(err => {
      clearInterval(progressInterval);
      console.error("Error:", err);
      alert("Failed to generate video.");
      generateBtn.disabled = false;
      generateBtn.innerText = "Generate Video";
    });
});
