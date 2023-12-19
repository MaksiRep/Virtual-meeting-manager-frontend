import React, {useEffect} from "react";
import '../styles/UsersList.css'
import {initialUsers} from "../../utils/initialUsers";

function UsersList(props) {

    function handleUserClick(user) {
        props.onClick(user);
    }

    return(
        <div className='users-list'>
            <h2 className='user-list__title'>Список пользователей:</h2>
            {props.users.map((user, id) => (
                <div className='user' key={user._id} onClick={() => handleUserClick(user)}>
                    <p className='user__info'>{user.firstName} {user.lastName} </p>
                    <p className='user__info user__info-mail'>{user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default UsersList