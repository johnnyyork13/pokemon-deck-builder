import React from 'react';

export default function CardData(props) {

    return (
        <div className="card-data">
            <p className="card-data-p">
                {props.currentPokemon.data !== undefined && `Average Value: ${props.currentPokemon.data.cardmarket.prices.averageSellPrice}`}
                {/* Average Value: {props.currentPokemon.data.cardmarket.prices.averageSellPrice} */}
            </p>

            <input type="number" name="id" onChange={props.handleInputChange} />
            <button type="button" onClick={props.handleInputSubmit}>Submit</button>
            <button type="button" onClick={props.handleAddToDeck}>Add to Deck</button>
            {props.currentPokemon.data !== undefined && <img src={props.currentPokemon.data.images.small} alt="Pokemon Card" />}
        </div>
    )
}