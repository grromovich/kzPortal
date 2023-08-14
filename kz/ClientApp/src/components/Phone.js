import React, { Component } from 'react';
import "./Home.css";
import { ReactInputVerificationCode } from "./props/Input";

export class Phone extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            phoneCode: "",
            validateCode: true,
            displayButton: 'hidden',
            tabelCode: sessionStorage.getItem("TabelCode"),
            phoneNumber: sessionStorage.getItem("PhoneNumber"),
        };
    }

    onButtonClick = () => {
        this.ValidatePhoneCode(this.state.phoneCode, this.state.tabelCode)
    };

    render() {
        return (
            <div>
                <div class="popup">
                    <div class="popup__container">
                        <h1 class="phone-text">
                            Введите 6-ти значный код, который был отправлен на ваш телефон: 8 ***-***-**-{this.state.phoneNumber}
                        </h1>
                        <ReactInputVerificationCode
                            onCompleted={(data) => { this.setState({ phoneCode: data, displayButton: "visible" }) }}
                            onChange={(data) => { this.setState({ phoneCode: data, displayButton: "hidden" }) }}
                        />
                        {!this.state.validateCode &&
                            <h2 class="wrong-code-text">Неправильный код!</h2>
                        }
                        <button style={{ visibility: this.state.displayButton }} onClick={this.onButtonClick} class="next-btn">Далее</button>
                    </div>
                </div>
            </div>
        )
    }

    async ValidatePhoneCode(phone, tabel) {
        console.log(tabel, phone)
        let response = await fetch('phonecode',
            {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    TabelCode: tabel,
                    PhoneCode: phone,
                })
            });
        let token = await response.json();
        console.log(token)
        if (token !== false) {
            this.setState({ ValidateCode: true })
            sessionStorage.setItem("LogInToken", token);
            window.location.assign('/portal');
        }
        else {
            this.setState({ validateCode: false })
        }
    }
};