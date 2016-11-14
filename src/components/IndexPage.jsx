/**
 * Dashboard (index) page definition
 */
import React from 'react';
import HeaderBar from './HeaderBar';
import DashboardBox from './DashboardBox';

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        var p = props || this.props || {};

        // initial state
        this.state = this.state || {};
        this.state.users = p.users || [];
        this.state.widgets = p.widgets || [];

        // needed to bind the current context
        this.filterUsers = this.filterUsers.bind(this);
    }

    filterUsers() {
        var searchString = this.refs.filterUsersInput.value;
        var filteredUsers = this.props.users.filter((u, i) => u.name.toLowerCase().indexOf(searchString) >= 0);

        this.setState({ users: filteredUsers });
    }

    render() {
        return (
            <div id="page-content">
                <HeaderBar title={this.props.title} breadcrumb="Home / Dashboard" />

                <div className="row">
                    <DashboardBox name="Users" icon="users" count={this.props.users.length} url="/users" />
                    <DashboardBox name="Widgets" icon="cubes" count={this.props.widgets.length} url="/widgets" />
                </div>

                <div className="row">

                    <div className="col-lg-6">
                        <div className="widget">
                            <div className="widget-header">Users
                                <div className="pull-right"><input type="text" className="form-control input-sm" ref="filterUsersInput" onChange={this.filterUsers} /></div>
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
                                                            <td className="text-center">{user.id}</td>
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
                                                            <td className="text-center">{widget.id}</td>
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
