import React from "react";
import '../styles/UsersList.css'

function UsersList(props) {
    return(
        <div className='users-list'>
            <h2 className='user-list__title'>Список пользователей:</h2>
            {props.isAdmin && props.users.map((user) => (
                <div className='user' key={user._id}>
                    <p className='user__info'>{user.name}</p>
                    <p className='user__info'>{user.surname}</p>
                    <p className='user__info'>{user.email}</p>
                    <button className='user__edit-button'/>
                </div>
            ))}
        </div>
    );
}

export default UsersList