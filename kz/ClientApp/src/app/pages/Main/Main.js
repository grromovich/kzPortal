import React, { useState, useEffect} from 'react';
import "./Main.css";
import printerImg from '../../assets/images/printer.svg';
import lockImg from '../../assets/images/lock.svg';
//import exitImg from '../../assets/images/exit.svg';
import { Tables } from "../../components/Tables";
import { PasswordPopup } from "../../components/PasswordPopup";

export function Main() {

    const tabelCode = sessionStorage.getItem("TabelCode")
    const [name, setName] = useState("")
    const [articles, setArticles] = useState([])
    const [otherData, setOtherData] = useState([])
    const [visibilityPasswordPopup, setVisibilityPasswordPopup] = useState("hidden")
    const [visibilityExitPopup, setVisibilityExitPopup] = useState("hidden")

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
                        <li>{name}</li>
                        <li>Таб. номер: {tabelCode}</li>
                        <li><img
                            className="header-img"
                            src={printerImg}
                            alt=""
                            onClick={() => {
                                // Принтиться документ
                            }} />
                        </li>
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
                    <Tables articles={articles}
                        otherData={otherData}
                    />
                </div>
            </div>
        </div>
    )
}