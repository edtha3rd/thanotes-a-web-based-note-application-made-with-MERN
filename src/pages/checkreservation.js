import { useLazyQuery } from '@apollo/client'
import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import { CHECK_RESERVATION } from '../gql/query'
import GreenTick from '../img/green-tick.svg'

const Code = styled.textarea`
  margin-left: 10px;
  resize: none;
  width: 300px;
`

const Container = styled.div`
  align-items: center;
  display: grid;
  justify-content: center;
  text-align: center;
`

const OrderContainer = styled.div`
  align-items: center;
  border: 1px solid white;
  border-radius: 0.375em;
  display: flex;
  flex-direction: column;
  margin: 10px;
`

const Tick = styled.img`
  height: 80px;
  margin: 10px;
  width: 80px;
`

function checkreservation() {
  const [code, setCode] = useState('')

  const onChange = event => {
    setCode(event.target.value)
  }

  const [reservationCheck, { error, data, loading }] = useLazyQuery(
    CHECK_RESERVATION,
    {
      variables: { confirmationCode: code }
    }
  )

  let reservation = data ? data.checkReservation : []
  console.log(reservation)
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  return (
    <Container>
      Confirmation Code:{' '}
      <Code
        name="confirmationCode"
        onChange={onChange}
        placeholder="Input Confirmation Code"
        rows={1}
        value={code}
      />
      <Button
        style={{ height: '25px', fontSize: 14 }}
        onClick={reservationCheck}
      >
        Submit
      </Button>
      {reservation === null ? (
        <div>
          This confirmation code does not exist. Please check your code.
        </div>
      ) : reservation.length === 0 ? (
        <div>Please enter a valid confirmation code.</div>
      ) : (
        <OrderContainer>
          <Tick src={GreenTick} />
          <h3 style={{ margin: 0 }}>Reservation Confirmed</h3> <br />
          Details:
          <br />
          <strong>Username:</strong> {data.checkReservation.reservedBy.username}
          <br />
          <strong>Movie:</strong>{' '}
          {data.checkReservation.sessionDetails.movie.title}
          <br />
          Seats:{' '}
          {data.checkReservation.seat.map(seat => {
            return <span>{seat},</span>
          })}
        </OrderContainer>
      )}
    </Container>
  )
}

export default checkreservation
