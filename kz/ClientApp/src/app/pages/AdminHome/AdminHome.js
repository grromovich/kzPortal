import React, { useState } from 'react';
import "./AdminHome.css";
import { NextButton } from "../../shared/NextButton";
import { PopupInput } from "../../shared/PopupInput";
import passwordImg from "../../assets/images/password.svg";

export function AdminHome() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onButtonClick() {
        if (password.length === 0) {
            setError("Заполните поле Пароль")
            return;
        }
        else if (password.length < 6) {
            setPassword("")
            setError("Количество символов в поле Пароль должно быть не менее 6")
            return;
        }
        setError("")
        setIsLoading(true)
        ValidateTabelCode(password)
    };

    function onEnterPressed(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            onButtonClick()
        }
    }

    async function ValidateTabelCode(password) {
        fetch('adminlogin',
            {
                method: "POST",
                //withCrefentials: true,
                crossorigin: true,
                mode: "no-cors",
                headers: { "Accept": "application/json", "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({
                    Password: password,
                })
            })
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false)
                if (data !== false) {
                    if (data['APIkey'] != null) {
                        sessionStorage.setItem("APIkey", data['APIkey']);
                        window.location.assign('/admininfo');
                        setPassword("")
                    }
                    else if (data['error'] != null) {
                        setError(data['error'])
                        setPassword("")
                    }
                }
            })
    }

    return (
        <div className="popup" onKeyDown={onEnterPressed }>
                <div className="popup__container">
                <h1 className="validate-text">Админ-панель</h1>
                <PopupInput
                    onChange={(data) => setPassword(data)}
                    text={password}
                    onEnterPressed={onEnterPressed}
                    type={"password"}
                    placeholder="Пароль"
                    autoFocus={true}
                    maxlength={25}
                    ico={passwordImg}
                />
                {error &&
                    <h2 className="wrong-code-text">{ error }</h2>
                }
                <NextButton 
                    onClick={onButtonClick}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}