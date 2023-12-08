import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";
import '../styles/PopupForm.css'
import {getDate} from "../../utils/constants";

function EditMeetingPopup(props) {

    const titleRef = useRef();
    const shortDescriptionRef = useRef();
    const fullDescriptionRef = useRef();
    const imageRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const peopleNumRef = useRef();
    const ageRestrRef = useRef();
    const sexRestrRef = useRef();
    const currentDate = getDate();

    useEffect(() => {
        if(props.meeting){
            titleRef.current.value = props.meeting.name;
            shortDescriptionRef.current.value = props.meeting.shortDescription;
            fullDescriptionRef.current.value = props.meeting.fullDescription;
            imageRef.current.value = props.meeting.link;
            startDateRef.current.value = props.meeting.startDate;
            if (props.meeting.endDate)
                endDateRef.current.value = props.meeting.endDate;
            if (props.meeting.peopleNum)
                peopleNumRef.current.value = props.meeting.peopleNum;
            if (props.meeting.sexRestr)
                sexRestrRef.current.value = props.meeting.sexRestr;
            if (props.meeting.ageRestr)
                ageRestrRef.current.value = props.meeting.ageRestr;
        }
        else {
            titleRef.current.value = '';
            shortDescriptionRef.current.value = '';
            fullDescriptionRef.current.value = '';
            imageRef.current.value = '';
            startDateRef.current.value = '';
            endDateRef.current.value = '';
            peopleNumRef.current.value = '';
            sexRestrRef.current.value = '';
            ageRestrRef.current.value = '';
        }
    }, [props.meeting, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({
            name: titleRef.current.value,
            description: fullDescriptionRef.current.value,
            startDate: startDateRef.current.value + 'T00:00:00.000Z',
            endDate: endDateRef.current.value ? endDateRef.current.value + 'T23:59:59.999Z' : startDateRef.current.value + 'T23:59:59.999Z',
            maxUsers: Number(peopleNumRef.current.value),
            minAge: ageRestrRef.current.value ? ageRestrRef.current.value : null,
            gender: sexRestrRef.current.value ? sexRestrRef.current.value : null,
            shortDescription: shortDescriptionRef.current.value,
        }, imageRef.current.value);
    }

    return(
        <PopupWithForm title={props.titleName} name="email" button={props.btnMessage} isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} onOverlayClose={props.onOverlayClose}
                       style={props.style} exitButton={'user-exit-button'}>
            <label className='form__label'>Название мероприятия</label>
            <input className="form__input" type="text" placeholder="Название"
                   id="edit-title-input" name="edit-title" required ref={titleRef}/>
            <span className="title-input-error"></span>
            <label className='form__label'>Краткое описание мероприятия</label>
            <textarea className="form__input" rows='3' placeholder="Краткое описание"
                   id="edit-small-description-input" name="edit-small-description" required ref={shortDescriptionRef}/>
            <span className="short-description-input-error"></span>
            <label className='form__label'>Полное описание мероприятия</label>
            <textarea className="form__input" rows='6' placeholder="Полное описание"
                   id="edit-full-description-input" name="edit-full-description" required ref={fullDescriptionRef}/>
            <span className="full-description-input-error"></span>
            <label className='form__label'>Картинка на мероприятие</label>
            <input className="form__input" type="text" placeholder="Ссылка на картинку"
                   id="edit-image-input" name="edit-image" required ref={imageRef}/>
            <span className="image-input-error"></span>
            <label className='form__label'>Дата начала мероприятия</label>
            <input className='form-auth__input' type='date' placeholder='Дата начала'
                   id='start-date-input' name='start-date' required min={currentDate} ref={startDateRef}/>
            <label className='form__label'>Дата конца мероприятия</label>
            <input className='form-auth__input' type='date' placeholder='Дата начала'
                   id='start-date-input' name='start-date' min={currentDate} ref={endDateRef}/>
            <label className='form__label'>Количество участников</label>
            <input className="form__input" type="number" placeholder="Количество участников" min='1'
                   id="people-number-input" name="people-number" ref={peopleNumRef}/>
            <label className='form__label'>Минимальный возраст участия</label>
            <input className="form__input" type="number" placeholder="Минимальный возраст" min='1' max='99'
                   id="people-number-input" name="people-number" ref={ageRestrRef}/>
            <label className='form__label'>Ограничения по полу</label>
            <select className='form-auth__input' placeholder='Пол' id='age-restr-input' name='age-restr'
                    ref={sexRestrRef}>
                <option value='male'>Муж</option>
                <option value='female'>Жен</option>
            </select>
        </PopupWithForm>
    );
}

export default EditMeetingPopup;