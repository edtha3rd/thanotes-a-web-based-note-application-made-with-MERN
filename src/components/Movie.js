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
const Main = styled.div`
  text-align: center;
`

//align user actions to right on large screens
const UserActions = styled.div`
  margin-left: auto;
  text-align: center;
  font-weight: 700;
`

const Poster = styled.img`
  height: 200px;
  width: auto;
`

const Synopsis = styled.p``

const Title = styled.h2`
  margin-block: 0;
`

const Top = styled.div``

const Movie = ({ movie }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN)
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error checking login status!</p>
  return (
    <Main>
      <Poster src={movie.poster} />
      <Top>
        <Title>
          {movie.title}, {movie.year}
        </Title>{' '}
        <br />
        Rating: {movie.rating}
        <h3>Synopsis:</h3>
      </Top>
      <Synopsis>{movie.synopsis}</Synopsis>
      {data.isLoggedIn ? (
        <UserActions>
          <MovieUser movie={movie} />
        </UserActions>
      ) : (
        <UserActions></UserActions>
      )}
    </Main>
  )
}

export default Movie
