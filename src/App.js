import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import TextArea from './components/TextArea';
import Select from './components/Select';

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
      </header>
    </div>
  )
}

export default App;
