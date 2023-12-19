import React, { useState } from 'react';
import "./PasswordPopup.css";
import krestImg from '../assets/images/krest.svg';

import {PopupInput} from "../shared/PopupInput";

export function PasswordPopup({ visibilityPasswordPopup, onClose }) {

    console.log(visibilityPasswordPopup)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [error, setError] = useState("");

    async function GetData(old, pas) {
        fetch('passwordchange',
            {
                method: "POST",
                //withCrefentials: true,
                crossorigin: true,
                mode: "no-cors",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    OldPassword: old,
                    NewPassword: pas,
                    APIkey: sessionStorage.getItem("APIkey"),
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data === true) {
                    popupClose()
                }
                else {
                    setError(data['error'])
                    setOldPassword("")
                    setNewPassword1("")
                    setNewPassword2("")
                }
            })
    }
    function onSendClick() {
        if (oldPassword.length === 0) {
            setError("Заполните поле Текущий пароль")
            return;
        }
        else if (newPassword1.length === 0) {
            setError("Заполните поле Новый пароль")
            return;
        }
        else if (newPassword2.length === 0) {
            setError("Заполните поле Повторите новый пароль")
            return;
        }
        else if (oldPassword.length < 6) {
            setError("Количество символов в поле Текущий пароль должно быть не менее 6")
            return;
        }
        else if (newPassword1.length < 6) {
            setError("Количество символов в поле Новый пароль должно быть не менее 6")
            return;
        }
        else if (newPassword2.length < 6) {
            setError("Количество символов в поле Повторите новый пароль должно быть не менее 6")
            return;
        }
        if (newPassword1 !== newPassword2) {
            setError("Новый пароль должен быть одинаковым")
            return;
        }
        setError("")
        GetData(oldPassword, newPassword1)
    }

    function popupClose() {
        setError("")
        setOldPassword("")
        setNewPassword1("")
        setNewPassword2("")
        onClose()
    }

    return (
        <div className="overlay" style={{ visibility: visibilityPasswordPopup }}>
            <div className="password-popup" style={{ visibility: visibilityPasswordPopup }}>
                <img className="krest"
                    src={krestImg} alt=""
                    onClick={ popupClose }
                />
                <div className="password-popup__container">
                    <h1>Изменение пароля</h1>
                    <PopupInput
                        type={"password"}
                        placeholder="Текущий пароль"
                        autoFocus={true}
                        maxlength={25}
                        onChange={(data) => { setOldPassword(data) }}
                        value={oldPassword}
                        displayLeftImg={visibilityPasswordPopup==="visible"}
                    />
                    <PopupInput
                        type={"password"}
                        placeholder="Новый пароль"
                        autoFocus={false}
                        maxlength={25}
                        onChange={(data) => { setNewPassword1(data) }}
                        value={newPassword1}
                        displayLeftImg={visibilityPasswordPopup==="visible"}
                    />
                    <PopupInput
                        type={"password"}
                        placeholder="Повторите новый пароль"
                        autoFocus={false}
                        maxlength={25}
                        onChange={(data) => { setNewPassword2(data) }}
                        value={newPassword2}
                        displayLeftImg={false}
                    />
                    {error &&
                        <h2 className="wrong-code-text">{error}</h2>
                    }
                    <div className="buttons">
                        <button onClick={onSendClick} className='next-btn'>Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 