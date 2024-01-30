import React, { useState, useEffect} from 'react';
import "./Main.css";
import printerImg from '../../assets/images/printer.svg';
import lockImg from '../../assets/images/lock.svg';
//import exitImg from '../../assets/images/exit.svg';
import {ExitPopup} from "../../components/ExitPopup";
import { Tables } from "../../components/Tables";
import { PasswordPopup } from "../../components/PasswordPopup";

export function Main() {

    const tabelCode = sessionStorage.getItem("TabelCode")
    const [name, setName] = useState("")
    const [role, setRole] = useState(0)
    const [articles, setArticles] = useState([])
    const [otherData, setOtherData] = useState([])
    const [visibilityPasswordPopup, setVisibilityPasswordPopup] = useState("hidden")
    const [visibilityExitPopup, setVisibilityExitPopup] = useState("hidden")

    const [isLoadPrint, setisLoadPrint] = useState(false)

    function onExitClick() {
        sessionStorage.setItem("TabelCode", "");
        sessionStorage.setItem("APIkey", "");
        window.location.assign('/');
    };
    
    useEffect(() => {
        GetData(tabelCode)
    },[tabelCode])

    return (
        <div className="wrapper">
            <PasswordPopup
                visibilityPasswordPopup={visibilityPasswordPopup}
                onClose={() => setVisibilityPasswordPopup("hidden")}
            />
            <ExitPopup
                visibilityExitPopup={visibilityExitPopup}
                onClose={(data)=>{setVisibilityExitPopup(data)}}
            />
            <div className="main-header">
                <div className="main-header__container">
                    <ul className="main-header_menu">
                        <li>{name}</li>
                        <li>Таб. номер: {tabelCode}</li>
                        { role === 1 ? <li><a href="/admininfo">Админ-панель</a></li> : <></>}
                        <li>{ !isLoadPrint ?
                                <img
                                className="header-img"
                                src={printerImg}
                                alt=""
                                onClick={() => { setisLoadPrint(!isLoadPrint);GetFIle() }} /> :
                                <div className="main-loader" onClick={()=>{setisLoadPrint(!isLoadPrint)}}></div>
                            }
                            
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

    async function GetData(tabel) {
        fetch('data',
            {
                method: "POST",
                //withCrefentials: true,
                crossorigin: true,
                mode: "no-cors",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    APIkey: sessionStorage.getItem("APIkey"),
                })
            })
            .then((response) => response.json())
            .then((data) => {
                setName(data["Name"])
                setArticles(data["Articles"])
                setOtherData([data["BeforeDolg"], data["AfterDolg"], data["TotalDohod"]])
                setRole(data["Role"])
            })
        }
        
        async function GetFIle() {
            fetch('filetoprint',
                {
                    method: "POST",
                    //withCrefentials: true,
                    crossorigin: true,
                    mode: "no-cors",
                    headers: { "Accept": "application/json", "Content-Type": "application/json" },
                    body: JSON.stringify({
                        APIkey: sessionStorage.getItem("APIkey"),
                    })
                }
                )
            }
}