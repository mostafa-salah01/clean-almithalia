import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Serve static assets with correct caching and headers
app.use(express.static(__dirname, {
  extensions: ['html', 'htm']
}));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'clean-almithalia' });
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`ready in 10ms`);
  console.log(`Local: http://localhost:${PORT}/`);
  console.log(`Network: http://${HOST}:${PORT}/`);
  console.log(`Clean Almithalia server running on port ${PORT}`);
});
