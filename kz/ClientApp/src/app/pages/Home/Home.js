import React, { useState, useRef } from 'react';
import "./Home.css";
import { NextButton } from "../../shared/NextButton";
import { PopupInput } from "../../shared/PopupInput";
import userImg from "../../assets/images/user.svg";
import passwordImg from "../../assets/images/password.svg";

//import symbols from "./symbols.js";

export function Home() {
    const [tabelcode, setTabelcode] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const passwordRef = useRef(null);

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
        /*let passValid = PasswordCheck(password)
        if(passValid !== true){
            setError(passValid)
            setPassword("")
            return;
        }*/
        setError("")
        setIsLoading(true)
        ValidateTabelCode(tabelcode, password)
    };

    function onEnterPressed(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if(password === ""){
                passwordRef.current.focus()
                return;
            }
            onButtonClick()
        }
    }

    /*function PasswordCheck(password) {
        if(password.length < 8){
            return "Пароль должен содержать 8 или более символов"
        }
        if(password.length > 64){
            return "Пароль не должен быть больше 64 символов"
        }

        if(password.includes(" ")){
            return "В пароле не должно быть пробелов"
        }
        
        const pass = password.split("")

        let res = pass.map(el => {
            if(symbols.letters[el]){
                return 0
            }
            else {
                if(symbols.numbers[el]){
                    return 1
                }
                else {
                    if(symbols.other[el]){
                        return 2
                    }
                    else return undefined
                }
            }
        })
        if(res.includes(undefined)){
            return "В пароле может быть только латинские буквы, арабские цифры, а также символы"
        }

        if(!res.includes(1)){
            return "Пароль должен содержать не менее 1 цифру"
        }

        if(!res.includes(0)){
            return "Пароль должен содержать не менее 2 букв"
        }

        if(maxSymbolRaw(res) >3){
            return "В пароле не должно быть больше 3 подряд идущих символов"
        }

        return true;
    }   

    function maxSymbolRaw(raw){
        let nownumber = 0;
        let maxnumber = 0;
        let nowsymbol = raw[0];
        for(let i = 0; i < raw.length; i++){
            if(raw[i] === nowsymbol){
                nownumber++;
            }
            else {
                nowsymbol = raw[i]
                if(nownumber > maxnumber){
                    maxnumber = nownumber;
                    nownumber=0;
                }
                else {
                    nownumber=0;
                }
            }
        }
        return maxnumber;
    }*/
    
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
                    displayLeftImg={"visible"}
                    myref={passwordRef}
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

    async function ValidateTabelCode(code, password) {
        fetch('/api/login',
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

}