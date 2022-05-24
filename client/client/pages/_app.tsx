import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ApolloClient,InMemoryCache,ApolloProvider,useLazyQuery,useMutation} from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
  //Cliente de apollo con la conexion
    const client =  new ApolloClient({
      uri:  'http://127.0.0.1:3001/graphql',
      cache: new InMemoryCache()
  })
  //El componente Apollo Provider se utilza de componentes padres > hijos por lo tanto tiene que estar tanto aqui por que va de app > index
  return <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider> 
}

export default MyApp
