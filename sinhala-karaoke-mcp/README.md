# Sinhala Karaoke MCP Server

A Model Context Protocol (MCP) server that provides Sinhala karaoke song data and search capabilities. Anyone can use this server to access a database of Sinhala songs with metadata like artist, duration, genre, and descriptions.

## Features

- **Song Database**: Curated collection of 10+ classic and modern Sinhala songs
- **Multiple Search Methods**: Search by title, artist, genre, or keywords
- **Bilingual Support**: Songs include both English and Sinhala script titles and artist names
- **Detailed Metadata**: Each song includes duration, genre, year, album, and description
- **Easy Integration**: Standard MCP tool interface for seamless integration

## Available Tools

### `get_song`
Retrieve a specific song by its ID.
- **Input**: `id` (string) - Song ID
- **Returns**: Complete song details including title, artist, duration, genre, and metadata

### `search_songs`
Search for songs by title, artist, or keyword.
- **Input**: `query` (string) - Search query (works with English or Sinhala text)
- **Returns**: List of matching songs with their details

### `get_songs_by_genre`
Get all songs in a specific genre.
- **Input**: `genre` (string) - Genre name
- **Available genres**: Classical, Traditional, Modern Classical, Light Music, Devotional, Romantic, Motivational
- **Returns**: List of songs matching the genre

### `get_songs_by_artist`
Get all songs by a specific artist.
- **Input**: `artist` (string) - Artist name (English or Sinhala)
- **Returns**: All songs by the specified artist

### `list_all_songs`
List all available songs in the database.
- **Returns**: Complete inventory of songs with IDs and basic information

### `get_artists`
Get all unique artists in the database.
- **Returns**: Sorted list of all artists

### `get_genres`
Get all available music genres.
- **Returns**: Sorted list of all genres in the database

## Installation

### As an MCP Server (for Claude/LLMs)

1. **Clone or download** the server:
   ```bash
   git clone https://github.com/yourusername/sinhala-karaoke-mcp.git
   cd sinhala-karaoke-mcp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the server**:
   ```bash
   npm run build
   ```

### For Claude Code / Claude Desktop

Add the server to your `claude_desktop_config.json`:

**macOS/Linux**: `~/.config/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "sinhala-karaoke": {
      "command": "node",
      "args": ["/path/to/sinhala-karaoke-mcp/dist/index.js"]
    }
  }
}
```

Replace `/path/to/sinhala-karaoke-mcp` with the actual path to your server installation.

### For Claude API / Anthropic SDK

Use with the Anthropic SDK's MCP client:

```python
from anthropic import Anthropic

client = Anthropic()

# Configure MCP server
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    tools=[...],  # Add tool definitions from this server
    messages=[
        {
            "role": "user",
            "content": "Find me some romantic Sinhala songs"
        }
    ]
)
```

## Development

### Prerequisites
- Node.js 20+ (recommended 22+)
- npm 10+

### Scripts

```bash
npm install                    # Install dependencies
npm run build                  # Compile TypeScript to JavaScript
npm run dev                    # Run in development mode with tsx
npm start                      # Run compiled server
```

### Project Structure

```
sinhala-karaoke-mcp/
├── src/
│   ├── index.ts             # Main MCP server implementation
│   ├── data.ts              # Song database and search functions
│   └── types.ts             # TypeScript interfaces (if needed)
├── dist/                     # Compiled JavaScript (generated)
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Usage Examples

### Example 1: Search for a specific song
```
User: Find songs by Victor Ratnayake
Tool Call: search_songs("Victor Ratnayake")
Response: Returns "Lakshmeme" with full details
```

### Example 2: Get songs by genre
```
User: What devotional songs do you have?
Tool Call: get_songs_by_genre("Devotional")
Response: Returns all devotional songs in the database
```

### Example 3: Get all artists
```
User: Show me all available artists
Tool Call: get_artists()
Response: Lists all unique artists in the collection
```

## Adding Songs to the Database

To add new songs:

1. Edit `src/data.ts`
2. Add a new entry to the `sinhalaSongs` array:
   ```typescript
   {
     id: "11",
     title: "Song Title",
     titleSinhala: "ගීතයේ නම",
     artist: "Artist Name",
     artistSinhala: "කලාකරුගේ නම",
     album: "Album Name",
     duration: 240,
     genre: "Genre",
     year: 2024,
     description: "Song description",
     lyrics: "Optional lyrics"
   }
   ```
3. Rebuild: `npm run build`

## Supported Sinhala Text

The server supports full Unicode Sinhala script (Sinhalese) for:
- Song titles
- Artist names
- Album names
- Descriptions
- Lyrics

Example: "ශ්‍රී ලංකා", "ගී ගැයුම්", "සිංහල"

## API Response Format

All tool calls return text content in the following format:

```
ID: 1
Title: Song Title (ගීතයේ නම)
Artist: Artist Name (කලාකරුගේ නම)
Album: Album Name
Duration: 245 seconds
Genre: Classical
Year: 1975
Description: A descriptive text about the song
Lyrics: [Optional] Song lyrics or excerpt
```

## Limitations

- Current database contains 10 curated songs (easily expandable)
- No audio playback capability (metadata only)
- No user ratings or reviews system

## Future Enhancements

- [ ] Audio file integration
- [ ] User playlist management
- [ ] Song ratings and reviews
- [ ] Lyrics with timestamps
- [ ] Singer information (biography, career timeline)
- [ ] Song recommendations based on similar songs
- [ ] Performance history and chart data
- [ ] Integration with music streaming platforms

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-songs`)
3. Add your songs to `src/data.ts`
4. Commit your changes
5. Push to your fork
6. Create a Pull Request

Please ensure:
- All Sinhala text is in proper Unicode format
- Song metadata is accurate and complete
- Code follows TypeScript strict mode
- All changes are tested

## License

MIT License - feel free to use and modify this server for your projects

## Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check the [MCP documentation](https://modelcontextprotocol.io)
- Review the code comments for technical details

## Related Resources

- [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
- [Claude API Documentation](https://docs.anthropic.com)
- [Node.js MCP SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk)

---

**Made with ❤️ for Sinhala music lovers**
