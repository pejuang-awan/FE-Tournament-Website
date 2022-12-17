import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from "../components/Button";
import '../static/css/pages/Home.css';
import Navbar from "../components/Navbar";
import { imgURL } from "../constant/imgURL";
import imgLink from "../helper/imgLink";
import gcdCalc from "../helper/gcdCalc";
import axios from 'axios';

export default function Home() {

    const [user, setUser] = useState({});
    const [isCreator, setIsCreator] = useState(false);
    const navigate = useNavigate();
    const [imgBanner, setImgBanner] = useState('');
    const [isfetched, setIsfetched] = useState(false);
    const [homeData, setHomeData] = useState({
        'teamTotal': 0,
        'tournamentTotal':0
    })
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

    const fetchHomeData = async () => {
        return axios(`${process.env.REACT_APP_BE_BASE_URL}` + 'tourney-manager/get-count/' + user.gameType,{ 
            method:'get',
            headers: {
                'Authorization': "Bearer " + user.token
            }
        })
            .then((response) => {
                const data =  response.data.data;
                setHomeData({
                    'teamTotal': data.teamTotal,
                    'tournamentTotal': data.tournamentTotal
                })
            })
    }

    const logOut = () => {
        sessionStorage.removeItem('user_data');
        navigate('/');
    };

    useEffect(() => {

        if (sessionStorage.getItem('user_data') === null) {
            navigate('/');
        } else {
            setUser(JSON.parse(sessionStorage.getItem('user_data')));
        }
        
    }, []);

    useEffect(() => {
        if (user.token === null) {
            navigate('/');
        }
        if (user.role === 2) {
            setIsCreator(true);
        }

        if (!isfetched && user.token !== undefined){
            fetchHomeData();
            setImgBanner(imgLink(imgURL[user.gameType].TOURNEY_HOME));
            setIsfetched(true);
        }
    }, [user])
    

    useEffect(() => {
        animateText();
    }, [homeData])

    return (
        <div className="home-container">
            <Navbar isCreator={isCreator} toggleLogout={logOut} username={user.username || 'tamu'}/>
            <div className="img-banner" style={{backgroundImage: `url(${imgBanner})`}}>
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
                        <Link to={'/tournament'}>
                            <Button text="Lihat Turnamen" size="medium"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
