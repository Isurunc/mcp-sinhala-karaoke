import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import GenreFilter from './components/GenreFilter'
import SongList from './components/SongList'
import SongDetail from './components/SongDetail'

function App() {
  const [songs, setSongs] = useState([])
  const [filteredSongs, setFilteredSongs] = useState([])
  const [genres, setGenres] = useState([])
  const [artists, setArtists] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSong, setSelectedSong] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [view, setView] = useState('grid') // 'grid' or 'detail'

  const BACKEND_URL = 'https://e23ac840-5b8c-4294-b469-5db839b31678-dev.e1-us-east-azure.choreoapis.dev/sinhalakaroke/sinhala-karaoke-app-ug/v1.0'


  // Load data on component mount
  useEffect(() => {
    loadInitialData()
  }, [])

  // Update filtered songs when genre or search changes
  useEffect(() => {
    filterSongs()
  }, [songs, selectedGenre, searchQuery])

  async function loadInitialData() {
    setLoading(true)
    setError(null)
    try {
      // Load genres, artists, and all songs [local run]
      // const [genresRes, artistsRes, songsRes] = await Promise.all([
      //   axios.get('/api/genres'),
      //   axios.get('/api/artists'),
      //   axios.get('/api/songs/list')

       //for choreo
        const [genresRes, artistsRes, songsRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/genres`),
        axios.get(`${BACKEND_URL}/api/artists`),
        axios.get(`${BACKEND_URL}/api/songs/list`)
      ])

      setGenres(genresRes.data)
      setArtists(artistsRes.data)
      setSongs(songsRes.data)
    } catch (err) {
      setError('Failed to load data: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function filterSongs() {
    let result = songs

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.titleSinhala.includes(searchQuery)
      )
    }

    if (selectedGenre) {
      // This is a simple client-side filter
      // In production, you'd want to fetch from API
      const genreKeywords = {
        'Classical': ['Malwatta', 'Hira Wena'],
        'Romantic': ['Lakshmeme', 'Chandrika', 'Sudu Nethi'],
        'Devotional': ['Ananda Aye'],
        'Light Music': ['Kavi Rae', 'Oba Gaana'],
        'Traditional': ['Nanda Malini'],
        'Modern Classical': ['Lakshmeme'],
        'Motivational': ['Dina Hase']
      }

      const keywords = genreKeywords[selectedGenre] || []
      result = result.filter(song =>
        keywords.some(keyword => song.title.includes(keyword))
      )
    }

    setFilteredSongs(result)
  }

  function handleSongClick(song) {
    setSelectedSong(song)
    setView('detail')
  }

  return (
    <div className="app">
      <Header />

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {view === 'grid' ? (
        <main className="main-content">
          <div className="controls">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by song or artist..."
            />
            <GenreFilter
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
            />
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading songs...</p>
            </div>
          ) : filteredSongs.length > 0 ? (
            <div>
              <p className="results-count">
                Found {filteredSongs.length} song{filteredSongs.length !== 1 ? 's' : ''}
              </p>
              <SongList
                songs={filteredSongs}
                onSongClick={handleSongClick}
              />
            </div>
          ) : (
            <div className="no-results">
              <p>No songs found. Try a different search or filter.</p>
            </div>
          )}
        </main>
      ) : (
        <SongDetail
          song={selectedSong}
          onBack={() => setView('grid')}
        />
      )}
    </div>
  )
}

export default App
