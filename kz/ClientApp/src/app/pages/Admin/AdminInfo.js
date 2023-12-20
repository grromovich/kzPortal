import React, { useState } from 'react';
import "./AdminInfo.css";
import lockImg from '../../assets/images/lock.svg';
//import exitImg from '../../assets/images/exit.svg';
import { PasswordPopup } from "../../components/PasswordPopup";

export function AdminInfo() {

    const [visibilityPasswordPopup, setVisibilityPasswordPopup] = useState("hidden")
    const [visibilityExitPopup, setVisibilityExitPopup] = useState("hidden")

    function onExitClick() {
        sessionStorage.setItem("TabelCode", "");
        sessionStorage.setItem("APIkey", "");
        window.location.assign('/');
    };

    /*async function GetData(tabel) {
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
            })
    }*/

    return (
        <div className="wrapper">
            <PasswordPopup
                visibilityPasswordPopup={visibilityPasswordPopup}
                onClose={() => setVisibilityPasswordPopup("hidden")}
            />
            <div className="overlay" style={{ visibility: visibilityExitPopup }}>
                <div class="exit-popup" style={{visibility: visibilityExitPopup}}>
                    <div class="exit-popup__container">
                        <h1>Выход</h1>
                        <p>Вы действительно хотите выйти?</p>
                        <div class="exit-popup-buttons">
                            <button onClick={onExitClick}>Выйти</button>
                            <button onClick={()=>{setVisibilityExitPopup("hidden")}}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-header">
                <div className="main-header__container">
                    <ul className="main-header_menu">
                        <li><input className=''/></li>
                        <li>Админ-панель</li>
                        <li><img
                            className="header-img"
                            src={lockImg}
                            alt=""
                            onClick={() => {
                                setVisibilityPasswordPopup("visible")
                            }} />
                        </li>
                        <li onClick={()=>{setVisibilityExitPopup("visible")}}>Выйти</li>
                        
                    </ul>
                </div>
            </div>
            <div className="main-main">
                <div className="main-main__container">
                    <h1>Расчетный листок</h1>
                </div>
            </div>
        </div>
    )
}