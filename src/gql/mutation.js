import { gql } from '@apollo/client'

const NEW_MOVIE = gql`
  mutation Mutation($title: String!, $year: String!, $poster: String) {
    newMovie(title: $title, year: $year, poster: $poster) {
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

const EDIT_MOVIE = gql`
  mutation EditMovie(
    $movieId: ID!
    $title: String
    $year: String
    $poster: String
  ) {
    editMovie(movieId: $movieId, title: $title, year: $year, poster: $poster) {
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

const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id)
  }
`

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
      favoriteCount
    }
  }
`

const SIGN_UP = gql`
  mutation SignUp(
    $username: String!
    $email: String!
    $password: String!
    $fullName: String
    $address: String
  ) {
    signUp(
      username: $username
      email: $email
      password: $password
      fullName: $fullName
      address: $address
    )
  }
`

export { EDIT_MOVIE, DELETE_MOVIE, NEW_MOVIE, SIGN_UP, TOGGLE_FAVORITE }
