import { gql } from '@apollo/client'

const NEW_MOVIE = gql`
  mutation Mutation(
    $title: String!
    $year: String!
    $poster: String
    $synopsis: String
    $rating: String
  ) {
    newMovie(
      title: $title
      year: $year
      poster: $poster
      synopsis: $synopsis
      rating: $rating
    ) {
      id
      title
      year
      poster
      synopsis
      rating
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
    $synopsis: String
    $rating: String
  ) {
    editMovie(
      movieId: $movieId
      title: $title
      year: $year
      poster: $poster
      synopsis: $synopsis
      rating: $rating
    ) {
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

const DELETE_THEATER = gql`
  mutation Mutation($deleteUserId: ID) {
    deleteUser(id: $deleteUserId)
  }
`

const TOGGLE_CATALOG = gql`
  mutation toggleCatalogue($id: ID!) {
    toggleCatalogue(id: $id) {
      id
      showingAtCount
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
    $role: String
    $phoneNumber: String
  ) {
    signUp(
      address: $address
      email: $email
      fullName: $fullName
      password: $password
      role: $role
      username: $username
      phoneNumber: $phoneNumber
    )
  }
`

export {
  EDIT_MOVIE,
  DELETE_MOVIE,
  DELETE_THEATER,
  NEW_MOVIE,
  SIGN_UP,
  TOGGLE_CATALOG
}
