/**
 * FLUX User actions
 */
import constants from '../constants';
import AppDispatcher from '../AppDispatcher'; 

class UserActions {
    static loadUsers() {
        AppDispatcher.dispatch({
            actionType: constants.actions.USER_LIST
        });
    }

    static search(searchString) {
        AppDispatcher.dispatch({
            actionType: constants.actions.USER_SEARCH,
            searchString: searchString
        });
    }
}

export default UserActions; 