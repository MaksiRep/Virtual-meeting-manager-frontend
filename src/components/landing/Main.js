import React from "react";
import CreateSection from "./CreateSection";
import MeetingList from "./MeetingList";

function Main(props) {

    return(
        <>
            <CreateSection onCreateClick={props.onCreateClick} onSearchSubmit={props.onSearchSubmit}/>
            <MeetingList cards={props.cards} onCardClick={props.onCardClick} isFull={props.isFull}/>
        </>
    );

}

export default Main