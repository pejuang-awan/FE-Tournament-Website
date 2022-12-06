import React from 'react';
import '../static/css/components/TourneyCard.css';
<<<<<<< HEAD

export default function tourneyCard({ name, description, participants, quota, deadline, imgUrl }) {
    return (
        <div className='tourney-card'>
            <div className='tourney-card-container'>
                <p className='tourney-card-name'>{name}</p>
                <p className='tourney-card-desc'>{description}</p>
                <div className='tourney-card-bottom'>
                    <div className='tourney-card-participants'>
                        <img className='tourney-card-logo' src={imgUrl}></img>
=======
import { RiTeamFill } from "react-icons/ri";
import { FiClock } from "react-icons/fi";

export default function tourneyCard({ name, description, participants, quota, deadline, imgUrl}) {
    return (
        <div className='tourney-card'>
            <div className='tourney-card-container'>
                <div className='tourney-card-banner'>
                    <div 
                    className='tourney-banner-img'
                    style={{backgroundImage: `url(${imgUrl})`}}
                    />
                    <p className='tourney-card-name'><span>{name}</span></p>
                </div>
                <div className='tourney-card-desc-container'>
                    <p className='tourney-card-desc'>{description}</p>
                </div>
                <div className='tourney-card-bottom'>
                    <div className='tourney-card-participants'>
                        <RiTeamFill className='tourney-card-logo'/>
>>>>>>> e4a1d567093e3c904786a4ec3eec1d13baea8bbb
                        <p>Tim terdaftar</p>
                        <p>{participants}/{quota}</p>
                    </div>
                    <div className='tourney-card-deadline'>
<<<<<<< HEAD
                        <img className='tourney-card-logo' src={imgUrl}></img>
                        <p>Tenggat Daftar</p>
                        <p>{deadline} hari</p>
=======
                        <FiClock className='tourney-card-logo'/>
                        <p>Tenggat Daftar</p>
                        <p>{deadline}</p>
>>>>>>> e4a1d567093e3c904786a4ec3eec1d13baea8bbb
                    </div>
                </div>
            </div>
        </div>
    )
}