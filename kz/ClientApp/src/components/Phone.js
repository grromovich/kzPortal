import React, { Component } from 'react';
import "./Phone.css";
import { ReactInputVerificationCode } from "./props/Input";

export class Phone extends Component {

    onInputChange = () => {
        window.location.assign('/portal');
    };

    render() {
        return (
            <div>
                <div class="popup">
                    <div class="popup__container">
                        <h1>Введите 6-ти значный код, который был отправлен на ваш телефон: 8 ***-***-**-36</h1>
                        <ReactInputVerificationCode />
                        <button onClick={this.onInputChange} class="next-btn">Далее</button>
                    </div>
                </div>
            </div>
        )
    }
};