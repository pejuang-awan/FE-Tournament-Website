import React from 'react';
import '../static/css/pages/TourneyList.css';
import Navbar from '../components/Navbar';
import TourneyCard from '../components/TourneyCard';
import { imgURL } from '../constant/imgURL';

export default function TourneyList() {
    const dummy = {
        "gameType":3 
    }
    const bannerImgUrl = `http://drive.google.com/uc?export=view&id=${imgURL[dummy.gameType].TOURNEY_BANNER}`
    const cardImgUrl = `http://drive.google.com/uc?export=view&id=${imgURL[dummy.gameType].TOURNEY_CARD_HEADER}`

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
                <TourneyCard 
                    name="M4 World" 
                    description="Tempat RRQ akan kembali mengbadut yagesya."
                    imgUrl={cardImgUrl}
                    participants={1}
                    quota={20}
                    deadline={5}
                ></TourneyCard>
                <TourneyCard 
                    name="M4 World" 
                    description="Tempat RRQ akan kembali mengbadut yagesya."
                    imgUrl={cardImgUrl}
                    participants={1}
                    quota={20}
                    deadline={5}
                ></TourneyCard>
                <TourneyCard 
                    name="M4 World" 
                    description="Tempat RRQ akan kembali mengbadut yagesya."
                    imgUrl={cardImgUrl}
                    participants={1}
                    quota={20}
                    deadline={5}
                ></TourneyCard>
                <TourneyCard 
                    name="M4 World" 
                    description="Tempat RRQ akan kembali mengbadut yagesya."
                    imgUrl={cardImgUrl}
                    participants={1}
                    quota={20}
                    deadline={5}
                ></TourneyCard>
                <TourneyCard 
                    name="M4 World" 
                    description="Tempat RRQ akan kembali mengbadut yagesya."
                    imgUrl={cardImgUrl}
                    participants={1}
                    quota={20}
                    deadline={5}
                ></TourneyCard>
                <TourneyCard 
                    name="M4 World" 
                    description="Tempat RRQ akan kembali mengbadut yagesya."
                    imgUrl={cardImgUrl}
                    participants={1}
                    quota={20}
                    deadline={5}
                ></TourneyCard>
                <TourneyCard 
                    name="M4 World" 
                    description="Tempat RRQ akan kembali mengbadut yagesya."
                    imgUrl={cardImgUrl}
                    participants={1}
                    quota={20}
                    deadline={5}
                ></TourneyCard>
                <TourneyCard 
                    name="M4 World" 
                    description="Tempat RRQ akan kembali mengbadut yagesya."
                    imgUrl={cardImgUrl}
                    participants={1}
                    quota={20}
                    deadline={5}
                ></TourneyCard>
                <TourneyCard 
                    name="M4 World" 
                    description="Tempat RRQ akan kembali mengbadut yagesya."
                    imgUrl={cardImgUrl}
                    participants={1}
                    quota={20}
                    deadline={5}
                ></TourneyCard>
            </div>
        </div>
    )
}