/**
 * FLUX users store
 */
import { EventEmitter } from 'events';
import $ from 'jquery';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';

var _state = {
    users: [],
    usersCount: 0,
    message: '',
    loading: false
};

var _props = {
    url: '/users/'
};

function searchUsers(searchString) {
    return new Promise((resolve, reject) => {
        _state.loading = true;
        UserStore.emit('loading:start');

        $.ajax({
            url: constants.configs.apiEndpoint + _props.url + '?searchString=' + searchString,
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: resolve,
            error: function ajaxError(xhr, status, err) {                
                reject(err);
            }
        });
    })
    .then((data) => {
        if (searchString) {
            _state.users = data.filter((u, i) => u.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0);
        } else {
            _state.users = data;
        }

        _state.usersCount = data.length;
        _state.message = '';
        _state.loading = false;

        UserStore.emit('loading:complete');
        UserStore.emitChange();
   })
    .catch((err) => {
        _state.message = (err && err.toString()) || 'Error loading users!';
        _state.loading = false;
        UserStore.emit('loading:error');
        UserStore.emitChange();
    });
}

function loadUsers() {
    return searchUsers('');
}

var UserStore = $.extend({}, EventEmitter.prototype, {
    getState: function getState() {
        return _state;
    },
    emitChange: function emitChange() {
        return this.emit('change');
    },
    addChangeListener: function addChangeListener(listener) {
        return this.on('change', listener);
    },
    removeChangeListener: function removeChangeListener(listener) {
        return this.removeListener('change', listener);
    }
});


AppDispatcher.register((action) => {
    switch(action.actionType) {
        case constants.actions.USER_LIST:
            loadUsers();
            break; 

        case constants.actions.USER_SEARCH:
            searchUsers(action.searchString);
            break; 

        default:
            return true;
    }

    UserStore.emitChange();
    return true;
});

export default UserStore;