import React from 'react';
import '../static/css/components/TextArea.css';

export default function TextArea({ label, placeholderText }) {
    return (
        <div className='textarea-container'>
            <label>{label}</label>
            <textarea></textarea>
        </div>
    )
}
