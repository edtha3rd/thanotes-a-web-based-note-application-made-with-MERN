import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { GET_ME } from '../gql/query'
import ReservationFeed from '../components/ReservationFeed'

const Reservation = () => {
  const { data, error, loading } = useQuery(GET_ME)

  if (loading) return <p>Loading</p>
  if (error) return <p>Error + {error.message}</p>

  return (
    <div>
      <ReservationFeed data={data.currentUser.myReservations} />
    </div>
  )
}

export default Reservation
