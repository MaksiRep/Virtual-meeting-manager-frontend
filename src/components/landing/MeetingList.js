import React from "react";
import Card from "./Card";
import '../styles/MeetingList.css'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function MeetingList(props) {

    return(
        <section className='elements'>
            {props.cards.map((card) => (
                <Card key={card.id} card={card} onCardClick={props.onCardClick}></Card>
            ))}
        </section>
    );
}

export default MeetingList