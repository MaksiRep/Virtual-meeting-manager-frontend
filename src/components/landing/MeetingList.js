import React, {useEffect} from "react";
import Card from "./Card";
import '../styles/MeetingList.css'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useLocation} from "react-router-dom";
import PageButtons from "./PageButtons";

function MeetingList(props) {

    const location = useLocation();

    return(
        <>
            <section className='elements'>
                {props.cards.map((card) => (
                    <Card key={card.id} card={card} onCardClick={props.onCardClick}></Card>
                ))}
            </section>
            <PageButtons isFull={props.isFull}/>
        </>
    );
}

export default MeetingList