import React from 'react'
//import formal utility from 'date-fns'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
//import logged in user UI components
import MovieUser from './MovieUser'
//import is_logged_in local query
import { IS_LOGGED_IN } from '../gql/query'

//update the date markup to format is as Month, day, year

//keep movies within 800px
const StyledMovie = styled.article`
  max-width: 800px;
  margin: 0 auto;
`
//style the movie metadata
const MetaData = styled.div`
  @media (mix-width: 500px) {
    display: flex;
    align-items: top;
  }
`

//add some space b/w avatar and meta info
const MetaInfo = styled.div`
  padding-right: 1em;
`

//align user actions to right on large screens
const UserActions = styled.div`
  margin-left: auto;
`

const Poster = styled.img`
  height: 200px;
  width: auto;
`

const Movie = ({ movie }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN)
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error checking login status!</p>
  return (
    <div>
      <Poster src={movie.poster} />
      <p>
        {movie.title}, {movie.year}
      </p>
      {data.isLoggedIn ? (
        <UserActions>
          <MovieUser movie={movie} />
        </UserActions>
      ) : (
        <UserActions></UserActions>
      )}
    </div>
  )
}

export default Movie
