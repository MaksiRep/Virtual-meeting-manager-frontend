import React from "react";
import '../styles/Loader.css'

function Loader(props) {
    return(
        <div className={`loader__block ${props.blockStyle ? props.blockStyle : ''}`}>
            <span className={`loader ${props.style ? props.style : ''}`}></span>
        </div>
    );

}

export default Loader