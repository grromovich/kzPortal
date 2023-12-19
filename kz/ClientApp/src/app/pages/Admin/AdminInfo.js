import React, { useState, useEffect, useRef } from 'react';
import "./Admin.css";
import settingsImg from '../../assets/images/settings.svg';
import exitImg from '../../assets/images/exit.svg';
import krestImg from '../../assets/images/krest.svg';
import { Tables } from "../../components/Tables";
import { PasswordPopup } from "../../components/PasswordPopup";

export function AdminInfo() {

    const tabelCode = sessionStorage.getItem("TabelCode")
    const [name, setName] = useState("")
    const [articles, setArticles] = useState([])
    const [otherData, setOtherData] = useState([])
    const [visibilityPasswordPopup, setVisibilityPasswordPopup] = useState("hidden")
    const settingsRef = useRef(null);

    function onExitClick() {
        sessionStorage.setItem("TabelCode", "");
        sessionStorage.setItem("APIkey", "");
        window.location.assign('/');
    };

    useEffect(() => {
        GetData(tabelCode)
    },[tabelCode])

    async function GetData(tabel) {
        fetch('data',
            {
                method: "POST",
                //withCrefentials: true,
                crossorigin: true,
                mode: "no-cors",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    TabelCode: tabel,
                })
            })
            .then((response) => response.json())
            .then((data) => {
                setName(data["Name"])
                setArticles(data["Articles"])
                setOtherData([data["BeforeDolg"], data["AfterDolg"], data["TotalDohod"]])
            })
    }
    return (
        <div className="wrapper">
            <div className="settings" ref={ settingsRef }>
                <img className="krest"
                    src={krestImg} alt=""
                    onClick={() => {
                        settingsRef.current.classList.remove("move-to-left");
                    }} />
                <div className="settings__container">
                    <h1>Настройки</h1>
                    <button
                        onClick={() => {
                            setVisibilityPasswordPopup("visible")
                        }}
                    >
                        Сменить пароль
                    </button>
                </div>
            </div>
            <PasswordPopup
                visibilityPasswordPopup={visibilityPasswordPopup}
                onClose={() => setVisibilityPasswordPopup("hidden")}
            />
            <div className="header">
                <div className="header__container">
                    <ul className="header_menu">
                        <li>{name}</li>
                        <li>Таб. номер: {tabelCode}</li>
                        <li><img
                            className="img_settings"
                            src={settingsImg}
                            alt=""
                            onClick={() => {
                                setTimeout(() => settingsRef.current.classList.add("move-to-left"), 300)
                            }} />
                        </li>
                        <li onClick={onExitClick} > <img className="img_exit" src={exitImg} alt="" /></li>
                    </ul>
                </div>
            </div>
            <div className="main">
                <div className="main__container">
                    <h1>Расчетный листок</h1>
                    <Tables articles={articles}
                        otherData={otherData}
                    />
                </div>
            </div>
        </div>
    )
}