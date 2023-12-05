import React, {useEffect, useState} from "react";
import './App.css';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import Header from "./landing/Header";
import Login from "./landing/Login";
import Register from "./landing/Register";
import MeetingList from "./landing/MeetingList";
import DescriptionPopup from "./landing/DescriptionPopup";
import Profile from "./landing/Profile";
import {
    authMessageSuccess, authMessageFailure, recoveryBtnDefault,
    recoveryBtn, saveBtn, saveBtnDefault, editPopupStyle
}from "../utils/constants";
import {initialCards} from "../utils/initialCards";
import {userInfo} from "../utils/initialCurrentUser";
import {initialUsers} from "../utils/initialUsers";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CurrentCardsContext} from "../contexts/CurrentCardsContext";
import {loginUser} from "../utils/auth";
import PersonalInfo from "./landing/PersonalInfo";
import UsersList from "./landing/UsersList";
import ForgottenPasswordPopup from "./landing/ForgottenPasswordPopup";
import RecoveryPassword from "./landing/RecoveryPassword";
import Meeting from "./landing/Meeting";
import ContactInfoPopup from "./landing/ContactInfoPopup";
import contactInfoPopup from "./landing/ContactInfoPopup";
import EditMeetingPopup from "./landing/EditMeetingPopup";
import InfoTooltip from "./landing/InfoTooltip";
import UserPopup from "./landing/UserPopup";
import MainPage from "./landing/MainPage";


function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [currentCards, setCurrentCards] = useState([]);
    const [users, setUsers] = useState([]);
    const [contactInfo, setContactInfo] = useState({});
    const [isDescriptionPopupOpen, setDescriptionPopupState] = useState(false);
    const [isRecoveryPasswordPopupOpen, setRecoveryPasswordPopupState] = useState(false);
    const [isContactInfoPopupOpen, setContactInfoPopupState] = useState(false);
    const [isEditMeetingPopupOpen, setEditMeetingPopupState] = useState(false);
    const [isInfoTooltipPopupOpen, setInfoTooltipPopupState] = useState(false);
    const [authMessage, setAuthMessage] = useState({});
    const [isEditUserPopupOpen, setEditUserPopupState] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [selectedEditCard, setSelectedEditCard] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [isAnyPopupOpen, setAnyPopupState] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setAdminStatus] = useState(true);
    const [recoveryBtnMessage, setRecoveryBtnMessage] = useState(recoveryBtnDefault);
    const [editBtnMessage, setEditBtnMessage] = useState(saveBtnDefault);
    const navigate = useNavigate();

    const isTokenExist = () => {
        return localStorage.getItem('jwt')
    }

    useEffect(() => {
        if(isTokenExist()){
            setLoggedIn(true);
            // checkToken(localStorage.getItem('jwt'))
            //     .then(value => {
            //         if(value) {
            //             setLoggedIn(true);
            //             navigate('/', {replace: true})
            //         }
            //     })
            //     .catch((err)=>{
            //         console.log(`Ошибка...: ${err}`);
            //         navigate('/sign-in', {replace: true});
            //     });
        }
    }, [])

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

    const handleEditUserClick = (info) => {
        setSelectedUser(info);
        setEditUserPopupState(true);
        setAnyPopupState(true);
    }

    const handleOverlayClose = (evt) => {
        if(evt.target === evt.currentTarget)
            closeAllPopups();
    }

    const handleLoginUser = (authInfo) => {
        // loginUser(authInfo.email, authInfo.password)
        //     .then((data) => {
        //         localStorage.setItem('accessToken', data.accessToken);
        //         localStorage.setItem('refreshToken', data.refreshToken);
        //         console.log(data);
        //         navigate('/meetings', {replace: true})
        //     })
        //     .catch(err => {
        //         console.log(`Ошибка...: ${err}`);
        //         setAuthMessage(authMessageFailure);
        //         setInfoTooltipPopupState(true);
        //         setAnyPopupState(true);
        //     })
    }

    const handleChangeProfile = (user) => {
        console.log(user);
    }


    const handleRecoveryPassword = (email) => {
        console.log(email);
        closeAllPopups();
    }

    const handleChangeMeeting = (meeting) => {
        console.log(meeting);
        closeAllPopups();
    }

    const handleChangeUser = (user) => {
        console.log(user);
        closeAllPopups();
    }

    const handleChangePassword = (password) => {
       console.log(password);
    }

    const handleLogOut = () => {
        localStorage.clear();
        setLoggedIn(false);
        navigate('/sign-in', {replace: true});
        setCurrentUser({});
        setCurrentCards([]);
    }

    const closeAllPopups = () => {
        setDescriptionPopupState(false);
        setRecoveryPasswordPopupState(false);
        setContactInfoPopupState(false);
        setEditMeetingPopupState(false);
        setEditUserPopupState(false);
        setInfoTooltipPopupState(false);
        setAnyPopupState(false);
    }

    return (
        <div className='page'>
           <CurrentUserContext.Provider value={currentUser}>
               <CurrentCardsContext.Provider value={currentCards}>
                   <Header className="App-header" />
                   <main className='content'>
                       <Routes>
                           <Route path='/*' element={<Navigate to='/home' replace={true}/>}/>
                           <Route path='/home' element={<MainPage creators={users}/>}/>
                           <Route path='/sign-up' element={<Register />}/>
                           <Route path='/sign-in' element={<Login onRecoveryClick={handleRecoveryPasswordClick} onSubmit={handleLoginUser}/>}/>
                           <Route path='/profile' element={<Profile userInfo={currentUser} userCards={currentCards}
                                onCardClick={handleCardClick} isAdmin={isAdmin}/>}/>
                           <Route path='/meeting-list' element={<MeetingList cards={currentCards} onCardClick={handleCardClick}/>}/>
                           <Route path='profile/personal-info' element={<PersonalInfo onChange={handleChangeProfile}/>}/>
                           <Route path='/profile/users-list' element={<UsersList users={users} onClick={handleEditUserClick} isAdmin={isAdmin}/>}/>
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
                   <UserPopup isOpen={isEditUserPopupOpen} btnMessage={editBtnMessage}
                        onClose={closeAllPopups} onSubmit={handleChangeUser} onOverlayClose={handleOverlayClose}
                        user={selectedUser}/>
                   <InfoTooltip authMessage={authMessage} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups}
                                onOverlayClose={handleOverlayClose}/>
               </CurrentCardsContext.Provider>
           </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
