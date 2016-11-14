import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';

export default class AppRoutes extends React.Component {
    render() {
        return (
            <Router history={browserHistory} initialState={this.props.initialState} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />
        );
    }
}