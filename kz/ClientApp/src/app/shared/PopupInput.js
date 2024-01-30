import React, { Component } from 'react';
import "./PopupInput.css"
import eyeImg from "../assets/images/eye.png";
import krestEyeImg from "../assets/images/kresteye.png";

export class PopupInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            begintype: this.props.type,
            type: this.props.type,
            displayEye: "visible",
            displayEyeKrest: "hidden",
            paddingLeft: this.props.ico ? "30px" : "15px",
            displayLeftImg: this.props.displayLeftImg
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

                    style={{paddingLeft: this.state.paddingLeft}}
                    autoFocus={this.props.autoFocus}
                    autoComplete='off'
                    value={this.props.text}
                    onChange={(e) => this.onChange(e.target.value)}
                    pattern={this.state.type === "text" ? "/\d*" : ""} /* eslint-disable-line */
                    placeholder={this.props.placeholder}
                    type={this.state.type}
                    className="password-input"
                    maxLength={this.props.maxlength}
                    ref={this.props.myref}
                />
                {this.props.ico && 
                    <>
                    {this.state.begintype !== "password" &&
                        <img
                            src={this.props.ico}
                            alt=""
                            className="start-img user-ico"
                        />
                    }
                    {this.state.begintype === "password" &&
                        <img
                            src={this.props.ico}
                            alt=""
                            className="start-img password-ico"
                        />}
                    </>
                }
                
                {(this.state.begintype === "password") &&
                    <ul>
                        <li>
                            <img
                                src={eyeImg} alt=""
                                className="eye-password"
                                onClick={() => { this.showHide(this) } }
                                style={{visibility: this.state.displayEye,
                                        display: this.props.displayLeftImg ? "block" : "none"}}
                                
                            />
                        </li>
                        <li>
                            <img
                                src={krestEyeImg} alt=""
                                className="eye-password"
                                onClick={() => { this.showHide(this) } }
                                style={{visibility: this.state.displayEyeKrest,
                                    display: this.props.displayLeftImg ? "block" : "none"}}
                            />
                        </li>
                    </ul>
                }
            </div>
        );
    }
}
