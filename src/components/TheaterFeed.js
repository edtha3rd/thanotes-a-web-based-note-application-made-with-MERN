import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Theater from './Theater'

const TheaterWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
  text-align: center;
`

const TheaterFeed = ({ theaters }) => {
  return (
    <div>
      {theaters.map(theater => (
        <TheaterWrapper key={theater.id}>
          <Theater theater={theater} />
          <Link to={`theater/${theater.id}`}>Permalink</Link>
        </TheaterWrapper>
      ))}
    </div>
  )
}

export default TheaterFeed
