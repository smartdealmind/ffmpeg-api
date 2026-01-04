# 🚀 Quick Start Guide - Railway FFmpeg API for $5/month

This guide will get your FFmpeg API running on Railway in **under 10 minutes**.

## 📋 What You're Building

1. **FFmpeg API** on Railway ($5/month) - compresses audio files
2. **Cloudflare Worker** (free) - transcribes audio with Whisper AI
3. **Total Cost**: $5/month for unlimited audio compression + transcription

---

## ⚡ Quick Deploy (10 Minutes)

### Step 1: Push FFmpeg API to GitHub (3 minutes)

```bash
# Navigate to the ffmpeg-api folder
cd ffmpeg-api

# Initialize git repo
git init
git add .
git commit -m "FFmpeg API for Railway"

# Create a new repo on GitHub
# Go to: https://github.com/new
# Name it: ffmpeg-api
# Don't initialize with README

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/ffmpeg-api.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Railway (2 minutes)

1. Go to **[railway.app/new](https://railway.app/new)**
2. Click **"Deploy from GitHub repo"**
3. Select your **ffmpeg-api** repository
4. Railway auto-detects Dockerfile and starts deploying
5. Wait ~3 minutes for first deployment

### Step 3: Get Your Railway URL (1 minute)

1. Click on your deployed service
2. Go to **Settings** tab
3. Scroll to **Networking** section
4. Click **"Generate Domain"**
5. Copy the URL (e.g., `https://ffmpeg-api-production-abc123.up.railway.app`)

### Step 4: Configure Cloudflare Worker (2 minutes)

```bash
# Navigate to your Cloudflare Worker directory
cd ../cloudflare-worker  # or wherever you have it

# Copy the updated worker file
cp ../ffmpeg-api/whisper-worker-railway.js ./src/index.js
# OR just use the whisper-worker-railway.js as your worker

# Set Railway FFmpeg API URL
wrangler secret put FFMPEG_API_URL
# Paste your Railway URL when prompted

# Set OpenAI API key (if not already set)
wrangler secret put OPENAI_API_KEY
# Paste your OpenAI key from https://platform.openai.com/api-keys

# Deploy
wrangler deploy
```

### Step 5: Test It! (2 minutes)

1. Visit your Cloudflare Worker URL
2. Upload an audio file (try a large one, > 25MB)
3. Click "Transcribe Audio"
4. Watch it compress (if needed) and transcribe
5. 🎉 Success!

---

## 🧪 Test Commands

### Test FFmpeg API Directly

```bash
# Health check
curl https://your-railway-url.up.railway.app/health

# Compress a file
curl -X POST https://your-railway-url.up.railway.app/compress \
  -F "file=@test.mp3" \
  --output compressed.mp3

# Check compressed file size
ls -lh compressed.mp3
```

### Test End-to-End

1. Upload a 50MB audio file to your Cloudflare Worker
2. Check Railway logs to see compression happen
3. Verify transcription returns successfully

---

## 💰 Cost Breakdown

**Your Setup:**
- Railway FFmpeg API: **$5/month** (unlimited compressions)
- Cloudflare Worker: **Free** (100K requests/day)
- OpenAI Whisper: **$0.006/minute** of audio

**Example monthly cost:**
- 100 hours of audio transcribed = $36 OpenAI
- Railway hosting = $5
- **Total: ~$41/month** for 100 hours

**Compared to CloudConvert:**
- CloudConvert: $9/month base + per-conversion fees
- Your solution: $5/month flat + OpenAI usage
- **Savings: $4-100+/month** depending on volume

---

## 🔍 Monitoring & Logs

### View Railway Logs

**In Dashboard:**
1. Go to railway.app
2. Click your ffmpeg-api project
3. Click "Deployments"
4. Click "View Logs"

**Via CLI:**
```bash
railway login
railway logs
```

### View Cloudflare Worker Logs

```bash
wrangler tail
```

---

## 🛠️ Troubleshooting

### Railway deployment failed
- Check GitHub repo is public
- Verify Dockerfile exists
- Check Railway logs for specific error

### "Compression failed" error
- Verify Railway URL is correct
- Test Railway API directly (see test commands above)
- Check Railway logs for errors

### "File too large" even after compression
- File might be extremely large (>200MB)
- Check compression settings in server.js
- Consider increasing bitrate for better compression

### OpenAI API error
- Verify OPENAI_API_KEY is correct
- Check OpenAI account has credits
- Verify file format is supported

---

## 📊 What's Next?

✅ **You're done!** Your system is running.

**Optional improvements:**
1. Add custom domain to Railway
2. Set up monitoring/alerts
3. Customize compression settings
4. Add API authentication
5. Scale to Railway Pro if needed

---

## 🎯 Success Criteria

You'll know it's working when:
- [ ] Railway URL returns `{"status":"healthy"}` at `/health`
- [ ] Cloudflare Worker UI loads
- [ ] Upload small file (< 25MB) → transcribes without compression
- [ ] Upload large file (> 25MB) → shows "compressing" → transcribes
- [ ] Railway logs show compression activity
- [ ] Total monthly cost is ~$5-10 vs $50+ with other solutions

---

## 💪 You Did It!

You're now running a **production-grade audio transcription system** for just $5/month on Railway + OpenAI usage.

**Cost comparison:**
- ❌ CloudConvert: $9-18/month + limited conversions
- ❌ AWS Lambda + FFmpeg: $20-50/month + complexity
- ✅ **Your solution: $5/month + unlimited** 🎉

Questions? Issues? Check the main README.md or Railway logs!
