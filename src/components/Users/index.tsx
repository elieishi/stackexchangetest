import React from 'react';
import { User, fetchUsers } from '../../actions';
import { StoreState } from '../../reducers';
import { connect } from 'react-redux';
import { Header, Image, Table, Segment, Grid, Button, Icon } from 'semantic-ui-react'

interface UsersProps {
    users: User[];
    fetchUsers(): any;
}

type UsersState = {
    expandedRows: number[];
    followedUsers: number[];
    blockedUsers: number[]
};

class Users extends React.Component<UsersProps> {

    state: UsersState = {
        expandedRows: [],
        followedUsers: [],
        blockedUsers: []
    };

    componentDidMount() {
        this.props.fetchUsers();
    }

    handleRowClick(userAccountId: number) {
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(userAccountId);
        const newExpandedRows = isRowCurrentlyExpanded
        ? currentExpandedRows.filter(id => id !== userAccountId)
        : currentExpandedRows.concat(userAccountId);
    
        this.setState({ expandedRows: newExpandedRows });
    }

    followUser(userAccountId: number) {
        const currentFollowedUsers = this.state.followedUsers;
        const isUserFollowed = currentFollowedUsers.includes(userAccountId)

        if ( !isUserFollowed) {    
            this.setState({
                followedUsers:[...this.state.followedUsers, userAccountId]
            });
        }
    }

    unFollowUser(userAccountId: number) {
        const currentFollowedUsers = this.state.followedUsers;
        const isUserFollowed = currentFollowedUsers.includes(userAccountId)

        if (isUserFollowed) {  
            this.setState({
                followedUsers: currentFollowedUsers.filter(id => id !== userAccountId) 
            });
        }
    }

    blockUser(userAccountId: number) {
        const currentBlockedUsers = this.state.blockedUsers;
        const isUserBlocked = currentBlockedUsers.includes(userAccountId)

        if ( !isUserBlocked) {    
            this.setState({
                blockedUsers:[...this.state.blockedUsers, userAccountId]
            });
        }
    }

    renderUser(user: User) {

        const isUserFollowed = this.state.followedUsers.includes(user.account_id);
        const isUserBlocked = this.state.blockedUsers.includes(user.account_id);
        const isExpandableRow = this.state.expandedRows.includes(user.account_id)

        const userData = [
            <Table.Row onClick={() => this.handleRowClick(user.account_id)} key={"row-data-" + user.account_id} disabled={isUserBlocked ? true : false}>
                <Table.Cell>
                <Header as='h4' image>
                    <Image src={user.profile_image} rounded size='mini' />
                    <Header.Content>
                    {user.display_name} 
                    {isUserFollowed && <Icon name='heart' />}
                    </Header.Content>
                </Header>
                </Table.Cell>
                <Table.Cell>{user.reputation}</Table.Cell>
            </Table.Row>
        ];

        if (isExpandableRow && !isUserBlocked) {
            userData.push(
            <Table.Row key={"row-expanded-" + user.account_id}>
                <Table.Cell colSpan="4">
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column>
                                {!isUserFollowed && <span>
                                    <Button color='blue'  icon labelPosition='left' onClick={() => this.followUser(user.account_id)}>
                                        <Icon name='heart' />Follow
                                    </Button>
                                </span>}

                                {isUserFollowed && <span>
                                    <Button color='yellow'  icon labelPosition='left' onClick={() => this.unFollowUser(user.account_id)}>
                                        <Icon name='heart' />Unfollow
                                    </Button>
                                </span>}
                            </Grid.Column>

                            <Grid.Column>
                                {!isUserBlocked && <span>
                                    <Button color='red'  icon labelPosition='left' onClick={() => this.blockUser(user.account_id)}>
                                        <Icon name='remove user' />Block
                                    </Button>
                                </span>}
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Table.Cell>
            </Table.Row>
            );
        }

        return userData

    }

    render() {

        if (this.props.users.length < 1) {
            return (
                <div>No users currently available!!</div>
            );
        }


    return (
        <Table basic='very' celled collapsing>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell>Reputation</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {this.props.users && this.props.users.map((user: User, index: number) => {
                    return this.renderUser(user)
                })}
            </Table.Body>

        </Table>
    )
    }
}

const mapStateToProps = (state: StoreState): { users: User[]} => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, {fetchUsers} )(Users)