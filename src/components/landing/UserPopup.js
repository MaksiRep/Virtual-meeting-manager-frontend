import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import '../styles/Auth.css';
import PhoneInput from "react-phone-number-input";


function UserPopup(props) {

    const nameRef = React.useRef();
    const surnameRef = React.useRef();
    const emailRef = React.useRef();
    const sexRef = React.useRef();
    const dateBirthRef = React.useRef();
    const isAdminRef = React.useRef();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if(props.user.roles){
            nameRef.current.value = props.user.firstName;
            surnameRef.current.value = props.user.lastName;
            setEmail(props.user.email);
            sexRef.current.value = props.user.gender;
            dateBirthRef.current.value = props.user.birthDate;
            isAdminRef.current.checked = props.user.roles.includes('admin');
            setPhoneNumber(props.user.phone);
        }
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({
            userId: props.user.id,
            firstName: nameRef.current.value,
            lastName: surnameRef.current.value,
            birthDate: dateBirthRef.current.value,
            gender: sexRef.current.value,
            phone: phoneNumber
        });
    }

    return(
        <PopupWithForm title="Изменить данные пользователя" name="email" button={props.btnMessage} isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} onOverlayClose={props.onOverlayClose}
                       exitButton={'user-exit-button'}>
            <p className='form-auth__input'>{email}</p>
            <input className='form-auth__input' type='text' placeholder='Имя' ref={nameRef}
                   id='name-input' name='name' required minLength="2" maxLength="40"/>
            <input className='form-auth__input' type='text' placeholder='Фамилия' ref={surnameRef}
                   id='surname-input' name='surname' required minLength="2" maxLength="40"/>
            <PhoneInput className='form-auth__input' onChange={setPhoneNumber} value={phoneNumber}
                        placeholder='Номер телефона'/>
            <select className='form-auth__input' placeholder='Пол' id='password-repeat-input' name='password'
                    ref={sexRef} required>
                <option value='male'>Муж</option>
                <option value='female'>Жен</option>
            </select>
            <input className='form-auth__input' type='date' placeholder='Дата рождения' ref={dateBirthRef}
                   id='birth-date-input' name='birth-date' required min="1907-01-01" max="2009-01-01"/>
            <div className='form__checkbox-block'>
                <input className='form__checkbox' type='checkbox' placeholder='Email' id='email-input'
                       required minLength="2" maxLength="40" ref={isAdminRef}/>
                <label className='form__checkbox-label'>Администратор</label>
            </div>
        </PopupWithForm>
    );
}

export default UserPopup;