import { gql } from '@apollo/client'
//central js file to hold all queries
const GET_MOVIES = gql`
  query MovieFeed {
    MovieFeed {
      movies {
        id
        title
        year
        poster
        showingAt {
          id
          fullName
          email
          address
        }
      }
      mCursor
      hasMoreMovies
    }
  }
`

const GET_MOVIE = gql`
  query Movie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      year
      poster
      submittedBy {
        username
        id
      }
    }
  }
`

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`

const GET_MY_MOVIES = gql`
  query Submissions {
    submissions {
      id
      title
      year
      poster
      showingAt {
        fullName
        id
      }
      showingAtCount
    }
  }
`

const GET_MY_CATALOG = gql`
  query Catalog($theaterId: ID!) {
    catalog(theaterId: $theaterId) {
      id
      title
      year
      poster
      submittedBy {
        username
        id
      }
    }
  }
`

const GET_ME = gql`
  query CurrentUser {
    currentUser {
      id
      username
      email
      password
      role
      fullName
      phoneNumber
      address
      submissions {
        id
        title
        year
        poster
      }
      catalogue {
        id
        title
        year
        poster
      }
    }
  }
`

export {
  GET_MOVIES,
  GET_MOVIE,
  IS_LOGGED_IN,
  GET_MY_MOVIES,
  GET_MY_CATALOG,
  GET_ME
}
