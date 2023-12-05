import React from "react";
import {Link} from "react-router-dom";
import personalInfoIcon from '../../images/private-info.png';
import personsIcon from '../../images/persons.png';
import logOutIcon from '../../images/log-out-icon.png'
import '../styles/Profile.css';
import MeetingList from "./MeetingList";
import {CurrentCardsContext} from "../../contexts/CurrentCardsContext";

function Profile(props) {

    const currentCards = React.useContext(CurrentCardsContext);

    const handleLogOut = () => {
        props.handleLogOut();
    }

    const handleUserCards = (cards) => {
        return cards.filter((card) => card.willGo === true);
    }

    return (
        <div className='profile'>
            <div className='profile__info'>
                <h3 className='profile__greetings'>Здраствуйте, {props.userInfo.name}!</h3>
                <Link to='personal-info' className='profile__personal-info'>
                    <img className='profile__personal-icon' alt='' src={personalInfoIcon}/>
                    <p className='profile__personal-title'>Личная информация</p>
                </Link>
                {props.isAdmin ? <Link to='users-list' className='profile__personal-info'>
                    <img className='profile__personal-icon' alt='' src={personsIcon}/>
                    <p className='profile__personal-title'>Пользователи</p>
                </Link> : ''}
                <Link to='/sign-in' className='profile__personal-info' onClick={handleLogOut}>
                    <img className='profile__personal-icon' alt='' src={logOutIcon}/>
                    <p className='profile__personal-title'>Выйти</p>
                </Link>
            </div>
            <h2 className='profile__user-cards'>Мероприятия, на которые вы идёте:</h2>
            <MeetingList cards={handleUserCards(currentCards)} onCardClick={props.onCardClick}/>
        </div>
    );
}

export default Profile;