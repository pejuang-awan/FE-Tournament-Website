import React from 'react';
import '../static/css/components/TourneyCard.css';

export default function tourneyCard({ name, description, participants, quota, deadline, imgUrl }) {
    return (
        <div className='tourney-card'>
            <div className='tourney-card-container'>
                <p className='tourney-card-name'>{name}</p>
                <p className='tourney-card-desc'>{description}</p>
                <div className='tourney-card-bottom'>
                    <div className='tourney-card-participants'>
                        <img className='tourney-card-logo' src={imgUrl}></img>
                        <p>Tim terdaftar</p>
                        <p>{participants}/{quota}</p>
                    </div>
                    <div className='tourney-card-deadline'>
                        <img className='tourney-card-logo' src={imgUrl}></img>
                        <p>Tenggat Daftar</p>
                        <p>{deadline} hari</p>
                    </div>
                </div>
            </div>
        </div>
    )
}