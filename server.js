// FFmpeg API Server for Railway
// Simple HTTP server that accepts audio files and compresses them

const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const upload = multer({ dest: '/tmp/uploads/' });
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'FFmpeg Compression API',
    version: '1.0.0',
    endpoints: {
      compress: 'POST /compress',
      health: 'GET /health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Compression endpoint
app.post('/compress', upload.single('file'), async (req, res) => {
  const inputFile = req.file?.path;
  
  if (!inputFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const outputFile = `/tmp/compressed-${uuidv4()}.mp3`;

  try {
    // Compress audio: 64k bitrate, 16kHz sample rate, mono
    const ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:a libmp3lame -b:a 64k -ar 16000 -ac 1 "${outputFile}"`;
    
    await new Promise((resolve, reject) => {
      exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
          console.error('FFmpeg error:', stderr);
          reject(error);
        } else {
          resolve();
        }
      });
    });

    // Read compressed file
    const compressedData = await fs.readFile(outputFile);
    
    // Clean up
    await fs.unlink(inputFile);
    await fs.unlink(outputFile);

    // Send compressed file
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="compressed.mp3"'
    });
    res.send(compressedData);

  } catch (error) {
    console.error('Compression error:', error);
    
    // Clean up on error
    try {
      await fs.unlink(inputFile);
      await fs.unlink(outputFile).catch(() => {});
    } catch {}

    res.status(500).json({
      error: 'Compression failed',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`FFmpeg API server running on port ${PORT}`);
  console.log('Ready to compress audio files!');
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});
