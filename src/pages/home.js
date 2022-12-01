import React from "react";
import Button from "../components/Button";
import '../static/css/pages/Home.css';

export default function Home() {

    const tournamentTotal = 60;
    const teamTotal = 124;
    const gameId = 1;

    const id = "img-" + gameId;
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

    React.useEffect(() => {
        const obj1 = document.getElementById("tournament-total");
        const obj2 = document.getElementById("team-total");

        const duration = gcd_two_numbers(tournamentTotal, teamTotal) * staticDuration;

        animateValue(obj1, 0, tournamentTotal, duration);
        animateValue(obj2, 0, teamTotal, duration);
    });

    return (
        <div id={id}>
            <h1>Ikuti Berbagai Turnamen</h1>
            <div class="row">
                <div class="column">
                    <p class="sub-title">Jumlah Turnamen</p>
                    <h2 id="tournament-total">{tournamentTotal}</h2>
                </div>
                <div class="column">
                    <p class="sub-title">Jumlah Tim Terdaftar</p>
                    <h2 id="team-total">{teamTotal}</h2>
                </div>
                <Button text="Lihat Turnamen" size="medium"/>
            </div>
            
        </div>
    );
}

function gcd_two_numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
      return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
}