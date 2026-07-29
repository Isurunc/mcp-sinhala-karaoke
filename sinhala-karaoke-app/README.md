# Sinhala Karaoke Web App

A modern React web application for discovering and exploring Sinhala karaoke songs. Built with Vite, React, and integrated with the Sinhala Karaoke MCP Server.

## Features

🎵 **Browse Songs** - Beautiful grid view of all Sinhala karaoke songs
🔍 **Search** - Real-time search by song title or artist
🎭 **Filter by Genre** - Browse by music genres (Classical, Romantic, Devotional, etc.)
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
🎨 **Modern UI** - Beautiful gradient cards and smooth animations
📋 **Song Details** - View complete information including lyrics and description

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Express.js (wrapper for MCP server)
- **API**: RESTful API that calls the Sinhala Karaoke MCP Server
- **Styling**: CSS3 with gradients and animations
- **HTTP Client**: Axios

## Project Structure

```
sinhala-karaoke-app/
├── server/
│   └── index.js              # Express backend + MCP server wrapper
├── src/
│   ├── components/           # React components
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── GenreFilter.jsx
│   │   ├── SongList.jsx
│   │   ├── SongCard.jsx
│   │   └── SongDetail.jsx
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Installation

### Prerequisites

- Node.js 20+ installed
- The Sinhala Karaoke MCP Server running (see parent project)

### Setup Steps

1. **Navigate to the project directory**:
```bash
cd sinhala-karaoke-app
```

2. **Install dependencies**:
```bash
npm install
```

3. **Update Express dependency** (if needed):
```bash
npm install express cors
```

## Running the Application

### Option 1: Run both server and frontend together

```bash
npm start
```

This runs:
- Express backend on `http://localhost:5000`
- React frontend on `http://localhost:3000`

### Option 2: Run separately

**Terminal 1 - Backend server**:
```bash
npm run server
```

**Terminal 2 - Frontend dev server**:
```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

Preview the production build:
```bash
npm run preview
```

## API Routes

The Express backend provides these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/songs/list` | Get all songs |
| GET | `/api/songs/search?q=query` | Search songs |
| GET | `/api/songs/:id` | Get song by ID |
| GET | `/api/genres` | Get all genres |
| GET | `/api/genres/:genre` | Get songs by genre |
| GET | `/api/artists` | Get all artists |
| GET | `/api/artists/:artist` | Get songs by artist |

## Components

### Header
Displays the app title and branding with floating animation.

### SearchBar
Real-time search input for finding songs by title or artist.

### GenreFilter
Dropdown to filter songs by genre.

### SongList
Grid layout showing song cards.

### SongCard
Individual song card with title, artist, and Sinhala text. Clickable to view details.

### SongDetail
Full-page view showing complete song information including:
- Title (English and Sinhala)
- Artist information
- Album, duration, genre, year
- Description
- Lyrics (if available)

## Styling

The app uses modern CSS with:
- **Gradients** - Beautiful color combinations for cards
- **Animations** - Smooth transitions and hover effects
- **Responsive Grid** - Auto-adjusting grid layout
- **Mobile First** - Optimized for all screen sizes

## Features in Detail

### Search
- Real-time filtering as you type
- Searches across song titles, artists, and Sinhala text
- Clear button to reset search

### Genre Filter
- Dropdown to select specific genre
- Combine with search for refined results
- All genres option to show all songs

### Song Cards
- Color-coded with unique gradients
- Displays ID, title, Sinhala title, and artist
- Hover effect with "View Details" button
- Smooth animations

### Song Details Page
- Large header with gradient background
- Key information in organized grid
- Genre displayed as badge
- Full description and lyrics sections
- Back button to return to list
- Mobile-optimized layout

## Customization

### Change Colors
Edit the color array in `src/components/SongCard.jsx`:
```javascript
const colors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  // Add more gradient colors here
]
```

### Change Port
In `vite.config.js`, modify the server port:
```javascript
server: {
  port: 3000,  // Change this
  // ...
}
```

## Troubleshooting

### Backend not connecting
- Ensure MCP server is running: `node ../sinhala-karaoke-mcp/dist/index.js`
- Check that Express server is running on port 5000
- Verify proxy configuration in `vite.config.js`

### Styles not loading
- Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
- Rebuild: `npm run build`

### Songs not showing
- Check browser console for errors
- Verify API endpoints are responding
- Ensure MCP server is functioning

## Performance

- Vite provides fast hot module replacement (HMR)
- Axios caches API responses
- CSS is optimized for rendering performance
- Images are not used (pure CSS + Unicode text)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] User favorites/bookmarks
- [ ] Playlist creation
- [ ] Share functionality
- [ ] Lyrics highlighting/karaoke mode
- [ ] Audio playback integration
- [ ] Artist profiles and discography
- [ ] Rating system
- [ ] Dark mode toggle
- [ ] Multiple language support
- [ ] Download lyrics

## License

MIT License - See parent project for details

## Contributing

To add new songs or features:

1. Update the MCP server database (`../sinhala-karaoke-mcp/src/data.ts`)
2. Rebuild the MCP server
3. Refresh the web app

## Support

For issues with:
- **Web app**: Check this directory's files
- **Backend/MCP**: Check `../sinhala-karaoke-mcp/` directory
- **Integration**: Ensure both projects are running and connected

---

**Made with ❤️ for Sinhala music lovers** 🎵
