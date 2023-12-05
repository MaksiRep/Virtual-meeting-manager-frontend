import React, {useEffect, useState} from "react";
import './App.css';
import {Route, Routes, Navigate, useNavigate, useLocation, useHistory} from 'react-router-dom'
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
import api from "../utils/Api";
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
import ProtectedRouteElement from "./landing/ProtectedRoute";


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
    const [isAdmin, setAdminStatus] = useState(false);
    const [recoveryBtnMessage, setRecoveryBtnMessage] = useState(recoveryBtnDefault);
    const [editBtnMessage, setEditBtnMessage] = useState(saveBtnDefault);
    const [routeState, setRouteState] = useState({});
    const [routeAdminState, setRouteAdminState] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const isRefreshTokenExist = () => {
        return localStorage.getItem('refreshToken')
    }

    useEffect(() => {
        console.log(location);
        if(location.pathname === '/sign-in' && location.state){
            setRouteState(location.state);
        }
    },[location])

    useEffect(() => {
        if(isAdmin && routeAdminState)
            navigate(routeAdminState);
    }, [routeAdminState])

    useEffect(() => {
        if(location.pathname === '/profile' && location.state)
            setRouteAdminState(location.state.from);
    }, [isAdmin])

    useEffect(() => {
        if(isLoggedIn && routeState)
            navigate(routeState.from);
    }, [routeState])

    useEffect(() => {
        if(isRefreshTokenExist()){
            setLoggedIn(true);
        }
    },[])

    useEffect(() => {
        if(isRefreshTokenExist()){
            api.getUserInfo(localStorage.getItem('accessToken'))
                .then((value) => {
                    setCurrentUser(value);
                    if(value.roles)
                        if(value.roles.some(role => role === 'admin')){
                            setAdminStatus(true);
                        }
                })
                .catch((err)=>{
                    console.log(`Ошибка...: ${err}`);
                })
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setCurrentCards(initialCards);
    },[])

    useEffect(() => {
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

    const handleRegisterSubmit = (data) => {
        console.log(data);
    }

    const handleLoginUser = (authInfo) => {
        loginUser(authInfo.email, authInfo.password)
            .then((data) => {
                setLoggedIn(true);
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                navigate('/meeting-list', {replace: true})
            })
            .catch(err => {
                console.log(`Ошибка...: ${err}`);
                setAuthMessage(authMessageFailure);
                setInfoTooltipPopupState(true);
                setAnyPopupState(true);
            })
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
                   <Header className="App-header" loggedIn={isLoggedIn}/>
                   <main className='content'>
                       <Routes>
                           <Route path='/*' element={<Navigate to='/home' replace />}/>
                           <Route path='/home' element={<MainPage creators={users}/>}/>
                           <Route path='/sign-up' element={(!isLoggedIn) ? <Register onSubmit={handleRegisterSubmit}/>  : <Navigate to='/profile' replace />}/>
                           <Route path='/sign-in' element={(!isLoggedIn) ? <Login onRecoveryClick={handleRecoveryPasswordClick}
                                     onSubmit={handleLoginUser}/>  : <Navigate to='/profile' replace state={{from: location}}/>}/>
                           <Route path='/profile' element={<ProtectedRouteElement element={Profile} userInfo={currentUser} userCards={currentCards} o
                                     onCardClick={handleCardClick} isAdmin={isAdmin} handleLogOut={handleLogOut} loggedIn={isLoggedIn}/>}/>
                           <Route path='/meeting-list' element={<ProtectedRouteElement element={MeetingList}
                                     cards={currentCards} onCardClick={handleCardClick} loggedIn={isLoggedIn}/>}/>
                           <Route path='/profile/personal-info' element={<ProtectedRouteElement element={PersonalInfo}
                                     onChange={handleChangeProfile} loggedIn={isLoggedIn}/>}/>
                           <Route path='/profile/users-list' element={(isAdmin) ? <UsersList users={users}
                                     onClick={handleEditUserClick}/> : <Navigate to='/profile' replace state={{from: location}}/>}/>
                           <Route path='/recovery-password/test' element={<RecoveryPassword onSubmit={handleChangePassword}/>}/>
                           <Route path='/meeting/:id'
                                  element={<ProtectedRouteElement element={Meeting} meetings={currentCards}
                                  onContactInfoClick={handleContactInfoClick} onEditClick={handleEditMeetingClick} loggedIn={isLoggedIn}/>}/>
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
