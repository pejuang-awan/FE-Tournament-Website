import React, { useEffect, useState } from 'react';
import '../static/css/pages/TourneyList.css';
import Navbar from '../components/Navbar';
import TourneyCard from '../components/TourneyCard';
import { imgURL } from '../constant/imgURL';
import imgLink from '../helper/imgLink';
import dayCalculator from '../helper/dayCalculator';
import axios from 'axios';

export default function TourneyList() {

    const [isCreator, setIsCreator] = useState(true);
    const [tournamentList, setTournamentList] = useState([]);
    const [participantList, setParticipantList] = useState([]);

    const dummy = {
        "id": 3,
        "username": "zul",
        "role": 1,
        "gameType": 2,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImFuamF5YW5pMiIsIlJvbGUiOjEsImV4cCI6MTY3MDQxNjQ4MH0.DgtKEnMQxbxJAjFMYw9HiYCUtd44fl7LCJY9jIXN8cI"
    }

    const cardImgUrl = imgLink(imgURL[dummy.gameType].TOURNEY_CARD_HEADER)
    const bannerImgUrl = imgLink(imgURL[dummy.gameType].TOURNEY_BANNER)

    const getParticipantsNumber = (tourneyID) => {
        if (participantList[tourneyID]) {
            return participantList[tourneyID];
        } else {
            return 0;
        }
    }

    useEffect(() => {
        const fetchTournamentListData = async () => {
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_BE_BASE_URL}` + 'tourney-manager/tournaments/' + dummy.gameType,
                headers: {
                    'Authorization': "Bearer " + dummy.token
                }
            })
                .then((response) => {
                    const tournamentData = response.data.data;
                    setTournamentList(tournamentData);

                    const promises = [];

                    tournamentData.forEach(tournament => {
                        promises.push(
                            axios(`${process.env.REACT_APP_BE_BASE_URL}` + 'tourney-registry/participants/11',{ // 'tourney-registry/participants/' + tournament.ID
                                method:'get',
                                headers: {
                                    'Authorization': "Bearer " + dummy.token
                                }
                            })
                        );
                    });

                    Promise.all(promises).then(results => {
                        const tempList = {};

                        results.forEach(result => {
                            const url = result.request.responseURL.toString().split('/');
                            const tourneyID = url[url.length-1]
                            tempList[tourneyID] = result.data.data;
                        });

                        setParticipantList(tempList);

                    });

                }).catch((error) => {
                    console.log(error);
                })
        }
        fetchTournamentListData();
    }, [])

    return (
        <div>
            <Navbar isCreator={isCreator}/>
            <div className='header-container'>
                <div
                className='banner'
                style={{backgroundImage: `url(${bannerImgUrl})`}}
                />
                    <h1 className='game-name'><span>Mobile Legends: Bang Bang</span></h1>
                </div>
            <div className='body-container'>
                {(() => {
                    if (tournamentList){
                        const content = tournamentList.map((tournament) =>
                            <div key={tournament.ID}>
                                <TourneyCard 
                                    name={tournament.name} 
                                    description={tournament.description}
                                    imgUrl={cardImgUrl}
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