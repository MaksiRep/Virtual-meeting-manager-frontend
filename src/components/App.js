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
import ForgottenPassword from "./landing/ForgottenPassword";

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
    const [isMeetingListLoaded, setMeetingListLoadedStatus] = useState(false);
    const [isUsersLoaded, setLoadedUsersState] = useState(false);
    const [isUsersListLoaded, setUsersListLoadedState] = useState(false);
    const [isUserCountLoaded, setUserCountLoadedState] = useState(false);
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

    const getErrorMessage = (error) => {
        return JSON.parse(error.message).message;
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
                fetchUser()
                    .catch(err => {
                        handleRefreshToken()
                            .then(() => {
                                return fetchUser()
                            })
                            .catch(error => {
                                console.log(getErrorMessage(error));
                                setLoggedIn(false);
                            })
                            .finally(() => {
                                setLoadedState(true);
                            })
                    })
                    .then(() => {
                        setLoadedState(true);
                    })
            }
        }
        else {
            setLoggedIn(false);
            setLoadedState(true);
        }
    }, [isLoggedIn]);

   const getMeetingsList = (isGoing) => {
       if(isAccessTokenExist()){
           if(isLoggedIn){
               loadMeetings({
                   ...meetingRequest,
                   isUserPresent: isGoing ? isGoing : null});
           }
       }
       else {
           setLoggedIn(false);
           setLoadedState(true);
       }
   }

    const getUsersList = () => {
        if(isAdmin) {
            setUsersListLoadedState(false);
            fetchUsersList()
                .catch(err => console.log(getErrorMessage(err)))
                .finally(() => setUsersListLoadedState(true));
        }
    }

    const getUsersCount = () => {
        setUserCountLoadedState(false);
        fetchUsersCount()
            .catch(err => console.log(getErrorMessage(err)))
            .finally(() => setUserCountLoadedState(true));
    }

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
                    .catch(err => console.log(getErrorMessage(err)));
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
        setMeetingListLoadedStatus(false);
        fetchCards(request)
            .then((data) => {
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
                setMeetingListLoadedStatus(true);
                for (const card of data.items) {
                    fetchImage(card)
                        .catch(err => console.log(getErrorMessage(err)))
                }
            })
            .catch(err => {
                console.log(getErrorMessage(err));
                setMeetingListLoadedStatus(true);
            });
    }

    const handleErrorMessage = (error) => {
        closeAllPopups();
        setAuthMessage({
            ...authMessageFailure,
            title: error});
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
            console.log(getErrorMessage(err));
            handleErrorMessage(getErrorMessage(err));
        }
        finally {
            setLoadedUserState(false);
        }
    }

    const handleDeleteMeetingClick = () => {
        setDeletePopupState(true);
        setAnyPopupState(true);
    }

    const handleUsersListClick = (id, isOrg) => {
        setUsersPopupState(true);
        setAnyPopupState(true);
        setLoadedUsersState(false);
        handleGetCurrentMeetingUsers(id, isOrg)
            .finally(() => setLoadedUsersState(true));
    }

    const handleOverlayClose = (evt) => {
        if(evt.target === evt.currentTarget)
            closeAllPopups();
    }

    const handleGetCurrentMeeting = async (id) => {
        setMeetingLoadedStatus(false);
        try {
            const data = await api.getCurrentMeeting(id, localStorage.getItem('accessToken'));
            const image = await api.getMeetingImage(id, localStorage.getItem('accessToken'));
            setSelectedMeeting({
                ...data,
                imageUrl: image.imageUrl
            });
        }
        catch (err) {
            console.log(getErrorMessage(err));
            handleErrorMessage(getErrorMessage(err));
        }
        finally {
            setMeetingLoadedStatus(true);
        }
    }

    const handleGetCurrentMeetingUsers = async (id, isOrg) => {
        setLoadedUsersState(false);
        try {
            if (isOrg || isAdmin){
                const users = await api.getMeetingUsers(id, localStorage.getItem('accessToken'));
                console.log(users);
                setSelectedMeetingUsers(users);
            }
        }
        catch (err) {
            console.log(getErrorMessage(err));
            handleErrorMessage(getErrorMessage(err));
        }
        finally
        {
            setLoadedUsersState(true);
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
            console.log(getErrorMessage(err));
            handleErrorMessage(getErrorMessage(err));
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
            console.log(getErrorMessage(err));
            handleErrorMessage(getErrorMessage(err));
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
            console.log(getErrorMessage(err));
            handleErrorMessage(getErrorMessage(err));
        }
        finally {
            setDeleteBtn(deleteBtnMessageDefault);
        }
    }

    const handleToggleGoing = async (isGoing) => {
        setMeetingLoadedStatus(false);
        try {
            (!isGoing) ? await api.visitMeeting(selectedMeeting.id, localStorage.getItem('accessToken')) :
                await api.cancelMeetingVisiting(selectedMeeting.id, localStorage.getItem('accessToken'));
            await handleGetCurrentMeeting(selectedMeeting.id);
        }
        catch(err) {
            console.log(getErrorMessage(err));
            handleErrorMessage(err);
        }
        finally {
            setMeetingLoadedStatus(true);
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
            console.log(getErrorMessage(err));
            handleErrorMessage(getErrorMessage(err));
        }
    }

    const handleLoginUser = async (authInfo) => {
        try {
            const tokens = await loginUser(authInfo);
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            setLoggedIn(true);
            navigate('/meeting-list/1', {replace: true})
        }
        catch (err) {
            console.log(getErrorMessage(err));
            handleErrorMessage(getErrorMessage(err));
        }
    }

    const handleChangeProfile = async (user, roles) => {
        try{
            await api.updateUserInfo(user, localStorage.getItem('accessToken'));
            if(isMainAdmin && roles){
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
                    if (u.id === user.userId) {
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
            console.log(getErrorMessage(err));
            handleErrorMessage(getErrorMessage(err));
        }
    }

    const handleChangeForgottenPassword = async (info) => {
        console.log(info);
        try {
            await api.resetPassword(info);
            handleSuccessMessage();
        }
        catch (err) {
            console.log(err);
            handleErrorMessage('Что-то пошло не так!');
        }
    }

    const handleRecoveryPassword = async (email) => {
        console.log(email);
        try {
            await api.forgotPassword(email);
            handleSuccessMessage();
        }
        catch (err) {
            console.log(err);
            handleErrorMessage('Что-то пошло не так!');
        }
    }

    const handleChangePassword = async (info) => {
        setEditBtnMessage(saveBtn);
        try {
            await api.changePassword(info, localStorage.getItem('accessToken'));
            handleSuccessMessage();
        }
        catch (err) {
            console.log(getErrorMessage(err));
            handleErrorMessage(getErrorMessage(err));
        }
        finally {
            setEditBtnMessage(saveBtnDefault);
        }
    }

    const handleRequestPage = (request) => {
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
                   <Header className="App-header" loggedIn={isLoggedIn} loaded={isLoaded} isAdmin={isAdmin}/>
                   <main className='content'>
                       {
                           isLoaded ?
                               <Routes>
                                   <Route path='/home' element={<MainPage creators={initialUsers} count={usersNum} getCount={getUsersCount}
                                                    isLoaded={isUserCountLoaded}/>}/>
                                   <Route path='/sign-up' element={(!isLoggedIn) ? <Register onSubmit={handleRegisterSubmit} onError={handleErrorMessage}/>
                                                    : <Navigate to='/profile' replace />}/>
                                   <Route path='/sign-in' element={(!isLoggedIn) ? <Login onRecoveryClick={handleRecoveryPasswordClick}
                                                    onSubmit={handleLoginUser}/>  : <Navigate to='/profile' replace state={{from: location}}/>}/>
                                   <Route path='/profile/meeting-list/:id' element={<ProtectedRouteElement element={Profile}
                                                    userInfo={currentUser} userCards={currentCards} onCardClick={handleCardClick}
                                                    isAdmin={isAdmin} handleLogOut={handleLogOut} loggedIn={isLoggedIn}
                                                    isFull={isPageFull} page={pageNumber} toLoad={setMeetingLoadedStatus}
                                                    isLoaded={isMeetingListLoaded} getMeetings={getMeetingsList}/>}/>
                                   <Route path='/meeting-list/:id' element={<ProtectedRouteElement element={Main}
                                                    onCreateClick={handleCreateMeetingClick} cards={currentCards}
                                                    onCardClick={handleCardClick} loggedIn={isLoggedIn} isFull={isPageFull}
                                                    onSearchSubmit={handleRequestPage} page={pageNumber}
                                                    isLoaded={isMeetingListLoaded} getMeetings={getMeetingsList}/>}/>
                                   <Route path='/profile/personal-info' element={<ProtectedRouteElement element={PersonalInfo}
                                                    user={currentUser} onSubmit={handleChangeProfile} loggedIn={isLoggedIn}
                                                    onPasswordClick={handlePasswordChangeClick}/>}/>
                                   <Route path='/profile/users-list' element={(isAdmin) ? <UsersList users={users}
                                                    onClick={handleEditUserClick} isLoaded={isUsersListLoaded} getUsers={getUsersList}/>
                                                    : <Navigate to='/profile' replace state={{from: location}}/>}/>
                                   <Route path='/recovery-password'
                                          element={<RecoveryPassword onSubmit={handleChangeForgottenPassword} onError={handleErrorMessage}/>}/>
                                   <Route path='/forgotten-password' element={<ForgottenPassword onSubmit={handleRecoveryPassword}/>}/>
                                   <Route path='/meeting/:id'
                                          element={<ProtectedRouteElement element={Meeting} meetings={currentCards}
                                                    onContactInfoClick={handleContactInfoClick} onEditClick={handleEditMeetingClick}
                                                    loggedIn={isLoggedIn} meetingInfo={selectedMeeting} getInfo={handleGetCurrentMeeting}
                                                    loaded={isMeetingLoaded} onGoing={handleToggleGoing} isAdmin={isAdmin}
                                                    onDeleteClick={handleDeleteMeetingClick} user={currentUser} isFull={isPageFull}
                                                    onNumClick={handleUsersListClick} getUsers={handleGetCurrentMeetingUsers}/>}/>
                                   <Route path='/*' element={<Navigate to='/home'/>}/>
                               </Routes>
                               :
                               <Loader />
                       }
                   </main>
                   <DescriptionPopup isOpen={isDescriptionPopupOpen} card={openedCard} onClose={closeAllPopups}
                        onOverlayClose={handleOverlayClose}/>
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
                                users={selectedMeetingUsers} isLoaded={isUsersLoaded}/>
                   <PasswordPopup isOpen={isPasswordPopupOpen} onClose={closeAllPopups} onOverlayClose={handleOverlayClose}
                               currentUser={userRoles.id} onError={handleErrorMessage} btnMessage={editBtnMessage}
                               onSubmit={handleChangePassword}/>
               </CurrentCardsContext.Provider>
           </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
