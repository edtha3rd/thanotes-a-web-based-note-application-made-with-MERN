import React from 'react'
//graphQL dependencies
import { useMutation, useQuery, gql } from '@apollo/client'
//import Movie component
import MovieForm from '../components/MovieForm'
import { GET_MOVIE, GET_ME } from '../gql/query'
import { EDIT_MOVIE } from '../gql/mutation'

const EditMovie = props => {
  //store id found in url as a variable
  const id = props.match.params.id
  //query hook, passing the id value as a variable
  const { loading, error, data, refetch } = useQuery(GET_MOVIE, {
    variables: { movieId: id }
  })
  //define our mutation
  const [editMovie] = useMutation(EDIT_MOVIE, {
    refetchQueries: refetch,
    onCompleted: () => {
      props.history.push(`/movie/${id}`)
    }
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error editing!</p>

  return <MovieForm movie={data.movie} action={editMovie} />
}

export default EditMovie
