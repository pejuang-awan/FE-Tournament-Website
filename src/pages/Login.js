import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../static/css/pages/Login.css';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Login() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const baseAuthURL = 'https://si-tourney-authentication-uuq75raixq-et.a.run.app';

    useEffect(() => {
        if (sessionStorage.getItem('user_data') !== null) {
            navigate('/home');
        }
    }, []);

    const clearForm = () => {
        setInputs('');
    };

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    };

    const validateInput = () => {
        if (inputs.username === undefined || inputs.password === undefined) {
            return false;
        } else {
            return true;
        }
    };

    const signIn = async (event) => {
        event.preventDefault();

        if (validateInput()) {
            await axios({
                method: 'post',
                url: baseAuthURL + '/api/auth/sign-in',
                data: {
                    'username': inputs.username,
                    'password': inputs.password,
                },
            }).then((response) => {
                sessionStorage.setItem('user_data', JSON.stringify(response.data.data));
                navigate('/home');
            }).catch((error) => {
                alert(error);
                clearForm();
            });
        } else {
            alert('Mohon isi semua form');
        }
    };

    return (
        <div className='main-container'>
            <div className='intro-container'>
                <div className='intro-text'>
                    <h1>Selamat Datang di SI Tourney</h1>
                    <p>Portal turnamen game terbesar di kelas Komputasi Awan</p>
                </div>
                <div className='intro-image'>
                    <img src={require('../static/img/Winners-rafiki.png')}></img>
                </div>
            </div>

            <div className='auth-container'>
                <div className='auth-content'>
                    <form onSubmit={signIn} className='auth-form'>
                        <Input
                            type={'text'} 
                            placeholderText={'Username'} 
                            name={'username'} 
                            value={inputs.username || ''} 
                            onChange={handleInputChange}
                            customStyling={'uname-input'}
                        />
                        <Input
                            type={'password'} 
                            placeholderText={'Password'} 
                            name={'password'} 
                            value={inputs.password || ''} 
                            onChange={handleInputChange}
                            customStyling={'pwd-input'}
                        />
                        <Button 
                            text={'Masuk'} 
                            type={'submit'} 
                            size={'small'}
                            customStyling={'login-btn'}
                        />
                    </form>
                    <p>Atau daftarkan akun Anda di <Link to={'/register'}>sini</Link></p>
                </div>
            </div>
        </div>
    )
}
