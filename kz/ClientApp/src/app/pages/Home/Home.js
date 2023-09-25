import React, { Component } from 'react';
import "./Home.css";
import { ValidateCode } from "../../components/ValidateCode";
import { ValidatePassword } from "../../components/ValidatePassword";

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableCodeValidated: false,
        };
    }
    render() {
        return (
            <div>
                <div className="popup">
                    <div className="popup__container">
                        {!this.state.TableCodeValidated && 
                            <ValidateCode onValidateCode={() => {this.setState({TableCodeValidated: true})}}/>
                        }  
                        {this.state.TableCodeValidated && 
                            <ValidatePassword 
                                onValidatePassword={() => {window.location.assign('/main')}}
                                onArrowClick={() => {this.setState({TableCodeValidated: false})}}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
};