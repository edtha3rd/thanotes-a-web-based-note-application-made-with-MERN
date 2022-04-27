import React, { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
//import movieform component
import MovieForm from '../components/MovieForm'
//import query
import { GET_MOVIES, GET_MY_MOVIES } from '../gql/query'
import { NEW_MOVIE } from '../gql/mutation'

const NewMovie = props => {
  useEffect(() => {
    //update document title
    document.title = 'New Movie - Admin'
  })

  const [newMovie, { loading, error }] = useMutation(NEW_MOVIE, {
    //refetch the GET_MOVIES query to update cache
    refetchQueries: [{ query: GET_MY_MOVIES }, { query: GET_MOVIES }],
    onCompleted: data => {
      //when complete, redirect user to movie page
      props.history.push(`movie/${data.newMovie.id}`)
    }
  })

  return (
    <React.Fragment>
      {/*loading message when mutation loading */}
      {loading && <p>Loading...</p>}
      {/*if error, display error message */}
      {error && <p>Error Pushing Movie</p>}
      {/*the form component, passing mutation data as a prop */}
      <MovieForm action={newMovie} />
    </React.Fragment>
  )
}

export default NewMovie
