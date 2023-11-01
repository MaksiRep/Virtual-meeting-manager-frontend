import React, {useEffect, useState} from "react";
import './App.css';
import {Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import Header from "./landing/Header";
import Login from "./landing/Login";
import Register from "./landing/Register";
import MeetingList from "./landing/MeetingList";
import DescriptionPopup from "./landing/DescriptionPopup";
import Profile from "./landing/Profile";
import {initialCards} from "../utils/initialCards";
import {userInfo} from "../utils/initialCurrentUser";
import {initialUsers} from "../utils/initialUsers";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CurrentCardsContext} from "../contexts/CurrentCardsContext";
import PersonalInfo from "./landing/PersonalInfo";
import UsersList from "./landing/UsersList";

function App() {

    const [currentUser, setCurrentUser] = useState({});
    const [currentCards, setCurrentCards] = useState([]);
    const [users, setUsers] = useState([]);
    const [isDescriptionPopupOpen, setDescriptionPopupState] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isAnyPopupOpen, setAnyPopupState] = useState(false);
    const [isLoggedIn, setLoggedInStatus] = useState(false);
    const [isAdmin, setAdminStatus] = useState(true);


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

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setDescriptionPopupState(true);
        setAnyPopupState(true);
    }

    const handleChangeProfile = (user) => {

    }

    const closeAllPopups = () => {
        setDescriptionPopupState(false);
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
                           <Route path='/register' element={<Register />}/>
                           <Route path='/login' element={<Login />}/>
                           <Route path='/profile' element={<Profile userInfo={currentUser} userCards={currentCards}
                                onCardClick={handleCardClick} isAdmin={isAdmin}/>}/>
                           <Route path='/meeting-list' element={<MeetingList cards={currentCards} onCardClick={handleCardClick}/>}/>
                           <Route path='profile/personal-info' element={<PersonalInfo onChange={handleChangeProfile}/>}/>
                           <Route path='/profile/users-list' element={<UsersList users={users} isAdmin={isAdmin}/>}/>
                       </Routes>
                   </main>
                   <DescriptionPopup isOpen={isDescriptionPopupOpen} card={selectedCard} onClose={closeAllPopups}/>
               </CurrentCardsContext.Provider>
           </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
