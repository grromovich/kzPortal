import React, { Component } from 'react';
import "./PopupInput.css"
import eyeImg from "../assets/images/eye.png";
import krestEyeImg from "../assets/images/kresteye.png";
import userImg from "../assets/images/user.svg";
import passwordImg from "../assets/images/password.svg";

export class PopupInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            begintype: this.props.type,
            type: this.props.type,
            displayEye: "visible",
            displayEyeKrest: "hidden",
        };
    }

    onChange(value) {
        this.setState({inputValue: value})
        this.props.onChange(value);
    }

    showHide(t) {
        if (t.state.type === "password") {
            t.setState({
                type: "text",
                displayEye: "hidden",
                displayEyeKrest: "visible"
            });
        }
        else {
            t.setState({
                type: "password",
                displayEye: "visible",
                displayEyeKrest: "hidden"
            });
        }
    }

    render() { 
        return (
            <div className="popup-input__container">
                <input 
                    autoFocus = { this.props.autoFocus }
                    autoComplete='one-time-code'
                    value={this.props.text}
                    onChange={(e) => this.onChange(e.target.value)}
                    pattern={this.state.type === "text" && "/\d*"} 
                    placeholder={this.props.placeholder}
                    type={this.state.type}
                    className="password-input"
                    maxlength="16"
                />
                {this.state.begintype !== "password" &&
                <img 
                    src={userImg} 
                    alt=""
                    className="start-img user-ico"
                />}
                {this.state.begintype === "password" &&
                <img 
                    src={passwordImg} 
                    alt=""
                    className="start-img password-ico"
                />}
                {this.state.begintype === "password" &&
                    <ul>
                        <li>
                            <img
                                src={eyeImg} alt=""
                                className="eye-password"
                                onClick={() => { this.showHide(this) } }
                                style={{visibility: this.state.displayEye}}
                            />
                        </li>
                        <li>
                            <img
                                src={krestEyeImg} alt=""
                                className="eye-password"
                                onClick={() => { this.showHide(this) } }
                                style={{visibility: this.state.displayEyeKrest}}
                            />
                        </li>
                    </ul>
                }
            </div>
        );
    }
}
