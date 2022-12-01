import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import TourneyList from './pages/TourneyList';
import CreateTourney from './pages/CreateTourney';
import RegisterTourney from './pages/RegisterTourney';
import Test from './pages/Test';
import NoRoute from './pages/NoRoute';

// TODO: Add more route paths
function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='home' element={<Home />} />
      <Route path='tournament' >
        <Route index element={<TourneyList />} />
        <Route path='list' element={<TourneyList />} />
        <Route path='create' element={<CreateTourney />} />
        <Route path='register/:idTournament' element={<RegisterTourney />} />
      </Route>
      <Route path='test' element={<Test />} />
      <Route path='*' element={<NoRoute />} />
    </Routes>
  )
}

export default App;
