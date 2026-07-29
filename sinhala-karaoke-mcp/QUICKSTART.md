# Quick Start Guide - Sinhala Karaoke MCP Server

Get the Sinhala Karaoke MCP Server up and running in 5 minutes!

## Prerequisites

- Node.js 20+ installed
- npm 10+ installed
- Basic terminal/command line knowledge

## Installation Steps

### 1. Download/Clone the Server

```bash
# Clone from repository (or download the files)
git clone https://github.com/yourusername/sinhala-karaoke-mcp.git
cd sinhala-karaoke-mcp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Server

```bash
npm run build
```

You should now have a `dist/` folder with compiled JavaScript.

### 4. Configure Claude Desktop

#### For macOS/Linux:

```bash
# Open Claude config file
nano ~/.config/Claude/claude_desktop_config.json
```

#### For Windows:

Use any text editor to open:
```
%APPDATA%\Claude\claude_desktop_config.json
```

#### Add This Configuration:

```json
{
  "mcpServers": {
    "sinhala-karaoke": {
      "command": "node",
      "args": ["/full/path/to/sinhala-karaoke-mcp/dist/index.js"]
    }
  }
}
```

**Important**: Replace `/full/path/to/` with the actual full path to your `sinhala-karaoke-mcp` directory.

### 5. Restart Claude Desktop

Close and reopen Claude Desktop. The MCP server should now be loaded!

## Test It Out

In Claude, try these prompts:

1. **Search for a song**:
   - "Find songs by Victor Ratnayake"
   - "Search for romantic songs"

2. **Get genre information**:
   - "Show me all devotional songs"
   - "What classical songs are available?"

3. **Get all songs**:
   - "List all karaoke songs you have"

4. **Get artist information**:
   - "Who are all the artists in your database?"

## Troubleshooting

### Server Not Appearing in Claude

1. Check the path in your config file - it must be an absolute path
2. Make sure you ran `npm run build`
3. Restart Claude Desktop completely
4. Check Claude's error logs (if available)

### Path Issues

- **Windows**: Use forward slashes `/` or escaped backslashes `\\`
- **Example**: `C:/Users/YourName/Documents/sinhala-karaoke-mcp/dist/index.js`

### Need Help?

1. Verify files exist: `ls dist/index.js` (macOS/Linux) or `dir dist\index.js` (Windows)
2. Test the server: `npm run dev`
3. Check the README.md for more details

## Next Steps

- Add more songs to `src/data.ts`
- Customize the song database
- Integrate with other MCP servers
- Build applications that use this data

## Commands Reference

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode
npm run dev

# Run compiled server
npm start
```

---

**Ready to use Sinhala karaoke songs with Claude!** 🎵
