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

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isGoing, setIsGoing] = useState(false);
    const [isOrg, setIsOrg] = useState(false);
    const isFullMeeting = props.meetingInfo.usersCount === props.meetingInfo.maxUsers;
    let meeting;
    let {id} = useParams();
    id = Number(id);

    useEffect(() => {
        if(props.meetingInfo) {
            setIsGoing(props.meetingInfo.isUserVisitMeeting);
            if(props.user.roles) {
                setIsOrg((props.user.id === props.meetingInfo.managerId));
            }
        }
    }, [props.meetingInfo, props.meetingInfo.isUserVisitMeeting])

    useEffect(() => {
        props.getInfo(id);
    }, [])

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
            link: props.meetingInfo.imageUrl,
            startDate: props.meetingInfo.startDate.slice(0, 10),
            endDate: props.meetingInfo.endDate.slice(0, 10),
            shortDescription: props.meetingInfo.shortDescription,
            gender: props.meetingInfo.gender ? props.meetingInfo.gender : 'default',
            maxUsers: props.meetingInfo.maxUsers,
            minAge: props.meetingInfo.minAge
        });
    }

    function handleDeleteClick() {
        props.onDeleteClick();
    }

    function genderSymbol() {
        return props.meetingInfo.gender === 'male' ? '♂' : '♀';
    }

    function handleGoingClick() {
        props.onGoing(isGoing);
        props.getInfo(id);
    }

    function handleUsersClick() {
        if(isOrg || props.isAdmin){
            props.onNumClick(id, isOrg);
        }
    }

    return(
        <>
            {props.loaded?
                <>
                    {props.meetingInfo ?
                        <div className='meeting'>
                            <h3 className='meeting__title'>{props.meetingInfo.name}{props.meetingInfo.gender ?
                                <span className={genderSymbol() === '♂' ? 'male' : 'female'}>{genderSymbol()}</span> : ''}</h3>
                            <div className='meeting__columns'>
                                <div className='meeting__info'>
                                    <div className='meeting__image-section'>
                                        <img className='meeting__img' src={props.meetingInfo.imageUrl}
                                             alt={props.meetingInfo.name}/>
                                        {props.meetingInfo.minAge ?
                                            <div className='meeting__age'>
                                                <p className='meeting__age-text'>{props.meetingInfo.minAge}+</p>
                                            </div> : <></>}
                                    </div>
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
                                                            <img className='edit-button__image' src={pencilIcon}/>
                                                        </div>
                                                        <div className='contact-info contact-info-delete'
                                                             onClick={handleDeleteClick}>
                                                            <p className='contact-info__text'>Удалить мероприятие</p>
                                                            <img className='delete-button__image' src={deleteIcon}/>
                                                        </div>
                                                    </> : <></>
                                            }
                                        </div>
                                        <div className='meeting__more-info'>
                                            <p className='meeting__info-text'>Начало: <span
                                                className='meeting__info-span'>{startDate}</span></p>
                                            <p className='meeting__info-text'>Конец: <span
                                                className='meeting__info-span'>{endDate}</span></p>
                                            <div
                                                className={`meeting__info-number ${(isOrg || props.isAdmin) ? 'meeting__info-number-org' : ''}`}
                                                onClick={handleUsersClick}>
                                                <p className='meeting__info-text meeting__info-number-text'>Идёт <span
                                                    className='meeting__info-span'>{props.meetingInfo.usersCount}
                                                    {props.meetingInfo.maxUsers ? '/' + props.meetingInfo.maxUsers : ''}</span> человек
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