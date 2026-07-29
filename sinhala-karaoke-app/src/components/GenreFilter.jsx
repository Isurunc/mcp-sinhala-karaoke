import React from 'react'
import './GenreFilter.css'

function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <div className="genre-filter">
      <select
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="genre-select"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  )
}

export default GenreFilter
