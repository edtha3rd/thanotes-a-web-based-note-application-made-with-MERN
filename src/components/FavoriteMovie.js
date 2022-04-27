import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import ButtonAsLink from './ButtonAsLink'
import { TOGGLE_FAVORITE } from '../gql/mutation'
import { GET_MY_CATALOG } from '../gql/query'

const FavoriteMovie = props => {
  // const [count, setCount] = useState(props.favoriteCount)

  const [favorited, setFavorited] = useState(
    //check the movie exists in user favorites list
    props.me.catalogue.filter(movie => movie.id === props.movieId).length > 0
  )

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.movieId
    },
    //refecth the get_my_favs query
    refetchQueries: [{ query: GET_MY_CATALOG }]
  })

  return (
    <React.Fragment>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            setFavorited(false)
            setCount(count - 1)
          }}
        >
          Remove From Catalog
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            setFavorited(true)
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
