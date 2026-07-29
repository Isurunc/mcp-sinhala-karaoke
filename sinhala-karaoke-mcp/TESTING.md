# Testing Guide - Sinhala Karaoke MCP Server

This guide explains how to test the Sinhala Karaoke MCP Server.

## Manual Testing

### 1. Start the Server in Development Mode

```bash
npm run dev
```

You should see:
```
Sinhala Karaoke MCP Server running on stdio
```

### 2. Test Each Tool

Once the server is running, you can test each tool by simulating MCP client calls.

#### Test: search_songs

```
Input: {"name": "search_songs", "arguments": {"query": "Victor"}}
Expected: Song information for songs by Victor Ratnayake
```

#### Test: get_song

```
Input: {"name": "get_song", "arguments": {"id": "1"}}
Expected: Complete details for song ID 1 (Malwatta)
```

#### Test: get_songs_by_genre

```
Input: {"name": "get_songs_by_genre", "arguments": {"genre": "Romantic"}}
Expected: List of all romantic songs
```

#### Test: get_songs_by_artist

```
Input: {"name": "get_songs_by_artist", "arguments": {"artist": "Amaradeva"}}
Expected: All songs by Amaradeva
```

#### Test: list_all_songs

```
Input: {"name": "list_all_songs", "arguments": {}}
Expected: All 10 songs in the database
```

#### Test: get_artists

```
Input: {"name": "get_artists", "arguments": {}}
Expected: Unique list of all artists
```

#### Test: get_genres

```
Input: {"name": "get_genres", "arguments": {}}
Expected: Unique list of all genres
```

## Automated Testing

### Sample Test Cases

Create a `test/server.test.ts` file:

```typescript
import { sinhalaSongs, searchSongs, getSongsByGenre, getSongsByArtist } from "../src/data";

describe("Sinhala Karaoke MCP Server", () => {
  describe("Data Functions", () => {
    it("should find all songs", () => {
      expect(sinhalaSongs.length).toBeGreaterThan(0);
    });

    it("should search songs by query", () => {
      const results = searchSongs("Victor");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].artist).toContain("Victor");
    });

    it("should get songs by genre", () => {
      const results = getSongsByGenre("Romantic");
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].genre).toBe("Romantic");
    });

    it("should get songs by artist", () => {
      const results = getSongsByArtist("Amaradeva");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should handle case-insensitive search", () => {
      const results = searchSongs("victor");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should return empty array for no matches", () => {
      const results = searchSongs("NonexistentSong123");
      expect(results.length).toBe(0);
    });
  });

  describe("Sinhala Text Support", () => {
    it("should support Sinhala search", () => {
      const results = searchSongs("මල්වත්ත");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should display Sinhala characters correctly", () => {
      const song = sinhalaSongs[0];
      expect(song.titleSinhala).toBeDefined();
      expect(song.artistSinhala).toBeDefined();
    });
  });
});
```

## Integration Testing

### Test with Claude Desktop

1. Build the server:
   ```bash
   npm run build
   ```

2. Configure Claude Desktop with the server

3. In Claude, test each capability:

   **Test 1**: Search functionality
   ```
   User: Find all songs by Amaradeva
   Expected: Server returns Amaradeva's songs
   ```

   **Test 2**: Genre filtering
   ```
   User: Show me devotional songs
   Expected: Server returns all devotional songs
   ```

   **Test 3**: Sinhala support
   ```
   User: Find the song "මල්වත්ත"
   Expected: Server returns Malwatta song details
   ```

### Test with Claude API

```python
import anthropic

client = anthropic.Anthropic()

tools = [
    {
        "name": "search_songs",
        "description": "Search for songs",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"}
            },
            "required": ["query"]
        }
    }
]

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    tools=tools,
    messages=[
        {"role": "user", "content": "Find romantic songs"}
    ]
)

print(response)
```

## Performance Testing

### Test Response Times

```bash
# Test search performance
time npm run dev &
# Then send multiple search requests
# Measure average response time
```

### Expected Performance

- Search query: < 100ms
- Genre filter: < 50ms
- Artist filter: < 50ms
- List all: < 10ms

## Edge Case Testing

### Test Cases

1. **Empty Query**
   ```
   Input: search_songs("")
   Expected: May return all songs or empty
   ```

2. **Invalid Song ID**
   ```
   Input: get_song("999")
   Expected: "Song not found" message
   ```

3. **Case Sensitivity**
   ```
   Input: search_songs("AMARADEVA")
   Expected: Should find songs (case-insensitive)
   ```

4. **Special Characters**
   ```
   Input: search_songs("ශ්‍යන්ති")
   Expected: Handle Sinhala diacritics properly
   ```

5. **Unicode Support**
   ```
   Input: search_songs("ගී ගැයුම්")
   Expected: Return results with Sinhala text
   ```

## Regression Testing

After adding new songs or features:

1. Verify all existing songs still appear in results
2. Test each genre still returns correct songs
3. Verify artist searches still work correctly
4. Test Sinhala text searches

## Continuous Integration

### CI Pipeline

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
      - run: npm install
      - run: npm run build
      - run: npm test
```

## Debugging

### Enable Debug Logging

Add to `src/index.ts`:

```typescript
const DEBUG = process.env.DEBUG === "true";

server.setRequestHandler("tools/call", async (request) => {
  if (DEBUG) {
    console.error(`[DEBUG] Tool called: ${request.params.name}`);
    console.error(`[DEBUG] Args:`, request.params.arguments);
  }

  // ... rest of handler
});
```

Run with debugging:

```bash
DEBUG=true npm run dev
```

### Test Tools Directly

```typescript
import { searchSongs, getSongsByGenre } from "./src/data";

// Test in Node REPL
const results = searchSongs("Victor");
console.log(results);

const genre = getSongsByGenre("Romantic");
console.log(genre);
```

## Checklist Before Release

- [ ] All tools return correct data
- [ ] Sinhala text displays correctly
- [ ] Search is case-insensitive
- [ ] Error handling works
- [ ] Performance is acceptable
- [ ] Documentation is accurate
- [ ] Tests pass
- [ ] No console errors or warnings

## Troubleshooting Test Issues

### UTF-8 Encoding Issues

```bash
# Ensure file encoding
file -i src/data.ts
# Should show: charset=utf-8
```

### Search Not Finding Results

```typescript
// Debug search function
const query = "test";
const results = sinhalaSongs.filter(s => 
  s.title.toLowerCase().includes(query.toLowerCase())
);
console.log(results);
```

### Tool Not Recognized

```typescript
// Verify tool name matches exactly
const toolName = "search_songs"; // Must match exactly
```

---

For more information, see [README.md](README.md) and [INTEGRATION.md](INTEGRATION.md)
