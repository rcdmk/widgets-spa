/**
 * Dashboard (index) page definition
 */
import React from 'react';
import HeaderBar from './HeaderBar';
import DashboardBox from './DashboardBox';
import FilterableTable from './FilterableTable'
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = UserStore.getState();
        
        UserActions.loadUsers();

        // needed to bind context
        this._onChange = this._onChange.bind(this);
        this._showLoading = this._showLoading.bind(this);
    }

    onUserSearch(searchString) {
        UserActions.search(searchString);
    }

    onWidgetsSearch(searchString) {
        // TODO: Implement widgets search
    }

    _onChange() {
        const state = UserStore.getState();
        state.loading = false;
        this.setState(state);
    }

    _showLoading() {
        this.setState({ loading: true });
    }

    componentWillMount() {
        UserStore.on('loading:start', this._showLoading);
        UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }

    render() {
        return (
            <div id="page-content">
                <HeaderBar title="Dashboard" breadcrumb="Home / Dashboard" />
                
                <div className="row">
                    <DashboardBox name="Users" icon="users" count={this.state.usersCount} url="/users" />
                    <DashboardBox name="Widgets" icon="cubes" count={this.props.widgets.length} url="/widgets" />
                    { this.state.loading && <div>Loading...</div>}
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <FilterableTable title="Users" list={this.state.users} onSearch={this.onUserSearch} />
                    </div>

                    <div className="col-lg-6">
                        <FilterableTable title="Widgets" list={this.props.widgets} onSearch={this.onWidgetsSearch} />
                    </div>
                </div>
            </div>
        );
    }
}
