import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Import data directly from MCP server
const songs = [
  { id: "1", title: "Malwatta", titleSinhala: "මල්වත්ත", artist: "Amaradeva", artistSinhala: "අමරදේවා", album: "Classical Sinhala", duration: 245, genre: "Classical", year: 1975, description: "A classical Sinhala masterpiece by Amaradeva", lyrics: "මල්වත්ත මල්වත්ත...", youtubeUrl: "https://www.youtube.com/results?search_query=Malwatta+Amaradeva+Sinhala+karaoke" },
  { id: "2", title: "Nanda Malini", titleSinhala: "නන්දමාලිනි", artist: "Chitra", artistSinhala: "චිත්‍රා", album: "Golden Collection", duration: 215, genre: "Traditional", year: 1980, description: "A traditional Sinhala devotional song", youtubeUrl: "https://www.youtube.com/results?search_query=Nanda+Malini+Chitra+Sinhala+karaoke" },
  { id: "3", title: "Lakshmeme", titleSinhala: "ලක්ෂ්මේමෙ", artist: "Victor Ratnayake", artistSinhala: "වික්ටර් රත්නයකෙ", album: "Legacy", duration: 198, genre: "Modern Classical", year: 1985, description: "A romantic Sinhala song by Victor Ratnayake", youtubeUrl: "https://www.youtube.com/results?search_query=Lakshmeme+Victor+Ratnayake+Sinhala+karaoke" },
  { id: "4", title: "Kavi Rae", titleSinhala: "කවි රෑ", artist: "Clarence Wijewardene", artistSinhala: "ක්ලෙරන්ස් විජේවර්ධනෙ", album: "Memories", duration: 187, genre: "Light Music", year: 1990, description: "A light music composition with poetic lyrics", youtubeUrl: "https://www.youtube.com/results?search_query=Kavi+Rae+Clarence+Wijewardene+Sinhala+karaoke" },
  { id: "5", title: "Ananda Aye", titleSinhala: "ආනන්දායෙ", artist: "Neela Wickremasinghe", artistSinhala: "නීල විකේ‍්‍රමසිංහෙ", album: "Blissful Melodies", duration: 223, genre: "Devotional", year: 1988, description: "A devotional song expressing joy and happiness", youtubeUrl: "https://www.youtube.com/results?search_query=Ananda+Aye+Neela+Wickremasinghe+Sinhala+karaoke" },
  { id: "6", title: "Chandrika", titleSinhala: "චන්ද්‍රිකා", artist: "Sunil Edirisinghe", artistSinhala: "සුනිල් එදිරිසිංහෙ", album: "Moonlight", duration: 205, genre: "Romantic", year: 1992, description: "A romantic song inspired by moonlight", youtubeUrl: "https://www.youtube.com/results?search_query=Chandrika+Sunil+Edirisinghe+Sinhala+karaoke" },
  { id: "7", title: "Sudu Nethi", titleSinhala: "සුදු නෙතිහ", artist: "Shantha Kumara", artistSinhala: "ශාන්ත කුමාර", album: "Enchantment", duration: 234, genre: "Romantic", year: 1986, description: "A classic romantic composition", youtubeUrl: "https://www.youtube.com/results?search_query=Sudu+Nethi+Shantha+Kumara+Sinhala+karaoke" },
  { id: "8", title: "Hira Wena", titleSinhala: "හිර වෙනා", artist: "Pandith Amaradeva", artistSinhala: "පණ්ඩිත් අමරදේවා", album: "Evergreen", duration: 256, genre: "Classical", year: 1979, description: "An evergreen classical piece about separation", youtubeUrl: "https://www.youtube.com/results?search_query=Hira+Wena+Amaradeva+Sinhala+karaoke" },
  { id: "9", title: "Oba Gaana", titleSinhala: "ඔබ ගාන", artist: "W.D. Amaradewa", artistSinhala: "ඩබ්ලිউ.ඩී. අමරදේවා", album: "Vintage", duration: 189, genre: "Light Music", year: 1994, description: "A light-hearted song about your singing", youtubeUrl: "https://www.youtube.com/results?search_query=Oba+Gaana+W.D.+Amaradewa+Sinhala+karaoke" },
  { id: "10", title: "Dina Hase", titleSinhala: "දිනා හසෙ", artist: "Tissa Jatawara", artistSinhala: "තිස්ස ජටවර", album: "Victory", duration: 201, genre: "Motivational", year: 1995, description: "A motivational song about winning the day", youtubeUrl: "https://www.youtube.com/results?search_query=Dina+Hase+Tissa+Jatawara+Sinhala+karaoke" }
];

// API Routes - Return proper JSON instead of MCP format
app.get('/api/songs/list', (req, res) => {
  res.json(songs);
});

app.get('/api/songs/search', (req, res) => {
  const query = req.query.q || '';
  const lowerQuery = query.toLowerCase();
  const results = songs.filter(song =>
    song.title.toLowerCase().includes(lowerQuery) ||
    song.titleSinhala.includes(query) ||
    song.artist.toLowerCase().includes(lowerQuery) ||
    song.artistSinhala.includes(query) ||
    song.genre.toLowerCase().includes(lowerQuery)
  );
  res.json(results);
});

app.get('/api/songs/:id', (req, res) => {
  const song = songs.find(s => s.id === req.params.id);
  if (!song) {
    return res.status(404).json({ error: `Song with ID "${req.params.id}" not found.` });
  }
  res.json(song);
});

app.get('/api/genres', (req, res) => {
  const genres = [...new Set(songs.map(s => s.genre))].sort();
  res.json(genres);
});

app.get('/api/genres/:genre', (req, res) => {
  const results = songs.filter(s => s.genre.toLowerCase() === req.params.genre.toLowerCase());
  res.json(results);
});

app.get('/api/artists', (req, res) => {
  const artists = [...new Set(songs.map(s => s.artist))].sort();
  res.json(artists);
});

app.get('/api/artists/:artist', (req, res) => {
  const artist = decodeURIComponent(req.params.artist);
  const results = songs.filter(s =>
    s.artist.toLowerCase() === artist.toLowerCase() ||
    s.artistSinhala === artist
  );
  res.json(results);
});

function formatSong(song) {
  return `
ID: ${song.id}
Title: ${song.title} (${song.titleSinhala})
Artist: ${song.artist} (${song.artistSinhala})
Album: ${song.album}
Duration: ${song.duration} seconds
Genre: ${song.genre}
Year: ${song.year}
Description: ${song.description}
${song.lyrics ? `Lyrics: ${song.lyrics}` : ""}
`;
}

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Express Server running on http://localhost:${PORT}`);
  console.log(`Ready to serve Sinhala karaoke songs!`);
});
