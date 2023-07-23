import React from 'react';

export default function Deck(props) {


    const [type, setType] = React.useState("All");
    const [removeCard, setRemoveCard] = React.useState(false);

    function handleTypeFilter(e) {
        setType(e.target.value)
    }

    const sortedCards = props.deck.map(function(card, index) {
        if (type === "All" || card.data.types.includes(type)) {
            return <img 
                        key={card.key} 
                        src={card.data.images.small} 
                        alt="Pokemon Card"
                        onClick={function() {
                            props.handleDeleteCard(card.key); 
                            setRemoveCard((prev) => !prev);
                            }   
                        }
                        />;
        }
    })

    return (
        <div className="deck-background">
            <div className="deck-container">
                <div className="deck">
                    {sortedCards}
                </div>
                <div className="deck-sidebar">
                        <button type="button" className="closeDeckBtn" onClick={props.toggleShowDeck}>Close Deck</button>
                        <label className="deck-sidebar-label">Filter By Type:</label>
                        <select name="pokemonType" onChange={handleTypeFilter}>
                            <option value="All">No Filter</option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Dark">Dark</option>
                            <option value="Steel">Steel</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                            <option value="Fighting">Fighting</option>
                        </select>
                </div>
            </div>
            
        </div>
    )
}