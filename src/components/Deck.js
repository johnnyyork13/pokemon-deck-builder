import React from 'react';
import Card from './Card';

export default function Deck(props) {


    const [type, setType] = React.useState("All");
    const [stat, setStat] = React.useState("All");
    const [removeCard, setRemoveCard] = React.useState(false);

    function handleTypeFilter(e) {
        setType(e.target.value);
    }

    function handleStatFilter(e) {
        setStat(e.target.value);
    }

    try {
        if (stat === "atk") {
            props.deck.sort(function(cardA, cardB) {
                let aHighest = 0;
                let bHighest = 0;
                for (let i = 0; i < cardA.data.attacks.length; i++) {
                    const atkVal = cardA.data.attacks[i].damage.match(/\d*/g)[0];
                    if (atkVal > aHighest) {
                        aHighest = Number(atkVal);
                    }
                }
                for (let i = 0 ; i < cardB.data.attacks.length; i++) {
                    const atkVal = cardB.data.attacks[i].damage.match(/\d*/g)[0];
                    if (atkVal > bHighest) {
                        bHighest = Number(atkVal);
                    }
                }
                //console.log(cardA.data.name, aHighest, cardB.data.name, bHighest);
                return aHighest > bHighest ? -1 : 1;
            })
        } else if (stat === "val") {
            props.deck.sort(function(cardA, cardB) {
                const aVal = cardA.data.cardmarket.prices.averageSellPrice;
                const bVal = cardB.data.cardmarket.prices.averageSellPrice;
                return aVal > bVal ? -1 : 1;
            })
        } else if (stat === "hp") {
            props.deck.sort(function(cardA, cardB) {
                const aHP = Number(cardA.data.hp);
                const bHP = Number(cardB.data.hp);
                return aHP > bHP ? -1 : 1;
            })
        } else if (stat === "All") {
            try {
                let aNum;
                let bNum;
                props.deck.sort(function(a, b) {
                    aNum = a.data.nationalPokedexNumbers[0];
                    bNum = b.data.nationalPokedexNumbers[0];
                    return aNum >= bNum ? 1 : -1;
                })
            } catch {
                console.log('Stat Error')
            }
    
        }
    } catch {
        console.log('Stat Error');
    }
    

    //console.log(props.deck);
    const sortedCards = props.deck.map(function(card, index) {
        if (type === "All" ||
            (card.data.supertype === "Pokémon" && card.data.types.includes(type)) ||
            (type === "allTypes" && card.data.supertype === "Pokémon") ||
            (type === "allTrainers" && card.data.supertype === "Trainer") ||
            (type === "item" && card.data.subtypes[0] === "Item") ||
            (type === "supporter" && card.data.subtypes[0] === "Supporter") ||
            (type === "stadium" && card.data.subtypes[0] === "Stadium") ||
            (type === "energy" && card.data.subtypes[0] === "Special")) {
            return <Card
                key={card.key}
                src={card.data.images.small}
                data={card.data}
                handleDeleteCard={function() {
                    props.handleDeleteCard(card.key);
                    setRemoveCard((prev) => !prev);
                }}
            />
            // return <img 
            //             key={card.key} 
            //             src={card.data.images.small} 
            //             alt="Pokemon Card"
            //             onClick={function() {
            //                 props.handleDeleteCard(card.key); 
            //                 setRemoveCard((prev) => !prev);
            //                 }   
            //             }
            //             />;
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
                                <option value="item">Item</option>
                                <option value="supporter">Supporter</option>
                                <option value="stadium">Stadium</option>
                                <option value="energy">Special Energy</option>
                            </optgroup>

                        </select>
                        <label className="deck-sidebar-label">Filter by Stats:</label>
                        <select name="pokemonStat" onChange={handleStatFilter}>
                            <option value="All">Pokedex Number</option>
                            <option value="atk">ATK</option>
                            <option value="hp">HP</option>
                            <option value="val">Value</option>

                        </select>
                </div>
            </div>
            
        </div>
    )
}