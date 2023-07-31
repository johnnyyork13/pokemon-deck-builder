import './App.css';
import ImageGallery from './components/ImageGallery';
import React from 'react';
import CardData from './components/CardData';
import Deck from './components/Deck';
import Header from './components/Header';
import Stats from './components/Stats';

function App() {
  
  const [currentPokemon, setCurrentPokemon] = React.useState({
    set: "",
    data: undefined,
    key: ""
  });
  const [currentPokemonID, setCurrentPokemonID] = React.useState(1);
  const [showDeck, setShowDeck] = React.useState(false);
  const [deck, setDeck] = React.useState([])
  const [userStart, setUserStart] = React.useState(false);
  const [recentPokemon, setRecentPokemon] = React.useState([]);
  const [cardInDeck, setCardInDeck] = React.useState(false);

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
  }, [deck, userStart])
  
  function handleLogoClick(image) {
    const regex = image[1].match(/(?!\.)(?!\/).*(?=\.png)/)[0];
    setCurrentPokemon((prev) => ({
      ...prev,
      set: regex
    }));
  }

  function handleInputChange(e) {
    setCurrentPokemonID(e.target.value);
  }

  React.useEffect(() => {
    setRecentPokemon((prev) => ([
      ...prev,
      currentPokemon
    ]))
    setCardInDeck(false);
  }, [currentPokemon])

  async function handleInputSubmit() {
    try {
      const url = `https://api.pokemontcg.io/v2/cards/${currentPokemon.set}-${currentPokemonID}`;
      const req = await fetch(url);
      const res = await req.json();
      if (!res.error) {
        setCurrentPokemon((prev) => ({
          ...prev,
          data: res.data,
          key: res.data.id 
        }))
        //console.log(res);
      } else {
        alert("Pokemon not found.");
      }
    } catch {
      alert("Pokemon not found.");
    }
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

  function handlePreviousPokemon() {
    if (currentPokemonID > 0) {
      setCurrentPokemonID((prev) => Number(prev) - 1);
      handleInputSubmit();
    }
  }

  function handleNextPokemon() {
    setCurrentPokemonID((prev) => Number(prev) + 1) 
    handleInputSubmit();
  }

  const recentPokemonList = recentPokemon.map(function(card, index){
    let e;
    if (card.data) {
      e = <img
        key={`${index}-${card.key}`} 
        alt="Recent Pokemon Card"
        src={card.data.images.small} 
        className="recent-pokemon-card"
        onClick={() => setCurrentPokemon(card)}
      /> 
    }
    return e;
  })

  const recentPokemonListReversed = recentPokemonList.reverse();

  // async function showSets() {
  //   const url = `https://api.pokemontcg.io/v2/sets`;
  //   const req = await fetch(url);
  //   const res = await req.json();
  //   console.log(res); 
  // }

  // showSets();

  for (const cards in deck) {
    const card = deck[cards];
    if (card.key === currentPokemon.key && !cardInDeck) {
      setCardInDeck(true);
    }
  }

  return (
    <div className="App">
      {showDeck && <Deck
              toggleShowDeck={toggleShowDeck}
              deck={deck}
              handleDeleteCard={handleDeleteCard}
            />}
      <Header 
        toggleShowDeck={toggleShowDeck}
      />
      <main>
        <div className="main-sidebar">
          <ImageGallery
            handleLogoClick={handleLogoClick}
          />
          <CardData
            handleInputChange={handleInputChange}
            handleInputSubmit={handleInputSubmit}
            handleAddToDeck={handleAddToDeck}
            currentPokemon={currentPokemon}
          />

        </div>
        <div className="main-section">
          <div className="main-section-display-window">
            {cardInDeck && <div className="card-added">Card in Deck</div>}            
            {currentPokemon.data !== undefined && <img className="main-section-display-pokemon" src={currentPokemon.data.images.small} alt="Pokemon Card" />}
            {currentPokemon.data &&
            <Stats 
              data={currentPokemon.data}
              handlePreviousPokemon={handlePreviousPokemon}
              handleNextPokemon={handleNextPokemon}
              handleAddToDeck={handleAddToDeck}
            />}
          </div>
          <div className="main-section-recent-window">
            <h2 className="recent-pokemon-header">Recently Viewed Cards</h2>
              <div className="recent-pokemon-card-container">
                {recentPokemonListReversed}
              </div>
          </div>
        </div>
      </main>
        
    </div>
  );
}

export default App;
