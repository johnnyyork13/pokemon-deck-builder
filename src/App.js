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
  const [saveDeck, setSaveDeck] = React.useState(false);
  const [userStart, setUserStart] = React.useState(false);


  React.useEffect(() => {
    const savedDeck = localStorage.getItem("deck");
    setUserStart(true);
    try {
      setDeck(function(){
        let returnedData = []
        if (savedDeck) {
          returnedData = JSON.parse(savedDeck);
        }
        return returnedData;
      })
    } catch {
      console.log("catch block on saved deck useEffect");
    }
  }, [])

  React.useEffect(() => {
    if (userStart) {
      localStorage.setItem("deck", JSON.stringify(deck));
    }
  }, [saveDeck, deck, userStart])
  
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
    setDeck(function(prev) {
      const newArr = [
        ...prev,
        currentPokemon
      ]
      return newArr;
    })
  }

  function handleDeleteCard(key) {
    setDeck(function(prevDeck) {
      let newDeck = [];
      for (const card in prevDeck) {
        if (prevDeck[card].key !== key) {
          newDeck.push(prevDeck[card]);
        }
      }
      return newDeck;
    })
  }

  return (
    <div className="App">
        <button type="button" onClick={() => setSaveDeck((prev) => !prev)}>Save</button>
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
