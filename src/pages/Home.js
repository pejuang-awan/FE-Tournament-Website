import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"

export default function Home() {
    const [user, setUser] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (sessionStorage.getItem('user_data') === null) {
            navigate('/');
        } else {
            setUser(JSON.parse(sessionStorage.getItem('user_data')));
        }
    }, []);

    useEffect(() => {
        if (user.token === null) {
            navigate('/');
        }
        if (user.role === 2) {
            setIsCreator(true);
        }
    }, [user])

    const logOut = () => {
        sessionStorage.removeItem('user_data');
        navigate('/');
    };

    return (
        <div>
            <Navbar isCreator={isCreator} toggleLogout={logOut} username={user.username || 'tamu'}/>
            <p>Home page</p>
        </div>
    )
}
