import React, {useEffect} from "react";
import CreateSection from "./CreateSection";
import MeetingList from "./MeetingList";
import Loader from "./Loader";

function Main(props) {

    return(
        <>
            <CreateSection onCreateClick={props.onCreateClick} onSearchSubmit={props.onSearchSubmit}/>
            <MeetingList cards={props.cards} onCardClick={props.onCardClick} isFull={props.isFull}
                         isLoaded={props.isLoaded} page={props.page} toLoad={props.toLoad} loggedIn={props.loggedIn}/>
        </>
    );

}

export default Main