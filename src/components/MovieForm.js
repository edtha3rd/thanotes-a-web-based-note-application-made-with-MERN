import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { GET_ME } from '../gql/query'
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'
import Button from './Button'

const Wrapper = styled.div`
  height: 100%;
`

const Form = styled.form`
  height: 100%;
`

const Image = styled.img`
  height: 280px;
  width: auto;
`

const TextArea = styled.textarea`
  width: 70%;
  resize: none;
  padding: 5px 0px 5px 5px;
  rows: '1';
`

const Upload = styled.input`
  padding: 0px 0px 5px 0px;
`

const MovieForm = props => {
  //set the default stage of the form
  const [value, setValue] = useState({
    title: props.movie ? props.movie.title : '',
    year: props.movie ? props.movie.year : '',
    poster: props.movie ? props.movie.poster : ''
  })

  const { data = {} } = useQuery(GET_ME)

  const handleImage = result => {
    setValue({
      ...value,
      poster: result.info.secure_url
    })
  }
  //update the state when a user types in a form
  const onChange = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Wrapper>
      <Form
        onSubmit={e => {
          e.preventDefault()
          props.movie
            ? props.action({
                variables: {
                  ...value,
                  movieId: props.movie.id
                }
              })
            : props.action({
                variables: {
                  ...value
                }
              })
        }}
      >
        <TextArea
          required
          type="text"
          name="title"
          placeholder="Movie title"
          rows={1}
          value={value.title}
          onChange={onChange}
        />
        <TextArea
          required
          type="text"
          name="year"
          rows={1}
          placeholder="Release Year"
          value={value.year}
          onChange={onChange}
        />
        <TextArea
          required
          type="text"
          name="synopsis"
          rows={5}
          placeholder="Movie Synopsis"
          value={value.synopsis}
          onChange={onChange}
        />
        <TextArea
          required
          type="text"
          name="rating"
          rows={1}
          placeholder="'G','PG','PG-13','R','NC-17'"
          value={value.rating}
          onChange={onChange}
        />
        <br />
        <WidgetLoader />
        <Widget
          apiKey={process.env.CLOUDINARY_API_KEY}
          cloudName={process.env.CLOUDINARY_NAME}
          customPublicId={value.title}
          sources={['local']}
          // resourceType={'image'}
          uploadPreset={'tickets'}
          style={{
            color: 'white',
            border: 'none',
            width: '120px',
            backgroundColor: 'dodgerblue',
            borderRadius: '4px',
            height: '25px'
          }}
          name="poster"
          value={value.poster}
          onSuccess={result => handleImage(result)}
        />
        {/* <Upload
          type="file"
          accept="image/png, image/jpeg"
          name="poster"
          onChange={event => processUpload(event)}
        />
        <Image id="poster" /> */}
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  )
}

export default MovieForm
