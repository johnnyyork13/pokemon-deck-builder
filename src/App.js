import './App.css';
import ImageGallery from './components/ImageGallery';
import React from 'react';

function App() {

  let recentStyle = {
    left: "0px"
  }

  const [logoHistory, setLogoHistory] = React.useState([]);
  const [currentPokemon, setCurrentPokemon] = React.useState({
    set: "",
    number: "",
    setName: "",
    seriesName: ""
  });
  const [displayedPokemon, setDisplayedPokemon] = React.useState();
  
  function handleLogoClick(image) {
    const regex = image[1].match(/(?!\.)(?!\/).*(?=\.png)/)[0];
    setCurrentPokemon((prev) => ({
      ...prev,
      set: regex
    }));
    if (logoHistory.length <= 5 && !logoHistory.includes(image)) {
      setLogoHistory((prev) => ([
        image,
        ...prev
      ]))
    } else if (logoHistory.length > 5 && !logoHistory.includes(image)) {
      setLogoHistory(function(prev){ 
        const shifted = prev.slice(0, prev.length - 1);
        return [image, ...shifted]
      })
    }
  }

  function setLogoBorder(e) {
    console.log(e);
  }

  function handleInputChange(e) {
    setCurrentPokemon((prev) => ({
      ...prev,
      number: e.target.value
    }));
  }

  async function handleInputSubmit() {
    const url = `https://api.pokemontcg.io/v2/cards/${currentPokemon.set}-${currentPokemon.number}`;
    //console.log(url);
    const req = await fetch(url);
    const res = await req.json();
    try {
      setDisplayedPokemon(res.data.images.small);
      setCurrentPokemon((prev) => ({
        ...prev,
        setName: res.data.set.name,
        seriesName: res.data.set.series 
      }))
    } catch {
      alert("Pokemon not found.");
    }
  }

  const logoHistoryList = logoHistory.map(function(image, index) {
    return <img 
              className="logo"
              key={index} 
              src={image[0]} 
              alt="Logo Set Pic" 
              onClick={() => handleLogoClick(image)}
            />
              
  })

  return (
    <div className="App">
      <div className="pokemon-display">
        <h1>{currentPokemon.setName} set</h1>
        <h2>{currentPokemon.seriesName}</h2>
        <div className="pokemon-form">
          <input type="text" onChange={handleInputChange} name="pokeNumber" />
          <button type="button" onClick={handleInputSubmit} name="pokeSubmit">Submit</button>
        </div>
        <img src={displayedPokemon} alt="Pokemon Card" />
      </div>
      <div className="sidebar">
        <div className="recents">
          <h1>Recents</h1>
          {logoHistoryList}
          <div className="recents-active" style={recentStyle}></div>
        </div>
        <ImageGallery setLogoBorder={setLogoBorder} handleLogoClick={handleLogoClick}/>
      </div>
        
    </div>
  );
}

export default App;
