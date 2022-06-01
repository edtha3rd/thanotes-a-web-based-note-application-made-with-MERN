import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Button from './Button'

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }
  input {
    width: 100%;
    margin-bottom: 1em;
  }
`

const UserForm = props => {
  //set the default state of the form
  const [values, setValues] = useState()
  //update the state when a user types in the form
  const onChange = event => {
    if (event.target.name === 'password') {
      if (event.target.value.length < 8) {
        return
      }
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }
  return (
    <Wrapper>
      {/*display appropriate form header */}
      {props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
      {/*perform mutation when user submits form*/}
      <Form
        onSubmit={event => {
          event.preventDefault()
          props.action({
            variables: {
              ...values
            }
          })
        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <span>Password must be at least 8 characters</span>
        {props.formType === 'signup' && (
          <React.Fragment>
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              id="username"
              name="username"
              placeholder="username"
              onChange={onChange}
            />
            <label htmlFor="address">Address:</label>
            <input
              required
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              onChange={onChange}
            />
            <label htmlFor="fullName">Full Name:</label>
            <input
              required
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              onChange={onChange}
            />
            <label htmlFor="Phone Number">Phone:</label>
            <input
              required
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone"
              onChange={onChange}
            />
            <label htmlFor="role">Role:</label>
            <input
              required
              type="text"
              id="role"
              name="role"
              placeholder="THEATER (case sensitive)"
              onChange={onChange}
            />
            <Link to="/signin">
              <p>Already have an account? This way...</p>
            </Link>
          </React.Fragment>
        )}
        {props.formType === 'signIn' && (
          <Link to="/signup">
            <p>No account? Click here...</p>
          </Link>
        )}
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  )
}

export default UserForm
