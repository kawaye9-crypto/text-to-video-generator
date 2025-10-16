const express = require('express');
const cors = require('cors');
const { simulateVideoGeneration } = require('./videoSimulator');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/api/generate-video', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }

  try {
    await simulateVideoGeneration(prompt, (pct) => {
      // In real app: broadcast progress via WebSocket/SSE
      console.log(`Progress: ${pct}%`);
    });

    res.json({
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      progress: 100
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Video generation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
