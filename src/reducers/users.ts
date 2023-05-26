import { User, GetUsersAction } from '../actions';
import { ActionTypes } from '../actions/types';

const manage_users = (state: User[] = [], action: GetUsersAction) => {
    switch (action.type) {
        case ActionTypes.getUsers:
            return action.payload
        default:
            return state;
    }
};

export default manage_users;