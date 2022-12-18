import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TeamCard from '../components/TeamCard';
import axios from 'axios';
import '../static/css/pages/TourneyDetail.css';
import Button from '../components/Button';

export default function TourneyDetail() {

	const { idTournament } = useParams();
	const [user, setUser] = useState({});
	const navigate = useNavigate();
	const [imgType, setImgType] = useState(1);
	const [isfetched, setIsfetched] = useState(false);
	const [tournamentData, setTournamentData] = useState({});
	const [participantList, setParticipantList] = useState([]);

	useEffect(() => {
		if (sessionStorage.getItem('user_data') === null) {
			navigate('/');
		} else {
			setUser(JSON.parse(sessionStorage.getItem('user_data')));
		}
	}, []);

	const fetchTournamentDetailData = async () => {
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_BE_BASE_URL}` + 'tourney-manager/tournament/' + idTournament,
			headers: {
				'Authorization': "Bearer " + user.token
			}
		})
			.then((response) => {
				setTournamentData(response.data.data);
			})
	}

	const fetchParticipantList = async () => {
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_BE_BASE_URL}` + 'tourney-registry/participants/' + idTournament,
			headers: {
				'Authorization': "Bearer " + user.token
			}
		})
			.then((response) => {
				if (response.data.data !== null){
					setParticipantList(response.data.data);
				} else {
					setParticipantList([]);
				}
			})
	}

	useEffect(() => {
		if (user.token === null) {
			navigate('/');
		}

		if (!isfetched && user.token !== undefined) {
			fetchTournamentDetailData();
			fetchParticipantList();
			setImgType(user.gameType);
			setIsfetched(true);
			console.log(user);
		}
	}, [user])

	const dateAndMonth = (date) => {
		if (date !== undefined){
			const dateAndMonth = date.split('T')[0].split('-');
			return dateAndMonth[2] + '/' + dateAndMonth[1];
		} else {
			return '';
		}
	}

	return (
		<div>
            <Navbar isCreator={user.role === 2} username={user.username || 'tamu'}/>
            <div className='header-container'>
                <div className='banner' style={{backgroundImage: `url(${require("../static/img/game/tourneybanner" + imgType + '.jpg')})`}}>
					<div className='banner-content'>
						<div className='left-content'>
							<div className='banner-title'><span className='banner-span'>{tournamentData.name}</span></div>
							<div className='banner-organizer'><span className='banner-span'>by {tournamentData.organizer}</span></div>
						</div>
						<div className='right-content'>
							<div className='banner-date'>
								<span className='banner-span'>
									{dateAndMonth(tournamentData.startDate) + ' - ' + dateAndMonth(tournamentData.endDate)}
								</span>
							</div>
							{(() => {
								if (tournamentData.maxTeam - participantList.length > 0) {
								return (
									<>
										<div className='banner-slot'>
											<span className='banner-span'>
												{tournamentData.maxTeam - participantList.length} slot tersisa
											</span>
										</div>
										<div className='button-container'>
											{(() => {
												if (user.role === 1) {
												return (
													<Button
														className={'button-register'} 
														text={'Daftar'} 
														type={'button'} 
														size={'medium'}
														onClick={() => navigate('../register/' + idTournament)}
														/>
												)
												}
											})()}
										</div>
									</>
								)
								} else {
								return (
									<>Slot sudah habis</>
								)
								}
							})()}
						</div>
					</div>
				</div>
            </div>
        	
			<div className='body-detail-container'>
				<div className='tourney-desc'>
					<h2>Deskripsi Tournament</h2>
					<p>{tournamentData.description}</p>
				</div>
				<div className='participants-container'>
					<h2>Daftar Tim</h2>
					<div className='team-card-container'>
						{(() => {
							if (participantList.length > 0) {
								const content = participantList.map((teams) => 
									<div key={teams.name}>
										<TeamCard
											teamData={teams}
											gameId={user.gameType}
										/>
									</div>
								)
								return (
									<>{content}</>
								)
							}	
						})()}
					</div>
				</div>
            </div>
        </div>
	);
}