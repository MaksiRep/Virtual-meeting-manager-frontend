import React, {useEffect} from "react";
import '../styles/UsersList.css'
import Loader from "./Loader";

function UsersList(props) {

    useEffect(() => {
        props.getUsers();
    }, []);

    function handleUserClick(user) {
        console.log(user);
        props.onClick(user);
    }

    return(
        <>
            {props.isLoaded ?
                <div className='users-list'>
                    <h2 className='user-list__title'>Список пользователей:</h2>
                    {props.users.map((user) => (
                        <div className='user user-list' key={user.id} onClick={() => handleUserClick(user)}>
                            <p className='user__info'>{user.firstName} {user.lastName} </p>
                            <p className='user__info user__info-mail'>{user.email}</p>
                        </div>
                    ))}
                </div> : <Loader />}
        </>
    );
}

export default UsersList