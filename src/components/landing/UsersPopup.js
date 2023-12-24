import React from "react";
import '../styles/UsersList.css'
import '../styles/Popup.css'


function UsersPopup(props) {

    return(
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={`${props.name}-popup`}
             onMouseDown={props.onOverlayClose}>
            <div className="popup__container popup__form-container popup__users-list">
                <button className="popup__exit-button" type="button" onClick={props.onClose}></button>
                    {
                        props.users.length ?
                            <div className='users-list'>
                                <h2 className="popup__title">Пользователи, идущие на мероприятие:</h2>
                                {props.users.map((user) => (
                                    <div className='user' key={user._id}>
                                        <p className='user__info user__info-popup'>{user.firstName} {user.lastName} </p>
                                        <p className='user__info user__info-mail user__info-mail-popup'>{user.email}</p>
                                    </div>
                                ))}
                            </div> :
                            <div>
                                <h2 className="popup__title">Никто не пришёл на фан-встречу</h2>
                                <h2 className="popup__title">(((</h2>
                            </div>
                    }
            </div>
        </div>
    )
}

export default UsersPopup