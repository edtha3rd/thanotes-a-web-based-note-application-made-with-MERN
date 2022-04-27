import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import MovieFeed from '../components/MovieFeed'
import { GET_MY_MOVIES } from '../gql/query'

const MyMovies = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Movies — Tickets! Admin'
  })

  const { loading, error, data } = useQuery(GET_MY_MOVIES)

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...'
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`
  // if the query is successful and there are movies, return the feed of movies
  // else if the query is successful and there aren't movies, display a message
  if (data.submissions.length != 0) {
    return <MovieFeed movies={data.submissions} />
  } else {
    return <p>No movies yet</p>
  }
}

export default MyMovies
