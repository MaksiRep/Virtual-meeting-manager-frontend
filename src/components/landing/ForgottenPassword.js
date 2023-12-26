import React, {useRef} from "react";
import '../styles/Auth.css'
import {Link} from "react-router-dom";

function ForgottenPassword(props) {

    const emailRef = useRef();

    function handleSubmit(e){
        e.preventDefault();
        props.onSubmit({
            email: emailRef.current.value
        })
    }

    return(
        <div className='auth'>
            <h2 className='auth__title'>Введите почту аккаунта, чтобы восстановить пароль:</h2>
            <form className='form-auth' onSubmit={handleSubmit}>
                <input className='form-auth__input' type='email' placeholder='Email' id='email-input' name='email'
                       required minLength="2" maxLength="40" ref={emailRef}/>
                <button className='auth__admit-button' type="submit">Отправить</button>
            </form>
        </div>
    );
}

export default ForgottenPassword