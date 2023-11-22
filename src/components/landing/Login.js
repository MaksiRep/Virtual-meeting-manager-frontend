import React from "react";
import '../styles/Auth.css'
import {Link} from "react-router-dom";

function Login(props) {



    return(
        <div className='auth'>
            <h2 className='auth__title'>Авторизация</h2>
            <form className='form-auth'>
                <input className='form-auth__input' type='email' placeholder='Email' id='email-input' name='email'
                       required minLength="2" maxLength="40" />
                <input className='form-auth__input' type='password' placeholder='Пароль' id='password-input' name='password'
                       required minLength="2" maxLength="40" />
                <button className='auth__admit-button' type="submit">Зарегистрироваться</button>
            </form>
            <div className='auth__switch'>
                <p className='auth__switch-text'>Ещё не зарегистрированы? <Link to='/sign-up' className='auth__switch-link'>Зарегистрироваться</Link></p>
                <p className='auth__switch-text'>Забыли пароль? <span className='auth__switch-link' onClick={props.onRecoveryClick}>Восстановить</span></p>
            </div>
        </div>
    );
}

export default Login