import React from 'react';
import '../static/css/components/TourneyCard.css';
import { RiTeamFill } from "react-icons/ri";
import { FiClock } from "react-icons/fi";

export default function tourneyCard({ name, description, participants, quota, deadline, gameId}) {
    return (
        <div className='tourney-card'>
            <div className='tourney-card-container'>
                <div className='tourney-card-banner'>
                    <div 
                    className='tourney-banner-img'
                    style={{backgroundImage: `url(${require("../static/img/game/tourneycard" + gameId + '.jpg')})`}}
                    />
                    <p className='tourney-card-name'><span>{name}</span></p>
                </div>
                <div className='tourney-card-desc-container'>
                    <p className='tourney-card-desc'>{description}</p>
                </div>
                <div className='tourney-card-bottom'>
                    <div className='tourney-card-participants'>
                        <RiTeamFill className='tourney-card-logo'/>
                        <p>Tim terdaftar</p>
                        <p>{participants}/{quota}</p>
                    </div>
                    <div className='tourney-card-deadline'>
                        <FiClock className='tourney-card-logo'/>
                        <p>Tenggat Daftar</p>
                        <p>{deadline}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}