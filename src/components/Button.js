import React from 'react';
import '../static/css/components/Button.css';

export default function Button({ text, size, type, onClick, customStyling }) {
    let className = `button-${size}`
    if (customStyling) {
        className = customStyling;
    }
    return (
        <button type={type} onClick={onClick} className={className}>{text}</button>
    )
}