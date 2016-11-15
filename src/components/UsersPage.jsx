/**
 * Users page definition
 */
import React from 'react';
import HeaderBar from './HeaderBar';
import FilterableTable from './FilterableTable'

export default class UsersPage extends React.Component {
    render() {
        return (
            <div className="page-content">
                <HeaderBar title={this.props.title} breadcrumb="Home / Users" />
                <div className="row">
                    <div className="col-lg-12">
                        <FilterableTable title="Users" list={this.props.users} showImage />
                    </div>
                </div>
            </div>
        );
    }
}
