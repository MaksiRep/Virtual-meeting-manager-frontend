import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit();
    }

    return(
        <PopupWithForm title="Вы точно хотите удалить мероприятие?" name="delete" button={props.btnMessage} isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} onOverlayClose={props.onOverlayClose} />
    );
}

export default DeletePopup;