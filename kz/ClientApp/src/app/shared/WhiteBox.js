import React from 'react';
import "./WhiteBox.css";

// Чтобы использовать этот кормпонент необходимо присваивать к родителю position: relative;

export function WhiteBox({children, onClick}) {
    return (
       <>
       <div className="white-box" onClick={onClick}></div>
       {children}
       </>
    );
}
 