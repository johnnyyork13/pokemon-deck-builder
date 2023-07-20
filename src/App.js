import './App.css';
import ImageGallery from './components/ImageGallery';
import React from 'react';
import CardData from './components/CardData';
import Deck from './components/Deck';

function App() {

  const [currentPokemon, setCurrentPokemon] = React.useState({
    set: "",
    id: "",
    data: undefined
  });

  const [showLogos, setShowLogos] = React.useState(false);
  const [showDeck, setShowDeck] = React.useState(false);

  const [deck, setDeck] = React.useState([])
  
  function handleLogoClick(image) {
    const regex = image[1].match(/(?!\.)(?!\/).*(?=\.png)/)[0];
    setCurrentPokemon((prev) => ({
      ...prev,
      set: regex
    }));
  }

  function handleInputChange(e) {
    setCurrentPokemon((prev) => ({
      ...prev,
      id: e.target.value
    }));
  }

  async function handleInputSubmit() {
    try {
      const url = `https://api.pokemontcg.io/v2/cards/${currentPokemon.set}-${currentPokemon.id}`;
      const req = await fetch(url);
      const res = await req.json();
      console.log(res);
      if (!res.error) {
        setCurrentPokemon((prev) => ({
          ...prev,
          data: res.data
        }))
      } else {
        alert("Pokemon not found.");
      }
    } catch {
      alert("Pokemon not found.");
    }
  }

  function toggleShowLogos() {
    setShowLogos((prev) => !prev);
  }

  function toggleShowDeck() {
    setShowDeck((prev) => !prev);
  }

  function handleAddToDeck() {
    setDeck((prev) => ([
      ...prev,
      currentPokemon
    ]))
  }

  return (
    <div className="App">
        <button type="button" onClick={toggleShowDeck}>{showDeck ? "Hide" : "Show"} Deck</button>
        {showDeck && <Deck 
          toggleShowDeck={toggleShowDeck}
          deck={deck}
        />}
        <CardData 
          handleInputChange={handleInputChange}
          handleInputSubmit={handleInputSubmit}
          handleAddToDeck={handleAddToDeck}
          currentPokemon={currentPokemon}
        />
        {showLogos && <ImageGallery  
            handleLogoClick={handleLogoClick}
        />}
        
        <button type="button" onClick={toggleShowLogos}>{showLogos ? "Hide" : "Show"} Logos</button>
        
    </div>
  );
}

export default App;
