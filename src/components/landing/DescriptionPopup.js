import React from "react";

function DescriptionPopup(props) {

    const handleOverlayClose = (evt) => {
        if(evt.target === evt.currentTarget)
            props.onClose()
    }

    return(
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id='description-popup'
            onMouseDown={handleOverlayClose}>
            <div className='popup__container'>
                <button className="popup__exit-button" type="button" onClick={props.onClose} />
                <h2 className="popup__title">{props.card.title}</h2>
                <div className='popup__details'>
                    <p className='popup__description'>{props.card.description}</p>
                    <img className='popup__image' src={props.card.link} alt=''/>
                </div>
            </div>
        </div>
    );
}

export default DescriptionPopup;