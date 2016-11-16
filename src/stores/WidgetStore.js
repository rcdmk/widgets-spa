/**
 * FLUX widget store
 */
import { EventEmitter } from 'events';
import $ from 'jquery';
import AppDispatcher from '../AppDispatcher';
import constants from '../constants';

var _state = {
    widgets: [],
    widgetsCount: 0,
    message: '',
    loading: false
};

var _props = {
    url: '/widgets/'
};

function searchWidgets(searchString) {
    return new Promise((resolve, reject) => {
        _state.loading = true;
        WidgetStore.emit('loading:start');

        $.ajax({
            url: constants.configs.apiEndpoint + _props.url + '?searchString=' + searchString,
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
            _state.widgets = data.filter((u, i) => u.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0);
        } else {
            _state.widgets = data;
        }

        _state.widgetsCount = data.length;
        _state.message = '';
        _state.loading = false;

        WidgetStore.emit('loading:complete');
        WidgetStore.emitChange();
   })
    .catch((err) => {
        _state.message = err.toString();
        _state.loading = false;
        WidgetStore.emit('loading:error');
        WidgetStore.emitChange();
    });
}

function loadWidgets() {
    return searchWidgets('');
}

var WidgetStore = $.extend({}, EventEmitter.prototype, {
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
        case constants.actions.WIDGET_LIST:
            loadWidgets();
            break; 

        case constants.actions.WIDGET_SEARCH:
            searchWidgets(action.searchString);
            break; 

        default:
            return true;       
    }

    WidgetStore.emitChange();
    return true;
});

export default WidgetStore;