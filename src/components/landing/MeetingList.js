import React, {useEffect} from "react";
import Card from "./Card";
import '../styles/MeetingList.css'
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useLocation} from "react-router-dom";
import PageButtons from "./PageButtons";
import Loader from "./Loader";

function MeetingList(props) {

    React.useEffect(() => {
        console.log('aboba');
        props.toLoad(true);
    },[])

    return(
        <>
            {props.isLoaded ?
                <>
                    <section className='elements'>
                        {props.cards.map((card) => (
                            <Card key={card.id} card={card} onCardClick={props.onCardClick}></Card>
                        ))}
                    </section>
                    <PageButtons isFull={props.isFull}/>
                </> : <Loader/>}
        </>
    );
}

export default MeetingList