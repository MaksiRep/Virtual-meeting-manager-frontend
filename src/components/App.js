import React, {useEffect, useState} from "react";
import './App.css';
import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Header from "./landing/Header";
import Login from "./landing/Login";
import Register from "./landing/Register";
import DescriptionPopup from "./landing/DescriptionPopup";
import Profile from "./landing/Profile";
import Main from "./landing/Main";
import {
    authMessageFailure,
    authMessageSuccess,
    baseMeetingsRequest,
    createMeetingTitle,
    editMeetingTitle,
    editPopupStyle,
    recoveryBtnDefault,
    saveBtn,
    saveBtnDefault
} from "../utils/constants";
import api from "../utils/Api";
import {initialUsers} from "../utils/initialUsers";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CurrentCardsContext} from "../contexts/CurrentCardsContext";
import {loginUser, refreshToken, registerUser} from "../utils/auth";
import PersonalInfo from "./landing/PersonalInfo";
import UsersList from "./landing/UsersList";
import ForgottenPasswordPopup from "./landing/ForgottenPasswordPopup";
import RecoveryPassword from "./landing/RecoveryPassword";
import Meeting from "./landing/Meeting";
import ContactInfoPopup from "./landing/ContactInfoPopup";
import EditMeetingPopup from "./landing/EditMeetingPopup";
import InfoTooltip from "./landing/InfoTooltip";
import UserPopup from "./landing/UserPopup";
import MainPage from "./landing/MainPage";
import ProtectedRouteElement from "./landing/ProtectedRoute";

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [userRoles, setUserRoles] = useState({});
    const [currentCards, setCurrentCards] = useState([]);
    const [users, setUsers] = useState([]);
    const [contactInfo, setContactInfo] = useState({});
    const [isDescriptionPopupOpen, setDescriptionPopupState] = useState(false);
    const [isRecoveryPasswordPopupOpen, setRecoveryPasswordPopupState] = useState(false);
    const [isContactInfoPopupOpen, setContactInfoPopupState] = useState(false);
    const [isCreateMeetingPopupOpen, setCreateMeetingPopupState] = useState(false);
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

    const isAccessTokenExist = () => {
        return localStorage.getItem('accessToken')
    }

    useEffect(() => {
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
        if(isAccessTokenExist()){
            setLoggedIn(true);
            console.log(localStorage.getItem('accessToken'));
            // refreshToken(localStorage.getItem('accessToken'), localStorage.getItem('refreshToken'))
            //     .then((data) => {
            //         localStorage.setItem('accessToken', data.accessToken);
            //         localStorage.setItem('refreshToken', data.refreshToken);
            //     })
        }
    },[])

    useEffect(() => {
        if(isAccessTokenExist()){
            const fetchData = async () => {
                const userId = await api.getCurrentUser(localStorage.getItem('accessToken'));
                setUserRoles(userId);
                const userInfo = await api.getUserInfo(userId.id, localStorage.getItem('accessToken'));
                setCurrentUser(userInfo);
                const cardsData = await api.getInitialMeetings(baseMeetingsRequest, localStorage.getItem('accessToken'));
                setCurrentCards(cardsData.items);
                console.log(cardsData);
            }
            fetchData()
                .catch(err => console.log(err));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if(userRoles.roles)
            if(userRoles.roles.some(role => role === 'admin')){
                setAdminStatus(true);
            }
    }, [userRoles])

    // useEffect(() => {
    //     setCurrentCards(initialCards);
    // },[])

    
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

    const handleCreateMeetingClick = () => {
        setCreateMeetingPopupState(true);
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

    const handleRegisterSubmit = async (data) => {
        console.log(data);
        try {
            const tokens = await registerUser(data);
            console.log(tokens);
            setAuthMessage(authMessageSuccess);
            setInfoTooltipPopupState(true);
            setAnyPopupState(true);
            setLoggedIn(true);
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            navigate('/sign-in', {replace: true})
        }
        catch (err) {
            console.log(err);
            setAuthMessage(authMessageFailure);
            setInfoTooltipPopupState(true);
            setAnyPopupState(true);
        }
    }

    const handleLoginUser = async (authInfo) => {
        console.log(authInfo);
        try {
            const tokens = await loginUser(authInfo);
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            setLoggedIn(true);
            navigate('/meeting-list', {replace: true})
        }
        catch (err) {
            console.log(err);
            setAuthMessage(authMessageFailure);
            setInfoTooltipPopupState(true);
            setAnyPopupState(true);
        }
    }

    const handleChangeProfile = (user) => {
        console.log(user);
    }


    const handleRecoveryPassword = (email) => {
        console.log(email);
        closeAllPopups();
    }

    const handleCreateMeeting = async (meeting, img) => {
        console.log(meeting);
        console.log(img);
        setEditBtnMessage(saveBtn);
        try {
            const meetingId = await api.createMeeting(meeting, localStorage.getItem('accessToken'));
            meeting.id = meetingId;
            console.log(meetingId.meetingId);
            await api.updateMeetingImage(meetingId.meetingId, img, localStorage.getItem('accessToken'));
            meeting.imageUrl = img;
            console.log(meeting);
            setCurrentCards(state => [meeting, ...state]);
            closeAllPopups();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setEditBtnMessage(saveBtnDefault);
        }
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
        setAdminStatus(false);
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
        setCreateMeetingPopupState(false);
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
                           <Route path='/meeting-list' element={<ProtectedRouteElement element={Main} onCreateClick={handleCreateMeetingClick}
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
                        style={editPopupStyle} meeting={selectedEditCard} titleName={editMeetingTitle}/>
                   <EditMeetingPopup isOpen={isCreateMeetingPopupOpen} btnMessage={editBtnMessage}
                                     onClose={closeAllPopups} onSubmit={handleCreateMeeting} onOverlayClose={handleOverlayClose}
                                     style={editPopupStyle} titleName={createMeetingTitle}/>
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
