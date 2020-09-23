import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

// Step 1. network interface to access graphql server
const http = new HttpLink({ uri: 'http://localhost:4000/' })

// make a delay
const delay = setContext(
  (request) =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success()
      }, 800)
    })
)

const link = ApolloLink.from([delay, http])

// Step 2. create a cache
const cache = new InMemoryCache()

// const query = gql`
//   {
//     pets {
//       name
//     }
//   }
// `

// Step 3. create client instance using both
const client = new ApolloClient({
  link,
  cache,
})

// client.query({ query }).then((result) => console.log(result.data))

export default client
