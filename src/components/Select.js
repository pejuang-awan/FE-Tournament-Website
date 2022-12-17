import React from 'react';
import '../static/css/components/Select.css';

export default function Select({ label, placeholderText, items, name, value, onChange }) {
    return (
        <div className='select-container'>
            <label>{label}</label>
            <select name={name} value={value} onChange={onChange}>
                <option value={''} disabled={true} selected={true} hidden={true}>{placeholderText}</option>
                { items.map((item, idx) => <option value={idx + 1}>{item}</option>) }
            </select>
        </div>
    )
}
