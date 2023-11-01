import React, {useEffect, useState} from "react";
import '../styles/PersonalInfo.css';
import '../styles/Auth.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function PersonalInfo(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState('');
    const [birthDate, setBirthDate] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setSurname(currentUser.surname);
        setEmail(currentUser.email);
        setSex(currentUser.sex);
        setBirthDate(currentUser.birthDate);
        console.log(currentUser.birthDate);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeSurname(e) {
        setSurname(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangeSex(e) {
        setSex(e.target.value);
    }

    function handleChangeBirthDate(e) {
        setBirthDate(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.value)
        props.onChange({
            name,
            surname,
            email,
            sex,
            birthDate
        });
    }

    return(
        <div className='personal__info'>
            <h2 className='auth__title'>Личная информация</h2>
            <form className='form-auth' onSubmit={handleSubmit}>
                <input className='form-auth__input' type='email' placeholder='Email' id='email-input' name='email'
                       required minLength="2" maxLength="40" value={email || ''} onChange={handleChangeEmail}/>
                <input className='form-auth__input' type='text' placeholder='Имя' onChange={handleChangeName}
                       id='name-input' name='name' required minLength="2" maxLength="40" value={name || ''}/>
                <input className='form-auth__input' type='text' placeholder='Фамилия' onChange={handleChangeSurname}
                       id='surname-input' name='surname' required minLength="2" maxLength="40" value={surname || ''}/>
                <select className='form-auth__input' placeholder='Пол' id='password-repeat-input' name='password'
                        value={sex} required onChange={handleChangeSex}>
                    <option value='male'>Муж</option>
                    <option value='female'>Жен</option>
                </select>
                <input className='form-auth__input' type='date' placeholder='Дата рождения' value={birthDate || ''}
                       id='birth-date-input' name='birth-date' required min="1907-01-01" max="2009-01-01"
                       onChange={handleChangeBirthDate}/>
                <button className='auth__admit-button'>Сохранить</button>
            </form>
        </div>
    );
}

export default PersonalInfo