import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

// Step 1. network interface to access graphql server
const link = new HttpLink({ uri: 'http://localhost:4000/' })

// Step 2. create a cache
const cache = new InMemoryCache()

const query = gql`
{
  pets{
    name
  }
}
`

// Step 3. create client instance using both
const client = new ApolloClient({
  link,
  cache,
})

// client.query({ query }).then((result) => console.log(result.data))

export default client