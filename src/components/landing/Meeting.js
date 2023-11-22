import React from "react";
import '../styles/Meeting.css'
import personalInfoIcon from '../../images/private-info.png';
import {useParams} from "react-router-dom";
import {CurrentCardsContext} from "../../contexts/CurrentCardsContext";

function Meeting(props) {

    let {id} = useParams();
    id = Number(id);
    const currentMeetings = React.useContext(CurrentCardsContext);
    const currentMeeting = currentMeetings.find(f => f._id=== id);

    function handleInfoClick() {
        props.onContactInfoClick({
            email: currentMeeting.owner.email,
            phone: currentMeeting.owner.phone
        })
    }

    return(
        <>
            {currentMeeting ?
                <div className='meeting'>
                    <h3 className='meeting__title'>{currentMeeting.name}</h3>
                    <div className='meeting__columns'>
                        <div className='meeting__info'>
                            <img className='meeting__img' src={currentMeeting.link} alt={currentMeeting.name}/>
                            <div className='meeting__owner-info'>
                                <p className='meeting__owner'>Организатор: {currentMeeting.owner.name}</p>
                                <div className='contact-info' onClick={handleInfoClick}>
                                    <p className='contact-info__text'>Контактная информация</p>
                                    <img className='contact-info__img' src={personalInfoIcon}/>
                                </div>
                            </div>
                        </div>
                        <div className='meeting__other-info'>
                            <p className='meeting__description'>{currentMeeting.description}</p>
                            <button className='popup__admit-button meeting__button'>Пойду</button>
                        </div>
                    </div>
                </div> :
                <div className='meeting'>
                    <h3 className='meeting__error'>404</h3>
                    <h3 className='meeting__title'>Мероприятие не найдено</h3>
                </div>}
        </>
    );
}

export default Meeting