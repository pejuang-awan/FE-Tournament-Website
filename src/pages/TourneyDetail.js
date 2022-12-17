import React from 'react';
import { useParams } from 'react-router-dom';

export default function TourneyDetail() {

    let { idTournament } = useParams();

    console.log(idTournament);

    return (
      <div id="todo">
        <h1>Tourney with ID: {idTournament}</h1>
      </div>
    );
  }