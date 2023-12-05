import React from "react";
import NavBar from "./NavBar";
import '../styles/Header.css'
import {Link} from "react-router-dom";

function Header(props) {



    return(
       <header className='header'>
           <Link to='/home' className='header__title'>Virtual Meeting Manager</Link>
           <NavBar loggedIn={props.loggedIn}/>
       </header>
    );

}

export default Header