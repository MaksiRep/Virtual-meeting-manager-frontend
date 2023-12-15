import React from "react";
import CreateSection from "./CreateSection";
import MeetingList from "./MeetingList";

function Main(props) {

    return(
        <>
            <CreateSection onCreateClick={props.onCreateClick}/>
            <MeetingList cards={props.cards} onCardClick={props.onCardClick} />
        </>
    );

}

export default Main