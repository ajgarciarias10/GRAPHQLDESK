import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ApolloClient,InMemoryCache,ApolloProvider,useLazyQuery,useMutation} from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
    const client =  new ApolloClient({
      uri:  'http://127.0.0.1:3001/graphql',
      cache: new InMemoryCache()
  })
  return <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider> 
}

export default MyApp
