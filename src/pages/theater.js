import React, { useEffect } from 'react'
//graphQL dependencies
import { useQuery, gql } from '@apollo/client'
//import Theater component
import Theater from '../components/Theater'
import { GET_THEATER } from '../gql/query'

const TheaterPage = props => {
  //store id found in url as a variable
  const id = props.match.params.id
  //query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_THEATER, {
    variables: { theaterId: id }
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! Theater {id} not found </p>

  useEffect(() => {
    document.title = `Tickets! - ${data.theater.fullName}`
  })
  return <Theater theater={data.theater} />
}

export default TheaterPage
