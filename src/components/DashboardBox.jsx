/**
 * Dashboard count box widget definition
 */
import React from 'react';
import { Link } from 'react-router';

export default class DashboardBox extends React.Component {
    render() {
        return (
            <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="widget">
                    <div className="widget-header">
                        <div className="widget-icon green pull-left">
                            <Link to={this.props.url}><i className={`fa fa-${this.props.icon}`}></i></Link>
                        </div>
                        <div className="title">{`{${this.props.count}}`}</div>
                        <div className="comment">{this.props.name}</div>
                    </div>
                </div>
            </div>
        );
    }
}
