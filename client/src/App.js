import React from 'react';
// import ReactDOM from 'react-dom';
import { InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';

//component
import SpecificationList from './components/SpecificationList';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Sahil singh</h1>
        <SpecificationList/>
      </div>
    </ApolloProvider>
  );
}
  
export default App;
