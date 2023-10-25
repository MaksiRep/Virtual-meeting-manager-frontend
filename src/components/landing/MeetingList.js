import React from "react";
import Card from "./Card";
import '../styles/MeetingList.css'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function MeetingList(props) {

    // const currentUser = React.useContext(CurrentUserContext);

    return(
        <section className='elements'>
            {props.cards.map((card) => (
                <Card card={card}></Card>
            ))}
        </section>
    );
}

export default MeetingList