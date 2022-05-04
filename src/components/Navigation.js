import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { GET_ME } from '../gql/query'

const Nav = styled.nav`
  padding: 1em;
  background: #f5f4f0;

  @media (max-width: 700px) {
    padding-top: 64px;
  }

  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: scroll;
  }
`

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;

  /* We can nest styles in styled-components */
  /* The following styles will apply to links within the NavList component */
  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
  }

  a:visited {
    color: #333;
  }

  a:hover,
  a:focus {
    color: #0077cc;
  }
`

const Navigation = () => {
  const { data, loading, error } = useQuery(GET_ME)
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>

  return (
    <Nav>
      <NavList>
        <li>
          <Link to="/">
            <span aria-hidden="true" role="img">
              🏠
            </span>
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <span aria-hidden="true" role="img">
              👤
            </span>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/editprofile">
            <span aria-hidden="true" role="img">
              🖋️
            </span>
            Edit Profile
          </Link>
        </li>
        {data.currentUser.role === 'THEATER' ? (
          <div>
            <li>
              <Link to="/catalog">
                <span aria-hidden="true" role="img">
                  ❤
                </span>
                My Catalog
              </Link>
            </li>
            <li>
              <Link to="/reservations">
                <span aria-hidden="true" role="img">
                  🎟️
                </span>
                Reservations
              </Link>
            </li>
          </div>
        ) : (
          <div>
            <li>
              <Link to="/mymovies">
                <span aria-hidden="true" role="img">
                  📓
                </span>
                My Movies
              </Link>
            </li>
            <li>
              <Link to="/new">
                <span aria-hidden="true" role="img">
                  📝
                </span>
                New Movie
              </Link>
            </li>
            <li>
              <Link to="/theaters">
                <span aria-hidden="true" role="img">
                  📽️
                </span>
                Theaters
              </Link>
            </li>
          </div>
        )}
      </NavList>
    </Nav>
  )
}

export default Navigation
