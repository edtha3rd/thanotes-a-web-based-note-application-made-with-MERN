import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'

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

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`

const ProfileForm = props => {
  const [value, setValues] = useState({
    address: props.user.address,
    fullName: props.user.fullName,
    phoneNumber: props.user.phoneNumber
  })

  const onChange = event => {
    setValues({
      ...value,
      [event.target.name]: event.target.value
    })
  }
  return (
    <Wrapper>
      <Form
        onSubmit={event => {
          event.preventDefault()
          props.action({
            variables: {
              ...value
            }
          })
        }}
      >
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={value.address}
          onChange={onChange}
        />
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={value.fullName}
          onChange={onChange}
        />
        <label htmlFor="Phone Number">Phone:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={value.phoneNumber}
          onChange={onChange}
        />
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  )
}

export default ProfileForm
