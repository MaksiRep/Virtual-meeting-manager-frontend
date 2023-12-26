import React from "react";
import '../styles/NavBar.css'
import {NavLink, Link, useLocation} from "react-router-dom";

function NavBar(props) {

    const location = useLocation();

    const authPath = () => {
        return location.pathname === '/sign-in' ?
            <NavLink to='/sign-up' className={({isActive}) => `menu__link 
                ${isActive ? "menu__link_active" : ""}`}>Регистрация</NavLink> :
            <NavLink to='/sign-in' className={({isActive}) => `menu__link 
                ${isActive ? "menu__link_active" : ""}`}>Войти</NavLink>
    }

    return(
        <>
            {
                props.loaded ?
                    <nav className={`menu ${props.isAdmin ? 'menu-admin' : ''}`}>
                    {props.loggedIn ?
                        <>
                            <NavLink to='/meeting-list/1' className={({isActive}) => `menu__link 
                    ${isActive ? "menu__link_active" : ""}`}>Мероприятия</NavLink>
                            <NavLink to='/profile/meeting-list/1' className={({isActive}) => `menu__link 
                    ${isActive ? "menu__link_active" : ""}`}>Личный кабинет</NavLink>
                        </> : '' }
                        {props.isAdmin ?
                            <NavLink to='/profile/users-list' className={({isActive}) => `menu__link 
                    ${isActive ? "menu__link_active" : ""}`}>Пользователи</NavLink> : <></>}
                    {!props.loggedIn ? authPath() : ''}
                </nav> :
                    <></>
            }
        </>
    );
}

export default NavBar