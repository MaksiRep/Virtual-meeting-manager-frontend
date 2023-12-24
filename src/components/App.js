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
import UsersPopup from "./landing/UsersPopup";
import PasswordPopup from "./landing/PasswordPopup";

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [userRoles, setUserRoles] = useState({});
    const [currentCards, setCurrentCards] = useState([]);
    const [users, setUsers] = useState([]);
    const [rolesList, setRolesList] = useState([]);
    const [contactInfo, setContactInfo] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [isPageFull, setPageFull] = useState(false);
    const [meetingRequest, setMeetingRequest] = useState(baseMeetingsRequest);
    const [isDescriptionPopupOpen, setDescriptionPopupState] = useState(false);
    const [isRecoveryPasswordPopupOpen, setRecoveryPasswordPopupState] = useState(false);
    const [isContactInfoPopupOpen, setContactInfoPopupState] = useState(false);
    const [isCreateMeetingPopupOpen, setCreateMeetingPopupState] = useState(false);
    const [isEditMeetingPopupOpen, setEditMeetingPopupState] = useState(false);
    const [isInfoTooltipPopupOpen, setInfoTooltipPopupState] = useState(false);
    const [isDeletePopupOpen, setDeletePopupState] = useState(false);
    const [isUsersPopupOpen, setUsersPopupState] = useState(false);
    const [isPasswordPopupOpen, setPasswordPopupState] = useState(false);
    const [authMessage, setAuthMessage] = useState({});
    const [isEditUserPopupOpen, setEditUserPopupState] = useState(false);
    const [openedCard, setOpenedCard] = useState({});
    const [selectedMeeting, setSelectedMeeting] = useState({});
    const [selectedMeetingUsers, setSelectedMeetingUsers] = useState([]);
    const [selectedEditCard, setSelectedEditCard] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [isAnyPopupOpen, setAnyPopupState] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(true);
    const [isAdmin, setAdminStatus] = useState(false);
    const [isUser, setUserStatus] = useState(false);
    const [isMainAdmin, setMainAdminStatus] = useState(false);
    const [isLoaded, setLoadedState] = useState(false);
    const [isUserLoaded, setLoadedUserState] = useState(false);
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

    const getMeetingPage = () => {
        return Number(location.pathname.slice(location.pathname.indexOf("/meeting-list") + 14));
    }

    useEffect(() => {
        if(getMeetingPage()){
            if (getMeetingPage() > 0) {
                setPageNumber(getMeetingPage());
                setMeetingRequest({
                    ...meetingRequest,
                    skip: (getMeetingPage() > 0) ? (Number(getMeetingPage() - 1) * 30 ) : 0
                })
            } else {
                if (location.pathname.includes('profile')) {
                    navigate(`/profile/meeting-list/1`);
                } else {
                    navigate(`/meeting-list/1`);
                }
            }
        }
    }, [location])


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
        setCurrentUser(userInfo);
    }

    const fetchUsersList = async () => {
        const usersList = await api.getUsersList(0, 30, localStorage.getItem('accessToken'));
        setUsers(usersList.items);
    }

    const fetchRoles = async () => {
        const roles = await api.getRoleList(localStorage.getItem('accessToken'));
        setRolesList(roles);
    }

    const fetchCards = async (request) => {
        console.log(meetingRequest);
        return await api.getInitialMeetings(request, localStorage.getItem('accessToken'));
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
            }
        }
        else {
            setLoggedIn(false);
            setLoadedState(true);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if(isAccessTokenExist()){
            if(isLoggedIn){
                setLoadedState(false);
                loadMeetings(meetingRequest);
            }
        }
        else {
            setLoggedIn(false);
            setLoadedState(true);
        }
    }, [isLoggedIn, pageNumber])

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
        if(userRoles.roles) {
            if (userRoles.roles.some(role => role === 'admin')) {
                setAdminStatus(true);
            }
            if (userRoles.roles.some(role => role === 'mainAdmin')) {
                setAdminStatus(true);
                setMainAdminStatus(true);
                fetchRoles()
                    .catch(err => console.log(err));
            }
            if (userRoles.roles.some(role => role === 'user')) {
                setUserStatus(true);
            }
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

    const loadMeetings = (request) => {
        fetchCards(request)
            .then((data) => {
                console.log(data);
                const cardsNumber = data.items.length;
                if(!(cardsNumber)){
                    if(location.pathname.includes('profile')){
                        navigate(`/profile/meeting-list/1`);
                    }
                    else {
                        navigate(`/meeting-list/1`);
                    }
                }
                setPageFull(cardsNumber === 30);
                setCurrentCards(data.items);
                setLoadedState(true);
                for (const card of data.items) {
                    fetchImage(card)
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err);
                setLoadedState(true);
            });
    }

    const handleErrorMessage = () => {
        closeAllPopups();
        setAuthMessage(authMessageFailure);
        setInfoTooltipPopupState(true);
        setAnyPopupState(true);
    }

    const handleSuccessMessage = () => {
        closeAllPopups();
        setAuthMessage(authMessageSuccess);
        setInfoTooltipPopupState(true);
        setAnyPopupState(true);
    }

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

    const handlePasswordChangeClick = (info) => {
        setPasswordPopupState(true);
        setAnyPopupState(true);
    }

    const handleEditUserClick = async (info) => {
        setLoadedUserState(true);
        try {
            const user = await api.getUserInfo(info.id, localStorage.getItem('accessToken'));
            setSelectedUser(user);
            setEditUserPopupState(true);
            setAnyPopupState(true);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoadedUserState(false);
        }
    }

    const handleDeleteMeetingClick = () => {
        setDeletePopupState(true);
        setAnyPopupState(true);
    }

    const handleUsersListClick = () => {
        setUsersPopupState(true);
        setAnyPopupState(true);
    }

    const handleOverlayClose = (evt) => {
        if(evt.target === evt.currentTarget)
            closeAllPopups();
    }

    const handleGetCurrentMeeting = async (id, isOrg) => {
        setMeetingLoadedStatus(false);
        try {
            const data = await api.getCurrentMeeting(id, localStorage.getItem('accessToken'));
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

    const handleGetCurrentMeetingUsers = async (id, isOrg) => {
        setMeetingLoadedStatus(false);
        try {
            if (isOrg){
                const users = await api.getMeetingUsers(id, localStorage.getItem('accessToken'));
                console.log(users);
                setSelectedMeetingUsers(users);
            }
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
            handleErrorMessage();
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
            const tokens = await registerUser(data);
            setLoggedIn(true);
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            handleSuccessMessage();
            navigate('/sign-in', {replace: true})
        }
        catch (err) {
            console.log(err);
            handleErrorMessage();
        }
    }

    const handleLoginUser = async (authInfo) => {
        try {
            const tokens = await loginUser(authInfo)
                .then();
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            setLoggedIn(true);
            navigate('/meeting-list/1', {replace: true})
        }
        catch (err) {
            console.log(err);
            handleErrorMessage();
        }
    }

    const handleChangeProfile = async (user, roles) => {
        try{
            await api.updateUserInfo(user, localStorage.getItem('accessToken'));
            if(isMainAdmin){
                await api.updateUserRoles(roles, localStorage.getItem('accessToken'));
            }
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
            handleErrorMessage();
        }
    }

    const handleChangeForgottenPassword = (password) => {

    }

    const handleRecoveryPassword = (email) => {
        console.log(email);
        closeAllPopups();
    }

    const handleChangePassword = async (info) => {
        setEditBtnMessage(saveBtn);
        console.log(info);
        try {
            await api.changePassword(info, localStorage.getItem('accessToken'));
            handleSuccessMessage();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setEditBtnMessage(saveBtnDefault);
        }
    }

    const handleRequestPage = (request) => {
        console.log(request);
        setMeetingRequest(request);
        loadMeetings(request);
    }

    const handleLogOut = () => {
        localStorage.clear();
        setLoggedIn(false);
        setAdminStatus(false);
        setMainAdminStatus(false);
        setUserStatus(false);
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
        setUsersPopupState(false);
        setAnyPopupState(false);
        setPasswordPopupState(false);
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
                                   <Route path='/profile/meeting-list/:id' element={<ProtectedRouteElement element={Profile} userInfo={currentUser} userCards={currentCards} o
                                                    onCardClick={handleCardClick} isAdmin={isAdmin} handleLogOut={handleLogOut} loggedIn={isLoggedIn}/>}/>
                                   <Route path='/meeting-list/:id' element={<ProtectedRouteElement element={Main}
                                                    onCreateClick={handleCreateMeetingClick} cards={currentCards}
                                                    onCardClick={handleCardClick} loggedIn={isLoggedIn} isFull={isPageFull}
                                                    onSearchSubmit={handleRequestPage}/>}/>
                                   <Route path='/profile/personal-info' element={<ProtectedRouteElement element={PersonalInfo}
                                                    user={currentUser} onSubmit={handleChangeProfile} loggedIn={isLoggedIn}
                                                    onPasswordClick={handlePasswordChangeClick}/>}/>
                                   <Route path='/profile/users-list' element={(isAdmin) ? <UsersList users={users}
                                                    onClick={handleEditUserClick} isLoaded={isUserLoaded}/> : <Navigate to='/profile'
                                                    replace state={{from: location}}/>}/>
                                   <Route path='/recovery-password/test' element={<RecoveryPassword onSubmit={handleChangeForgottenPassword}/>}/>
                                   <Route path='/meeting/:id'
                                          element={<ProtectedRouteElement element={Meeting} meetings={currentCards}
                                                    onContactInfoClick={handleContactInfoClick} onEditClick={handleEditMeetingClick}
                                                    loggedIn={isLoggedIn} meetingInfo={selectedMeeting} getInfo={handleGetCurrentMeeting}
                                                    loaded={isMeetingLoaded} onGoing={handleToggleGoing} isAdmin={isAdmin}
                                                    onDeleteClick={handleDeleteMeetingClick} user={currentUser} isFull={isPageFull}
                                                    onNumClick={handleUsersListClick} getUsers={handleGetCurrentMeetingUsers}/>}/>
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
                        user={selectedUser} isMainAdmin={isMainAdmin} currentUser={userRoles.id} rolesList={rolesList}/>
                   <InfoTooltip authMessage={authMessage} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups}
                                onOverlayClose={handleOverlayClose}/>
                   <DeletePopup isOpen={isDeletePopupOpen} btnMessage={deleteBtn} onClose={closeAllPopups}
                                onSubmit={handleDeleteMeeting} onOverlayClose={handleOverlayClose}/>
                   <UsersPopup isOpen={isUsersPopupOpen} onClose={closeAllPopups} onOverlayClose={handleOverlayClose}
                                users={selectedMeetingUsers}/>
                   <PasswordPopup isOpen={isPasswordPopupOpen} onClose={closeAllPopups} onOverlayClose={handleOverlayClose}
                               currentUser={userRoles.id} onError={handleErrorMessage} btnMessage={editBtnMessage}
                               onSubmit={handleChangePassword}/>
               </CurrentCardsContext.Provider>
           </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
