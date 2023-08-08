import React, { Component } from 'react';
import "./Home.css";
import { ReactInputVerificationCode } from "./props/Input";

export class Home extends Component {

    onInputChange = () => {
        window.location.assign('/phone');
    };

    render() {
        return (
            <div>
                <div class="popup">
                    <div class="popup__container">
                        <h1>Введите табельный номер</h1>
                        <ReactInputVerificationCode />
                        <button onClick={this.onInputChange} class="next-btn">Далее</button>
                    </div>
                </div>
            </div>
        )
    }
};