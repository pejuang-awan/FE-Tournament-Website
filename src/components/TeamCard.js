import React from 'react';
import '../static/css/components/TeamCard.css';

export default function TeamCard({ teamData, imgUrl }) {
    const memberList = []
    teamData["members"].forEach((data) => {
        memberList.push(<li>{data}</li>)
    });
    return (
        <div className='team-card'>
            <div className='team-card-header'>
                <div className='team-card-logo'>
                    <img className='team-card-img' src={imgUrl}></img>
                </div>
                <div className='team-card-name'>
                    <h2>ZCZC</h2>
                </div>
            </div>
            <div className='team-list'>
                <ul className='team-leader'>
                    <li>{teamData["captainId"]}</li>
                </ul>
                <ul className='team-member'>
                    {memberList}
                </ul>
            </div>
        </div>
    )
}