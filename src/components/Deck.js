import React from 'react';
import Card from './Card';

export default function Deck(props) {

    const [removeCard, setRemoveCard] = React.useState(false);
    const [filteredDeck, setFilteredDeck] = React.useState(props.deck);
    const [updateDeckDisplay, setUpdateDeckDisplay] = React.useState(false);
    const [filters, setFilters] = React.useState({
        name: "",
        type: "All",
        stat: "All"
    })

    function sortAtk(deck) {
        const atkDeck = deck;
        atkDeck.sort(function(cardA, cardB) {
            let aHighest = 0;
            let bHighest = 0;
            if (!cardA.data.attacks) {
                return 1;
            } else if (!cardB.data.attacks) {
                return -1;
            }
            for (let i = 0; i < cardA.data.attacks.length; i++) {
                const atkVal = cardA.data.attacks[i].damage.match(/\d*/g)[0];
                if (atkVal > aHighest) {
                    aHighest = Number(atkVal);
                }
            }
            for (let i = 0; i < cardB.data.attacks.length; i++) {
                const atkVal = cardB.data.attacks[i].damage.match(/\d*/g)[0];
                if (atkVal > bHighest) {
                    bHighest = Number(atkVal);
                }
            }
            return aHighest > bHighest ? -1 : 1;
        })
        return atkDeck;
    }

    function sortPokedex(deck) {
        const pokedexDeck = deck;
        pokedexDeck.sort(function(cardA, cardB){
            let returnVal = -1;
            const aVal = cardA.data.nationalPokedexNumbers ? cardA.data.nationalPokedexNumbers[0] : 0;
            const bVal = cardB.data.nationalPokedexNumbers ? cardB.data.nationalPokedexNumbers[0] : 0;
            if (aVal === 0 || (bVal !== 0 && aVal > bVal)) {
                returnVal = 1;
            }
            return returnVal;
        })  
        return pokedexDeck;
    }

    function sortVal(deck) {
        const valDeck = deck;
        valDeck.sort(function(cardA, cardB) {
            const aVal = Number(cardA.data.cardmarket.prices.averageSellPrice);
            const bVal = Number(cardB.data.cardmarket.prices.averageSellPrice);
            return aVal >= bVal ? -1 : 1; 
        })
        return valDeck;
    }

    function sortHp(deck) {
        const hpDeck = deck;
        hpDeck.sort(function(cardA, cardB) {
            const aVal = Number(cardA.data.hp);
            const bVal = Number(cardB.data.hp);
            return aVal > bVal ? -1 : 1;
        })
        return hpDeck;
    }

    function returnCard(card) {
        return <Card
                    key={card.key}
                    src={card.data.images.small}
                    data={card.data}
                    handleDeleteCard={function() {
                        props.handleDeleteCard(card.key);
                        setFilteredDeck(function(prev) {
                            let newDeck = [];
                            for (const cards in prev) {
                                if (prev[cards].key !== card.key) {
                                    newDeck.push(prev[cards]);
                                }
                            }
                            return newDeck;
                        })
                    }}
                />
    }

    function handleTypeFilter(e) {
        const type = e.target.value;
        setFilters((prev) => ({
            ...prev,
            type: e.target.value,
            stat: "All"
        }))
        try {
            setFilteredDeck(function() {
                const mainDeck = props.deck.filter(function(card) {
                    if (type === "All" ||
                        (card.data.supertype === "Pokémon" && card.data.types.includes(type)) ||
                        (card.data.supertype === "Trainer" && type === "allTrainers") ||
                        (card.data.supertype === "Pokémon" && type === "allTypes") ||
                        card.data.supertype === type ||
                        card.data.subtypes[0] === type) {
                            return card;
                        }
                })
                return mainDeck;
            })
            setUpdateDeckDisplay((prev) => !prev);
        } catch {
            console.log('Catch block - HandleTypeFilter')
        }
        
    }

    function handleStatFilter(e) {
        setFilters((prev) => ({
            ...prev,
            stat: e.target.value
        }))
        const stat = e.target.value;
        try {
            if (stat === "atk") {
                setFilteredDeck((prev) => sortAtk(prev));
            } else if (stat === "pokedex") {
                setFilteredDeck((prev) => sortPokedex(prev));
            } else if (stat === "val") {
                setFilteredDeck((prev) => sortVal(prev));
            } else if (stat === "hp") {
                setFilteredDeck((prev) => sortHp(prev));
            }
            setUpdateDeckDisplay((prev) => !prev);
        } catch {
            console.log('Catch Block - HandleStatFilter')
        }
    }

    function handleNameFilter(e) {
        try {
            if (e.target.value.length > 0) {
                const name = e.target.value[0].toUpperCase() + e.target.value.slice(1);
                setFilters((prev) => ({
                    ...prev,
                    name: name
                }))
                setFilteredDeck(function(prev) {
                    const filteredNames = props.deck.filter(function(card) {
                        if (card.data.name.startsWith(name)) {
                            return card;
                        } 
                    })
                    return filteredNames;
    
                })
            } else {
                setFilteredDeck(props.deck);
            }
            
        } catch {
            console.log("Catch Block - handleNameFilter")
        }
    }

    const renderedCards = filteredDeck.map((card) => returnCard(card))

    return (
        <div className="deck-background">
            <div className="deck-container">
                <div className="deck">
                    {renderedCards}
                </div>
                <div className="deck-sidebar">
                        <button type="button" className="close-deck-btn" onClick={props.toggleShowDeck}>Close Deck</button>
                        <label className="deck-sidebar-label">Filter by Name:</label>
                        <input type="text" onChange={handleNameFilter}/>
                        <label className="deck-sidebar-label">Filter By Type:</label>
                        <select name="pokemonType" value={filters.type} onChange={handleTypeFilter}>
                                <option value="All">No Filter</option>
                            <optgroup label="Types">
                                <option value="allTypes">All Types</option>
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
                            </optgroup>
                            <optgroup label="Supporter Cards">
                                <option value="allTrainers">All Trainers</option>
                                <option value="Item">Item</option>
                                <option value="Supporter">Supporter</option>
                                <option value="Stadium">Stadium</option>
                                <option value="Special">Special Energy</option>
                            </optgroup>

                        </select>
                        <label className="deck-sidebar-label">Filter by Stats:</label>
                        <select name="pokemonStat" value={filters.stat} onChange={handleStatFilter}>
                            <option value="All">No Filter</option>
                            <option value="pokedex">Pokedex Number</option>
                            <option value="atk">ATK</option>
                            <option value="hp">HP</option>
                            <option value="val">$Value$</option>
                        </select>
                </div>
            </div>
            
        </div>
    )
}