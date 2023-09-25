import React, { Component } from 'react';
import { PasswordInput } from "../shared/PasswordInput";
import arrow from '../src/arrow-left.svg';
import { NextButton } from "../shared/NextButton";

export class ValidatePassword extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            password: "",
            validatePassword: true,
            displayButton: 'hidden'    
        };
    }

    onButtonClick = () => {
        this.ValidatePassword(this.state.phoneCode)
    };
    

    render() {
        return (
            <div className="validation-password">
                <img 
                    alt="" 
                    src={arrow} 
                    className="arrow-left"
                    onClick={this.props.onArrowClick}
                />
                <h1 className="validate-text">Введите пароль</h1>
                <PasswordInput
                    onCompleted={(data) => { this.setState({ password: data, displayButton: "visible" }) }}
                    onChange={(data) => { this.setState({ password: data, displayButton: "hidden" }) }}
                    onEnterPressed={this.onButtonClick}
                />
                {!this.state.validatePassword &&
                    <h2 className="wrong-code-text">Неправильный пароль!</h2>
                }
                <NextButton 
                    displayButton = {this.state.displayButton} 
                    onClick={ this.onButtonClick }
                />
            </div>
        )
    }
    async ValidatePassword(password) {
        let response = await fetch('password',
            {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    TabelCode: sessionStorage.getItem("TabelCode"),
                    Password: password,
                })
            });
        let token = await response.json();
        console.log(token)
        if (token !== false) {
            this.setState({ ValidatePassword: true })
            sessionStorage.setItem("APIkey", token);
            this.props.onValidatePassword()
        }
        else { 
            this.setState({ validatePassword: false })
        }
    }
}