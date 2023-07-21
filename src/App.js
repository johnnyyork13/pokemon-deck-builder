import './App.css';
import ImageGallery from './components/ImageGallery';
import React from 'react';
import CardData from './components/CardData';
import Deck from './components/Deck';

function App() {

  //FIGURE OUT HOW TO DELETE CARDS FROM DECK
  
  const [currentPokemon, setCurrentPokemon] = React.useState({
    set: "",
    id: "",
    data: undefined,
    key: ""
  });

  const [showLogos, setShowLogos] = React.useState(false);
  const [showDeck, setShowDeck] = React.useState(false);
  const [deck, setDeck] = React.useState([])


  React.useEffect(function(){
    setDeck(function() {
      const data = localStorage.getItem("deck");
      if (JSON.parse(data)) {
        setDeck(JSON.parse(data));
      }
    })
  }, [])
  
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
      //console.log(res);
      if (!res.error) {
        setCurrentPokemon((prev) => ({
          ...prev,
          data: res.data,
          key: res.data.id
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

  function handleDeleteCard(key) {
    for (let i = deck.length - 1; i >= 0; i--) {
      const card = deck[i];
      //console.log(card.key, key)
      //console.log(deck);
      if (card.key === key) {
        setDeck(function(prev) {
          prev.splice(i, 1);
          console.log(prev);
          return prev;
        })
      }
    }
  }

  function handleSaveDeck() {
    localStorage.setItem("deck", JSON.stringify(deck));
  }

  return (
    <div className="App">
        <button type="button" onClick={handleSaveDeck}>Save</button>
        <button type="button" onClick={toggleShowDeck}>{showDeck ? "Hide" : "Show"} Deck</button>
        {showDeck && <Deck 
          toggleShowDeck={toggleShowDeck}
          deck={deck}
          handleDeleteCard={handleDeleteCard}
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
