import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { GET_MY_CATALOG } from '../gql/query'
import MovieFeed from '../components/MovieFeed'
import { GET_ME } from '../gql/query'

const Catalog = () => {
  useEffect(() => {
    // update the document title
    document.title = 'Catalog — Tickets!'
  })

  const { loading, error, data } = useQuery(GET_ME)

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...'
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`
  // if the query is successful and there are movies, return the feed of movies
  // else if the query is successful and there aren't movies, display a message
  if (data.currentUser.catalogue.length !== 0) {
    return <MovieFeed movies={data.currentUser.catalogue} />
  } else {
    return <p>No movies in your catalog... yet</p>
  }
}

export default Catalog
