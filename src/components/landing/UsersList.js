import React from "react";
import '../styles/UsersList.css'

function UsersList(props) {
    return(
        <div className='users-list'>
            <h2 className='user-list__title'>Список пользователей:</h2>
            {props.isAdmin && props.users.map((user, id) => (
                <div className='user' key={user._id}>
                    <p className='user__info'>{user.name} {user.surname} </p>
                    <p className='user__info user__info-mail'>{user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default UsersList