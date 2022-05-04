import React from 'react'
//import formal utility from 'date-fns'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
//import logged in user UI components
import TheaterUser from './TheaterUser'
//import is_logged_in local query
import { IS_LOGGED_IN } from '../gql/query'

//update the date markup to format is as Month, day, year

//keep theaters within 800px
const StyledTheater = styled.article`
  max-width: 800px;
  margin: 0 auto;
`
const Main = styled.div`
  text-align: center;
`

//align user actions to right on large screens
const UserActions = styled.div`
  margin-left: auto;
  text-align: center;
  font-weight: 700;
`

const Poster = styled.img`
  height: 200px;
  width: auto;
`

const Synopsis = styled.p``

const Title = styled.h2`
  margin-block: 0;
`

const Top = styled.div``

const Theater = ({ theater }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN)
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error checking login status!</p>
  return (
    <Main>
      <Top>Name: {theater.fullName}</Top>
      <Synopsis>Telephone: {theater.phoneNumber}</Synopsis>
      <Synopsis>Address: {theater.address}</Synopsis>
      <Synopsis>Movies Currently Showing: {theater.catalogue.length}</Synopsis>
      {data.isLoggedIn ? (
        <UserActions>
          <TheaterUser theater={theater} />
        </UserActions>
      ) : (
        <UserActions></UserActions>
      )}
    </Main>
  )
}

export default Theater
