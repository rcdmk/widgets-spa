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
        <IndexRoute component={IndexPage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/widgets" component={WidgetsPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);

export default routes;