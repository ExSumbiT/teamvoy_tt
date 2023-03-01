import logo from './logo.svg';
import './App.css';
import { PokemonService } from './service/pokemon';
import Pokedex from './components/Pokedex';

const ps = new PokemonService()

function App() {
  return (
    <div className="App">
      <Pokedex />
    </div>
  );
}

export default App;
