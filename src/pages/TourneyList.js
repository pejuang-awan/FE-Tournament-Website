import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/pages/TourneyList.css';
import Navbar from '../components/Navbar';
import TourneyCard from '../components/TourneyCard';
import dayCalculator from '../helper/dayCalculator';
import axios from 'axios';

export default function TourneyList() {

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [tournamentList, setTournamentList] = useState([]);
    const [imgBanner, setImgBanner] = useState('');
    const [imgType, setImgType] = useState(1);
    const [isfetched, setIsfetched] = useState(false);

    const logOut = () => {
        sessionStorage.removeItem('user_data');
        navigate('/');
    };

    const truncate = (str, n) => {
        return (str.length > n) ? str.substr(0, n - 1) + '..' : str;
    }

    const fetchTournamentListData = async () => {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_BE_BASE_URL}` + 'tourney-manager/tournaments/' + user.gameType,
            headers: {
                'Authorization': "Bearer " + user.token
            }
        })
            .then((response) => {
                const tournamentData = response.data.data;
                setTournamentList(tournamentData);
            }).catch((error) => {
                console.log(error);
            })
    }

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

        if (!isfetched && user.token !== undefined){
            fetchTournamentListData();
            setImgType(user.gameType);
            setIsfetched(true);
        }
    }, [user])

    return (
        <div>
            <Navbar logOut={logOut} />
            <div className='header-container'>
                <div
                className='banner'
                style={{backgroundImage: `url(${require("../static/img/game/tourneybanner" + imgType + '.jpg')})`}}
                />
                    <h1 className='game-name'>
                        <span>
                            {(() => {
                                switch (user.gameType) {
                                    case 1: return "Mobile Legends: Bang Bang";
                                    case 2: return "Dota 2";
                                    case 3: return "LOL: Wild Rift";
                                }
                            })()}
                        </span>
                    </h1>
                </div>
            <div className='body-container'>
                {(() => {
                    if (tournamentList){
                        const content = tournamentList.map((tournament) =>
                            <div key={tournament.ID} onClick={() =>navigate("detail\\" + tournament.ID)}>
                                <TourneyCard 
                                    name={truncate(tournament.name, 20)} 
                                    description={tournament.description}
                                    gameId={user.gameType}
                                    participants={tournament.registeredTeam}
                                    quota={tournament.maxTeam}
                                    deadline={dayCalculator(tournament.endDate)} 
                                ></TourneyCard>
                            </div>
                        ) 
                        return (
                            <>
                                {content}
                            </>
                        )
                    }
                })()}
            </div>
        </div>
    )
}