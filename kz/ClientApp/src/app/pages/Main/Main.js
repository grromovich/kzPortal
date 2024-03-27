import React, { useState, useEffect} from 'react';
import "./Main.css";
import lockImg from '../../assets/images/lock.svg';
//import exitImg from '../../assets/images/exit.svg';
import {ExitPopup} from "../../components/ExitPopup";
import { Tables } from "../../components/Tables";
import { PasswordPopup } from "../../components/PasswordPopup";
import { HeaderUser } from "../../shared/HeaderUser";
import { Header } from "../../components/Header";
import { PrintFrame } from '../../components/PrintFrame';
import { WhiteBox } from "../../shared/WhiteBox";

 
export function Main() {

    const tabelCode = sessionStorage.getItem("TabelCode")
    const [name, setName] = useState("")
    const [role, setRole] = useState(0)
    const [articles, setArticles] = useState([])
    const [otherData, setOtherData] = useState([])
    const [visibilityPasswordPopup, setVisibilityPasswordPopup] = useState("hidden")
    const [visibilityExitPopup, setVisibilityExitPopup] = useState("hidden")

    const [isLoadPrint, setIsLoadPrint] = useState(false)

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
            <Header>
                <ul className="main-header_menu">
                    <HeaderUser 
                        name={name}
                        tabelCode={tabelCode}   
                        role={role}
                        page="/adminInfo"
                    />
                    <li>
                        <button
                            className='button-print'
                            onClick={() => { setIsLoadPrint(!isLoadPrint); }}
                        >
                            Печать
                        </button>
                    </li>
                    <li class="relative">
                        <WhiteBox onClick={() => {
                                setVisibilityPasswordPopup("visible")
                        }}>
                            <img
                                className="header-img"
                                src={lockImg}
                                alt=""
                            />
                        </WhiteBox>
                        
                    </li>
                    <li onClick={()=>{setVisibilityExitPopup("visible");onExitClick()}}>Выйти</li>
                </ul>
            </Header>
            <div className="main-main">
                <div className="main-main__container">
                    <h1>Расчетный листок</h1>
                    <Tables articles={articles}
                        otherData={otherData}
                    />
                </div>
            </div>
            <PrintFrame 
                LoadClick={isLoadPrint}
                isLoaded={()=>setIsLoadPrint(false)}
            />
        </div>
    )
                            //
    async function GetData() {
        fetch('/api/data',
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
                sessionStorage.setItem("Name", data["Name"]);
                setArticles(data["Articles"])
                setOtherData([data["BeforeDolg"], data["AfterDolg"], data["TotalDohod"]])
                setRole(data["Role"])
            })
        }
}