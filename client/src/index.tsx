import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import Router from './router';
import client from './config/apollo';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Router />
        </ApolloProvider>
    </React.StrictMode>
);
