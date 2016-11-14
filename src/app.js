import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

window.onload = () => {
    const initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

    ReactDOM.render(<AppRoutes initialState={initialState} />, document.getElementById('react-app'));
};