import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import '../styles/Auth.css';


function UserPopup(props) {

    const nameRef = React.useRef();
    const surnameRef = React.useRef();
    const emailRef = React.useRef();
    const sexRef = React.useRef();
    const dateBirthRef = React.useRef();

    useEffect(() => {
        nameRef.current.value = props.user.name;
        surnameRef.current.value = props.user.surname;
        emailRef.current.value = props.user.email;
        sexRef.current.value = props.user.sex;
        dateBirthRef.current.value = props.user.birthDate;
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({
            name: nameRef.current.value,
            surname: surnameRef.current.value,
            email: emailRef.current.value,
            sex: sexRef.current.value,
            dateBirth: dateBirthRef.current.value
        });
    }

    return(
        <PopupWithForm title="Изменить данные пользователя" name="email" button={props.btnMessage} isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} onOverlayClose={props.onOverlayClose}>
            <input className='form-auth__input' type='email' placeholder='Email' id='email-input' name='email'
                   required minLength="2" maxLength="40" ref={emailRef}/>
            <input className='form-auth__input' type='text' placeholder='Имя' ref={nameRef}
                   id='name-input' name='name' required minLength="2" maxLength="40"/>
            <input className='form-auth__input' type='text' placeholder='Фамилия' ref={surnameRef}
                   id='surname-input' name='surname' required minLength="2" maxLength="40"/>
            <select className='form-auth__input' placeholder='Пол' id='password-repeat-input' name='password'
                    ref={sexRef} required >
                <option value='male'>Муж</option>
                <option value='female'>Жен</option>
            </select>
            <input className='form-auth__input' type='date' placeholder='Дата рождения' ref={dateBirthRef}
                   id='birth-date-input' name='birth-date' required min="1907-01-01" max="2009-01-01"/>
            <div className='form__checkbox-block'>
                <input className='form__checkbox' type='checkbox' placeholder='Email' id='email-input'
                       required minLength="2" maxLength="40" checked/>
                <label className='form__checkbox-label'>Администратор</label>
            </div>
        </PopupWithForm>
    );
}

export default UserPopup;