import React from "react";
import '../styles/Auth.css'

function RecoveryPassword(props) {

    const passwordRef = React.useRef();
    const repeatPasswordRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value === repeatPasswordRef.current.value){
            props.onSubmit({
                password: passwordRef.current.value
            })
        }
    }

    return(
        <div className='auth'>
            <h2 className='auth__title'>Изменение пароля</h2>
            <form className='form-auth' onSubmit={handleSubmit}>
                <input className='form-auth__input' type='password' placeholder='Пароль' id='password-input' name='password'
                       required minLength="2" maxLength="40" ref={passwordRef}/>
                <input className='form-auth__input' type='password' placeholder='Повторите пароль'
                       id='password-repeat-input' name='password' required minLength="2" maxLength="40" ref={repeatPasswordRef}/>
                <button className='auth__admit-button' type="submit">Сохранить</button>
            </form>
        </div>
    );
}

export default RecoveryPassword