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
    saveBtnDefault,
    deleteBtnMessageDefault,
    deleteBtnMessage
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
import Loader from "./landing/Loader";
import DeletePopup from "./landing/DeletePopup";

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
    const [isDeletePopupOpen, setDeletePopupState] = useState(false);
    const [authMessage, setAuthMessage] = useState({});
    const [isEditUserPopupOpen, setEditUserPopupState] = useState(false);
    const [openedCard, setOpenedCard] = useState({});
    const [selectedMeeting, setSelectedMeeting] = useState({});
    const [selectedEditCard, setSelectedEditCard] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [isAnyPopupOpen, setAnyPopupState] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(true);
    const [isAdmin, setAdminStatus] = useState(false);
    const [isLoaded, setLoadedState] = useState(false);
    const [isMeetingLoaded, setMeetingLoadedStatus] = useState(false);
    const [usersNum, setUsersNum] = useState();
    const [recoveryBtnMessage, setRecoveryBtnMessage] = useState(recoveryBtnDefault);
    const [editBtnMessage, setEditBtnMessage] = useState(saveBtnDefault);
    const [deleteBtn, setDeleteBtn] = useState(deleteBtnMessageDefault)
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
    
    const fetchUser = async () => {
        const userId = await api.getCurrentUser(localStorage.getItem('accessToken'));
        setUserRoles(userId);
        const userInfo = await api.getUserInfo(userId.id, localStorage.getItem('accessToken'));
        console.log(userInfo);
        setCurrentUser(userInfo);
    }

    const fetchUsersList = async () => {
        const usersList = await api.getUsersList(0, 30, localStorage.getItem('accessToken'));
        console.log(usersList.items);
        setUsers(usersList.items);
    }

    const fetchCards = async () => {
        return await api.getInitialMeetings(baseMeetingsRequest, localStorage.getItem('accessToken'));
    }

    const fetchImage = async (card) => {
        const url = await api.getMeetingImage(card.id, localStorage.getItem('accessToken'));
        setCurrentCards(prev => {
            return prev.map(c => {
                if (c.id === card.id) {
                    return {
                        ...c,
                        imageUrl: url.imageUrl
                    }
                }
                return c;
            })
        });
    }

    const fetchUsersCount = async() => {
        const num = await api.getUsersCount();
        setUsersNum(num);
    }

    useEffect(() => {
        if(isAccessTokenExist()){
            if (isLoggedIn) {
                setLoadedState(false);
                fetchUser()
                    .catch(err => {
                        if (err === 'Ошибка: 401') {
                            handleRefreshToken()
                                .then(() => {
                                    return fetchUser()
                                })
                                .catch(error => {
                                    console.log(error);
                                    setLoggedIn(false);
                                })
                                .finally(() => setLoadedState(true))
                        } else
                            console.log(err);
                    })
                fetchCards()
                    .then((data) => {
                        setCurrentCards(data.items);
                        setLoadedState(true);
                        for (const card of data.items) {
                            fetchImage(card)
                                .catch(err => console.log(err))
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
        else {
            setLoggedIn(false);
            setLoadedState(true);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if(isAdmin) {
            fetchUsersList()
                .catch(err => console.log(err));
        }
    }, [isAdmin])

    useEffect(() => {
        fetchUsersCount()
            .catch(err => console.log(err));
    }, [isLoggedIn]);

    const handleRefreshToken = async () => {
        const tokens = await refreshToken(localStorage.getItem('accessToken'),
            localStorage.getItem('refreshToken'));
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
    }

    useEffect(() => {
        if(userRoles.roles)
            if(userRoles.roles.some(role => role === 'admin')){
                setAdminStatus(true);
            }
    }, [userRoles])

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
        setOpenedCard(card);
        setDescriptionPopupState(true);
        setAnyPopupState(true);
    }

    const handleRecoveryPasswordClick = () => {
        setRecoveryPasswordPopupState(true);
        setAnyPopupState(true);
    }

    const handleContactInfoClick = (info) => {
        setContactInfo(selectedMeeting);
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

    const handleDeleteMeetingClick = () => {
        setDeletePopupState(true);
        setAnyPopupState(true);
    }

    const handleOverlayClose = (evt) => {
        if(evt.target === evt.currentTarget)
            closeAllPopups();
    }

    const handleGetCurrentMeeting = async (id) => {
        setMeetingLoadedStatus(false);
        try {
            const data = await api.getCurrentMeeting(id, localStorage.getItem('accessToken'))
            setSelectedMeeting(data);
        }
        catch (err) {
            console.log(err);
        }
        finally
        {
            setMeetingLoadedStatus(true);
        }
    }

    const handleCreateMeeting = async (meeting, img) => {
        setEditBtnMessage(saveBtn);
        try {
            const meetingId = await api.createMeeting(meeting, localStorage.getItem('accessToken'));
            meeting.id = meetingId.meetingId;
            await api.updateMeetingImage(meetingId.meetingId, img, localStorage.getItem('accessToken'));
            meeting.imageUrl = img;
            meeting.isUserVisitMeeting = true;
            setCurrentCards(state => [...state, meeting]);
            navigate(`/meeting/${meeting.id}`, {replace: true});
            closeAllPopups();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setEditBtnMessage(saveBtnDefault);
        }
    }

    const handleChangeMeeting = async (meeting, image) => {
        setEditBtnMessage(saveBtn);
        try {
            await api.updateMeeting(meeting, localStorage.getItem('accessToken'));
            await api.updateMeetingImage(meeting.id, image, localStorage.getItem('accessToken'));
            setCurrentCards(currentCards.map(card => {
                if(card.id === meeting.id){
                    return {
                        ...card,
                        name: meeting.name,
                        startDate: meeting.startDate,
                        endDate: meeting.endDate,
                        shortDescription: meeting.shortDescription,
                        imageUrl: image
                    }
                }
                return card;
            }));
            setSelectedMeeting({
                ...selectedMeeting,
                name: meeting.name,
                description: meeting.description,
                startDate: meeting.startDate,
                endDate: meeting.endDate,
                imageUrl: image
            });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setEditBtnMessage(saveBtnDefault);
        }
        closeAllPopups();
    }

    const handleDeleteMeeting = async () => {
        setDeleteBtn(deleteBtnMessage);
        try {
            await api.deleteMeeting(selectedMeeting.id, localStorage.getItem('accessToken'));
            setCurrentCards(prev => {
                 return prev.filter((c) =>
                    c.id !== selectedMeeting.id)
            });
            navigate('/meeting-list', {replace: true});
            closeAllPopups();
            setSelectedMeeting({});
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setDeleteBtn(deleteBtnMessageDefault);
        }
    }

    const handleToggleGoing = async (isGoing) => {
        try {
            (!isGoing) ? await api.visitMeeting(selectedMeeting.id, localStorage.getItem('accessToken')) :
                await api.cancelMeetingVisiting(selectedMeeting.id, localStorage.getItem('accessToken'));
            setSelectedMeeting({
                ...selectedMeeting,
                isUserVisitMeeting: (!selectedMeeting.isUserVisitMeeting)
            });
            setCurrentCards(prev => {
                return prev.map((c) => {
                    if (c.id === selectedMeeting.id) {
                        return {
                            ...c,
                            isUserVisitMeeting: !(c.isUserVisitMeeting)
                        }
                    }
                    return c;
                })
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleRegisterSubmit = async (data) => {
        try {
            console.log(data);
            const tokens = await registerUser(data);
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
        try {
            const tokens = await loginUser(authInfo)
                .then();
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

    const handleChangeProfile = async (user) => {
        try{
            await api.updateUserInfo(user, localStorage.getItem('accessToken'));
            if(currentUser.id === user.userId) {
                setCurrentUser({
                    ...currentUser,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthDate: user.birthDate,
                    gender: user.gender,
                    phone: user.phone
                });
            }
            setUsers(users.map(u => {
                console.log(u);
                    if (u.id === user.userId) {
                        console.log(user);
                        return {
                            ...u,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            birthDate: user.birthDate,
                            gender: user.gender,
                            phone: user.phone
                        }
                    }
                    return u;
                })
            );
            closeAllPopups();
            setAuthMessage(authMessageSuccess);
            setInfoTooltipPopupState(true);
            setAnyPopupState(true);
        }
        catch (err) {
            console.log(err);
            console.log(err);
            setAuthMessage(authMessageFailure);
            setInfoTooltipPopupState(true);
            setAnyPopupState(true);
        }
    }


    const handleRecoveryPassword = (email) => {
        console.log(email);
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
        setDeletePopupState(false);
        setAnyPopupState(false);
    }

    return (
        <div className='page'>
           <CurrentUserContext.Provider value={currentUser}>
               <CurrentCardsContext.Provider value={currentCards}>
                   <Header className="App-header" loggedIn={isLoggedIn} loaded={isLoaded}/>
                   <main className='content'>
                       {
                           isLoaded ?
                               <Routes>
                                   <Route path='/*' element={<Navigate to='/home' replace />}/>
                                   <Route path='/home' element={<MainPage creators={initialUsers} count={usersNum}/>}/>
                                   <Route path='/sign-up' element={(!isLoggedIn) ? <Register onSubmit={handleRegisterSubmit}/>  : <Navigate to='/profile' replace />}/>
                                   <Route path='/sign-in' element={(!isLoggedIn) ? <Login onRecoveryClick={handleRecoveryPasswordClick}
                                                    onSubmit={handleLoginUser}/>  : <Navigate to='/profile' replace state={{from: location}}/>}/>
                                   <Route path='/profile' element={<ProtectedRouteElement element={Profile} userInfo={currentUser} userCards={currentCards} o
                                                    onCardClick={handleCardClick} isAdmin={isAdmin} handleLogOut={handleLogOut} loggedIn={isLoggedIn}/>}/>
                                   <Route path='/meeting-list' element={<ProtectedRouteElement element={Main} onCreateClick={handleCreateMeetingClick}
                                                    cards={currentCards} onCardClick={handleCardClick} loggedIn={isLoggedIn}/>}/>
                                   <Route path='/profile/personal-info' element={<ProtectedRouteElement element={PersonalInfo}
                                                    user={currentUser} onSubmit={handleChangeProfile} loggedIn={isLoggedIn}/>}/>
                                   <Route path='/profile/users-list' element={(isAdmin) ? <UsersList users={users}
                                                    onClick={handleEditUserClick}/> : <Navigate to='/profile' replace state={{from: location}}/>}/>
                                   <Route path='/recovery-password/test' element={<RecoveryPassword onSubmit={handleChangePassword}/>}/>
                                   <Route path='/meeting/:id'
                                          element={<ProtectedRouteElement element={Meeting} meetings={currentCards}
                                                    onContactInfoClick={handleContactInfoClick} onEditClick={handleEditMeetingClick}
                                                    loggedIn={isLoggedIn} meetingInfo={selectedMeeting} getInfo={handleGetCurrentMeeting}
                                                    loaded={isMeetingLoaded} onGoing={handleToggleGoing}
                                                    onDeleteClick={handleDeleteMeetingClick} user={currentUser}/>}/>
                               </Routes>
                               :
                               <Loader />
                       }
                   </main>
                   <DescriptionPopup isOpen={isDescriptionPopupOpen} card={openedCard} onClose={closeAllPopups}
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
                        onClose={closeAllPopups} onSubmit={handleChangeProfile} onOverlayClose={handleOverlayClose}
                        user={selectedUser}/>
                   <InfoTooltip authMessage={authMessage} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups}
                                onOverlayClose={handleOverlayClose}/>
                   <DeletePopup isOpen={isDeletePopupOpen} btnMessage={deleteBtn} onClose={closeAllPopups}
                                onSubmit={handleDeleteMeeting} onOverlayClose={handleOverlayClose}/>
               </CurrentCardsContext.Provider>
           </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
