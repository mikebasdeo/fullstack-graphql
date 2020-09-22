import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

// Step 1. network interface to create link to the server
const link = new HttpLink({ uri: 'https://rickandmortyapi.com/graphql/' })

// Step 2. create a cache
const cache = new InMemoryCache()

const query = gql`
  {
    characters {
      results {
        id
        name
        species
      }
    }
  }
`

// Step 3. create client instance using both
const client = new ApolloClient({
  link,
  cache,
})

client.query({ query }).then((result) => console.log(result))

export default client
