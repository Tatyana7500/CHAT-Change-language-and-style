import React from 'react';
import UsersList from '../UsersList.jsx';

const mockProps = {
    usersOnline: [],
    translate: () => {},
    usersList: [],
    openPrivateChat: () => {},
};

describe('UsersList snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(
            <UsersList {...mockProps} />
        );

        expect(wrapper).matchSnapshot();
    });
});