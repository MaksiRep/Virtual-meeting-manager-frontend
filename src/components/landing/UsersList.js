import React, {useEffect} from "react";
import '../styles/UsersList.css'
import {initialUsers} from "../../utils/initialUsers";

function UsersList(props) {

    useEffect(() => {
        props.toLoad(true);
    }, []);

    function handleUserClick(user) {
        console.log(user);
        props.onClick(user);
    }

    return(
        <div className='users-list'>
            <h2 className='user-list__title'>Список пользователей:</h2>
            {props.users.map((user) => (
                <div className='user user-list' key={user.id} onClick={() => handleUserClick(user)}>
                    <p className='user__info'>{user.firstName} {user.lastName} </p>
                    <p className='user__info user__info-mail'>{user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default UsersList