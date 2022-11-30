import '../static/css/components/Navbar.css';

export default function Dropdown ({ submenus, dropdown }) {
    return (
        <ul className={`dropdown ${dropdown ? "show" : "" }`}>
            {submenus.map((submenu, index) => (
                <li key={index} className="menu-items">
                    <a href={submenu.url}>{submenu.title}</a>
                </li>
            ))}
        </ul>
    );
};
