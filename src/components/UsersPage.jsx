/**
 * Users page definition
 */
import React from 'react';
import HeaderBar from './HeaderBar';
import FilterableTable from './FilterableTable'
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

export default class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = UserStore.getState();
        
        UserActions.loadUsers();

        // needed to bind context
        this._onChange = this._onChange.bind(this);
    }

    _onChange() {
        this.setState(UserStore.getState());
    }

    componentWillMount() {
        UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }

    onSearch(searchString) {
        UserActions.search(searchString);
    }

    render() {
        return (
            <div className="page-content">
                <HeaderBar title="Users" breadcrumb="Home / Users" />
                <div className="row">
                    <div className="col-lg-12">
                        <FilterableTable title="Users" list={this.state.users} onSearch={this.onSearch} showImage />
                    </div>
                </div>
            </div>
        );
    }
}
