import React from 'react';

export default function Deck(props) {

    const [type, setType] = React.useState("All");

    function handleTypeFilter(e) {
        setType(e.target.value)
    }

    const typeCards = props.deck.map(function(card, index) {
        if (type === "All") {
            return <img key={`allCards-${index}`} src={card.data.images.small} alt="Pokemon Card"/>;
        } else if (card.data.types.includes(type)) {
            return <img key={`allCards-${index}`} src={card.data.images.small} alt="Pokemon Card"/>;
        }
    })

    return (
        <div className="deck-background">
            <button type="button" className="closeDeckBtn" onClick={props.toggleShowDeck}>Hide Show Deck</button>
            <div className="deck">
                {typeCards}
            </div>
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
    )
}