import {combineReducers} from 'redux';
import usersReducer from './users';
import { User } from '../actions';

export interface StoreState {
    users: User[]
}

export default combineReducers<StoreState>({
    users: usersReducer
})