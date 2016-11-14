/**
 * React app route definition
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (initialState) => (
    <Route path="/" component={Layout}>
        <IndexRoute component={(props) => (<IndexPage title="Dashboard" users={initialState && initialState.users} widgets={initialState && initialState.widgets} />)} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);

export default routes;