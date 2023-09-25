import React, { Component } from 'react';
import "./ValidateCode.css"
import { ReactInputVerificationCode } from "../shared/TabelInput";
//import arrow from '../src/arrow-left.svg';
import { NextButton } from "../shared/NextButton";

export class ValidateCode extends Component {
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
    };

    render() {
        return (
            <div className="validation-code">
                <h1 className="validate-text">Введите табельный номер</h1>
                <ReactInputVerificationCode
                    onCompleted={(data) => this.setState({ buttoncode: data, displayButton: "visible" }) }
                    onChange={(data) => this.setState({ buttoncode: data, displayButton: "hidden" }) }
                    onEnterPressed={this.onButtonClick}
                />
                {!this.state.validateCode &&
                    <h2 className="wrong-code-text">Такого табельного кода не существует</h2>
                }
                <NextButton 
                    displayButton = {this.state.displayButton} 
                    onClick={ this.onButtonClick }
                />
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
        if (data !== false) {
            this.setState({ ValidateCode: true })
            sessionStorage.setItem("TabelCode", code);
            this.props.onValidateCode()
        }
        else {
            this.setState({ validateCode: false })
        }
    }
}