import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { GET_THEATERS } from '../gql/query'
import TheaterFeed from '../components/TheaterFeed'

const Theaters = () => {
  useEffect(() => {
    document.title = 'Theaters - Tickets! Admin'
  })

  const { loading, error, data } = useQuery(GET_THEATERS)

  if (loading) return 'Loading...'
  if (error) return `${error.message}`

  if (data.theaters.length !== 0) {
    return <TheaterFeed theaters={data.theaters} />
  } else {
    return 'No movies yet'
  }
}

export default Theaters
