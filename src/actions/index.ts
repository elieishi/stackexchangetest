import {Dispatch} from 'redux';
import stackexchangeAPI from '../apis/stackexchangeAPI';
import { ActionTypes } from './types';

interface UsersAPIResponse {
    items: User[]
}

export interface User {
    badge_counts: {
        bronze: number,
        silver: number,
        gold: number
    },
    account_id: number,
    is_employee: number,
    last_modified_date: number,
    last_access_date: number,
    reputation_change_year: number,
    reputation_change_quarter: number,
    reputation_change_month: number,
    reputation_change_week: number,
    reputation_change_day: number,
    reputation: number,
    creation_date: number,
    user_type: string,
    user_id: number,
    accept_rate: number,
    location: string,
    website_url: string,
    link: string,
    profile_image: string,
    display_name: string
}

export interface GetUsersAction {
    type: ActionTypes.getUsers;
    payload: User[];
}

export const fetchUsers = () => {

    return async(dispatch: Dispatch) => {
        return stackexchangeAPI.get<UsersAPIResponse>('/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow')
                .then(response => {
                    dispatch<GetUsersAction>({
                        type: ActionTypes.getUsers,
                        payload: response.data.items
                    })
                })
                .catch(error => {
                    console.log(error);
                    dispatch<GetUsersAction>({
                        type: ActionTypes.getUsers,
                        payload: []
                    })
                })
    }
}