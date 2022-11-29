import React from 'react';
import '../static/css/components/Input.css';

export default function Input({ label, placeholderText, type }) {
    return (
        <div className='input-container'>
            <label>{label}</label>
            <input type={type} placeholder={placeholderText}></input>
        </div>
    )
}
