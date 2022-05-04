import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import { GET_ME } from '../gql/query'
import DeleteTheater from './DeleteTheater'
import ButtonAsLink from './ButtonAsLink'

const TheaterUser = props => {
  const { loading, error, data } = useQuery(GET_ME)
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>

  return (
    <React.Fragment>
      {data.currentUser.role === 'ADMIN' ? (
        <React.Fragment>
          <DeleteTheater theaterId={props.theater.id} />
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  )
}

export default TheaterUser
