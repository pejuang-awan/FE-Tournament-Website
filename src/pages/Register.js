import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../static/css/pages/Register.css';
import Input from "../components/Input";
import Select from '../components/Select';
import Button from '../components/Button';

export default function Register() {
    const [inputs, setInputs] = useState({});
    const [selects, setSelects] = useState({});
    const navigate = useNavigate();
    const roles = ['Pendaftar', 'Kreator'];
    const games = ['Mobile Legends: Bang Bang', 'Dota 2', 'League of Legends: Wild Rift'];
    const baseAuthURL = 'https://si-tourney-authentication-uuq75raixq-et.a.run.app';

    useEffect(() => {
        if (sessionStorage.getItem('user_data') !== null) {
            navigate('/home');
        }
    }, []);

    const clearForm = () => {
        setInputs('');
        setSelects('');
    };

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    };

    const handleSelectChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSelects(selects => ({...selects, [name]:value}))
    };

    const signUp = async (event) => {
        event.preventDefault();
        await axios({
            method: 'post',
            url: baseAuthURL + '/api/auth/sign-up',
            data: {
                'username': inputs.username,
                'password': inputs.password,
                'role': parseInt(selects.role),
                'gameType': parseInt(selects.game),
            },
        }).then((response) => {
            sessionStorage.setItem('user_data', JSON.stringify(response.data.data));
            navigate('/home');
        }).catch((error) => {
            alert(error);
            clearForm();
        });
    };

    return (
        <div className='main-container'>
            <div className='intro-container'>
                <h1>Selamat Datang di SI Tourney</h1>
                <p>Portal game terbesar di kelas Komputasi Awan</p>
            </div>

            <div className='auth-container'>
                <div className='auth-content'>
                    <form onSubmit={signUp}>
                        <Input 
                            type={'text'} 
                            placeholderText={'Username'} 
                            name={'username'} 
                            value={inputs.username || ''} 
                            onChange={handleInputChange} 
                        />
                        <Input 
                            type={'password'} 
                            placeholderText={'Password'} 
                            name={'password'} 
                            value={inputs.password || ''} 
                            onChange={handleInputChange}
                        />
                        <Select 
                            items={roles} 
                            placeholderText={'Role'} 
                            name={'role'}
                            value={selects.role || ''} 
                            onChange={handleSelectChange}
                        />
                        <Select 
                            items={games} 
                            placeholderText={'Pilihan Game'}
                            name={'game'}
                            value={selects.game || ''} 
                            onChange={handleSelectChange}
                        />
                        <Button text={'Daftar'} type={'submit'} size={'small'} />
                    </form>
                    <p>Atau masuk dengan akun Anda di <Link to={'/login'}>sini</Link></p>
                </div>
            </div>
        </div>
    )
}
