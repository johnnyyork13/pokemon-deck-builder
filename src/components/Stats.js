import React from 'react';

export default function Stats(props) {
    try {
        return (
            <div className="stats-container">
                <div className="stat">
                    <span className="stat-span-value">{props.data.nationalPokedexNumbers && `#${props.data.nationalPokedexNumbers[0]}`} {props.data.name}</span>
                </div>
                <div className="stat">
                    <span className="stat-span-description">Average Value: </span>
                    <span className="state-span-value">{props.data.cardmarket.prices.averageSellPrice}</span>
                </div>
                <div className="stat">
                    <span className="stat-span-description">Set Name: </span>
                    <span className="stat-span-value">{props.data.set.name}</span>
                </div>
                <div className="stat">
                    <span className="stat-span-description">Set Id: </span>
                    <span className="stat-span-value">{props.data.number}/{props.data.set.printedTotal}</span>
                </div>
                <div className="stat">
                    <span className="stat-span-description">Release Date: </span>
                    <span className="stat-span-value">{props.data.set.releaseDate}</span>
                </div>
                <div className="stat">
                    <span className="stat-span-description">{props.data.flavorText && 'Description: '}</span>
                    <span className="stat-span-value">{props.data.flavorText}</span>
                </div>
                <div className="stat-btn">
                    <div className="stat-btn-cycle">
                        <button onClick={props.handlePreviousPokemon}>Previous</button>
                        <button onClick={props.handleNextPokemon}>Next</button>
                    </div>
                    <button type="button" onClick={props.handleAddToDeck}>Add to Deck</button>
                </div>
            </div>
        )
    } catch {
        console.log("Stats Did Not Load Properly!")
    }
}