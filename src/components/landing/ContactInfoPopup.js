import React from "react";
import '../styles/Popup.css';
import '../styles/ContactInfo.css'
import emailIcon from '../../images/email-icon.png';
import phoneIcon from '../../images/phone-icon.png';

function ContactInfoPopup(props) {

    return(
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id='description-popup'
             onMouseDown={props.onOverlayClose}>
            <div className='popup__container popup__form-container popup__form-block'>
                <button className="popup__exit-button" type="button" onClick={props.onClose} />
                <h2 className="popup__title">Контактная информация</h2>
                <div className='popup__info contact-info-block'>
                    <div className='contact-info__line'>
                        <img className='contact-info__email-img' src={emailIcon} alt='email'/>
                        <p className='contact-info__email-text'>{props.contactInfo.managerEmail}</p>
                    </div>
                    <div className='contact-info__line'>
                        <img className='contact-info__phone-img' src={phoneIcon} alt='phone'/>
                        <p className='contact-info__phone-text'>{}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactInfoPopup;