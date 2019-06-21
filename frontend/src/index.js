import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {GlobalStyle} from "./GlobalStyle";

const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include',
        uri: 'https://stickygraph.herokuapp.com'
    }
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
