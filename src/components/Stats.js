import React from 'react';

export default function Stats(props) {
    return (
        <div className="stats-container">
            <div className="stat-btn">
                <button onClick={props.handlePreviousPokemon}>Previous</button>
                <button onClick={props.handleNextPokemon}>Next</button>
            </div>
            <div className="stat">
                <span className="stat-span-value">#{props.data.nationalPokedexNumbers[0]} {props.data.name}</span>
            </div>
            <div className="stat">
                <span className="stat-span-description">Average Value: </span>
                <span className="state-span-value">{props.data.cardmarket.prices.averageSellPrice}</span>
            </div>
            <div className="stat">
                <span className="stat-span-description"></span>
                <span className="stat-span-value"></span>
            </div>

        </div>
    )
}