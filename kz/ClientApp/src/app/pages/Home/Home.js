import React, { Component } from 'react';
import "./Home.css";
import { NextButton } from "../../shared/NextButton";
import { PopupInput } from "../../shared/PopupInput";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabelcode: "",
            password: "",
            displayButton: "hidden",
            validation: true,
            numbertryies: null,
            dateban: null,
        };

    }

    /*useEffect(() => {
        this.setState({displayButton: this.displayButton()});
    }, []);*/

    onButtonClick = () => {
        this.ValidateTabelCode(this.state.tabelcode, this.state.password)
    };

    displayButton() {
        if(this.state.tabelcode.length >= 6 && this.state.password.length >= 6) {
            return "visible";
        }
        else {
            return "hidden";
        }
    }

    render() {
        return (
                <div className="popup">
                    <div className="popup__container">
                    <h1 className="validate-text">Вход</h1>
                    <PopupInput
                        onChange={(data) => this.setState({ tabelcode: data})}
                        type={"number"}
                        placeholder="Табельный код"
                    />
                    <PopupInput
                        onChange={(data) => { this.setState({ password: data})}}
                        onEnterPressed={this.onButtonClick}
                        type={"password"}
                        placeholder="Пароль"
                    />
                    {this.state.numbertryies &&
                        <h2 className="wrong-code-text">Попыток для входа осталось: {this.state.numbertryies}</h2>
                    }
                    {this.state.dateban &&
                        <h2 className="wrong-code-text">Попробуйте через {this.state.dateban} минут</h2>
                    }
                    <NextButton 
                        displayButton = {() => this.state.displayButton} 
                        onClick={ this.onButtonClick }
                    />
                    </div>
                </div>
        )
    }

    async ValidateTabelCode(code, password) {
        fetch('login',
            {
                method: "POST",
                //withCrefentials: true,
                crossorigin: true,
                mode: "no-cors",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    TabelCode: code,
                    Password: password,
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data !== false) {
                    if (data['APIkey'] != null) {
                        sessionStorage.setItem("APIkey", data);
                        sessionStorage.setItem("TabelCode", code);
                        window.location.assign('/main');
                    }
                    else if (data['NumberBadLogins'] != null) {
                        this.setState({
                            numbertryies: data['NumberBadLogins'],
                            dateban: null,
                        })
                    }
                    else if (data['DateBan'] != null) {
                        this.setState({
                            dateban: data['DateBan'],
                            numbertryies: null,
                        })
                    }
                    
                }
                else {
                    this.setState({ Validation: false })
                }
            })
    }
};