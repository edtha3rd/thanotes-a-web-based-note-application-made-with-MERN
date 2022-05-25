import React from 'react'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'
import Header from './Header'
import Navigation from './Navigation'

// component styles
const Wrapper = styled.div`
  /* We can apply media query styles within the styled component */
  /* This will only apply the layout for screens above 700px wide */
  @media (min-width: 700px) {
    display: flex;
    top: 64px;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`

const Main = styled.main`
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: none;
  /* Again apply media query styles to screens above 700px */
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 250px;
    height: calc(100% - 64px);
    width: calc(100% - 250px);
  }
`

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`

const Layout = ({ children }) => {
  const { data, error, loading } = useQuery(IS_LOGGED_IN)

  if (loading) return <p>Loading</p>
  if (error) return <p>{''}</p>

  return (
    <React.Fragment>
      <Header />
      <Wrapper>
        {data.isLoggedIn && <Navigation />}
        <Main>{children}</Main>
      </Wrapper>
    </React.Fragment>
  )
}

export default Layout
