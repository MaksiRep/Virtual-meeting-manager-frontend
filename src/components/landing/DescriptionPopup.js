import React from "react";
import '../styles/Popup.css'
import {Link} from "react-router-dom";

function DescriptionPopup(props) {

    return(
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id='description-popup'
            onMouseDown={props.onOverlayClose}>
            <div className='popup__container popup__form-container'>
                <button className="popup__exit-button" type="button" onClick={props.onClose} />
                <h2 className="popup__title">{props.card.name}</h2>
                <div className='popup__info'>
                    <img className='popup__image' src={props.card.link} alt=''/>
                    <div className='popup__details'>
                        <p className='popup__description'>{props.card.shortDescription}</p>
                        <Link to={'/meeting/' + props.card._id} onClick={props.onClose}
                              className='popup__admit-button'>Узнать больше</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DescriptionPopup;