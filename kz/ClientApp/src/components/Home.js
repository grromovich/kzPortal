import React, { Component } from 'react';
import "./Home.css";
import { ReactInputVerificationCode } from "./props/Input";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttoncode: "",
            validateCode: true,
            displayButton: 'hidden'
        };
    }

    onButtonClick = () => {
        this.ValidateTabelCode(this.state.buttoncode)
        //
    };

    render() {
        return (
            <div>
                <div class="popup">
                    <div class="popup__container">
                        <h1>Введите табельный номер</h1>
                        <ReactInputVerificationCode
                            onCompleted={(data) => { this.setState({ buttoncode: data, displayButton: "visible" }) }}
                            onChange={(data) => { this.setState({ buttoncode: data, displayButton: "hidden" }) }}
                        />
                        {!this.state.validateCode &&
                            <h2 class="wrong-code-text">Такого табельного кода не существует</h2>
                        }
                        <button style={{ visibility: this.state.displayButton }} onClick={this.onButtonClick} class="next-btn">Далее</button>
                    </div>
                </div>
            </div>
        )
    }

    async ValidateTabelCode(code) {
        let response = await fetch('personcode',
            {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    TabelCode: code,
                })
            });
        let data = await response.json();
        console.log(data)
        if (data !== false) {
            this.setState({ ValidateCode: true })
            sessionStorage.setItem("TabelCode", code);
            sessionStorage.setItem("PhoneNumber", data);
            window.location.assign('/phone');
        }
        else {
            this.setState({ validateCode: false })
        }
    }
};