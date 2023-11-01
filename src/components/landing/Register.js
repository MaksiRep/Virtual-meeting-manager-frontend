import React from "react";
import {Link} from "react-router-dom";
import '../styles/Auth.css'

function Register() {



    return(
        <div className='auth'>
            <h2 className='auth__title'>Регистрация</h2>
            <form className='form-auth'>
                <input className='form-auth__input' type='email' placeholder='Email' id='email-input' name='email'
                       required minLength="2" maxLength="40" />
                <input className='form-auth__input' type='password' placeholder='Пароль' id='password-input' name='password'
                       required minLength="2" maxLength="40" />
                <input className='form-auth__input' type='password' placeholder='Повторите пароль'
                       id='password-repeat-input' name='password' required minLength="2" maxLength="40" />
                <input className='form-auth__input' type='text' placeholder='Имя'
                       id='name-input' name='name' required minLength="2" maxLength="40" />
                <input className='form-auth__input' type='text' placeholder='Фамилия'
                       id='surname-input' name='surname' required minLength="2" maxLength="40" />
                <select className='form-auth__input' placeholder='Пол' id='password-repeat-input' name='password' required>
                    <option value='' disabled selected>Пол</option>
                    <option value='male'>Муж</option>
                    <option value='female'>Жен</option>
                </select>
                <input className='form-auth__input' type='date' placeholder='Дата рождения'
                       id='birth-date-input' name='birth-date' required min="1907-01-01" max="2009-01-01" />
                <button className='auth__admit-button'>Зарегистрироваться</button>
            </form>
            <div className='auth__switch'>
                <p className='auth__link-text'>Уже зарегестрированы?
                    <Link to='/login' className='auth__switch-link'> Войти</Link></p>
            </div>
        </div>
    );
}

export default Register