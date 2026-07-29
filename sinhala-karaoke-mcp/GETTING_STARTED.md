# Getting Started with Sinhala Karaoke MCP Server

Welcome! This document helps you get up and running in under 5 minutes.

## What You've Got

A complete, production-ready MCP server that provides Sinhala karaoke song data. It includes:

✅ **10+ songs** with full metadata
✅ **7 powerful tools** for searching and browsing
✅ **Complete documentation** (4000+ lines)
✅ **Ready to deploy** anywhere
✅ **Fully extensible** - easy to add more songs

## 30-Second Overview

The MCP server is a Node.js application that:
1. Runs as a background service
2. Exposes tools for song operations
3. Integrates with Claude and other AI systems
4. Provides fast, local access to Sinhala song data

## Installation (Step-by-Step)

### Step 1: Install Node.js

If you don't have Node.js installed:
- Download from https://nodejs.org/ (version 20+ recommended)
- Install and verify: `node --version`

### Step 2: Install Dependencies

Open terminal/command prompt in the project directory:

```bash
npm install
```

This installs the MCP SDK and other dependencies.

### Step 3: Build the Server

```bash
npm run build
```

This compiles TypeScript to JavaScript. You'll get a `dist/` folder.

### Step 4: Get the Full Path

Find the full path to your server:

**Windows**: Open File Explorer, right-click `dist/index.js`, copy path
**macOS/Linux**: Run: `pwd` to see current path

Example: `/Users/username/sinhala-karaoke-mcp`

### Step 5: Configure Claude

#### For Claude Desktop

**Windows Users**:
1. Open `%APPDATA%\Claude\claude_desktop_config.json`
2. Add this (replacing `/path` with your actual path):
```json
{
  "mcpServers": {
    "sinhala-karaoke": {
      "command": "node",
      "args": ["D:\\Your\\Full\\Path\\sinhala-karaoke-mcp\\dist\\index.js"]
    }
  }
}
```

**macOS/Linux Users**:
1. Open `~/.config/Claude/claude_desktop_config.json`
2. Add this (replacing path):
```json
{
  "mcpServers": {
    "sinhala-karaoke": {
      "command": "node",
      "args": ["/your/full/path/sinhala-karaoke-mcp/dist/index.js"]
    }
  }
}
```

### Step 6: Restart Claude

- Close Claude completely
- Reopen Claude
- The MCP server should now be loaded!

## Test It Out

In Claude, try these prompts:

1. **"Find songs by Victor Ratnayake"**
   - Should return his romantic songs

2. **"Show me all devotional songs"**
   - Should list devotional music

3. **"List all genres available"**
   - Should show 7 genres

4. **"Get me song ID 1"**
   - Should return Malwatta

## Troubleshooting

### Claude Doesn't See the Server

**Check**:
1. Did you build? (`npm run build`)
2. Is the path correct in config?
3. Is the path absolute (full path)?
4. Did you restart Claude?

**Windows Path Tips**:
- Use forward slashes: `D:/Users/name/...`
- Or escaped backslashes: `D:\\Users\\name\\...`

### Port Already in Use

This is a stdio server - doesn't use ports. If you see port errors, they're not related.

### Node Command Not Found

**Windows**: Restart terminal after installing Node.js
**macOS/Linux**: Check PATH: `echo $PATH`

## Next Steps

### To Learn More

1. **[README.md](README.md)** - Features and overview
2. **[API.md](API.md)** - All tools explained
3. **[INTEGRATION.md](INTEGRATION.md)** - How to use it
4. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Add your songs

### To Add Songs

Edit `src/data.ts` and add to the `sinhalaSongs` array:

```typescript
{
  id: "11",
  title: "Your Song",
  titleSinhala: "ඔබගේ ගීතය",
  artist: "Artist Name",
  artistSinhala: "කලාකරුගේ නම",
  album: "Album Name",
  duration: 240,
  genre: "Romantic",
  year: 2024,
  description: "Your description"
}
```

Then rebuild: `npm run build`

### To Deploy

The server works with:
- Claude Desktop (native)
- Claude API (programmatic)
- Custom applications (Node.js, Python, etc.)
- Docker (containerized)
- Web apps (via backend proxy)

See [INTEGRATION.md](INTEGRATION.md) for specific setups.

## Common Questions

**Q: Can I use it without Claude?**
A: Yes! It's a standard MCP server. Any MCP client can use it.

**Q: Can I modify the songs?**
A: Yes! Edit `src/data.ts` and rebuild.

**Q: Can I add 100 more songs?**
A: Yes! It's designed to scale. Just add to the data file.

**Q: Does it require an internet connection?**
A: No! It's completely local and offline.

**Q: Can I share it with others?**
A: Yes! Share the entire folder or push to GitHub.

## Quick Reference

```bash
# Setup
npm install                 # Install once
npm run build              # Compile (after edits)

# Testing
npm run dev                # Run in test mode
npm start                  # Run compiled version

# Maintenance
npm run format             # Format code
npm run lint              # Check code quality
```

## Architecture Overview

```
You
  ↓ (in Claude: "Find songs...")
Claude
  ↓
MCP Protocol
  ↓
Sinhala Karaoke Server
  ├─ Tool 1: Search
  ├─ Tool 2: Get song
  ├─ Tool 3: Browse genres
  └─ ... more tools
  ↓
Database (10+ songs)
  ↓
Results back to Claude
```

## Project Files Explained

| File | Purpose |
|------|---------|
| `src/index.ts` | The server itself |
| `src/data.ts` | Song database |
| `dist/` | Compiled code (auto-generated) |
| `package.json` | Dependencies |
| `README.md` | Full documentation |
| `API.md` | Technical API reference |
| `QUICKSTART.md` | 5-minute setup |
| `INTEGRATION.md` | Integration guides |

## Support

If you get stuck:

1. Check [QUICKSTART.md](QUICKSTART.md)
2. Review [INTEGRATION.md](INTEGRATION.md)
3. See [API.md](API.md) for tool details
4. Read error messages carefully

## What's Next?

You're all set! Now:

1. ✅ You've built the server
2. ✅ You've configured Claude
3. ✅ You've tested it

**Start using it!** Ask Claude anything about Sinhala karaoke songs.

---

## One More Thing

**Want to contribute?**

Adding songs is easy:
1. Edit `src/data.ts`
2. Add your song to the array
3. Run `npm run build`

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

**Enjoy your Sinhala karaoke songs with Claude!** 🎵

Need help? Read the docs or check troubleshooting above.
