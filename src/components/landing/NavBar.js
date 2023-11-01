import React from "react";
import '../styles/NavBar.css'
import {NavLink} from "react-router-dom";

function NavBar() {



    return(
        <nav className='menu'>
            <NavLink to='/meeting-list' className={({isActive}) => `menu__link 
                ${isActive ? "menu__link_active" : ""}`}>Домой</NavLink>
            <NavLink to='/register' className={({isActive}) => `menu__link 
                ${isActive ? "menu__link_active" : ""}`}>Регистрация</NavLink>
            <NavLink to='/profile' className={({isActive}) => `menu__link 
                ${isActive ? "menu__link_active" : ""}`}>Личный кабинет</NavLink>
        </nav>
    );
}

export default NavBar