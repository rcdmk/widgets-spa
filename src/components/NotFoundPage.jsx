import React from 'react';
import { Link } from 'react-router';
import HeaderBar from './HeaderBar';

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <div id="page-content" className="clearfix">
                <HeaderBar title="Not Found" breadcrumb="Home / Not Found" />
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Oops! 404!</h1>
                        <h2>Page not found!</h2>
                        <p>The page you've requested does not exist.</p>
                        <p>
                            <Link to="/">Back to home page</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}