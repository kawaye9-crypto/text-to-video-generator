function simulateVideoGeneration(prompt, onProgress) {
    return new Promise((resolve) => {
      const steps = 20;
      let current = 0;
  
      const interval = setInterval(() => {
        current++;
        const percent = Math.min(100, Math.floor((current / steps) * 100));
        onProgress(percent);
  
        if (current >= steps) {
          clearInterval(interval);
          const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
          resolve(videoUrl);
        }
      }, 300);
    });
  }
  
  module.exports = { simulateVideoGeneration };
  