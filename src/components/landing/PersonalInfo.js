import React, {useEffect, useRef, useState} from "react";
import '../styles/PersonalInfo.css';
import '../styles/Auth.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import PhoneInput from "react-phone-number-input";

function PersonalInfo(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const nameRef = useRef();
    const surnameRef = useRef();
    const sexRef = useRef();
    const dateBirthRef = useRef();
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();

    useEffect(() => {
        if (!(Object.keys(currentUser).length === 0 && currentUser.constructor === Object)){
            nameRef.current.value = currentUser.firstName;
            surnameRef.current.value = currentUser.lastName;
            setPhoneNumber(currentUser.phone);
            setEmail(currentUser.email);
            sexRef.current.value = currentUser.gender;
            dateBirthRef.current.value = props.user.birthDate;
        }
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({
            userId: currentUser.id,
            firstName: nameRef.current.value,
            lastName: surnameRef.current.value,
            birthDate: dateBirthRef.current.value,
            gender: sexRef.current.value,
            phone: phoneNumber
        })
    }

    return(
        <div className='personal__info'>
            <h2 className='auth__title'>Личная информация</h2>
            <form className='form-auth' onSubmit={handleSubmit}>
                <p className='form-auth__input'>{email}</p>
                <input className='form-auth__input' type='text' placeholder='Имя' ref={nameRef}
                       id='name-input' name='name' required minLength="2" maxLength="40"/>
                <input className='form-auth__input' type='text' placeholder='Фамилия' ref={surnameRef}
                       id='surname-input' name='surname' required minLength="2" maxLength="40"/>
                <PhoneInput className='form-auth__input' onChange={setPhoneNumber} value={phoneNumber} placeholder='Номер телефона'/>
                <select className='form-auth__input' placeholder='Пол' id='password-repeat-input' name='password'
                        ref={sexRef} required>
                    <option value='male'>Муж</option>
                    <option value='female'>Жен</option>
                </select>
                <input className='form-auth__input' type='date' placeholder='Дата рождения'
                       id='birth-date-input' name='birth-date' required min="1907-01-01" max="2009-01-01"
                       ref={dateBirthRef}/>
                <button className='auth__admit-button'>Сохранить</button>
            </form>
        </div>
    );
}

export default PersonalInfo