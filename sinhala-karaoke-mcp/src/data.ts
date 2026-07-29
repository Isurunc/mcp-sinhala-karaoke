export interface KaraokeSong {
  id: string;
  title: string;
  titleSinhala: string;
  artist: string;
  artistSinhala: string;
  album: string;
  duration: number;
  genre: string;
  year: number;
  lyrics?: string;
  description: string;
}

export const sinhalaSongs: KaraokeSong[] = [
  {
    id: "1",
    title: "Malwatta",
    titleSinhala: "මල්වත්ත",
    artist: "Amaradeva",
    artistSinhala: "අමරදේව",
    album: "Classical Sinhala",
    duration: 245,
    genre: "Classical",
    year: 1975,
    description: "A classical Sinhala masterpiece by Amaradeva",
    lyrics: "මල්වත්ත මල්වත්ත...",
  },
  {
    id: "2",
    title: "Nanda Malini",
    titleSinhala: "නන්දමාලිනි",
    artist: "Chitra",
    artistSinhala: "චිත්‍රා",
    album: "Golden Collection",
    duration: 215,
    genre: "Traditional",
    year: 1980,
    description: "A traditional Sinhala devotional song",
  },
  {
    id: "3",
    title: "Lakshmeme",
    titleSinhala: "ලක්ෂ්මේමෙ",
    artist: "Victor Ratnayake",
    artistSinhala: "වික්ටර් රත්නයකෙ",
    album: "Legacy",
    duration: 198,
    genre: "Modern Classical",
    year: 1985,
    description: "A romantic Sinhala song by Victor Ratnayake",
  },
  {
    id: "4",
    title: "Kavi Rae",
    titleSinhala: "කවි රෑ",
    artist: "Clarence Wijewardene",
    artistSinhala: "ක්ලෙරන්ස් විජේවර්ධනෙ",
    album: "Memories",
    duration: 187,
    genre: "Light Music",
    year: 1990,
    description: "A light music composition with poetic lyrics",
  },
  {
    id: "5",
    title: "Ananda Aye",
    titleSinhala: "ආනන්දායෙ",
    artist: "Neela Wickremasinghe",
    artistSinhala: "නීල විකේ‍්‍රමසිංහෙ",
    album: "Blissful Melodies",
    duration: 223,
    genre: "Devotional",
    year: 1988,
    description: "A devotional song expressing joy and happiness",
  },
  {
    id: "6",
    title: "Chandrika",
    titleSinhala: "චන්ද්‍රිකා",
    artist: "Sunil Edirisinghe",
    artistSinhala: "සුනිල් එදිරිසිංහෙ",
    album: "Moonlight",
    duration: 205,
    genre: "Romantic",
    year: 1992,
    description: "A romantic song inspired by moonlight",
  },
  {
    id: "7",
    title: "Sudu Nethi",
    titleSinhala: "සුදු නෙතිහ",
    artist: "Shantha Kumara",
    artistSinhala: "ශාන්ත කුමාර",
    album: "Enchantment",
    duration: 234,
    genre: "Romantic",
    year: 1986,
    description: "A classic romantic composition",
  },
  {
    id: "8",
    title: "Hira Wena",
    titleSinhala: "හිර වෙනා",
    artist: "Pandith Amaradeva",
    artistSinhala: "පණ්ඩිත් අමරදේවා",
    album: "Evergreen",
    duration: 256,
    genre: "Classical",
    year: 1979,
    description: "An evergreen classical piece about separation",
  },
  {
    id: "9",
    title: "Oba Gaana",
    titleSinhala: "ඔබ ගාන",
    artist: "W.D. Amaradewa",
    artistSinhala: "ඩබ්ලිউ.ඩී. අමරදේවා",
    album: "Vintage",
    duration: 189,
    genre: "Light Music",
    year: 1994,
    description: "A light-hearted song about your singing",
  },
  {
    id: "10",
    title: "Dina Hase",
    titleSinhala: "දිනා හසෙ",
    artist: "Tissa Jatawara",
    artistSinhala: "තිස්ස ජටවර",
    album: "Victory",
    duration: 201,
    genre: "Motivational",
    year: 1995,
    description: "A motivational song about winning the day",
  },
];

export function getSongById(id: string): KaraokeSong | undefined {
  return sinhalaSongs.find((song) => song.id === id);
}

export function searchSongs(query: string): KaraokeSong[] {
  const lowerQuery = query.toLowerCase();
  return sinhalaSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(lowerQuery) ||
      song.titleSinhala.includes(query) ||
      song.artist.toLowerCase().includes(lowerQuery) ||
      song.artistSinhala.includes(query) ||
      song.genre.toLowerCase().includes(lowerQuery),
  );
}

export function getSongsByGenre(genre: string): KaraokeSong[] {
  return sinhalaSongs.filter(
    (song) => song.genre.toLowerCase() === genre.toLowerCase(),
  );
}

export function getSongsByArtist(artist: string): KaraokeSong[] {
  return sinhalaSongs.filter(
    (song) =>
      song.artist.toLowerCase() === artist.toLowerCase() ||
      song.artistSinhala === artist,
  );
}
