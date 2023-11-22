import React from "react";
import '../styles/NavBar.css'
import {NavLink, Link, useLocation} from "react-router-dom";

function NavBar() {

    const location = useLocation();

    const authPath = () => {
        return location.pathname === '/sign-up' ?
            <NavLink to='/sign-in' className={({isActive}) => `menu__link 
                ${isActive ? "menu__link_active" : ""}`}>Войти</NavLink> :
            <NavLink to='/sign-up' className={({isActive}) => `menu__link 
                ${isActive ? "menu__link_active" : ""}`}>Регистрация</NavLink>
    }

    return(
        <nav className='menu'>
            <NavLink to='/meeting-list' className={({isActive}) => `menu__link 
                ${isActive ? "menu__link_active" : ""}`}>Домой</NavLink>
            {authPath()}
            <NavLink to='/profile' className={({isActive}) => `menu__link 
                ${isActive ? "menu__link_active" : ""}`}>Личный кабинет</NavLink>
        </nav>
    );
}

export default NavBar