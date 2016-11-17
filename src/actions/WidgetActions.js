/**
 * FLUX Widget actions
 */
import constants from '../constants';
import AppDispatcher from '../AppDispatcher'; 

class WidgetActions {
    static loadWidgets() {
        AppDispatcher.dispatch({
            actionType: constants.actions.WIDGET_LIST
        });
    }

    static search(searchString) {
        AppDispatcher.dispatch({
            actionType: constants.actions.WIDGET_SEARCH,
            searchString: searchString
        });
    }

    static createWidget(widget) {
        AppDispatcher.dispatch({
            actionType: constants.actions.WIDGET_CREATE,
            widget: widget
        });
    }
}

export default WidgetActions; 