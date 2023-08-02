import React from 'react';

export default function Card(props) {

    const evolvesFrom = props.data.evolvesFrom === undefined ? "-" : props.data.evolvesFrom;
    const evolvesTo = props.data.evolvesTo === undefined ? "-" : props.data.evolvesTo[0];

    return (
        <div className="deck-card">
            <div className="deck-card-overlay">
                <div className="deck-card-overlay-section">
                    <p className="deck-card-header">{props.data.nationalPokedexNumbers && `#${props.data.nationalPokedexNumbers[0]}`} {props.data.name}</p>
                </div>
                <div className="deck-card-overlay-section">
                    <p className="deck-card-header">Value: ${props.data.cardmarket.prices.averageSellPrice}</p>
                </div>
                <div className="deck-card-overlay-section">
                    <p className="deck-card-header">Evolutions:</p>
                    <p className="deck-card-subheader">Previous: <span className="deck-card-sub-item">{evolvesFrom}</span></p>
                    <p className="deck-card-subheader">Next: <span className="deck-card-sub-item">{evolvesTo}</span></p>
                </div>
                {/* <h2>{props.data.flavorText && 'Summary: '}</h2>
                <p>{props.data.flavorText}</p> */}
                <button className="deck-card-zoom-btn" onClick={() => props.toggleShowZoom(props.data.images.large)}>See Closeup</button>
                <button className="delete-card-btn" onClick={props.handleDeleteCard}>DELETE</button>
            </div>
            <img src={props.src} alt="Pokemon Card" />
        </div>
    )
}