import React from 'react';
import "./ExitPopup.css";

export function ExitPopup({ visibilityExitPopup, onClose }) {
    function onExitClick() {
        sessionStorage.setItem("TabelCode", "");
        sessionStorage.setItem("APIkey", "");
        window.location.assign('/');
    };
    return (
        <div className="overlay" style={{ visibility: visibilityExitPopup }}>
                <div className="exit-popup" style={{visibility: visibilityExitPopup}}>
                    <div className="exit-popup__container">
                        <h1>Выход</h1>
                        <p>Вы действительно хотите выйти?</p>
                        <div className="exit-popup-buttons">
                            <button onClick={onExitClick}>Выйти</button>
                            <button onClick={()=>{onClose("hidden")}}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}
 