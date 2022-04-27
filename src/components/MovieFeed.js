import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Movie from './Movie'

const MovieWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`

const MovieFeed = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <MovieWrapper key={movie.id}>
          <Movie movie={movie} />
          <Link to={`movie/${movie.id}`}>Permalink</Link>
        </MovieWrapper>
      ))}
    </div>
  )
}

export default MovieFeed
