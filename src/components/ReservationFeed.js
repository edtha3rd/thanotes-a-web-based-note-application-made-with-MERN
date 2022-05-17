import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  margin-bottom: 5px;
  padding: 10px;
`

const Header = styled.h3`
  text-align: center;
`

const ReservationFeed = ({ data }) => {
  //   console.log(data[0].reservedBy.email)
  return (
    <div>
      <Header> Your Reservations </Header>
      {data.map(reservation => {
        return (
          <Card key={reservation.id}>
            Reserved By: {reservation.reservedBy.email} <br />
            Seats:{' '}
            {reservation.seat.map(seat => {
              return <span key={seat}>{seat},</span>
            })}
            <br />
            Confirmation Code: {reservation.confirmationCode}
            <br />
            Total: ¥{reservation.totalPrice}
          </Card>
        )
      })}
    </div>
  )
}

export default ReservationFeed
