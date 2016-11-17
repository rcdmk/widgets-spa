/**
 * Dashboard (index) page definition
 */
import React from 'react';
import { IndexLink, Link } from 'react-router';

export default class Layout extends React.Component {
    render() {
        return (
            <div id="page-wrapper" className="open">
                <div id="sidebar-wrapper">
                    <ul className="sidebar">
                        <li className="sidebar-main"><IndexLink to="/">Dashboard <span className="menu-icon fa fa-tachometer"></span></IndexLink></li>
                        <li className="sidebar-title"><span>NAVIGATION</span></li>
                        <li className="sidebar-list"><IndexLink to="/" key="index" activeClassName="active">Dashboard <span className="menu-icon fa fa-tachometer"></span></IndexLink></li>
                        <li className="sidebar-list"><Link to="/users" activeClassName="active">Users <span className="menu-icon fa fa-users"></span></Link></li>
                        <li className="sidebar-list"><Link to="/widgets" activeClassName="active">Widgets <span className="menu-icon fa fa-cubes"></span></Link></li>
                    </ul>
                    <div className="sidebar-footer col-xs-12"><a href="#" target="_blank">&copy; 2015 Red Ventures</a></div>
                </div>

                <div id="content-wrapper">
                    {this.props.children}
                </div>
                
            </div>
        );
    }
}
