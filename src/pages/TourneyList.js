import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/pages/TourneyList.css';
import Navbar from '../components/Navbar';
import TourneyCard from '../components/TourneyCard';
import { imgURL } from '../constant/imgURL';
import imgLink from '../helper/imgLink';
import dayCalculator from '../helper/dayCalculator';
import axios from 'axios';

export default function TourneyList() {

    const [user, setUser] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const navigate = useNavigate();
    const [tournamentList, setTournamentList] = useState([]);
    const [participantList, setParticipantList] = useState([]);
    const [imgBanner, setImgBanner] = useState('');
    const [imgCard, setImgCard] = useState('');
    const [isfetched, setIsfetched] = useState(false);

    const logOut = () => {
        sessionStorage.removeItem('user_data');
        navigate('/');
    };

    const getParticipantsNumber = (tourneyID) => {
        if (participantList[tourneyID]) {
            return participantList[tourneyID].length;
        } else {
            return 0;
        }
    }

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
                console.log(tournamentData);
                setTournamentList(tournamentData);

                const promises = [];

                tournamentData.forEach(tournament => {
                    promises.push(
                        axios(`${process.env.REACT_APP_BE_BASE_URL}` + 'tourney-registry/participants/' + tournament.ID,{ 
                            method:'get',
                            headers: {
                                'Authorization': "Bearer " + user.token
                            }
                        })
                    );
                });

                Promise.all(promises).then(results => {
                    const tempList = {};

                    results.forEach(result => {
                        const url = result.request.responseURL.toString().split('/');
                        const tourneyID = url[url.length-1]
                        if (result.data.data != null){
                            tempList[tourneyID] = result.data.data;
                        } else {
                            tempList[tourneyID] = [];
                        }
                    });

                    setParticipantList(tempList);

                });

            }).catch((error) => {
                console.log(error);
            })
    }

    const sayHello = () => {
        alert('Hello!');
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
        if (user.role === 2) {
            setIsCreator(true);
        }

        if (!isfetched && user.token !== undefined){
            fetchTournamentListData();
            setImgBanner(imgLink(imgURL[user.gameType].TOURNEY_BANNER));
            setImgCard(imgLink(imgURL[user.gameType].TOURNEY_CARD_HEADER));
            setIsfetched(true);
        }
    }, [user])

    return (
        <div>
            <Navbar isCreator={isCreator}/>
            <div className='header-container'>
                <div
                className='banner'
                style={{backgroundImage: `url(${imgBanner})`}}
                />
                    <h1 className='game-name'><span>Mobile Legends: Bang Bang</span></h1>
                </div>
            <div className='body-container'>
                {(() => {
                    if (tournamentList){
                        const content = tournamentList.map((tournament) =>
                            <div className='tesaja' key={tournament.ID} onClick={() =>navigate("detail\\" + tournament.ID)}>
                                <TourneyCard 
                                    name={truncate(tournament.name, 20)} 
                                    description={tournament.description}
                                    imgUrl={imgCard}
                                    participants={getParticipantsNumber(tournament.ID)}
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