import './App.css';
import Button from './components/Button';

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <Button text={'Long text here her her her'}/>
      </header>
    </div>
    <form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
    </>
  )
}

export default App;
