import React, { useState } from 'react';
import Dropdown from './Dropdown';
import '../static/css/components/Navbar.css';

export default function MenuItems ({ items }) {
    const [dropdown, setDropdown] = useState(false);
    return (
        <li className='menu-items'>
            {items.submenu ? (
                <React.Fragment>
                    <div className='menu-item-dropdownable'>
                        <a onClick={() => setDropdown((prev) => !prev)}>
                            {items.title}
                            <img className='dropdown-icon' src={require('../static/img/chevron-bottom.png')}></img>
                        </a>
                        <Dropdown submenus={items.submenu} dropdown={dropdown} />
                    </div>
                    
                </React.Fragment>
            ) : (
                <a href={items.url} >{items.title}</a>
            )}
        </li>
    );
};