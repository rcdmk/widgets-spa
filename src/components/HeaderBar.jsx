/**
 * Page Header bar definition
 */
import React from 'react';

export default class HeaderBar extends React.Component {
    render() {
        return (
            <div className="row header col-xs-12">
                <div className="user pull-right">
                    <div className="item dropdown">
                        <a href="#user-info" className="dropdown-toggle"><img src="/img/avatar.jpg" alt="" /></a>
                    </div>
                </div>
                <div className="meta">
                    <div className="page">{this.props.title}</div>
                    <div className="breadcrumb-links">{this.props.breadcrumb}</div>
                </div>
            </div>
        );
    }
}
