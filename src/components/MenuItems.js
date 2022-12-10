import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import '../static/css/components/Navbar.css';

export default function MenuItems ({ items }) {
    const [dropdown, setDropdown] = useState(false);

    return (
        <li className='menu-items'>
            {items.submenu ? (
                <React.Fragment>
                    <div className='menu-item-dropdownable'>
                        <button onClick={() => setDropdown((prev) => !prev)} className={`dropdown-btn ${dropdown ? "active" : "" }`}>
                            {items.title}
                            {dropdown ? (
                                <img className='dropdown-icon' src={require('../static/img/chevron-upper.png')}></img>
                            ) : (
                                <img className='dropdown-icon' src={require('../static/img/chevron-bottom.png')}></img>
                            )}
                            
                        </button>
                        <Dropdown submenus={items.submenu} dropdown={dropdown} />
                    </div>
                    
                </React.Fragment>
            ) : (
                <Link to={items.url}>{items.title}</Link>
            )}
        </li>
    );
};