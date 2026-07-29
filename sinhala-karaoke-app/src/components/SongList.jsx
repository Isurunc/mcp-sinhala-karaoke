import React from 'react'
import SongCard from './SongCard'
import './SongList.css'

function SongList({ songs, onSongClick }) {
  return (
    <div className="song-grid">
      {songs.map((song) => (
        <SongCard
          key={song.id}
          song={song}
          onClick={() => onSongClick(song)}
        />
      ))}
    </div>
  )
}

export default SongList
