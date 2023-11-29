import React, {useEffect, useState} from "react";
import './App.css';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import Header from "./landing/Header";
import Login from "./landing/Login";
import Register from "./landing/Register";
import MeetingList from "./landing/MeetingList";
import DescriptionPopup from "./landing/DescriptionPopup";
import Profile from "./landing/Profile";
import {recoveryBtnDefault, recoveryBtn, saveBtn, saveBtnDefault, editPopupStyle} from "../utils/constants";
import {initialCards} from "../utils/initialCards";
import {userInfo} from "../utils/initialCurrentUser";
import {initialUsers} from "../utils/initialUsers";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CurrentCardsContext} from "../contexts/CurrentCardsContext";
import PersonalInfo from "./landing/PersonalInfo";
import UsersList from "./landing/UsersList";
import ForgottenPasswordPopup from "./landing/ForgottenPasswordPopup";
import RecoveryPassword from "./landing/RecoveryPassword";
import Meeting from "./landing/Meeting";
import ContactInfoPopup from "./landing/ContactInfoPopup";
import contactInfoPopup from "./landing/ContactInfoPopup";
import EditMeetingPopup from "./landing/EditMeetingPopup";


function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [currentCards, setCurrentCards] = useState([]);
    const [users, setUsers] = useState([]);
    const [contactInfo, setContactInfo] = useState({});
    const [isDescriptionPopupOpen, setDescriptionPopupState] = useState(false);
    const [isRecoveryPasswordPopupOpen, setRecoveryPasswordPopupState] = useState(false);
    const [isContactInfoPopupOpen, setContactInfoPopupState] = useState(false);
    const [isEditMeetingPopupOpen, setEditMeetingPopupState] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [selectedEditCard, setSelectedEditCard] = useState({});
    const [isAnyPopupOpen, setAnyPopupState] = useState(false);
    const [isLoggedIn, setLoggedInStatus] = useState(false);
    const [isAdmin, setAdminStatus] = useState(true);
    const [recoveryBtnMessage, setRecoveryBtnMessage] = useState(recoveryBtnDefault);
    const [editBtnMessage, setEditBtnMessage] = useState(saveBtnDefault);


    useEffect(() => {
        setCurrentUser(userInfo);
    },[])

    useEffect(() => {
        setCurrentCards(initialCards);
    },[])

    useEffect(() => {
        if(isAdmin)
            setUsers(initialUsers);
    }, [])

    useEffect(() => {
        const close = (evt) => {
            if(evt.key === 'Escape'){
                closeAllPopups();
            }
        }
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close)
    },[isAnyPopupOpen]);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setDescriptionPopupState(true);
        setAnyPopupState(true);
    }

    const handleRecoveryPasswordClick = () => {
        setRecoveryPasswordPopupState(true);
        setAnyPopupState(true);
    }

    const handleContactInfoClick = (info) => {
        setContactInfo(info);
        setContactInfoPopupState(true);
        setAnyPopupState(true);
    }

    const handleEditMeetingClick = (info) => {
        setSelectedEditCard(info);
        setEditMeetingPopupState(true);
        setAnyPopupState(true);
    }

    const handleOverlayClose = (evt) => {
        if(evt.target === evt.currentTarget)
            closeAllPopups();
    }

    const handleChangeProfile = (user) => {

    }


    const handleRecoveryPassword = (email) => {
        console.log(email);
        closeAllPopups();
    }

    const handleChangeMeeting = (info) => {
        console.log(info);
        closeAllPopups();
    }

    const handleChangePassword = (password) => {
       console.log(password);
    }

    const closeAllPopups = () => {
        setDescriptionPopupState(false);
        setRecoveryPasswordPopupState(false);
        setContactInfoPopupState(false);
        setEditMeetingPopupState(false);
        setAnyPopupState(false);
    }

    return (
        <div className='page'>
           <CurrentUserContext.Provider value={currentUser}>
               <CurrentCardsContext.Provider value={currentCards}>
                   <Header className="App-header" />
                   <main className='content'>
                       <Routes>
                           <Route path='/' element={<Navigate to='/meeting-list' replace={true}/>}/>
                           <Route path='/sign-up' element={<Register />}/>
                           <Route path='/sign-in' element={<Login onRecoveryClick={handleRecoveryPasswordClick}/>}/>
                           <Route path='/profile' element={<Profile userInfo={currentUser} userCards={currentCards}
                                onCardClick={handleCardClick} isAdmin={isAdmin}/>}/>
                           <Route path='/meeting-list' element={<MeetingList cards={currentCards} onCardClick={handleCardClick}/>}/>
                           <Route path='profile/personal-info' element={<PersonalInfo onChange={handleChangeProfile}/>}/>
                           <Route path='/profile/users-list' element={<UsersList users={users} isAdmin={isAdmin}/>}/>
                           <Route path='/recovery-password/test' element={<RecoveryPassword onSubmit={handleChangePassword}/>}/>
                           <Route path='/meeting/:id'
                                  element={<Meeting meetings={currentCards}
                                                    onContactInfoClick={handleContactInfoClick} onEditClick={handleEditMeetingClick}/>}/>
                       </Routes>
                   </main>
                   <DescriptionPopup isOpen={isDescriptionPopupOpen} card={selectedCard} onClose={closeAllPopups}
                        onOverlayClose={handleOverlayClose}/>
                   <ForgottenPasswordPopup isOpen={isRecoveryPasswordPopupOpen} btnMessage={recoveryBtnMessage}
                        onClose={closeAllPopups} onSubmit={handleRecoveryPassword} onOverlayClose={handleOverlayClose}/>
                   <ContactInfoPopup isOpen={isContactInfoPopupOpen} onOverlayClose={handleOverlayClose}
                        onClose={closeAllPopups} contactInfo={contactInfo}/>
                   <EditMeetingPopup isOpen={isEditMeetingPopupOpen} btnMessage={editBtnMessage}
                        onClose={closeAllPopups} onSubmit={handleChangeMeeting} onOverlayClose={handleOverlayClose}
                        style={editPopupStyle} meeting={selectedEditCard}/>
               </CurrentCardsContext.Provider>
           </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
