import React from 'react';
import '../static/css/components/Select.css';

export default function Select({ label, placeholderText, items }) {
    return (
        <div className='select-container'>
            <label>{label}</label>
            <select placeholder={placeholderText}>
            { items.map((item, idx) => <option value={item}>{item}</option>) }
            </select>
        </div>
    )
}
