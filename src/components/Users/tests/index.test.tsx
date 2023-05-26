import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Users from '..';
import thunk from 'redux-thunk'

const mockStore = configureStore([thunk]);

const initialState = {
    users:[
        {
            "badge_counts": {
            "bronze": 9169,
            "silver": 9094,
            "gold": 859
            },
            "account_id": 11683,
            "is_employee": false,
            "last_modified_date": 1684952719,
            "last_access_date": 1684963690,
            "reputation_change_year": 26743,
            "reputation_change_quarter": 9628,
            "reputation_change_month": 4500,
            "reputation_change_week": 730,
            "reputation_change_day": 10,
            "reputation": 1404186,
            "creation_date": 1222430705,
            "user_type": "registered",
            "user_id": 22656,
            "accept_rate": 86,
            "location": "Reading, United Kingdom",
            "website_url": "http://csharpindepth.com",
            "link": "https://stackoverflow.com/users/22656/jon-skeet",
            "profile_image": "https://www.gravatar.com/avatar/6d8ebb117e8d83d74ea95fbdd0f87e13?s=256&d=identicon&r=PG",
            "display_name": "Jon Skeet"
        },
        {
            "badge_counts": {
            "bronze": 779,
            "silver": 639,
            "gold": 57
            },
            "account_id": 1165580,
            "is_employee": false,
            "last_modified_date": 1684857600,
            "last_access_date": 1684150816,
            "reputation_change_year": 13243,
            "reputation_change_quarter": 4082,
            "reputation_change_month": 1738,
            "reputation_change_week": 245,
            "reputation_change_day": 10,
            "reputation": 1234827,
            "creation_date": 1326311637,
            "user_type": "registered",
            "user_id": 1144035,
            "location": "New York, United States",
            "website_url": "http://www.data-miners.com",
            "link": "https://stackoverflow.com/users/1144035/gordon-linoff",
            "profile_image": "https://www.gravatar.com/avatar/e514b017977ebf742a418cac697d8996?s=256&d=identicon&r=PG",
            "display_name": "Gordon Linoff"
        }, 
    ]
}

const store = mockStore(initialState)

describe('Users Component', () => {
    it('should renders component will all users', () => {
        render(
            <Provider store={store}>
                <Users />
            </Provider>
        );
        const tableBodyRows = screen.getAllByRole('row')
        expect(tableBodyRows).toHaveLength(3);

        expect(screen.getByText(('Jon Skeet'))).toBeDefined();
        expect(screen.getByText('Gordon Linoff')).toBeDefined();

    });

    it('should renders component and be able to click on user to expand more details', () => {
        render(
            <Provider store={store}>
                <Users />
            </Provider>
        );

        fireEvent.click(screen.getAllByRole('row')[2])
        const followButtons = screen.getAllByRole('button', {
            name: /follow/i
        });
        expect(followButtons).toHaveLength(1);

        const blockButtons = screen.getAllByRole('button', {
            name: /block/i
        });
        expect(blockButtons).toHaveLength(1);

        const unBlockButtons = screen.queryAllByText('Unfollow')
        expect(unBlockButtons).toHaveLength(0)
        
    });

    it('should renders component and be able to follow a user', () => {
        render(
            <Provider store={store}>
                <Users />
            </Provider>
        );

        fireEvent.click(screen.getAllByRole('row')[2])
        fireEvent.click(screen.getAllByRole('button', {name: /follow/i})[0])

        expect(screen.getByText("Unfollow")).toBeDefined();
        expect(screen.queryByText("follow")).toEqual(null);
        
    });

    it('should renders component and be able to block a user', () => {
        render(
            <Provider store={store}>
                <Users />
            </Provider>
        );

        fireEvent.click(screen.getAllByRole('row')[2])
        fireEvent.click(screen.getAllByRole('button', {name: /block/i})[0])

        expect(screen.queryByText("follow")).toEqual(null);
        expect(screen.queryByText("block")).toEqual(null);

    });
});