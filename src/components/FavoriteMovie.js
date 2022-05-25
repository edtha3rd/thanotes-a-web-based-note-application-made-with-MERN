import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import ButtonAsLink from './ButtonAsLink'
import { TOGGLE_CATALOG } from '../gql/mutation'
import { GET_MY_CATALOG } from '../gql/query'

const FavoriteMovie = props => {
  const [count, setCount] = useState(props.showingAtCount)

  const [cataloged, setCataloged] = useState(
    //check the movie exists in user's catalog list
    props.me.catalogue.filter(movie => movie.id === props.movieId).length > 0
  )

  const [toggleCatalog] = useMutation(TOGGLE_CATALOG, {
    variables: {
      id: props.movieId
    },
    //refecth the get_my_catalog query
    refetchQueries: [
      {
        query: GET_MY_CATALOG,
        variables: {
          theaterId: props.me.id
        }
      }
    ]
  })

  return (
    <React.Fragment>
      {cataloged ? (
        <ButtonAsLink
          onClick={() => {
            toggleCatalog()
            setCataloged(false)
            setCount(count - 1)
          }}
        >
          Remove From Catalog
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleCatalog()
            setCataloged(true)
            setCount(count + 1)
          }}
        >
          Add To Catalog
        </ButtonAsLink>
      )}
    </React.Fragment>
  )
}

export default FavoriteMovie
