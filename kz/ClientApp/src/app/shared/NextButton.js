import React, { Component } from 'react';
import "./NextButton.css"

export class NextButton extends Component {
    render() { 
        return (  
        <div>
            <button 
                style={{ visibility: this.props.displayButton}}
                onClick={ this.props.onClick }
                className="next-btn">
                    {   this.props.isLoading ?
                        <span className="loader"></span> :
                        'Далее'
                    }
            </button>
        </div>
        );
    }
}