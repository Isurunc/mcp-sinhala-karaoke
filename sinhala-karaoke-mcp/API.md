# API Reference - Sinhala Karaoke MCP Server

Complete API reference for all tools provided by the Sinhala Karaoke MCP Server.

## Overview

The server exposes 7 tools through the MCP protocol:

1. `get_song` - Retrieve a specific song by ID
2. `search_songs` - Search songs by query
3. `get_songs_by_genre` - Filter songs by genre
4. `get_songs_by_artist` - Get all songs by an artist
5. `list_all_songs` - List all songs
6. `get_artists` - List all unique artists
7. `get_genres` - List all available genres

---

## Tool Specifications

### get_song

Retrieve detailed information about a specific song by its ID.

#### Request

```json
{
  "name": "get_song",
  "arguments": {
    "id": "1"
  }
}
```

#### Response (Success)

```
ID: 1
Title: Malwatta (මල්වත්ත)
Artist: Amaradeva (අමරදේව)
Album: Classical Sinhala
Duration: 245 seconds
Genre: Classical
Year: 1975
Description: A classical Sinhala masterpiece by Amaradeva
Lyrics: මල්වත්ත මල්වත්ත...
```

#### Response (Not Found)

```
Song with ID "999" not found.
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique song identifier (1-10) |

#### HTTP Equivalent

```
GET /api/songs/{id}
```

---

### search_songs

Search for songs by title, artist name, or keyword.

#### Request

```json
{
  "name": "search_songs",
  "arguments": {
    "query": "Victor Ratnayake"
  }
}
```

#### Response (Found)

```
Found 1 song(s):

ID: 3
Title: Lakshmeme (ලක්ෂ්මේමෙ)
Artist: Victor Ratnayake (වික්ටර් රත්නයකෙ)
Album: Legacy
Duration: 198 seconds
Genre: Modern Classical
Year: 1985
Description: A romantic Sinhala song by Victor Ratnayake
```

#### Response (Not Found)

```
No songs found matching query: "NonexistentSong"
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search term (title, artist, genre, or keyword) |

#### Search Coverage

Searches across:
- Song titles (English)
- Song titles (Sinhala script)
- Artist names (English)
- Artist names (Sinhala script)
- Genres

#### HTTP Equivalent

```
GET /api/songs/search?q={query}
```

---

### get_songs_by_genre

Retrieve all songs in a specific genre.

#### Request

```json
{
  "name": "get_songs_by_genre",
  "arguments": {
    "genre": "Romantic"
  }
}
```

#### Response (Found)

```
Found 2 song(s) in "Romantic" genre:

ID: 3
Title: Lakshmeme (ලක්ෂ්මේමෙ)
...

ID: 7
Title: Sudu Nethi (සුදු නෙතිහ)
...
```

#### Response (Not Found)

```
No songs found in genre: "Jazz"
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `genre` | string | Yes | Genre name (case-insensitive) |

#### Available Genres

| Genre | Count | Examples |
|-------|-------|----------|
| Classical | 2 | Malwatta, Hira Wena |
| Traditional | 1 | Nanda Malini |
| Modern Classical | 1 | Lakshmeme |
| Light Music | 2 | Kavi Rae, Oba Gaana |
| Devotional | 2 | Ananda Aye, (varies) |
| Romantic | 3 | Lakshmeme, Chandrika, Sudu Nethi |
| Motivational | 1 | Dina Hase |

#### HTTP Equivalent

```
GET /api/songs/genre/{genre}
```

---

### get_songs_by_artist

Retrieve all songs by a specific artist.

#### Request (English Name)

```json
{
  "name": "get_songs_by_artist",
  "arguments": {
    "artist": "Amaradeva"
  }
}
```

#### Request (Sinhala Name)

```json
{
  "name": "get_songs_by_artist",
  "arguments": {
    "artist": "අමරදේවා"
  }
}
```

#### Response (Found)

```
Found 2 song(s) by Amaradeva:

ID: 1
Title: Malwatta (මල්වත්ත)
...

ID: 8
Title: Hira Wena (හිර වෙනා)
...
```

#### Response (Not Found)

```
No songs found by artist: "Unknown Artist"
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `artist` | string | Yes | Artist name (English or Sinhala script) |

#### Artists in Database

- Amaradeva (අමරදේවා)
- Chitra (චිත්‍රා)
- Victor Ratnayake (වික්ටර් රත්නයකෙ)
- Clarence Wijewardene (ක්ලෙරන්ස් විජේවර්ධනෙ)
- Neela Wickremasinghe (නීල විකේ‍්‍රමසිංහෙ)
- Sunil Edirisinghe (සුනිල් එදිරිසිංහෙ)
- Shantha Kumara (ශාන්ත කුමාර)
- Pandith Amaradeva (පණ්ඩිත් අමරදේවා)
- W.D. Amaradewa (ඩබ්ලිউ.ඩී. අමරදේවා)
- Tissa Jatawara (තිස්ස ජටවර)

#### HTTP Equivalent

```
GET /api/songs/artist/{artist}
```

---

### list_all_songs

Retrieve a list of all songs in the database with basic information.

#### Request

```json
{
  "name": "list_all_songs",
  "arguments": {}
}
```

#### Response

```
Total songs: 10

1. Malwatta (මල්වත්ත) - Amaradeva
2. Nanda Malini (නන්දමාලිනි) - Chitra
3. Lakshmeme (ලක්ෂ්මේමෙ) - Victor Ratnayake
...
```

#### Parameters

None - no parameters required

#### Response Fields

- Total song count
- List of songs with:
  - Song ID
  - Title (English)
  - Title (Sinhala)
  - Artist name

#### HTTP Equivalent

```
GET /api/songs
```

---

### get_artists

