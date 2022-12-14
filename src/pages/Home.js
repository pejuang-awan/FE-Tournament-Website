import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import '../static/css/pages/Home.css';
import Navbar from "../components/Navbar";
import { imgURL } from "../constant/imgURL";
import imgLink from "../helper/imgLink";
import gcdCalc from "../helper/gcdCalc";
import axios from 'axios';

export default function Home() {

    const [isCreator, setIsCreator] = useState(true);
    const [homeData, setHomeData] = useState({
        'teamTotal': 0,
        'tournamentTotal':0
    })

    const dummy = {
        'role':1,
        "gameType":1,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImFuamF5YW5pMiIsIlJvbGUiOjEsImV4cCI6MTY3MTEzMjI1Mn0.UY5lSEmCoVobNfXD2zDZ3GfZ1rCA6nbdC4nwOHiLrAw"
    }

    const bannerImgUrl = imgLink(imgURL[dummy.gameType].TOURNEY_BANNER)

    const staticDuration = 500;

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.innerHTML = Math.floor(progress * (end - start) + start);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
    }

    const animateText = () => {
        const obj1 = document.getElementById("tournament-total");
        const obj2 = document.getElementById("team-total");

        const duration = gcdCalc(homeData.tournamentTotal, homeData.teamTotal) * staticDuration;

        animateValue(obj1, 0, homeData.tournamentTotal ?? 0, duration);
        animateValue(obj2, 0, homeData.teamTotal ?? 0, duration);
    }

    
    useEffect(() => {
        
        const fetchHomeData = async () => {
            return axios(`${process.env.REACT_APP_BE_BASE_URL}` + 'tourney-manager/get-count/' + dummy.gameType,{ 
                method:'get',
                headers: {
                    'Authorization': "Bearer " + dummy.token
                }
            })
                .then((response) => {
                    const data =  response.data.data;
                    console.log(data.teamTotal);
                    setHomeData({
                        'teamTotal': data.teamTotal,
                        'tournamentTotal': data.tournamentTotal
                    })
                })
        }

        fetchHomeData();
    }, []);

    useEffect(() => {
        console.log(homeData);
        animateText();
    }, [homeData])

    return (
        <div className="home-container">
            <div className="img-banner" style={{backgroundImage: `url(${bannerImgUrl})`}}>
                <Navbar isCreator={isCreator}/>
                <div className="home-content">
                    <h1>Ikuti Berbagai Turnamen</h1>
                    <div class="row">
                        <div class="column">
                            <p class="sub-title">Jumlah Turnamen</p>
                            <h2 id="tournament-total">{homeData.tournamentTotal}</h2>
                        </div>
                        <div class="column">
                            <p class="sub-title">Jumlah Tim Terdaftar</p>
                            <h2 id="team-total">{homeData.teamTotal}</h2>
                        </div>
                    </div>
                    <div class="row">
                        <Button text="Lihat Turnamen" size="medium"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
