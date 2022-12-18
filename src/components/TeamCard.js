import React from 'react';
import '../static/css/components/TeamCard.css';

export default function TeamCard({ teamData, gameId }) {
    return (
        <div className='team-card'>
            <div className='team-card-header'>
                <div className='team-card-logo'>
                    <img className='team-card-img' src={
                        require("../static/img/game/teamcard" + gameId + '.jpg')
                        }></img>
                </div>
                <div className='team-card-name'>
                    <h2>{teamData.teamName}</h2>
                </div>
            </div>
            <div className='team-list'>
                <ul className='team-leader'>
                    <li>{teamData.captainId}</li>
                </ul>
                <ul className='team-member'>
                    {(() => {
                        if (teamData.members.length > 0) {
                            const content = teamData.members.map((member) => {
                                return (
                                    <li>{member}</li>
                                )
                            })
                            return (
                                <>{content}</>
                            )
                        }
                    })()}
                </ul>
            </div>
        </div>
    )
}