import React, {useEffect, useState, useRef} from "react";
import PopupWithForm from "./PopupWithForm";
import {getDate} from "../../utils/constants";
import '../styles/Auth.css';
import PhoneInput from "react-phone-number-input";


function UserPopup(props) {

    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const sexRef = useRef();
    const dateBirthRef = useRef();
    const isAdminRef = useRef();
    const isUserRef = useRef();
    const isMainAdminRef = useRef();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if(props.user.roles){
            const isCurrentUser = (props.user.id === props.currentUser);
            nameRef.current.value = props.user.firstName;
            surnameRef.current.value = props.user.lastName;
            setEmail(props.user.email);
            sexRef.current.value = props.user.gender;
            dateBirthRef.current.value = props.user.birthDate;
            isAdminRef.current.checked = props.user.roles.includes('admin');
            isMainAdminRef.current.checked = props.user.roles.includes('mainAdmin');
            isUserRef.current.checked = props.user.roles.includes('user');
            isUserRef.current.disabled = !(props.isMainAdmin);
            isAdminRef.current.disabled = !(props.isMainAdmin);
            isMainAdminRef.current.disabled = (!(props.isMainAdmin && !(isCurrentUser)));
            setPhoneNumber(props.user.phone);
        }
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        const rolesIds = [];
        props.rolesList.forEach((role) => {
            switch(role.type){
                case 'user':
                    if(isUserRef.current.checked)
                       rolesIds.push(role.id);
                    break
                case 'admin':
                    if(isAdminRef.current.checked)
                        rolesIds.push(role.id);
                    break
                case 'mainAdmin':
                    if(isMainAdminRef.current.checked)
                        rolesIds.push(role.id);
                    break
            }
        });
        props.onSubmit({
            userId: props.user.id,
            firstName: nameRef.current.value,
            lastName: surnameRef.current.value,
            birthDate: dateBirthRef.current.value,
            gender: sexRef.current.value,
            phone: phoneNumber
        },
            {
                userId: props.user.id,
                rolesIds: rolesIds
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
                   id='birth-date-input' name='birth-date' required min="1900-01-01" max={getDate(true)}/>
            <div className='form__checkbox-block'>
                <input className='form__checkbox' type='checkbox' placeholder='Email' id='email-input'
                       required minLength="2" maxLength="40" ref={isUserRef}/>
                <label className='form__checkbox-label'>Пользователь</label>
            </div>
            <div className='form__checkbox-block'>
                <input className='form__checkbox' type='checkbox' placeholder='Email' id='email-input'
                       required minLength="2" maxLength="40" ref={isAdminRef}/>
                <label className='form__checkbox-label'>Модератор</label>
            </div>
            <div className='form__checkbox-block'>
                <input className='form__checkbox' type='checkbox' placeholder='Email' id='email-input'
                       required minLength="2" maxLength="40" ref={isMainAdminRef}/>
                <label className='form__checkbox-label'>Администратор</label>
            </div>
        </PopupWithForm>
    );
}

export default UserPopup;