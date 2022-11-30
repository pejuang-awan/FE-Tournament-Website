import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import TextArea from './components/TextArea';
import Select from './components/Select';
import TourneyCard from './components/TourneyCard';
import TeamCard from './components/TeamCard';

/* Components Playground */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button text={'Long text here her her her'}/>
        <Input label={'Nama'} placeholderText={'Masukan nama Anda'} type={'text'} />
        <Input label={'Password'} placeholderText={'Masukan password Anda'} type={'password'}/>
        <TextArea label={'Deskripsi'}></TextArea>
        <Select label={'Permainan'} items={[1,2,3]}></Select>
        <TourneyCard 
          name="M4 World" 
          description="Tempat RRQ akan kembali mengbadut yagesya."
          imgUrl="https://play-lh.googleusercontent.com/IhUVzRkz5MokalaeiLulcloc8rxROw0fSPRC7-Lc5zCF_wIfhbxo3qsOjKxYp524B1dY"
          participants={1}
          quota={20}
          deadline={5}
        ></TourneyCard>
        <TeamCard
          teamData={
            {
              "captainId": "captain",
              "members": [
                "member1",
                "member2",
                "member3"
              ],
              "teamName": "teamku",
              "tournamentId": 11
            }
          }
          imgUrl="https://play-lh.googleusercontent.com/IhUVzRkz5MokalaeiLulcloc8rxROw0fSPRC7-Lc5zCF_wIfhbxo3qsOjKxYp524B1dY"
        ></TeamCard>
      </header>
    </div>
  )
}

export default App;
