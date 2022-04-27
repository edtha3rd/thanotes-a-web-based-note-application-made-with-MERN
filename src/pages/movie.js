import React from 'react'
//graphQL dependencies
import { useQuery, gql } from '@apollo/client'
//import Movie component
import Movie from '../components/Movie'
import { GET_MOVIE } from '../gql/query'

const MoviePage = props => {
  //store id found in url as a variable
  const id = props.match.params.id
  //query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { movieId: id }
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! Movie {id} not found </p>

  return <Movie movie={data.movie} />
}

export default MoviePage
