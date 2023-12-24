import React, {useEffect, useState} from "react";
import '../styles/Meeting.css'
import personalInfoIcon from '../../images/private-info.png';
import pencilIcon from '../../images/pencil.svg';
import deleteIcon from '../../images/delete.svg'
import {useParams} from "react-router-dom";
import Loader from "./Loader";
import {CurrentCardsContext} from "../../contexts/CurrentCardsContext";
import {getDateFormat} from "../../utils/constants";

function Meeting(props) {

    const [currentMeeting, setCurrentMeeting] = useState({});
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isGoing, setIsGoing] = useState(false);
    const [isOrg, setIsOrg] = useState(false);
    const isFullMeeting = props.meetingInfo.usersCount === props.meetingInfo.maxUsers;
    let meeting;
    let {id} = useParams();
    id = Number(id);
    const currentMeetings = React.useContext(CurrentCardsContext);


    useEffect(() => {
        meeting = currentMeetings.find(f => f.id === id);
        setCurrentMeeting(meeting);
    }, [currentMeetings])

    useEffect(() => {
        if(currentMeeting) {
            setIsGoing(props.meetingInfo.isUserVisitMeeting);
            if(props.user.roles) {
                setIsOrg((props.user.id === props.meetingInfo.managerId));
            }
        }
    }, [props.meetingInfo, props.meetingInfo.isUserVisitMeeting])

    useEffect(() => {
        props.getInfo(id);
    }, [currentMeeting, props.meetingInfo.isUserVisitMeeting])

    useEffect(() => {
        if(isOrg){
            props.getUsers(id, isOrg)
        }
    }, [isOrg])

    useEffect(() => {
        if(props.meetingInfo.startDate) {
            setStartDate(getDateFormat(props.meetingInfo.startDate));
            setEndDate(getDateFormat(props.meetingInfo.endDate));
        }
    },[props.meetingInfo])

    function handleInfoClick() {
        props.onContactInfoClick({
            email: props.meetingInfo.managerEmail,
        })
    }

    function handleEditClick() {
        props.onEditClick({
            id: props.meetingInfo.id,
            description: props.meetingInfo.description,
            name: props.meetingInfo.name,
            link: currentMeeting.imageUrl,
            startDate: props.meetingInfo.startDate.slice(0, 10),
            endDate: props.meetingInfo.endDate.slice(0, 10),
            shortDescription: currentMeeting.shortDescription,
            gender: props.meetingInfo.gender ? props.meetingInfo.gender : 'default',
            maxUsers: props.meetingInfo.maxUsers,
            minAge: props.meetingInfo.minAge
        });
    }

    function handleDeleteClick() {
        props.onDeleteClick();
    }

    function handleGoingClick() {
        props.onGoing(isGoing);
    }

    function handleUsersClick() {
        if(isOrg){
            props.onNumClick();
        }
    }

    return(
        <>
            {props.loaded?
                <>
                    {currentMeeting ?
                        <div className='meeting'>
                            <h3 className='meeting__title'>{currentMeeting.name}</h3>
                            <div className='meeting__columns'>
                                <div className='meeting__info'>
                                    <img className='meeting__img' src={currentMeeting.imageUrl} alt={currentMeeting.name}/>
                                    <div className='meeting__info-columns'>
                                        <div className='meeting__owner-info'>
                                            <p className='meeting__owner'>Организатор: {props.meetingInfo.managerEmail}</p>
                                            <div className='contact-info' onClick={handleInfoClick}>
                                                <p className='contact-info__text'>Контактная инф-ция</p>
                                                <img className='contact-info__img' src={personalInfoIcon}/>
                                            </div>
                                            {
                                                (isOrg || props.isAdmin) ?
                                                    <>
                                                        <div className='contact-info' onClick={handleEditClick}>
                                                            <p className='contact-info__text'>Редактирование</p>
                                                            <img className='edit-button__image'  src={pencilIcon}/>
                                                        </div>
                                                        <div className='contact-info contact-info-delete' onClick={handleDeleteClick}>
                                                            <p className='contact-info__text'>Удалить мероприятие</p>
                                                            <img className='delete-button__image'  src={deleteIcon}/>
                                                        </div>
                                                    </> : <></>
                                            }
                                        </div>
                                        <div className='meeting__more-info'>
                                            <p className='meeting__info-text'>Начало: <span className='meeting__info-span'>{startDate}</span></p>
                                            <p className='meeting__info-text'>Конец: <span className='meeting__info-span'>{endDate}</span></p>
                                            <div className={`meeting__info-number ${(isOrg || props.isAdmin) ? 'meeting__info-number-org' : ''}`}
                                                onClick={handleUsersClick}>
                                                <p className='meeting__info-text meeting__info-number-text'>Идёт <span
                                                    className='meeting__info-span'>{props.meetingInfo.usersCount}</span> человек
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='meeting__other-info'>
                                    <p className='meeting__description'>{props.meetingInfo.description}</p>
                                    <button className='popup__admit-button meeting__button' onClick={handleGoingClick}
                                            disabled={(isOrg) || isFullMeeting}>{isGoing ? 'Не пойду' : 'Пойду'}</button>
                                </div>
                            </div>
                        </div> :
                        <div className='meeting'>
                            <h3 className='meeting__error'>404</h3>
                            <h3 className='meeting__title'>Мероприятие не найдено</h3>
                        </div>}
                </> :
                <Loader>
                </Loader>
            }
        </>
    );
}

export default Meeting