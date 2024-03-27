import React from 'react';
import "./HeaderUser.css";
import avatarImg from "../assets/images/avatar.svg";
import adminImg from "../assets/images/a.svg";
import { WhiteBox } from './WhiteBox';

export function HeaderUser({name, tabelCode, role, page}) {

    let img = avatarImg
    if(role === 1){
        img = adminImg
    }

    function amdinRedirect(){
        if(role === 1){
            window.location.assign(page)
        }
    }

    return (
       <div className='user-header'>
            <ul className="header-info-ul">
                <p className='header-name'>{name}</p>
                <p className='header-tabelcode'>{tabelCode}</p>
            </ul>
            <div className='header-circle'>
                <WhiteBox onClick={amdinRedirect}>
                    <img src={img} alt="" />
                </WhiteBox>
            </div>
       </div>
    );
}
 