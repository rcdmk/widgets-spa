/**
 * Dashboard (index) page definition
 */
import React from 'react';
import HeaderBar from './HeaderBar';
import DashboardBox from './DashboardBox';
import FilterableTable from './FilterableTable'
import UserActions from '../actions/UserActions';
import WidgetActions from '../actions/WidgetActions';
import UserStore from '../stores/UserStore';
import WidgetStore from '../stores/WidgetStore';

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        // set initial state
        const usersState = UserStore.getState();
        const widgetsState = WidgetStore.getState();

        this.state = {
            users: usersState.users,
            usersCount: usersState.usersCount,
            widgets: widgetsState.widgets,
            widgetsCount: widgetsState.widgetsCount,
            loading: true
        };

        UserActions.loadUsers();
        WidgetActions.loadWidgets();

        // needed to bind context
        this._onUsersChange = this._onUsersChange.bind(this);
        this._onWidgetsChange = this._onWidgetsChange.bind(this);
        this._showLoading = this._showLoading.bind(this);
    }

    onUserSearch(searchString) {
        UserActions.search(searchString);
    }

    onWidgetsSearch(searchString) {
        WidgetActions.search(searchString);
    }

    _onUsersChange() {
        const state = UserStore.getState();
        this.setState(state);
    }

    _onWidgetsChange() {
        const state = WidgetStore.getState();
        this.setState(state);
    }

    _showLoading(e) {
        this.setState({ loading: true });
    }

    componentWillMount() {
        UserStore.on('loading:start', this._showLoading);
        WidgetStore.on('loading:start', this._showLoading);
        UserStore.addChangeListener(this._onUsersChange);
        WidgetStore.addChangeListener(this._onWidgetsChange);
    }

    componentWillUnmount() {
        UserStore.removeListener('loading:start', this._showLoading);
        WidgetStore.removeListener('loading:start', this._showLoading);
        UserStore.removeChangeListener(this._onUsersChange);
        WidgetStore.removeChangeListener(this._onWidgetsChange);
    }

    render() {
        return (
            <div id="page-content">
                <HeaderBar title="Dashboard" breadcrumb="Home / Dashboard" />
                
                <div className="row">
                    <DashboardBox name="Users" icon="users" count={this.state.usersCount} url="/users" />
                    <DashboardBox name="Widgets" icon="cubes" count={this.state.widgetsCount} url="/widgets" />
                    { this.state.loading && <div className="col-lg-3 col-md-6 col-xs-12"><span className="loading label label-warning">Loading...</span></div>}
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <FilterableTable title="Users" list={this.state.users} onSearch={this.onUserSearch} />
                    </div>

                    <div className="col-lg-6">
                        <FilterableTable title="Widgets" list={this.state.widgets} onSearch={this.onWidgetsSearch} />
                    </div>
                </div>
            </div>
        );
    }
}
