import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function EditMeetingPopup(props) {

    const titleRef = React.useRef();
    const shortDescriptionRef = React.useRef();
    const fullDescriptionRef = React.useRef();
    const imageRef = React.useRef();

    useEffect(() => {
        titleRef.current.value = props.meeting.name;
        shortDescriptionRef.current.value = props.meeting.shortDescription;
        fullDescriptionRef.current.value = props.meeting.fullDescription;
        imageRef.current.value = props.meeting.link;
    }, [props.meeting, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({
            title: titleRef.current.value,
            shortDescription: shortDescriptionRef.current.value,
            fullDescription: fullDescriptionRef.current.value,
            image: imageRef.current.value
        });
    }

    return(
        <PopupWithForm title="Изменение мероприятия" name="email" button={props.btnMessage} isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} onOverlayClose={props.onOverlayClose}
                       style={props.style}>
            <input className="form__input" type="text" placeholder="Название"
                   id="edit-title-input" name="edit-title" required ref={titleRef}/>
            <span className="title-input-error"></span>
            <textarea className="form__input" rows='3' placeholder="Краткое описание"
                   id="edit-small-description-input" name="edit-small-description" required ref={shortDescriptionRef}/>
            <span className="short-description-input-error"></span>
            <textarea className="form__input" rows='6' placeholder="Полное описание"
                   id="edit-full-description-input" name="edit-full-description" required ref={fullDescriptionRef}/>
            <span className="full-description-input-error"></span>
            <input className="form__input" type="text" placeholder="Ссылка на картинку"
                   id="edit-image-input" name="edit-image" required ref={imageRef}/>
            <span className="image-input-error"></span>
        </PopupWithForm>
    );
}

export default EditMeetingPopup;