import React from 'react';
import '../static/css/components/Button.css';
import stylemaker from '../helper/stylemaker';

export default function Button({ text, size, func }) {
    const buttonStyle = 'button-container' + stylemaker('button', {size});
    return (
        <div className={buttonStyle} onClick={func}>
            <p>{text}</p>
        </div>
    )
}