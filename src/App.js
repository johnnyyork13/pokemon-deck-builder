import './App.css';
import ImageGallery from './components/ImageGallery';
import React from 'react';
import SearchContainer from './components/SearchContainer';
import Deck from './components/Deck';
import Header from './components/Header';
import Stats from './components/Stats';
import Help from './components/Help';
import ZoomCard from './components/ZoomCard';

let globalID = 1;
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
  const [cycleCards, setCycleCards] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);
  const [showZoom, setShowZoom] = React.useState({
    zoom: false,
    img: ""
  });

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
  

  React.useEffect(function(){
    setRecentPokemon(function(prev) {
      try {
        if (prev[prev.length - 1].key !== currentPokemon.key) {
          return [
            ...prev,
            currentPokemon
          ]
        } else {
          return [
            ...prev
          ]
        }
      } catch {
        return [
          ...prev,
          currentPokemon
        ]
      }
    })
    setCardInDeck(false);
}, [currentPokemon])

  function handleLogoClick(image) {
    const regex = image[1].match(/(?!\.)(?!\/).*(?=\.png)/)[0];
    setCurrentPokemon((prev) => ({
      ...prev,
      set: regex
    }));
  }

  function handleInputChange(e) {
    globalID = e.target.value.toUpperCase();
  }

  function handlePreviousPokemon() {
      if (globalID > 1 || (typeof(globalID) === "string" && Number(globalID.slice(2)) > 1)) {
        if (currentPokemon.data.number.slice(0, 2) !== "TG") {
          globalID--;
        } else {
          const tgNum = Number(currentPokemon.data.number.slice(2));
          const tgFixed = tgNum + 1 < 10 ? `TG0${tgNum - 1}` : `TG${tgNum - 1}`;
          globalID = tgFixed;
        }
      }
      handleInputSubmit();
  }

  function handleNextPokemon() {
    if (currentPokemon.data.number.slice(0, 2) !== "TG") {
        globalID++;
    } else {
        const tgNum = Number(currentPokemon.data.number.slice(2));
        const tgFixed = tgNum + 1 < 10 ? `TG0${tgNum + 1}` : `TG${tgNum + 1}`;
        globalID = tgFixed;
    }
    handleInputSubmit();
  }

  async function handleInputSubmit() {
    try {
      const url = `https://api.pokemontcg.io/v2/cards/${currentPokemon.set}-${globalID}`;
      const req = await fetch(url);
      const res = await req.json();
      if (!res.error) {
        //console.log(res);
        setCurrentPokemon(function(prev) { 
          return {
            ...prev,
            data: res.data,
            key: res.data.id 
          }
        })
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

  function toggleShowHelp() {
    setShowHelp((prev) => !prev);
  }

  function toggleShowZoom(img) {
    const zoomed = showZoom.zoom;
    setShowZoom(() => ({
      zoom: !zoomed,
      img: img
    }));
  }

  function handleClearHistory() {
    setRecentPokemon([]);
  }

  function handleAddToDeck() {
    if (!cardInDeck) {
      setDeck(function(prev) {
        const newArr = [
          ...prev,
          currentPokemon
        ]
        return newArr;
      })
    }
    setCycleCards((prev) => !prev);
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

  const recentPokemonList = recentPokemon.map(function(card, index){
    let e;
    if (card.data) {
      e = <img
        key={`${index}-${card.key}`}
        id={card.key} 
        alt="Recent Pokemon Card"
        src={card.data.images.small} 
        className="recent-pokemon-card"
        onClick={function() {setCurrentPokemon(card); 
                              globalID = Number(card.data.number); 
                              handleInputSubmit()}}
      /> 
    }
    return e;
  })

  const recentPokemonListReversed = recentPokemonList.reverse();

  for (const cards in deck) {
    const card = deck[cards];
    if (card.key === currentPokemon.key && !cardInDeck) {
      setCardInDeck(true);
    }
  }

  async function showSets() {
    const url = "https://api.pokemontcg.io/v2/sets/";
    const req = await fetch (url);
    const res = await req.json();
    console.log(res);
  }

  showSets();

  return (
    <div className="App">
      {showDeck && <Deck
              toggleShowDeck={toggleShowDeck}
              deck={deck}
              handleDeleteCard={handleDeleteCard}
              toggleShowZoom={toggleShowZoom}
            />}
      {showHelp && <Help
              toggleShowHelp={toggleShowHelp}
            />}
      {showZoom.zoom && <ZoomCard
              toggleShowZoom={toggleShowZoom}
              img={showZoom.img}
            />}
      <Header 
        toggleShowDeck={toggleShowDeck}
        toggleShowHelp={toggleShowHelp}
      />
      <main>
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
              toggleShowZoom={toggleShowZoom}
            />}
          </div>
          {currentPokemon.data !== undefined && <div className="main-section-recent-window">
            <div className="recent-pokemon-header-container">
              <h2 className="recent-pokemon-header">Recently Viewed Cards</h2>
              <button className="recent-pokemon-clear-history-btn" onClick={handleClearHistory}>Clear History</button>
            </div>
              <div className="recent-pokemon-card-container">
                {recentPokemonListReversed}
              </div>
          </div>}
        </div>
        <div className="main-sidebar">
          <ImageGallery
            handleLogoClick={handleLogoClick}
          />
          <SearchContainer
            handleInputChange={handleInputChange}
            handleInputSubmit={handleInputSubmit}
            handleAddToDeck={handleAddToDeck}
            currentPokemon={currentPokemon}
          />

        </div>
      </main>
        
    </div>
  );
}

export default App;
