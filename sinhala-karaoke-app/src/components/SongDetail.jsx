import React from 'react'
import './SongDetail.css'

function SongDetail({ song, onBack }) {
  if (!song) return null

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

  return (
    <div className="song-detail-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to songs
      </button>

      <div className="detail-container">
        <div
          className="detail-header"
          style={{ backgroundImage: gradient }}
        >
          <div className="detail-header-content">
            <h1 className="detail-title">{song.title}</h1>
            <p className="detail-title-sinhala">{song.titleSinhala}</p>
            <p className="detail-artist">{song.artist}</p>
            {song.artistSinhala && (
              <p className="detail-artist-sinhala">{song.artistSinhala}</p>
            )}
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-grid">
            {song.album && (
              <div className="detail-item">
                <label>Album</label>
                <p>{song.album}</p>
              </div>
            )}

            {song.duration && (
              <div className="detail-item">
                <label>Duration</label>
                <p>{song.duration}</p>
              </div>
            )}

            {song.genre && (
              <div className="detail-item">
                <label>Genre</label>
                <p className="genre-badge">{song.genre}</p>
              </div>
            )}

            {song.year && (
              <div className="detail-item">
                <label>Year</label>
                <p>{song.year}</p>
              </div>
            )}
          </div>

          {song.description && (
            <div className="detail-section">
              <h2>About This Song</h2>
              <p>{song.description}</p>
            </div>
          )}

          {song.lyrics && (
            <div className="detail-section">
              <h2>Lyrics</h2>
              <div className="lyrics">
                <p>{song.lyrics}</p>
              </div>
            </div>
          )}

          {song.youtubeUrl && (
            <div className="detail-section">
              <h2>Watch & Listen</h2>
              <a
                href={song.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-link"
              >
                ▶ Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SongDetail
