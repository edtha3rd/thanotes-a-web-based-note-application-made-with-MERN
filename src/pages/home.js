import React from 'react'
//import required apollo libraries
import { useQuery } from '@apollo/client'
//import markdown library

import Button from '../components/Button'
import MovieFeed from '../components/MovieFeed'
import { GET_MOVIES } from '../gql/query'

const Home = () => {
  React.useEffect(() => {
    document.title = 'Home - Tickets!'
  })
  //query hook
  const { data, loading, error, fetchMore } = useQuery(GET_MOVIES)

  //if data loading, display loading message
  if (loading) return <p>Loading...</p>
  //if there is an error fetching data, display error message
  if (error) return <p>Error!</p>

  return (
    //add react fragment to provide a parent element
    <React.Fragment>
      <MovieFeed movies={data.MovieFeed.movies} />
      {/*only display load more button is hasNextPage is true */}
      {data.MovieFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.MovieFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  MovieFeed: {
                    cursor: fetchMoreResult.MovieFeed.cursor,
                    hasNextPage: fetchMoreResult.MovieFeed.hasNextPage,
                    //combine the new results and the old
                    movies: [
                      ...previousResult.MovieFeed.movies,
                      ...fetchMoreResult.MovieFeed.movies
                    ],
                    __typename: 'MovieFeed'
                  }
                }
              }
            })
          }
        >
          Load More
        </Button>
      )}
    </React.Fragment>
  )
}

export default Home
