import React from 'react';
import '../static/css/components/Navbar.css';
import MenuItems from './MenuItems';

// Template menuItems with dropdown (submenu) for navbar
const menuItems = [
    {
        title: 'Home',
        url: '/home',
    },
    {
        title: 'Turnamen',
        url: '/turnamen',
        submenu: [
            {
                title: 'Buat Turnamen',
                url: 'buat',
            },
            {
                title: 'Lihat Turnamen',
                url: 'daftar',
            },
        ],
    },
  
];

// TODO: Hardcoded navbar menu, adjust it according to the menuItems template
export default function Navbar({ menus }) {
    return (
        <div className='navbar-container'>
            <div className='navbar-brand-container'>
                <p>SI-TOURNEY</p>
            </div>
            <div className='navbar-menus-container'>
                <ul className='navbar-menus-list'>
                    {menuItems.map((menu, idx) => <MenuItems items={menu} key={idx} />)}
                </ul>
            </div>
            <div className='navbar-user-container'>
                <div className='navbar-user-content'>
                    <p>Halo, username</p>
                    <div className='navbar-user-logout'>
                        <img src={require('../static/img/logout.png')} />
                    </div>
                </div>
            </div>
        </div>
    )
}
