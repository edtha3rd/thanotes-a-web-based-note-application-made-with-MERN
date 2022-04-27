import React from 'react'
import { useMutation } from '@apollo/client'
import { withRouter } from 'react-router-dom'

import ButtonAsLink from './ButtonAsLink'
import { DELETE_MOVIE } from '../gql/mutation'
import { GET_MY_MOVIES, GET_MOVIES } from '../gql/query'

const DeleteMovie = props => {
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    variables: {
      id: props.movieId
    },
    refetchQueries: [{ query: GET_MY_MOVIES, GET_MOVIES }],
    onCompleted: data => {
      props.history.push('/mymovies')
    }
  })
  return <ButtonAsLink onClick={deleteMovie}> Delete Movie </ButtonAsLink>
}

export default withRouter(DeleteMovie)