Retrieve a list of all unique artists in the database.

#### Request

```json
{
  "name": "get_artists",
  "arguments": {}
}
```

#### Response

```
Total artists: 10

Amaradeva (අමරදේවා)
Chitra (චිත්‍රා)
Clarence Wijewardene (ක්ලෙරන්ස් විජේවර්ධනෙ)
...
```

#### Parameters

None - no parameters required

#### Response Format

- Total artist count
- Alphabetically sorted list
- Names shown in English and Sinhala

#### HTTP Equivalent

```
GET /api/artists
```

---

### get_genres

Retrieve a list of all available genres in the database.

#### Request

```json
{
  "name": "get_genres",
  "arguments": {}
}
```

#### Response

```
Available genres:

Classical
Devotional
Light Music
Modern Classical
Motivational
Romantic
Traditional
```

#### Parameters

None - no parameters required

#### Response Format

- Alphabetically sorted list of unique genres
- No duplicates

#### HTTP Equivalent

```
GET /api/genres
```

---

## Data Models

### Song Object

```typescript
interface KaraokeSong {
  id: string;              // Unique identifier
  title: string;           // English title
  titleSinhala: string;    // Sinhala script title
  artist: string;          // English artist name
  artistSinhala: string;   // Sinhala script artist name
  album: string;           // Album name
  duration: number;        // Duration in seconds
  genre: string;           // Music genre
  year: number;            // Year of release
  description: string;     // Short description
  lyrics?: string;         // Optional song lyrics
}
```

### Song Example

```json
{
  "id": "3",
  "title": "Lakshmeme",
  "titleSinhala": "ලක්ෂ්මේමෙ",
  "artist": "Victor Ratnayake",
  "artistSinhala": "වික්ටර් රත්නයකෙ",
  "album": "Legacy",
  "duration": 198,
  "genre": "Modern Classical",
  "year": 1985,
  "description": "A romantic Sinhala song by Victor Ratnayake"
}
```

---

## Response Format

All responses are returned as text with structured information:

```
Field: Value
Field: Value
```

### Success Response Format

```
ID: {id}
Title: {title} ({titleSinhala})
Artist: {artist} ({artistSinhala})
Album: {album}
Duration: {duration} seconds
Genre: {genre}
Year: {year}
Description: {description}
[Lyrics: {lyrics}]
```

### Error Response Format

```
{Error message or "No results found" message}
```

---

## Error Handling

### Common Errors

#### Song Not Found

**Trigger**: `get_song` with invalid ID

```
Song with ID "999" not found.
```

#### No Search Results

**Trigger**: `search_songs` with query that doesn't match anything

```
No songs found matching query: "xyz"
```

#### Invalid Genre

**Trigger**: `get_songs_by_genre` with non-existent genre

```
No songs found in genre: "Jazz"
```

#### Invalid Artist

**Trigger**: `get_songs_by_artist` with non-existent artist

```
No songs found by artist: "Unknown"
```

#### Server Error

**Trigger**: Internal server error

```
Error executing tool {tool_name}: {error message}
```

---

## Usage Examples

### Example 1: Find a Song by ID

```json
Request:
{
  "name": "get_song",
  "arguments": {"id": "1"}
}

Response:
ID: 1
Title: Malwatta (මල්වත්ත)
Artist: Amaradeva (අමරදේවා)
Album: Classical Sinhala
Duration: 245 seconds
Genre: Classical
Year: 1975
Description: A classical Sinhala masterpiece by Amaradeva
```

### Example 2: Search for Romantic Songs

```json
Request:
{
  "name": "search_songs",
  "arguments": {"query": "romantic"}
}

Response:
Found 3 song(s):
... (3 songs with romantic genre)
```

### Example 3: Get All Songs by Artist

```json
Request:
{
  "name": "get_songs_by_artist",
  "arguments": {"artist": "Amaradeva"}
}

Response:
Found 2 song(s) by Amaradeva:
... (2 songs)
```

### Example 4: List All Genres

```json
Request:
{
  "name": "get_genres",
  "arguments": {}
}

Response:
Available genres:
Classical
Devotional
Light Music
Modern Classical
Motivational
Romantic
Traditional
```

---

## Rate Limiting

Currently: **No rate limiting** (local MCP server)

When deployed to cloud services, rate limiting may be implemented.

---

## Caching

Currently: **No caching** (data loaded from memory)

All responses are generated in real-time from the in-memory database.

---

## Versioning

Current API Version: **1.0.0**

API follows semantic versioning:
- **Major**: Breaking changes (e.g., tool removal)
- **Minor**: New tools or parameters
- **Patch**: Bug fixes and improvements

---

## Future Enhancements

Planned additions to API:

- [ ] Pagination for large result sets
- [ ] Advanced filtering (year range, duration range)
- [ ] Sorting options (by year, duration, title)
- [ ] Faceted search
- [ ] Related songs recommendation
- [ ] User ratings and reviews
- [ ] Lyrics search
- [ ] Audio file integration
- [ ] Performance metrics

---

## FAQ

**Q: How many songs are in the database?**
A: Currently 10 songs. Easily expandable by adding to `src/data.ts`.

**Q: Can I add more songs?**
A: Yes! Edit `src/data.ts` and rebuild the project.

**Q: Does it support Unicode characters?**
A: Yes! Full Sinhala Unicode script support.

**Q: Is there a limit to search results?**
A: No, all matching results are returned.

**Q: Can I use it offline?**
A: Yes! It's a local MCP server with no external dependencies.

---

For more information, see:
- [README.md](README.md) - Overview and features
- [QUICKSTART.md](QUICKSTART.md) - Setup guide
- [INTEGRATION.md](INTEGRATION.md) - Integration methods
- [TESTING.md](TESTING.md) - Testing guide
