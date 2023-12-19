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
        return cards.filter((card) => card.isUserVisitMeeting);
    }

    return (
        <div className='profile'>
            <div className='profile__info'>
                <h3 className='profile__greetings'>Здраствуйте, {props.userInfo.firstName}!</h3>
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
            {(handleUserCards(currentCards).length) ?
                <MeetingList cards={handleUserCards(currentCards)} onCardClick={props.onCardClick}/> :
                <div>
                    <h3 className='profile__error'>УВЫ</h3>
                    <h3 className='profile__greetings'>Вы ещё не записаны ни на одно мероприятие</h3>
                </div>}
        </div>
    );
}

export default Profile;