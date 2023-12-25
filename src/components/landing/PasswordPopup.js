import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function PasswordPopup(props) {

    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const repeatNewPasswordRef = useRef();

    useEffect(() => {
        oldPasswordRef.current.value = '';
        newPasswordRef.current.value = '';
        repeatNewPasswordRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        if(newPasswordRef.current.value === repeatNewPasswordRef.current.value){
            props.onSubmit({
                userId: props.currentUser,
                oldPassword: oldPasswordRef.current.value,
                newPassword: newPasswordRef.current.value
            });
        }
        else {
            props.onError();
        }
    }

    return(
        <PopupWithForm title="Смена пароля" name="email" button={props.btnMessage} isOpen={props.isOpen}
                       onClose={props.onClose} onSubmit={handleSubmit} onOverlayClose={props.onOverlayClose}>
            <input className="form__input form__input_type_avatar" type="password" placeholder="Старый пароль"
                   id="old-pswrd-input" name="old-pswrd" required ref={oldPasswordRef}/>
            <input className="form__input form__input_type_avatar" type="password" placeholder="Новый пароль"
                   id="new-pswrd-input" name="new-pswrd" required ref={newPasswordRef}/>
            <input className="form__input form__input_type_avatar" type="password" placeholder="Повторите новый пароль"
                   id="rpt-new-pswrd-input" name="rpt-new-pswrd" required ref={repeatNewPasswordRef}/>
        </PopupWithForm>
    );
}

export default PasswordPopup;