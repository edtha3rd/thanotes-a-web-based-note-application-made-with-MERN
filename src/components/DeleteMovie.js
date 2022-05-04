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
    onCompleted: () => {
      props.history.push('/mymovies')
    }
  })
  return (
    <div>
      <ButtonAsLink onClick={deleteMovie}>⚠️ Delete Movie </ButtonAsLink>
      <br />
      <span style={{ color: 'red' }}>(This action is not reversible)</span>
    </div>
  )
}

export default withRouter(DeleteMovie)
