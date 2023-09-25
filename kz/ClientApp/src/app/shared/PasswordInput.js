import React, { Component } from 'react';
import "./PasswordInput.css"

export class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
        };
    }
    onChange(value) {
        this.setState({inputValue: value})
        if(value.length >= 6){
            this.props.onCompleted(value);
        }
        else {
            this.props.onChange(value);
        }
    }

    onEnterPressed(event) {
        if(event.key === "Enter" && this.state.inputValue.length >= 6){
            event.preventDefault();
            this.props.onEnterPressed();
        }
    }

    render() { 
        return (
            <input 
                autoFocus = { true }
                autoComplete='one-time-code'
                value = {this.state.inputValue}
                onChange={(e) =>  this.onChange(e.target.value)}
                onKeyDown={(e) => this.onEnterPressed(e)}
                type="password"
                className="password-input"
            /> 
        );
    }
}
