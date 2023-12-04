import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  concat,
  InMemoryCache,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import config from '../../config'

const httpLink = new HttpLink({
  uri: config.graphqlUrl,
})
const publicHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const getClient = () => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add headers
    operation.setContext(({ headers = {} }) => {
      return {
        headers: {
          ...headers,
          'X-Shopify-Storefront-Access-Token': config.token,
        },
      }
    })
    return forward(operation)
  })
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink, errorLink),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  })
}

export const apolloClient = getClient()
