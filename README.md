# Sinhala Karaoke Songs 🎵

A complete platform for discovering and exploring Sinhala karaoke songs with both an MCP Server and a modern React web application.

## 🎯 Overview

This repository contains two complementary projects:

1. **MCP Server** - A Model Context Protocol server that provides song data as tools (can be used with Claude or any LLM)
2. **React Web App** - A beautiful, interactive web application for browsing Sinhala karaoke songs with YouTube integration

Both projects share the same database of 10 classic and modern Sinhala songs.

---

## 📦 What's Included

### **MCP Server** (`sinhala-karaoke-mcp/`)
- Node.js-based Model Context Protocol server
- 7 tools for querying song data:
  - `get_song` - Get song by ID
  - `search_songs` - Search by query (English or Sinhala)
  - `get_songs_by_genre` - Filter by music genre
  - `get_songs_by_artist` - Filter by artist name
  - `list_all_songs` - List all available songs
  - `get_genres` - List all music genres
  - `get_artists` - List all artists
- Works with Claude, ChatGPT, and other LLM integrations
- Bilingual support (English & Sinhala)

### **React Web App** (`sinhala-karaoke-app/`)
- Modern React 18 + Vite frontend
- Express.js backend with REST API
- Features:
  - 🎵 Browse all Sinhala karaoke songs
  - 🔍 Real-time search functionality
  - 🎭 Filter by music genre
  - 📱 Fully responsive design (mobile, tablet, desktop)
  - 🎨 Beautiful gradient UI with animations
  - 📋 Detailed song information (lyrics, description, year, etc.)
  - 🎬 YouTube links for each song
  - 🇱🇰 Full Sinhala Unicode support

---

## 🎵 Song Database

10 classic and modern Sinhala songs:

1. **Malwatta** (මල්වත්ත) - Amaradeva
2. **Nanda Malini** (නන්දමාලිනි) - Chitra
3. **Lakshmeme** (ලක්ෂ්මේමෙ) - Victor Ratnayake
4. **Kavi Rae** (කවි රෑ) - Clarence Wijewardene
5. **Ananda Aye** (ආනන්දායෙ) - Neela Wickremasinghe
6. **Chandrika** (චන්ද්‍රිකා) - Sunil Edirisinghe
7. **Sudu Nethi** (සුදු නෙතිහ) - Shantha Kumara
8. **Hira Wena** (හිර වෙනා) - Pandith Amaradeva
9. **Oba Gaana** (ඔබ ගාන) - W.D. Amaradewa
10. **Dina Hase** (දිනා හසෙ) - Tissa Jatawara

---

## 🚀 Quick Start

### **Option 1: Run the Web App (Easiest)**

```bash
cd sinhala-karaoke-app
npm install
npm start
