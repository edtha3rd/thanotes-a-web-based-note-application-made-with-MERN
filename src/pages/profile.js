import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ME } from '../gql/query'
import styled from 'styled-components'

const Main = styled.div`
  border: 4px solid black;
  padding: 5px;
`

const Label = styled.span`
  font-weight: 600;
  padding-left: 20px;
  text-decoration: underline;
  text-transform: capitalize;
`

const Header = styled.h2`
  text-align: center;
`

const Item = styled.p`
  border-bottom: 2px solid black;
  margin: 8px 40px 8px 40px;
  padding-bottom: 8px;
`

const Profile = () => {
  React.useEffect(() => {
    document.title = 'Profile - Tickets!'
  })

  const { data, loading, error } = useQuery(GET_ME)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error + {error.message}</p>

  return (
    <Main>
      <Header>Profile</Header>
      <Item>
        <Label>Full Name:</Label> {data.currentUser.fullName}
      </Item>
      <Item>
        <Label>Username:</Label> @{data.currentUser.username}
      </Item>
      <Item>
        <Label>Email:</Label> {data.currentUser.email}
      </Item>
      <Item>
        <Label>Role:</Label> {data.currentUser.role}
      </Item>
    </Main>
  )
}

export default Profile
