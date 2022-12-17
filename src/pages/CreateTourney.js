import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../static/css/pages/CreateTourney.css';
import Button from '../components/Button';
import DateInput from '../components/DateInput';
import Input from "../components/Input";
import TextArea from '../components/TextArea';

export default function CreateTourney() {
    const [user, setUser] = useState({});
    const [inputs, setInputs] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const baseAuthURL = 'https://si-tourney-authentication-uuq75raixq-et.a.run.app';
    const navigate = useNavigate();
    
    useEffect(() => {
        if (sessionStorage.getItem('user_data') == null) {
            navigate('/');
        } else {
            setUser(JSON.parse(sessionStorage.getItem('user_data')));
        }
    }, []);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    };

    const create = async (event) => {
        console.log(inputs)
        event.preventDefault();
        await axios({
            method: 'post',
            headers: {
                'Authorization': "Bearer " + user.token
            },
            url: baseAuthURL + '/api/tourney-manager/tournament',
            data: {
                'name': inputs.name,
                'game': user.gameType,
                'description': inputs.description,
                'location': inputs.location,
                'startDate': startDate,
                'endDate': endDate,
                'prize': parseInt(inputs.prize),
                'contact': inputs.contact,
                'maxTeam': parseInt(inputs.maxTeam),
            },
        }).then((response) => {
            // TODO: Handle success
            console.log(response);
        }).catch((error) => {
            alert(error);
        });
    };

    return (
        <div className='main-container'>
            <div className='create-display-container'>
                <h1>Selamat Datang di SI Tourney</h1>
                <p>Portal game terbesar di kelas Komputasi Awan</p>
            </div>

            <div className='create-container'>
                <div className='auth-content'>
                    <form onSubmit={create}>
                        <Input 
                            type={'text'} 
                            placeholderText={'Nama Turnamen'} 
                            name={'name'} 
                            value={inputs.name || ''} 
                            onChange={handleInputChange} 
                        />
                        <Input 
                            type={'number'} 
                            placeholderText={'Jumlah Pendaftar Maksimal'} 
                            name={'maxTeam'} 
                            value={inputs.maxTeam || ''} 
                            onChange={handleInputChange}
                        />
                        <Input 
                            type={'number'} 
                            placeholderText={'Hadiah'} 
                            name={'prize'} 
                            value={inputs.prize || ''} 
                            onChange={handleInputChange}
                        />
                        <div className='create-date-container'>
                            <DateInput
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                            <div style={{width: '1em'}}></div>
                            <DateInput
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                            />
                        </div>
                        <TextArea
                            placeholderText={'Deskripsi Turnamen'}
                            name={'description'}
                            value={inputs.description || ''}
                            onChange={handleInputChange}
                        />
                        <Input 
                            type={'text'} 
                            placeholderText={'Lokasi'} 
                            name={'location'} 
                            value={inputs.location || ''} 
                            onChange={handleInputChange} 
                        />
                        <Input 
                            type={'text'} 
                            placeholderText={'Kontak'} 
                            name={'contact'} 
                            value={inputs.contact || ''} 
                            onChange={handleInputChange} 
                        />
                        <Button text={'Daftar'} type={'submit'} size={'small'} />
                    </form>
                </div>
            </div>
        </div>
    )
}
