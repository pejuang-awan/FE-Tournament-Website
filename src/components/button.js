import React from 'react';
import '../static/css/components/Button.css';

export default function Button({ text, func }) {
    return (
        <div className='button-container' onClick={func}>
            <p className='button-text'>{text}</p>
        </div>
    )
}