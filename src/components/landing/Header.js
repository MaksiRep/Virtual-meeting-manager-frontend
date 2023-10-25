import React from "react";
import NavBar from "./NavBar";
import '../styles/Header.css'

function Header() {



    return(
       <header className='header'>
           <h2>Virtual Meeting Manager</h2>
           <NavBar/>
       </header>
    );

}

export default Header