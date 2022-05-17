// import React and our routing dependencies
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
// import our shared layout component
import Layout from '../components/Layout'

// import our routes
import Home from './home'
import MyMovies from './mymovies'
import Catalog from './catalog'
import MoviePage from './movie'
import SignUp from './signup'
import SignIn from './signin'
import NewMovie from './new'
import EditProfile from './editprofile'
import EditMovie from './edit'
import Profile from './profile'
import Reservation from './reservations'
import CheckReservation from './checkreservation'
import Theaters from './theaters'
import TheaterPage from './theater'
import { IS_LOGGED_IN } from '../gql/query'

// define our routes
const Pages = () => {
  return (
    <Router>
      <Layout>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/mymovies" component={MyMovies} />
        <PrivateRoute path="/catalog" component={Catalog} />
        <PrivateRoute path="/new" component={NewMovie} />
        <PrivateRoute path="/edit/:id" component={EditMovie} />
        <PrivateRoute path="/movie/:id" component={MoviePage} />
        <PrivateRoute path="/editprofile" component={EditProfile} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/reservations" component={Reservation} />
        <PrivateRoute path="/checkreservation" component={CheckReservation} />
        <PrivateRoute path="/theaters" component={Theaters} />
        <PrivateRoute path="/theaters/:id" component={TheaterPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Layout>
    </Router>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN)
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>
  // if the user is logged in, route them to the requested component
  // else redirect them to the sign-in page
  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default Pages
