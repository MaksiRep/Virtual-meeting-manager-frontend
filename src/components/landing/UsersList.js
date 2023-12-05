import React, {useEffect} from "react";
import '../styles/UsersList.css'
import {initialUsers} from "../../utils/initialUsers";

function UsersList(props) {


    useEffect(() => {
        console.log(props.users);
    }, [])

    function handleUserClick(user) {
        props.onClick(user);
    }

    return(
        <div className='users-list'>
            <h2 className='user-list__title'>Список пользователей:</h2>
            {props.isAdmin && props.users.map((user, id) => (
                <div className='user' key={user._id} onClick={() => handleUserClick(user)}>
                    <p className='user__info'>{user.name} {user.surname} </p>
                    <p className='user__info user__info-mail'>{user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default UsersList