import React from "react";
import '../styles/CreateSection.css'

function CreateSection(props) {

    const handleClick = () => {
        props.onCreateClick();
    }

    return(
        <div className='joint-section'>
            <div className='joint-section__filter'>
            </div>
            <div className='joint-section__create'>
                <button className="joint-section__add-button" type="button" onClick={handleClick}></button>
            </div>
        </div>
    );

}

export default CreateSection