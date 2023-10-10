import React, { Component } from 'react';
import "./Main.css";
import settingsImg from '../../src/settings.svg';
import exitImg from '../../src/exit.svg';
import krestImg from '../../src/krest.svg';
import { Tables } from "../../components/Tables";
import { PasswordPopup } from "../../components/PasswordPopup";

export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            articles: [],
            otherData: "",
            tabelCode: sessionStorage.getItem("TabelCode"),

            visibilitySettings: "hidden",
            visibilityPasswordPopup: "hidden",
        };
        
    }

    onExitClick = () => {
        sessionStorage.setItem("TabelCode", "");
        sessionStorage.setItem("APIkey", "");
        window.location.assign('/');
    };

    componentDidMount() {
        this.GetData(this.state.tabelCode)
    }
    render() {
        return (
            <div className="wrapper">
                <div className="settings" style={{ visibility: this.state.visibilitySettings}}>
                    <img className="krest" 
                        src={krestImg} alt="" 
                        onClick={() => this.setState({ visibilitySettings: "hidden" })}/>
                    <div className="settings__container">
                        <h1>Настройки</h1>
                        <button 
                            onClick={() => this.setState({ visibilityPasswordPopup: "visible" })} >
                                Сменить пароль
                        </button>
                    </div>
                </div>
                <PasswordPopup 
                    visibilityPasswordPopup={this.state.visibilityPasswordPopup}
                    onClose={()=> this.setState({visibilityPasswordPopup: "hidden"})}
                />
                <div className="header">
                    <div className="header__container">
                        <ul className="header_menu">
                            <li>{ this.state.name }</li>
                            <li>Таб. номер: {this.state.tabelCode}</li>
                            <li><img 
                                    className="img_settings" 
                                    src={settingsImg} 
                                    alt="" 
                                    onClick={() => this.setState({ visibilitySettings: "visible" })}/>
                            </li>
                            <li onClick={this.onExitClick} > <img className="img_exit" src={exitImg} alt="" /></li>
                        </ul>
                    </div>
                </div>
                <div className="main">
                    <div className="main__container">
                        <h1>Расчетный листок</h1>
                        <Tables articles={this.state.articles}
                                otherData={this.state.otherData}
                        />
                    </div>
                </div>
            </div>
        )
    }

    async GetData(tabel) {
        fetch('data',
            {
                method: "POST",
                //withCrefentials: true,
                crossorigin: true,
                mode: "no-cors",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    TabelCode: tabel,
                })
            })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ 
                    name: data["Name"], 
                    articles: data["Articles"],
                    otherData: [data["BeforeDolg"], data["AfterDolg"], data["TotalDohod"]]
                 })
            })
    }

};