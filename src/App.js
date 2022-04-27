import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import React from 'react'
import ReactDOM from 'react-dom'

import GlobalStyle from '/components/GlobalStyle'

// import our routes
import Pages from '/pages'
//configure API URI and cache
const uri = process.env.API_URI
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache()

//check for a token and return headers to the context
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  }
})

//configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
})

const data = {
  isLoggedIn: !!localStorage.getItem('token')
}
//write the cache data on initial load
cache.writeData({ data })
//write the cache data after cache is reset
client.onResetStore(() => cache.writeData({ data }))

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
