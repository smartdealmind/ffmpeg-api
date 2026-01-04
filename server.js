// Enhanced FFmpeg API Server with Noise Removal
// Optimized for interview/podcast transcription

const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const upload = multer({ dest: '/tmp/uploads/' });
const PORT = process.env.PORT || 3000;

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Enhanced FFmpeg Compression API',
    version: '2.0.0',
    features: [
      'Audio compression',
      'Noise reduction',
      'Voice enhancement',
      'Interview optimization'
    ],
    endpoints: {
      compress: 'POST /compress',
      'compress-interview': 'POST /compress-interview',
      health: 'GET /health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Standard compression endpoint
app.post('/compress', upload.single('file'), async (req, res) => {
  return handleCompression(req, res, false);
});

// Interview-optimized compression with noise removal
app.post('/compress-interview', upload.single('file'), async (req, res) => {
  return handleCompression(req, res, true);
});

async function handleCompression(req, res, interviewMode = false) {
  const inputFile = req.file?.path;
  
  if (!inputFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const outputFile = `/tmp/compressed-${uuidv4()}.mp3`;

  try {
    let ffmpegCommand;
    
    if (interviewMode) {
      // Interview mode: Aggressive noise reduction + voice enhancement
      ffmpegCommand = `ffmpeg -i "${inputFile}" \\
        -af "highpass=f=200,lowpass=f=3000,afftdn=nf=-25,volume=2,speechnorm=e=50:r=0.0001:l=1" \\
        -codec:a libmp3lame \\
        -b:a 64k \\
        -ar 16000 \\
        -ac 1 \\
        "${outputFile}"`;
    } else {
      // Standard mode: Basic compression
      ffmpegCommand = `ffmpeg -i "${inputFile}" \\
        -codec:a libmp3lame \\
        -b:a 64k \\
        -ar 16000 \\
        -ac 1 \\
        "${outputFile}"`;
    }
    
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
      'Content-Disposition': 'attachment; filename="compressed.mp3"',
      'X-Processing-Mode': interviewMode ? 'interview' : 'standard'
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
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Enhanced FFmpeg API server running on port ${PORT}`);
  console.log('Features: Noise reduction, Voice enhancement, Interview optimization');
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});
