import React from 'react';
import { Link } from 'react-router-dom';
import '../static/css/components/Navbar.css';
import MenuItems from './MenuItems';

// TODO: Try to use relative route for submenus
export default function Navbar({ isCreator, toggleLogout, username }) {
    const navbarItems = [
        {
            title: 'Home',
            url: '/home',
        },
        {
            title: 'Turnamen',
            url: '/tournament',
            submenu: (isCreator) ? 
                [
                    {
                        title: 'Buat Turnamen',
                        url: '/tournament/create',
                    },
                    {
                        title: 'Lihat Turnamen',
                        url: '/tournament/list',
                    },
                ] : [
                    {
                        title: 'Lihat Turnamen',
                        url: '/tournament/list',
                    },
                ]
        },
      
    ];
    
    return (
        <div className='navbar-container'>
            <div className='navbar-brand-container'>
                <p>SI-TOURNEY</p>
            </div>
            <div className='navbar-menus-container'>
                <ul className='navbar-menus-list'>
                    {navbarItems.map((menu, idx) => <MenuItems items={menu} key={idx} />)}
                </ul>
            </div>
            <div className='navbar-user-container'>
                <div className='navbar-user-content'>
                    <p>Halo, {username}</p>
                    <div className='navbar-user-logout'>
                        <Link to='/'><img onClick={toggleLogout} src={require('../static/img/logout.png')} /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
