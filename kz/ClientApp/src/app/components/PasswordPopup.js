import React, { Component } from 'react';
import "./PasswordPopup.css";
import krestImg from '../assets/images/krest.svg';

export class PasswordPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        return ( 
            <div className="password-popup" style={{ visibility: this.props.visibilityPasswordPopup}}>
                <img className="krest" 
                     src={krestImg} alt="" 
                     onClick={() => {this.props.onClose()}}
                />
                <div className="password-popup__container">
                    <h1>Изменение пароля</h1>
                    <p>Текущий пароль <input type="password" /></p>
                    <div className="buttons">
                        <button>не работает</button>
                        <button>Отмена</button>
                    </div>
                    
                </div>
            </div>
         );
    }
}
 