import React from "react";
import '../styles/Card.css'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function Card (props) {

    const currentUser = React.useContext(CurrentUserContext);

    // const willGo = props.card.members.some(i => i._id === currentUser._id);

    const handleClick = () => {
        props.onCardClick(props.card);
    }

    return(
        <article className="element">
            <img className="element__image" alt={props.card.name} src={props.card.link} onClick={handleClick}/>
            <div className="element__info">
                <div className='element__details'>
                    <h3 className="element__title">{props.card.name}</h3>
                </div>
                <div className="element__will-go-section">
                    <p className='element__date'>{props.card.date}</p>
                    {props.card.willGo && <p className="element__will-go">Вы идёте✓</p>}
                </div>
            </div>
        </article>
    );
}

export default Card;