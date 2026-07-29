import React from 'react'
import './SongCard.css'

function SongCard({ song, onClick }) {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  ]

  const colorIndex = (parseInt(song.id) - 1) % colors.length
  const gradient = colors[colorIndex]

  const handleYouTube = (e) => {
    e.stopPropagation()
    window.open(song.youtubeUrl, '_blank')
  }

  return (
    <div
      className="song-card"
      onClick={onClick}
      style={{ backgroundImage: gradient }}
    >
      <div className="song-card-content">
        <div className="song-number">{song.id}</div>
        <h3 className="song-title">{song.title}</h3>
        <p className="song-title-sinhala">{song.titleSinhala}</p>
        <p className="song-artist">{song.artist}</p>
      </div>
      <div className="song-card-overlay">
        <button className="view-btn" onClick={handleYouTube}>▶ Watch on YouTube</button>
      </div>
    </div>
  )
}

export default SongCard
