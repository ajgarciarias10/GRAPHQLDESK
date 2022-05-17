import {ApolloClient,InMemoryCache,ApolloProvider,useMutation} from '@apollo/client'
import CreateUser from './Components/CreateUser';

function App() {


  const client =  new ApolloClient({
    uri:  'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
})

  return (
    <ApolloProvider client={client}>
        <CreateUser/>
    </ApolloProvider>
  );
}

export default App;
