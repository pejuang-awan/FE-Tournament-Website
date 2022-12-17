import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

export default function TourneyDetail() {

    let { tournamentId } = useParams();

    return (
      <div id="todo">
        <h1>{tournamentId}</h1>
      </div>
    );
  }