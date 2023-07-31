import React from 'react';

export default function Card(props) {

    return (
        <div className="deck-card">
            <div className="deck-card-overlay">
                <h2>{props.data.nationalPokedexNumbers && `#${props.data.nationalPokedexNumbers[0]}`} {props.data.name}</h2>
                <h2>{props.data.flavorText && 'Summary: '}</h2>
                <p>{props.data.flavorText}</p>
                <h2>Value: ${props.data.cardmarket.prices.averageSellPrice}</h2>
                <button onClick={props.handleDeleteCard}>REMOVE FROM DECK</button>
            </div>
            <img src={props.src} alt="Pokemon Card" />
        </div>
    )
}