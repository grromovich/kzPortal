import React, { useState, useRef } from 'react';
import "./UserFromAdminTable.css";
import arrowImg from '../assets/images/arrow-right.svg';
import infoImg from '../assets/images/tableElementInfo.svg';
import lockImg from '../assets/images/lock.svg';
import okImg from '../assets/images/ok.svg';

export function User({onClickInfo, name, tab, number}) {

    function handlePasswordPopup() {
        setIsPasswordOpen(true);
        setTimeout(()=>{inputFocus.current.focus();},50)
    }

    const [isPasswordOpen, setIsPasswordOpen] = useState(false)
    const inputFocus = useRef();
    
    return (
       <tr className="admin-table-element" key={Number(tab[0]+tab[1]+tab[2]+tab[4]+tab[5]+tab[6])}>
            <td>{name}</td>
            <td>{tab}</td>
            <td>{number}</td>
            <td className="admin-table-element-images">
                <div className="img-group">
                    <img src={infoImg} alt=""/>
                    <div className="admin-white-box" onClick={()=>onClickInfo(tab)}></div>
                </div>
                <div className="img-group">
                    <img src={lockImg} alt="" />
                    <div className="admin-white-box" onClick={handlePasswordPopup}></div>
                </div>
            </td>
            <div className="admin-password-popup" style={{display: isPasswordOpen ? "flex" : "none"}}>
                <div className="img-group admin-user-arrow">
                    <img src={arrowImg} alt="" />
                    <div className="admin-white-box" onClick={()=>{setIsPasswordOpen(false);inputFocus.current.value=""}} ></div>
                </div>
                <input placeholder="Пароль" ref={inputFocus}/>
                <button onClick={()=>{setIsPasswordOpen(false)}}>
                    <div className="img-group">
                        <img src={okImg} alt="" />
                        <div className="admin-white-box"></div>
                    </div>
                </button>
            </div>
       </tr>
    );
}
 