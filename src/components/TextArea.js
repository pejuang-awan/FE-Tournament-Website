import React from 'react';
import '../static/css/components/TextArea.css';

export default function TextArea({ label, placeholderText, name, value, onChange }) {
    return (
        <div className='textarea-container'>
            <label>{label}</label>
            <textarea placeholder={placeholderText} name={name} value={value} onChange={onChange} />
        </div>
    )
}
