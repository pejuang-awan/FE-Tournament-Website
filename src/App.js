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
import TourneyDetail from './pages/TourneyDetail';

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
        <Route path='detail/:idTournament' element={<TourneyDetail />} />
        <Route path='create' element={<CreateTourney />} />
        <Route path='register/:idTournament' element={<RegisterTourney />} />
      </Route>
      <Route path='test' element={<Test />} />
      <Route path='*' element={<NoRoute />} />
    </Routes>
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <Button text={'Long text here her her her'}/>
  //       <Input label={'Nama'} placeholderText={'Masukan nama Anda'} type={'text'} />
  //       <Input label={'Password'} placeholderText={'Masukan password Anda'} type={'password'}/>
  //       <TextArea label={'Deskripsi'}></TextArea>
  //       <Select label={'Permainan'} items={[1,2,3]}></Select>
  //     </header>
  //   </div>
  // )
}

export default App;
