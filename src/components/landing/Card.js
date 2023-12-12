import React from "react";
import '../styles/Card.css'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {getDateFormat} from "../../utils/constants";


function Card (props) {

    const currentUser = React.useContext(CurrentUserContext);

    const equalDate = getDateFormat(props.card.startDate) === getDateFormat(props.card.endDate);

    const handleClick = () => {
        props.onCardClick(props.card);
    }

    return(
        <article className="element">
            <img className="element__image" alt={props.card.name} src={props.card.imageUrl} onClick={handleClick}/>
            <div className="element__info">
                <div className='element__details'>
                    <h3 className="element__title">{props.card.name}</h3>
                </div>
                <div className="element__will-go-section">
                    <div className='element__date-block'>
                        <p className='element__date'>{getDateFormat(props.card.startDate)}</p>
                        {(!equalDate) ? <>
                            <p className='element__date'>-{getDateFormat(props.card.endDate)}</p>
                        </> : <></>}
                    </div>
                    {props.card.willGo && <p className="element__will-go">Вы идёте✓</p>}
                </div>
            </div>
        </article>
    );
}

export default Card;