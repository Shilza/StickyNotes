import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {GlobalStyle} from "./GlobalStyle";
import { onError } from "apollo-link-error";
import {createHttpLink} from "apollo-link-http";

const httpLink = createHttpLink({
    uri: "https://stickygraph.herokuapp.com/graphql",
    credentials: 'include',
    fetchOptions: {
        mode: 'no-cors',
    },
    compress: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = errorLink.concat(httpLink);

const client = new ApolloClient({
    link, cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
        <GlobalStyle/>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
