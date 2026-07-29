# Integration Guide - Sinhala Karaoke MCP Server

Complete guide for integrating the Sinhala Karaoke MCP Server into different environments.

## Integration Methods

### 1. Claude Desktop Application

The easiest way for most users.

#### Configuration File Location

- **macOS**: `~/.config/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

#### Configuration Example

```json
{
  "mcpServers": {
    "sinhala-karaoke": {
      "command": "node",
      "args": ["/Users/username/sinhala-karaoke-mcp/dist/index.js"]
    }
  }
}
```

#### Verification Steps

1. Build the server: `npm run build`
2. Update the config file with correct path
3. Restart Claude Desktop
4. Check Claude's settings → Extensions to verify server loaded
5. Ask Claude to search for a song

---

### 2. Claude Code (Web)

Use the MCP server with Claude Code on web.

#### Setup

1. Get the server URL or path
2. Add to your Claude Code workspace configuration
3. Access tools through Claude's interface

---

### 3. Claude API / Anthropic SDK

For programmatic access using the Anthropic Python or JavaScript SDK.

#### Python Example

```python
from anthropic import Anthropic
import json
import subprocess
import sys

# Start the MCP server as a subprocess
server_process = subprocess.Popen(
    [sys.executable, "-m", "path.to.mcp_server"],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE
)

client = Anthropic()

# Define tool schema (from the MCP server)
tools = [
    {
        "name": "search_songs",
        "description": "Search for Sinhala karaoke songs",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Search query"
                }
            },
            "required": ["query"]
        }
    },
    # ... other tools
]

# Make API call
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    tools=tools,
    messages=[
        {
            "role": "user",
            "content": "Find me romantic Sinhala songs"
        }
    ]
)

print(response)
```

#### JavaScript/TypeScript Example

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { spawn } from "child_process";

// Start MCP server
const server = spawn("node", ["dist/index.js"], {
  cwd: "/path/to/sinhala-karaoke-mcp",
});

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const tools = [
  {
    name: "search_songs",
    description: "Search for Sinhala karaoke songs",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query",
        },
      },
      required: ["query"],
    },
  },
  // ... other tools
];

async function chat(userMessage: string) {
  const response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    tools: tools,
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  console.log(response);
}

chat("Find romantic Sinhala songs");

// Cleanup
server.kill();
```

---

### 4. Custom Applications

Build your own application using the MCP server.

#### Node.js Application Example

```typescript
import { exec } from "child_process";
import { Client } from "@modelcontextprotocol/sdk";

// Initialize client
const client = new Client({
  name: "my-app",
  version: "1.0.0",
});

// Connect to MCP server
client.connect("stdio", {
  command: "node",
  args: ["path/to/sinhala-karaoke-mcp/dist/index.js"],
});

// Use the tools
async function searchSongs(query: string) {
  const result = await client.call("tools/call", {
    name: "search_songs",
    arguments: { query },
  });

  return result;
}

// Example usage
searchSongs("Victor Ratnayake").then((songs) => {
  console.log("Found songs:", songs);
});
```

#### Web Application (via Backend Proxy)

```javascript
// Backend endpoint that calls the MCP server
app.post("/api/search-songs", async (req, res) => {
  const { query } = req.body;

  // Call MCP server tool
  const result = await callMCPTool("search_songs", { query });

  res.json(result);
});

// Frontend
fetch("/api/search-songs", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "romantic" }),
})
  .then((r) => r.json())
  .then((songs) => {
    console.log("Songs found:", songs);
  });
```

---

### 5. Docker Container

Run the MCP server in a Docker container.

#### Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Building and Running

```bash
# Build image
docker build -t sinhala-karaoke-mcp .

# Run container
docker run -d \
  --name sinhala-karaoke \
  -p 3000:3000 \
  sinhala-karaoke-mcp

# Test
curl http://localhost:3000/health
```

---

## Tool Schema Reference

All tools that should be exposed in your integration:

### Tool Definitions

```json
{
  "tools": [
    {
      "name": "search_songs",
      "description": "Search for Sinhala karaoke songs by title, artist, or keyword",
      "input_schema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string"
          }
        },
        "required": ["query"]
      }
    },
    {
      "name": "get_song",
      "description": "Get a specific song by ID",
      "input_schema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          }
        },
        "required": ["id"]
      }
    },
    {
      "name": "get_songs_by_genre",
      "description": "Get songs by genre",
      "input_schema": {
        "type": "object",
        "properties": {
          "genre": {
            "type": "string"
          }
        },
        "required": ["genre"]
      }
    },
    {
      "name": "get_songs_by_artist",
      "description": "Get all songs by a specific artist",
      "input_schema": {
        "type": "object",
        "properties": {
          "artist": {
            "type": "string"
          }
        },
        "required": ["artist"]
      }
    },
    {
      "name": "list_all_songs",
      "description": "List all available songs"
    },
    {
      "name": "get_artists",
      "description": "Get all unique artists"
    },
    {
      "name": "get_genres",
      "description": "Get all available genres"
    }
  ]
}
```

---

## Common Integration Patterns

### Pattern 1: Song Search & Display

```typescript
// User searches for a song
const query = "Amaradeva";

// Call MCP tool
const results = await mcpClient.call("tools/call", {
  name: "search_songs",
  arguments: { query },
});

// Display results
displaySongResults(results);
```

### Pattern 2: Genre-Based Playlist Generation

```typescript
// Generate playlist by genre
const genre = "Romantic";

const songs = await mcpClient.call("tools/call", {
  name: "get_songs_by_genre",
  arguments: { genre },
});

// Create playlist
const playlist = createPlaylist(genre, songs);
```

### Pattern 3: Artist Discovery

```typescript
// Get all artists
const artists = await mcpClient.call("tools/call", {
  name: "get_artists",
});

// Get songs by selected artist
const selectedArtist = artists[0];
const artistSongs = await mcpClient.call("tools/call", {
  name: "get_songs_by_artist",
  arguments: { artist: selectedArtist },
});
```

---

## Deployment Recommendations

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

### Monitoring

Monitor the MCP server logs for any issues:

```bash
# With error logging
npm start 2>&1 | tee server.log

# Check for errors
tail -f server.log | grep -i error
```

---

## Troubleshooting Integration Issues

### Issue: Server Not Found

**Solution**: Verify the absolute path and file permissions

```bash
# Check if file exists
ls -la /path/to/dist/index.js

# Make executable
chmod +x /path/to/dist/index.js
```

### Issue: Tool Not Responding

**Solution**: Ensure server is properly built and started

```bash
# Rebuild
npm run build

# Verify build output
ls -la dist/

# Test server manually
npm run dev
```

### Issue: Sinhala Characters Not Displaying

**Solution**: Ensure UTF-8 encoding throughout your pipeline

```typescript
// Set encoding in Node.js
process.stdout.setEncoding("utf8");

// Ensure database uses UTF-8
// All .ts files should be saved as UTF-8
```

---

## Next Steps

- Integrate with your application
- Customize song database
- Add additional features
- Deploy to production
- Monitor and maintain

For more help, see [README.md](README.md) and [QUICKSTART.md](QUICKSTART.md)
