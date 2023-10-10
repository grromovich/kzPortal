import React, { Component } from 'react';
import "./PopupInput.css"
import eyeImg from "../src/eye.svg";
import krestEyeKrest from "../src/kresteye.svg";

export class PopupInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            begintype: this.props.type,
            type: this.props.type,
            passwordImg: eyeImg,
        };
    }

    onChange(value) {
        this.setState({inputValue: value})
        this.props.onChange(value);
    }

    onEnterPressed(event) {
        if(event.key === "Enter" && this.state.inputValue.length >= 6){
            event.preventDefault();
            this.props.onEnterPressed();
        }
    }

    showHide(t) {
        if (t.state.type === "password") {
            t.setState({
                type: "text",
                passwordImg: krestEyeKrest
            });
        }
        else {
            t.setState({
                type: "password",
                passwordImg: eyeImg
            });
        }
    }

    render() { 
        return (
            <div className="password__container">
                <input 
                    autoFocus = { true }
                    autoComplete='one-time-code'
                    value = {this.state.inputValue}
                    onChange={(e) =>  this.onChange(e.target.value)}
                    onKeyDown={(e) => this.onEnterPressed(e)}
                    placeholder={this.props.placeholder}
                    type={this.state.type}
                    className="password-input"
                />
                {this.state.begintype === "password" &&
                    <img
                    src={this.state.passwordImg} alt=""
                    className="eye-password"
                    onClick={() => { this.showHide(this) } }
                    />
                }
            </div>
        );
    }
}
