import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../static/css/pages/CreateTourney.css';
import Button from '../components/Button';
import DateInput from '../components/DateInput';
import Input from "../components/Input";
import TextArea from '../components/TextArea';
import Navbar from "../components/Navbar";

export default function CreateTourney() {
    const [user, setUser] = useState({});
    const [inputs, setInputs] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const navigate = useNavigate();
    
    useEffect(() => {
        if (sessionStorage.getItem('user_data') == null) {
            navigate('/');
        } else {
            setUser(JSON.parse(sessionStorage.getItem('user_data')));
        }
    }, []);

    const clearForm = () => {
        setInputs('');
        setStartDate(new Date());
    };

    const validateInput = () => {
        if (inputs.name === undefined || inputs.description === undefined || inputs.location === undefined || inputs.prize === undefined || inputs.contact === undefined || inputs.maxTeam === undefined) {
            return false;
        } else {
            return true;
        }
    };

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    };

    const create = async (event) => {
        event.preventDefault();
        if (validateInput()){
            await axios({
                method: 'post',
                headers: {
                    'Authorization': "Bearer " + user.token
                },
                url: `${process.env.REACT_APP_BE_BASE_URL}` + 'tourney-manager/tournament',
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
                navigate('/tournament/detail/' + response.data['data']['ID']);
            }).catch((error) => {
                alert(error);
                clearForm();
            });
        } else {
            alert('Mohon isi semua form');
        }
    };

    return (
        <div className='create-main-container'>
            <Navbar isCreator={user.role === 2} username={user.username || 'tamu'}/>

            <div className='create-body-container'>
                <div className='create-display-container'>
                    <h1>Buat Turnamen</h1>
                    <p>Bangun Turnamen untuk Kompetisi Permainan Anda</p>
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
        </div>
    )
}
