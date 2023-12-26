import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import personalInfoIcon from '../../images/private-info.png';
import personsIcon from '../../images/persons.png';
import logOutIcon from '../../images/log-out-icon.png'
import '../styles/Profile.css';
import MeetingList from "./MeetingList";
import {CurrentCardsContext} from "../../contexts/CurrentCardsContext";

function Profile(props) {

    const currentCards = React.useContext(CurrentCardsContext);

    useEffect(() => {
        props.getMeetings(true);
    }, [props.loggedIn, props.page])

    const handleLogOut = () => {
        props.handleLogOut();
    }

    return (
        <div className='profile'>
            <div className='profile__info'>
                <h3 className='profile__greetings'>Здраствуйте, {props.userInfo.firstName}!</h3>
                <Link to='/profile/personal-info' className='profile__personal-info'>
                    <img className='profile__personal-icon' alt='' src={personalInfoIcon}/>
                    <p className='profile__personal-title'>Личная информация</p>
                </Link>
                <Link to='/sign-in' className='profile__personal-info' onClick={handleLogOut}>
                    <img className='profile__personal-icon' alt='' src={logOutIcon}/>
                    <p className='profile__personal-title'>Выйти</p>
                </Link>
            </div>
            <h2 className='profile__user-cards'>Мероприятия, на которые вы идёте:</h2>
            {(currentCards.length || !(props.isLoaded)) ?
                <MeetingList cards={currentCards} onCardClick={props.onCardClick} isFull={props.isFull}
                isLoaded={props.isLoaded} page={props.page} toLoad={props.toLoad}  loggedIn={props.loggedIn}/> :
                <div>
                    <h3 className='profile__error'>УВЫ</h3>
                    <h3 className='profile__greetings'>Вы ещё не записаны ни на одно мероприятие</h3>
                </div>}
        </div>
    );
}

export default Profile;