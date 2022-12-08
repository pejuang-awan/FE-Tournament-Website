import React from 'react';
import '../static/css/components/Button.css';

export default function Button({ text, size, type, onClick }) {
    return (
        <button type={type} onClick={onClick} className={`button-${size}`}>{text}</button>
    )
}