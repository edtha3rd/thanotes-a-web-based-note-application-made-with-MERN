import React, { useState } from 'react'
import ProfileForm from '../components/ProfileForm'
import { gql, useMutation, useQuery } from '@apollo/client'
import { GET_ME } from '../gql/query'
import styled from 'styled-components'

const Header = styled.h2`
  text-align: center;
`

const Profile = props => {
  //gql queries
  const UPDATE_USER = gql`
    mutation updateUser(
      $fullName: String
      $address: String
      $phoneNumber: String
    ) {
      updateUser(
        fullName: $fullName
        address: $address
        phoneNumber: $phoneNumber
      ) {
        id
        username
        fullName
        address
        phoneNumber
      }
    }
  `

  const [updateUser, { error, loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      props.history.push('/')
    }
  })
  const { error: meError, loading: meLoading, data: userdata } = useQuery(
    GET_ME
  )

  if (meLoading) return <p>Loading...</p>
  if (meError) return <p>{meError.message}</p>

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <React.Fragment>
      <Header>Edit Your Information</Header>

      <ProfileForm user={userdata.currentUser} action={updateUser} />
    </React.Fragment>
  )
}

export default Profile
