import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function ForgottenPasswordPopup(props) {

    const emailRef = React.useRef();

    useEffect(() => {
        emailRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({
            email: emailRef.current.value
        });
    }

    return(
        <PopupWithForm title="Восстановление пароля" name="email" button={props.btnMessage} isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} onOverlayClose={props.onOverlayClose}>
            <p className='form__text'>Восстановите пароль, отправив письмо с инструкцией на почту:</p>
            <input className="form__input form__input_type_avatar" type="email" placeholder="Email"
                   id="email-input" name="email" required ref={emailRef}/>
            <span className="email-input-error"></span>
        </PopupWithForm>
    );
}

export default ForgottenPasswordPopup;