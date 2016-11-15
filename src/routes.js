/**
 * React app route definition
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import UsersPage from './components/UsersPage';
import WidgetsPage from './components/WidgetsPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (initialState) => (
    <Route path="/" component={Layout}>
        <IndexRoute component={(props) => (
            <IndexPage title="Dashboard" users={initialState && initialState.users} widgets={initialState && initialState.widgets} />
        )} />
        <Route path="/users" component={(props) => (
            <UsersPage title="Users" users={initialState && initialState.users} />
        )} />
        <Route path="/widgets" component={(props) => (
            <WidgetsPage title="Widgets" widgets={initialState && initialState.widgets} />
        )} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);

export default routes;