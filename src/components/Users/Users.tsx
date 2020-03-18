import React from 'react';
import { IonList, IonItem } from '@ionic/react';
import './Users.css';
import { UsersProps } from '../../interfaces/Users/UserProps';

export class Users extends React.Component<UsersProps, { selectedUserID: number }> {

    constructor(public props: UsersProps) {
        super(props);
        this.state = {
            selectedUserID: -1
        };
    }

    selectUser(user: any) {
        this.props.sendUser(user);
        this.setState({
            selectedUserID: user.id
        })
    }

    render() {
        return (
            <IonList>
                {
                    this.props.userList.map((user: any) => {
                        return (
                            <IonItem key={user.id}
                                className={`${user.id === this.state.selectedUserID ? 'padding-20' : ''}`}
                                onClick={() => this.selectUser(user)}>
                                <img alt={`${user.first_name} ${user.last_name}`} src={user.avatar}></img> {user.first_name} {user.last_name}
                            </IonItem>
                        )
                    })
                }
            </IonList>
        );
    }

}
