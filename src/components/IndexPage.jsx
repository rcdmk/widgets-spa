/**
 * Dashboard (index) page definition
 */
import React from 'react';
import HeaderBar from './HeaderBar';
import DashboardBox from './DashboardBox';
import FilterableTable from './FilterableTable'

export default class IndexPage extends React.Component {
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
                        <FilterableTable title="Users" list={this.props.users} />
                    </div>

                    <div className="col-lg-6">
                        <FilterableTable title="Widgets" list={this.props.widgets} />
                    </div>
                </div>
            </div>
        );
    }
}
