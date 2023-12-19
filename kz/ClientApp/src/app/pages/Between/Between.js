import React, { useState } from 'react';
import "./Between.css";
import infoImg from "../../assets/images/info.svg";
import betweenPrintImg from "../../assets/images/betweenPrint.svg";

function onExitClick() {
    sessionStorage.setItem("TabelCode", "");
    sessionStorage.setItem("APIkey", "");
    window.location.assign('/');
};

export function Between() {
    const [isPrintLoading, setIsPrintLoading] = useState(false);
    return (
        <div className='wrapper'>
            <div className="main-header bxsdw-none">
                <div className="main-header__container">
                    <ul className="main-header_menu btw-right16">
                        <li onClick={onExitClick}>Выйти</li>
                    </ul>
                </div>
            </div>
            <div className="btw-main">
                <div className="btw-main__container">
                    <div class="showprint-buttons">
                        <button className="show-button" onClick={()=> {
                            window.location.assign('/main');
                        }}>
                            <img src={infoImg } alt="Информация" />Показать
                        </button>
                        <button className="print-button" onClick={()=> {
                            setIsPrintLoading(!isPrintLoading)
                        }}>
                            { isPrintLoading? 
                                <><div className="btw-loader"></div>Загрузка</> :
                                <><img src={betweenPrintImg} alt="Печать" />Печать</>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}