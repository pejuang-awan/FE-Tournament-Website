import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../static/css/pages/RegisterTourney.css';
import Button from '../components/Button';
import Input from "../components/Input";
import Navbar from "../components/Navbar";

export default function RegisterTourney() {
    const [user, setUser] = useState({});
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        if (sessionStorage.getItem('user_data') == null) {
            navigate('/');
        } else {
            setUser(JSON.parse(sessionStorage.getItem('user_data')));
        }
    }, []);

    const registerTourney = async (event) => {
        event.preventDefault();
        if (inputs.teamName === undefined || inputs.memberOne === undefined || 
            inputs.memberTwo === undefined || inputs.memberThree === undefined  || 
            inputs.memberFour === undefined || isEmptyInput()) {
                return alert('Lengkapi nama dan keanggotaan tim Anda.');
        } else {
            const data = { 
                teamName: inputs.teamName,
                members: [inputs.memberOne, inputs.memberTwo, inputs.memberThree, inputs.memberFour],
                tournamentId: parseInt(window.location.pathname.split('/')[3]),
            };
            await axios({
                method: 'post',
                headers: {
                    'Authorization': "Bearer " + user.token,
                },
                url: `${process.env.REACT_APP_BE_BASE_URL}` + 'tourney-registry/join',
                data: data,
            }).then((response) => {
                navigate('/tournament/detail/' + response.data['data']['tournamentId']);
            }).catch((error) => {
                alert(error);
            });
        }
    }

    const isEmptyInput = () => {
        for (const input in inputs) {
            if (!inputs[input].trim()) return true;
        }
        return false;
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    };

    return (
        <div className='tourney-register-main-container'>
            <Navbar isCreator={user.role === 2} username={user.username || 'tamu'}/>
            <div className='tourney-register-content'>
                <div className='tourney-register-form-container'>
                    <h1>Daftarkan Tim-mu!</h1>
                    <form onSubmit={registerTourney} className='tourney-register-form'>
                        <Input
                            type={'text'}
                            label={'Nama Tim'}
                            placeholderText={'Nama Tim Anda'} 
                            name={'teamName'} 
                            value={inputs.teamName || ''} 
                            onChange={handleInputChange}
                            customStyling={''}
                        />
                        <Input
                            type={'text'}
                            label={'Kapten (Anda)'}
                            placeholderText={'Nama'} 
                            name={'captainId'} 
                            value={user.username} 
                            onChange={handleInputChange}
                            customStyling={''}
                            disabled={true}
                        />
                        <Input
                            type={'text'}
                            label={'Anggota Tim'}
                            placeholderText={'Nama Anggota 1'} 
                            name={'memberOne'} 
                            value={inputs.memberOne || ''} 
                            onChange={handleInputChange}
                            customStyling={''}
                        />
                        <Input
                            type={'text'}
                            placeholderText={'Nama Anggota 2'} 
                            name={'memberTwo'} 
                            value={inputs.memberTwo || ''} 
                            onChange={handleInputChange}
                            customStyling={''}
                        />
                        <Input
                            type={'text'}
                            placeholderText={'Nama Anggota 3'} 
                            name={'memberThree'} 
                            value={inputs.memberThree || ''} 
                            onChange={handleInputChange}
                            customStyling={''}
                        />
                        <Input
                            type={'text'}
                            placeholderText={'Nama Anggota 4'} 
                            name={'memberFour'} 
                            value={inputs.memberFour || ''} 
                            onChange={handleInputChange}
                            customStyling={''}
                        />
                        <Button 
                            text={'Daftar'} 
                            type={'submit'} 
                            size={'small'}
                            customStyling={''}
                        />
                    </form>
                </div>
                <div className='tourney-register-intro-container'>
                    <h1>Daftar Tourney</h1>
                </div>
            </div>
        </div>
    )
}
