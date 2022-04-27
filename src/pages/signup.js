import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import UserForm from '../components/UserForm'
import { SIGN_UP } from '../gql/mutation'

//include the props passed to the component for later use
const SignUp = props => {
  useEffect(() => {
    //update document title
    document.title = 'SignUp - Tickets!'
  })

  const client = useApolloClient()
  //Mutation hook
  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted: data => {
      //store JWT in localStorage
      localStorage.setItem('token', data.signUp)
      //update the local cache
      client.writeData({ data: { isLoggedIn: true } })
      //redirect user to the homepage
      props.history.push('/')
    }
  })
  //render form
  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {/*if data is loading display a loading message */}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display an error message*/}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  )
}

export default SignUp
