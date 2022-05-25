import { useLazyQuery } from '@apollo/client'
import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import ButtonAsLink from '../components/ButtonAsLink'
import { CHECK_RESERVATION } from '../gql/query'
import GreenTick from '../img/green-tick.svg'

const Code = styled.textarea`
  border-radius: 0.375em;
  color: #0077cc;
  font-size: 24px;
  height: 50px;
  margin: 10px;
  padding: 4px;
  padding-left: 8px;
  padding-top: 8px;
  resize: none;
  width: 300px;
`

const Container = styled.div`
  align-items: center;
  display: grid;
  justify-content: center;
  text-align: center;
`

const Head = styled.span`
  font-size: 26px;
  font-weight: bold;
  text-decoration: underline;
`

const OrderContainer = styled.div`
  border: 1px solid white;
  border-radius: 0.375em;
  display: flex;
  flex-direction: column;
  margin: 15px;
  padding-bottom: 10px;
`

const Tick = styled.img`
  align-self: center;
  height: 80px;
  margin: 10px;
  width: 80px;
`

function checkreservation() {
  React.useEffect(() => {
    document.title = 'Check Reservation - Tickets!'
  })
  const [code, setCode] = useState('')
  const [num, setNum] = useState(0)

  const onChange = event => {
    setCode(event.target.value)
  }

  const [reservationCheck, { error, data, loading, refetch }] = useLazyQuery(
    CHECK_RESERVATION,
    {
      variables: { confirmationCode: code }
    }
  )

  function check() {
    num === 0 ? (reservationCheck(), setNum(num + 1)) : refetch
  }

  let reservation = data ? data.checkReservation : []
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  return (
    <Container>
      <Head>Confirmation Code </Head>
      <Code
        name="confirmationCode"
        onChange={onChange}
        placeholder="Input Confirmation Code"
        rows={1}
        value={code}
      />
      <ButtonAsLink
        onClick={check}
        style={{
          height: '30px',
          fontSize: 16,
          fontWeight: 'bold',
          justifySelf: 'center',
          margin: '5px',
          width: '160px'
        }}
      >
        Submit
      </ButtonAsLink>
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
