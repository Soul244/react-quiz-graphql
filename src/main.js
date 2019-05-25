import React from 'react';
import { render } from 'react-dom';
import QuizApp from './components/QuizApp';
import './style.css';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: process.env.API_URL,
      headers: {
        "x-api-key": process.env.X_API_KEY
      },
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
})

// Source: https://www.apollographql.com/docs/react/recipes/authentication#header

render(
  <ApolloProvider client={client}>
    <QuizApp totalQuestions={10} />
  </ApolloProvider>
  ,
  document.getElementById('app')
);
