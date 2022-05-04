import React from 'react'
import { useMutation } from '@apollo/client'
import { withRouter } from 'react-router-dom'

import ButtonAsLink from './ButtonAsLink'
import { DELETE_THEATER } from '../gql/mutation'
import { GET_THEATERS } from '../gql/query'

const DeleteTheater = props => {
  const [deleteTheater] = useMutation(DELETE_THEATER, {
    variables: {
      id: props.theaterId
    },
    refetchQueries: [{ query: GET_THEATERS }],
    onCompleted: data => {
      props.history.push('/theaters')
    }
  })
  return (
    <div>
      <ButtonAsLink onClick={deleteTheater}> ⚠️ Delete Theater </ButtonAsLink>
      <br />
      <span style={{ color: 'red' }}>This action is not reversible</span>
    </div>
  )
}

export default withRouter(DeleteTheater)
