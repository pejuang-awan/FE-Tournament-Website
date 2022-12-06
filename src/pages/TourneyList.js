import React, { useEffect, useState } from 'react';
import '../static/css/pages/TourneyList.css';
import Navbar from '../components/Navbar';
import TourneyCard from '../components/TourneyCard';
import { imgURL } from '../constant/imgURL';
import imgLink from '../helper/imgLink';
import dayCalculator from '../helper/dayCalculator';
import axios from 'axios';

export default function TourneyList() {

    const [tournamentList, setTournamentList] = useState([]);
    const [participantList, setParticipantList] = useState([]);
    const baseUrl = "https://si-tourney-authentication-uuq75raixq-et.a.run.app/api/";

    const dummy = {
        "id": 3,
        "username": "zul",
        "role": 1,
        "gameType": 2,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImFuamF5YW5pMiIsIlJvbGUiOjEsImV4cCI6MTY3MDM4NDA2NH0.Y27xF9sejHvvPK3uENwluXKQEGvWVnRT6iZNw6KJ6-8"
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
                url: baseUrl + 'tourney-manager/tournaments/' + dummy.gameType,
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
                            axios(baseUrl + 'tourney-registry/participants/11',{ // 'tourney-registry/participants/' + tournament.ID
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

    // useEffect(() => {
    //     console.log(tournamentList);
    // }, [tournamentList])

    // useEffect(() => {
    //     console.log(participantList[11]);
    // }, [participantList]);

    return (
        <div>
            <Navbar/>
            <div className='header-container'>
                <div
                className='banner'
                style={{backgroundImage: `url(${bannerImgUrl})`}}
                />
                    <h1><span>Mobile Legends: Bang Bang</span></h1>
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