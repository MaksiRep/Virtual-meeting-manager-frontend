import React, {useRef} from "react";
import {Link} from "react-router-dom";
import '../styles/Auth.css'

function Register(props) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();
    const nameRef = React.useRef();
    const surnameRef = React.useRef();
    const sexRef = React.useRef();
    const dateBirthRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault()
        if(passwordRef.current.value === repeatPasswordRef.current.value)
            props.onSubmit({
                email: emailRef.current.value,
                password: passwordRef.current.value,
                firstName: nameRef.current.value,
                lastName: surnameRef.current.value,
                gender: sexRef.current.value,
                birthDate: dateBirthRef.current.value
            })
    }

    return(
        <div className='auth'>
            <h2 className='auth__title'>Регистрация</h2>
            <form className='form-auth' onSubmit={handleSubmit}>
                <input className='form-auth__input' type='email' placeholder='Email' id='email-input' name='email'
                       required minLength="2" maxLength="40" ref={emailRef}/>
                <input className='form-auth__input' type='password' placeholder='Пароль' id='password-input' name='password'
                       required minLength="2" maxLength="40" ref={passwordRef}/>
                <input className='form-auth__input' type='password' placeholder='Повторите пароль'
                       id='password-repeat-input' name='password' required minLength="2" maxLength="40" ref={repeatPasswordRef}/>
                <input className='form-auth__input' type='text' placeholder='Имя'
                       id='name-input' name='name' required minLength="2" maxLength="40" ref={nameRef}/>
                <input className='form-auth__input' type='text' placeholder='Фамилия'
                       id='surname-input' name='surname' required minLength="2" maxLength="40" ref={surnameRef}/>
                <select className='form-auth__input' placeholder='Пол' id='password-repeat-input' name='password' required ref={sexRef}>
                    <option value='' disabled selected>Пол</option>
                    <option value='male'>Муж</option>
                    <option value='female'>Жен</option>
                </select>
                <input className='form-auth__input' type='date' placeholder='Дата рождения'
                       id='birth-date-input' name='birth-date' required min="1907-01-01" max="2009-01-01" ref={dateBirthRef}/>
                <button className='auth__admit-button' type="submit">Зарегистрироваться</button>
            </form>
            <div className='auth__switch'>
                <p className='auth__link-text'>Уже зарегестрированы?
                    <Link to='/sign-in' className='auth__switch-link'> Войти</Link></p>
            </div>
        </div>
    );
}

export default Register