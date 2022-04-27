import React from 'react'
import styled from 'styled-components'
import logo from '../img/logo.svg'
import { useQuery, gql } from '@apollo/client'
import { Link, withRouter } from 'react-router-dom'
import ButtonAsLink from './ButtonAsLink'

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
  color: #000;
`

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`

const UserState = styled.div`
  margin-left: auto;
  color: #000;
`

const Header = props => {
  //query hook for user logged in state incl client
  const { data, client } = useQuery(IS_LOGGED_IN)

  return (
    <HeaderBar>
      <img src={logo} alt="Tickets!" height="40" />
      <LogoText>Tickets!</LogoText>
      {/*if logged in display logout link, else display sign in options */}
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              //remove the token
              localStorage.removeItem('token')
              //clear the applications cache
              client.resetStore()
              //update the local state
              client.writeData({ data: { isLoggedIn: false } })
              //redirect the user to the home page
              props.history.push('/')
            }}
          >
            Log Out
          </ButtonAsLink>
        ) : (
          <p>
            <ButtonAsLink to={'/signin'}>Sign In</ButtonAsLink> or{' '}
            <ButtonAsLink to={'/signup'}>Sign Up</ButtonAsLink>
          </p>
        )}
      </UserState>
    </HeaderBar>
  )
}

//wrap component in withRouter higher-order component
export default withRouter(Header)
