# Sinhala Karaoke Songs 🎵

A complete platform for discovering and exploring Sinhala karaoke songs with both an MCP Server and a modern React web application.

## 🎯 Overview

This repository contains two complementary projects:

1. **MCP Server** - A Model Context Protocol server that provides song data as tools (can be used with Claude or any LLM)
2. **React Web App** - A beautiful, interactive web application for browsing Sinhala karaoke songs with YouTube integration

Both projects share the same database of 10 classic and modern Sinhala songs.

---

## 📦 What's Included

### **MCP Server** (sinhala-karaoke-mcp)
- Node.js-based Model Context Protocol server
- 7 tools for querying song data
- Works with Claude, ChatGPT, and other LLM integrations
- Bilingual support (English & Sinhala)

### **React Web App** (sinhala-karaoke-app)
- Modern React 18 + Vite frontend
- Express.js backend with REST API
- Beautiful gradient UI with animations
- YouTube integration for each song
- Full Sinhala Unicode support

---

## 🎵 Song Database

10 classic and modern Sinhala songs with complete metadata (titles, artists, album, duration, genre, year, description, lyrics, and YouTube links).

---

## 🚀 Quick Start

### **Option 1: Run the Web App (Easiest)**

```bash
cd sinhala-karaoke-app
npm install
npm start

Then open: http://localhost:3000

### **Option 2: Use the MCP Server**

```bash
cd sinhala-karaoke-mcp
npm install
npm run build
npm start
```

### **Option 3: Run Both Projects**

**Terminal 1:**
```bash
cd sinhala-karaoke-mcp
npm install
npm run build
npm start
\\\

**Terminal 2:**
\\\ash
cd sinhala-karaoke-app
npm install
npm start
\\\

---

## 📋 Installation

### Prerequisites
- Node.js 20+
- npm or yarn
- Modern web browser

### Setup Steps

\\\ash
git clone https://github.com/Isurunc/mcp-sinhala-karaoke.git
cd mcp-sinhala-karaoke

# For Web App
cd sinhala-karaoke-app
npm install
npm start

# For MCP Server
cd sinhala-karaoke-mcp
npm install
npm run build
npm start
\\\

---

## ✨ Features

### Web App Features
✅ Browse all songs in beautiful grid layout  
✅ Real-time search by song title or artist  
✅ Filter by music genre  
✅ View detailed song information  
✅ Read complete song lyrics  
✅ YouTube integration (watch on YouTube)  
✅ Responsive mobile-friendly design  
✅ Beautiful gradient UI with smooth animations  
✅ Full Sinhala Unicode text support  

### MCP Server Features
✅ 7 powerful tools for data queries  
✅ Integration with Claude and other LLMs  
✅ Fast song search and filtering  
✅ Bilingual support (English & Sinhala)  

---

## 💻 Tech Stack

### MCP Server
- Node.js + TypeScript
- MCP SDK (Model Context Protocol)
- JSON-RPC 2.0

### Web App
- React 18 + Vite
- Express.js backend
- CSS3 animations
- Axios

---

## 🔗 Web App API Routes

\\\
GET  /api/songs/list              # Get all songs
GET  /api/songs/search?q=query    # Search songs
GET  /api/songs/:id               # Get song by ID
GET  /api/genres                  # Get all genres
GET  /api/genres/:genre           # Get songs by genre
GET  /api/artists                 # Get all artists
GET  /api/artists/:artist         # Get songs by artist
\\\

---

## 🌐 Deployment

### Deploy Web App to Vercel

\\\ash
cd sinhala-karaoke-app
npm install -g vercel
vercel
\\\

### Deploy to Netlify

\\\ash
cd sinhala-karaoke-app
npm run build

---

## 📞 Support

For issues or questions:
1. Check the individual README files in each project folder
2. Review the API documentation
3. Open an issue on GitHub

---

## 📄 License

MIT License - Free to use for personal or commercial purposes

---

## 🎵 Made with ❤️ for Sinhala music lovers

**Star this repo if you found it helpful!**
