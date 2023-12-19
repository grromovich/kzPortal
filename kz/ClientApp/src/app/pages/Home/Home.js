import React, { useState } from 'react';
import "./Home.css";
import { NextButton } from "../../shared/NextButton";
import { PopupInput } from "../../shared/PopupInput";
import userImg from "../../assets/images/user.svg";
import passwordImg from "../../assets/images/password.svg";

export function Home() {
    const [tabelcode, setTabelcode] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onButtonClick() {
        if (tabelcode.length === 0) {
            setError("Заполните поле Табельный код")
            return;
        }
        else if (tabelcode.length < 6) {
            setTabelcode("")
            setError("Количество символов в поле Табельный код должно быть не менее 6")
            return;
        }
        else if (password.length === 0) {
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
        ValidateTabelCode(tabelcode, password)
    };

    function onEnterPressed(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            onButtonClick()
        }
    }

    async function ValidateTabelCode(code, password) {
        fetch('login',
            {
                method: "POST",
                //withCrefentials: true,
                crossorigin: true,
                mode: "no-cors",
                headers: { "Accept": "application/json", "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({
                    TabelCode: code,
                    Password: password,
                })
            })
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false)
                if (data !== false) {
                    if (data['APIkey'] != null) {
                        sessionStorage.setItem("APIkey", data['APIkey']);
                        sessionStorage.setItem("TabelCode", code);
                        window.location.assign('/between');
                        setTabelcode("")
                        setPassword("")
                    }
                    else if (data['error'] != null) {
                        setError(data['error'])
                        setTabelcode("")
                        setPassword("")
                    }
                }
            })
    }

    return (
        <div className="popup" onKeyDown={onEnterPressed }>
                <div className="popup__container">
                <h1 className="validate-text">Вход</h1>
                <PopupInput
                    onChange={(data) => setTabelcode(data)}
                    text={tabelcode}
                    type={"text"}
                    placeholder="Табельный код"
                    autoFocus={true}
                    maxlength={6}
                    ico={userImg}
                />
                <PopupInput
                    onChange={(data) => setPassword(data)}
                    text={password}
                    onEnterPressed={onEnterPressed}
                    type={"password"}
                    placeholder="Пароль"
                    autoFocus={false}
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