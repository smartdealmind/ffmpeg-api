# 🚀 Deploy Your FFmpeg API to Railway - Next Steps

## ✅ Files Ready

Your FFmpeg API is ready in `/ffmpeg-api/` with:
- ✅ `Dockerfile` - Railway deployment config
- ✅ `server.js` - Express API with FFmpeg compression
- ✅ `package.json` - Node.js dependencies
- ✅ `README.md` - Full documentation
- ✅ `QUICKSTART.md` - 10-minute deployment guide

---

## 🎯 Deploy Now (5 Minutes)

### Step 1: Push to GitHub (2 minutes)

```bash
cd /Users/kokougbeve/Documents/Scripts_Apps/MindForge/ffmpeg-api

# Rename branch to main
git branch -M main

# Go to GitHub and create a new repo:
# https://github.com/new
# Name: ffmpeg-api
# Description: FFmpeg Compression API for MindForge Whisper transcription
# Don't initialize with README

# Then push:
git remote add origin https://github.com/YOUR_USERNAME/ffmpeg-api.git
git push -u origin main
```

### Step 2: Deploy to Railway (1 minute)

1. Go to: https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Select **"ffmpeg-api"** repository
4. Railway auto-detects Dockerfile → Click **"Deploy"**
5. Wait ~2 minutes ⏱️

### Step 3: Get Your Railway URL (1 minute)

1. Click on your deployed service
2. Go to **Settings** tab
3. Scroll to **Networking** → Click **"Generate Domain"**
4. Copy the URL (e.g., `https://ffmpeg-api-production-abc123.up.railway.app`)

### Step 4: Test It (30 seconds)

```bash
# Test health endpoint
curl https://your-railway-url.up.railway.app/health

# Should return: {"status":"healthy"}
```

### Step 5: Configure MindForge Worker (1 minute)

```bash
cd /Users/kokougbeve/Documents/Scripts_Apps/MindForge/cloudflare-worker

# Set your Railway FFmpeg API URL
wrangler secret put FFMPEG_API_URL
# Paste your Railway URL (e.g., https://ffmpeg-api-production-abc123.up.railway.app)

# Make sure OpenAI key is set
wrangler secret put OPENAI_API_KEY
# Paste your OpenAI key from https://platform.openai.com/api-keys

# Deploy
wrangler deploy
```

---

## 🧪 Test End-to-End

1. Visit: https://mindforge-aud.pages.dev/transcribe
2. Upload your **45MB audio file**
3. Watch it work! 🎉

You should see:
- ✅ "Large file detected - will be compressed"
- ✅ Processing...
- ✅ Transcription complete with compression stats

---

## 📊 What You'll Save

| Service | Cost | Your Benefit |
|---------|------|--------------|
| **Your Railway API** | $5/mo | Unlimited compressions |
| CloudConvert | $9/mo | Saves $4/month |
| AWS Lambda | $20+/mo | Saves $15+/month |

**Annual savings: $48-180+** 💰

---

## 🔍 Monitor & Debug

### View Railway Logs

**In Dashboard:**
- Go to railway.app
- Click your ffmpeg-api service
- Click "Deployments" → "View Logs"

**Via CLI:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and view logs
railway login
railway logs
```

### View Worker Logs

```bash
cd /Users/kokougbeve/Documents/Scripts_Apps/MindForge/cloudflare-worker
wrangler tail
```

---

## 🎉 Success Indicators

You'll know it's working when:

- [ ] Railway health check returns `{"status":"healthy"}`
- [ ] Worker logs show: `[Transcribe] Compressing 45262075 byte file...`
- [ ] Worker logs show: `[Transcribe] Compressed to ~12MB bytes`
- [ ] Worker logs show: `[Transcribe] Success! Duration: 120s, Language: en`
- [ ] UI shows transcription with compression stats

---

## 📞 Need Help?

- **Railway Docs**: https://docs.railway.app
- **Check Logs**: Railway dashboard → Deployments → View Logs
- **Test Directly**: `curl YOUR_RAILWAY_URL/health`
- **Full Guide**: See `QUICKSTART.md` in ffmpeg-api folder

---

**Ready?** Start with Step 1 above! 🚀

