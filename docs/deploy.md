# Deployment Guide for Futures Universal Funding (FUF)

This guide covers all deployment options for the FUF beta application.

## Table of Contents
1. [GitHub Pages (Static Deployment)](#github-pages)
2. [Node.js/Express Server Deployment](#nodejs-deployment)
3. [Docker Deployment](#docker-deployment)
4. [Vercel Deployment](#vercel-deployment)
5. [Netlify Deployment](#netlify-deployment)

---

## GitHub Pages (Static Deployment)

**Already Configured!** The repository is set up for GitHub Pages deployment.

### Current Status
- ✅ Files in root: `index.html`, `style.css`, `script.js`
- ✅ Assets folder contains: `logo.png`, `mascot.png`, `qr.png`
- ✅ GitHub Actions workflow configured

### Access Your Site
Your site is deployed at: `https://jholman0645.github.io/FuturesUniversalFunding_FUF-/`

### Manual Updates
To redeploy:
1. Push changes to the `main` branch
2. GitHub Actions will automatically rebuild and deploy
3. Check deployment status in the **Actions** tab

---

## Node.js/Express Server Deployment

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager

### Setup Instructions

1. **Create package.json** (in project root):

```json
{
  "name": "futures-universal-funding",
  "version": "1.0.0",
  "description": "FUF Beta - Cross-chain DeFi platform",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

2. **Create server.js** (in project root):

```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`FUF Beta Server running on http://localhost:${PORT}`);
});
```

3. **Install dependencies**:

```bash
npm install
```

4. **Run locally**:

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

5. **Access locally**: Open `http://localhost:3000`

### Deploy to Cloud Platforms

#### Heroku
```bash
# Install Heroku CLI, then:
heroku create fuf-beta
git push heroku main
heroku open
```

#### Railway
1. Connect GitHub repo to Railway
2. Railway auto-detects Node.js
3. Deploy automatically

---

## Docker Deployment

### Create Dockerfile (in project root):

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Create docker-compose.yml:

```yaml
version: '3.8'
services:
  fuf-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./assets:/app/assets
```

### Build and Run:

```bash
# Build image
docker build -t fuf-beta .

# Run container
docker run -p 3000:3000 fuf-beta

# Or use docker-compose
docker-compose up
```

---

## Vercel Deployment

### Method 1: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Method 2: GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (leave empty for static)
   - **Output Directory**: `./`
4. Deploy!

### Create vercel.json (optional):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## Netlify Deployment

### Method 1: Drag & Drop

1. Go to [netlify.com](https://netlify.com)
2. Drag your project folder to the deploy zone
3. Done!

### Method 2: GitHub Integration

1. Connect your GitHub repository
2. Configure:
   - **Branch**: main
   - **Build command**: (leave empty)
   - **Publish directory**: ./
3. Deploy

### Create netlify.toml:

```toml
[build]
  publish = "."
  command = ""

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Environment Variables

For production deployments, consider adding:

- `NODE_ENV=production`
- API keys for Web3 providers (Infura, Alchemy)
- Contract addresses
- Network RPC endpoints

---

## Testing Checklist

- [ ] Logo and mascot images load correctly
- [ ] Wallet connection works (MetaMask/Web3)
- [ ] All buttons are functional
- [ ] Donation wallet addresses display correctly
- [ ] Repository links work
- [ ] Owner signature visible in footer
- [ ] Mobile responsive design
- [ ] Cross-browser compatibility

---

## Troubleshooting

### Images not loading?
- Check asset paths are relative: `assets/logo.png`
- Verify images exist in the assets folder
- Check file permissions

### Wallet not connecting?
- Ensure MetaMask or Web3 wallet is installed
- Check browser console for errors
- Test on different browsers

### GitHub Pages 404 error?
- Ensure index.html is in root
- Check GitHub Pages settings in repo settings
- Wait 2-3 minutes after pushing changes

---

## Support

For issues or questions:
- Open an issue: https://github.com/jholman0645/FuturesUniversalFunding_FUF-/issues
- View repository: https://github.com/jholman0645/FuturesUniversalFunding_FUF-

---

**Created by John Erick Holman**  
© 2025 Futures Universal Funding
