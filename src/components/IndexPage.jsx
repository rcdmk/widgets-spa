/**
 * Dashboard (index) page definition
 */
import React from 'react';
import HeaderBar from './HeaderBar';
import DashboardBox from './DashboardBox';

import users from '../data/users';
import widgets from '../data/widgets';

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        var p = props || this.props;

        this.state = this.state || {};
        this.state.title = p && p.route && p.route.title || this.state.title;
        this.state.users = users || [];
        this.state.widgets = widgets || [];
    }

    render() {
        return (
            <div id="page-content">
                <HeaderBar title={this.props.title} breadcrumb="Home / Dashboard" />

                <div className="row">
                    <DashboardBox name="Users" icon="users" count={this.state.users.length} url="/users" />
                    <DashboardBox name="Widgets" icon="cubes" count={this.state.widgets.length} url="/widgets" />
                </div>

                <div className="row">

                    <div className="col-lg-6">
                        <div className="widget">
                            <div className="widget-header">Users
                                <div className="pull-right"><input type="text" className="form-control input-sm" /></div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">ID</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            // if
                                            this.state.users.length ?
                                                this.state.users.map(function (user, i) {
                                                    return (
                                                        <tr key={user.id}>
                                                            <td className="text-center">{i + 1}</td>
                                                            <td>{user.name}</td>
                                                        </tr> 
                                                    );
                                                })
                                            : // else
                                                <tr>
                                                    <td colSpan="2">No records found!</td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="widget">
                            <div className="widget-header">Widgets
                                <div className="pull-right"><input type="text" className="form-control input-sm" /></div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">ID</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            // if
                                            this.state.widgets.length ?
                                                this.state.widgets.map(function (widget, i) {
                                                    return (
                                                        <tr key={widget.id}>
                                                            <td className="text-center">{i + 1}</td>
                                                            <td>{widget.name}</td>
                                                        </tr> 
                                                    );
                                                })
                                            : // else
                                                <tr>
                                                    <td colSpan="2">No records found!</td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
