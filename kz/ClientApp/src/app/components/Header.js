import React from 'react';
import "./Header.css";

export function Header({children}) {

    return (
        <div className="main-header">
            <div className="main-header__container">
                {children}
            </div>
        </div>
    );
}
 