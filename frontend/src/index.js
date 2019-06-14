import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './App';
import {createGlobalStyle} from 'styled-components';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include'
    }
});

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    width: 100%;
    
     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
     "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
     sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
  }
  
  #root {
    height: 100%;
  }
  
  ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
  }
  
  *, *:before, *:after {
    box-sizing: border-box;
  }
  
    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }
    ::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
    ::-webkit-scrollbar-thumb {
      background: #e1e1e1;
      border: 0px none #ffffff;
      border-radius: 50px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #ffffff;
    }
    ::-webkit-scrollbar-thumb:active {
      background: #e8e8e8;
    }
    ::-webkit-scrollbar-track {
      background: #9b9b9b;
      border: 0 none #ffffff;
      border-radius: 22px;
    }
    ::-webkit-scrollbar-track:hover {
      background: #a3a3a3;
    }
    ::-webkit-scrollbar-track:active {
      background: #bbbbbb;
    }
    ::-webkit-scrollbar-corner {
      background: transparent;
    }
`;

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
