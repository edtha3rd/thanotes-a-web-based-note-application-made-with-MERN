import { gql } from '@apollo/client'
//central js file to hold all queries
const CHECK_RESERVATION = gql`
  query CheckReservation($confirmationCode: String) {
    checkReservation(confirmationCode: $confirmationCode) {
      id
      seat
      totalPrice
      reservedBy {
        username
        email
      }
      sessionDetails {
        movie {
          title
          year
        }
        location {
          fullName
        }
      }
    }
  }
`

const GET_MOVIES = gql`
  query MovieFeed {
    MovieFeed {
      movies {
        id
        title
        year
        poster
        synopsis
        rating
        showingAtCount
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
      synopsis
      rating
      showingAtCount
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
      synopsis
      rating
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
      poster
      rating
      synopsis
      title
      year
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
        synopsis
        rating
      }
      catalogue {
        id
        title
        year
        poster
        rating
        synopsis
      }
      myReservations {
        id
        reservedBy {
          username
          email
        }
        seat
        totalPrice
        confirmationCode
      }
    }
  }
`

const GET_THEATERS = gql`
  query Theaters {
    theaters {
      username
      id
      email
      password
      role
      fullName
      address
      phoneNumber
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
  CHECK_RESERVATION,
  GET_MOVIES,
  GET_MOVIE,
  IS_LOGGED_IN,
  GET_MY_MOVIES,
  GET_MY_CATALOG,
  GET_ME,
  GET_THEATERS
}
