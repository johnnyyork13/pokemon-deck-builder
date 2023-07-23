import React from 'react';

export default function CardData(props) {

    return (
        <div className="card-data">
            <p className="card-data-p">Pokemon ID (I.E. xxx/xxx)</p>
            <input type="number" name="id" onChange={props.handleInputChange} />
            <div className="card-data-button-container">
                <button type="button" onClick={props.handleInputSubmit}>Show Card</button>
                <button type="button" onClick={props.handleAddToDeck}>Add to Deck</button>
            </div>
        </div>
    )
}