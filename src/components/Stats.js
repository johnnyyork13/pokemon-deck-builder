import React from 'react';

export default function Stats(props) {

    // const prevNumber = props.data.number.slice(0, 2) === "TG" ? Number(props.data.number.slice(2)) - 1 : Number(props.data.number) - 1;
    // const prevNumChecked = Number(prevNumber) >= 1 ? `Previous (#${prevNumber})` : "-";
    // const nextNumber = props.data.number.slice(0, 2) === "TG" ? Number(props.data.number.slice(2)) + 1 : Number(props.data.number) + 1 ;
    // const nextNumChecked = `Next (#${Number(nextNumber)})`;

    const prevNumChecked = `Previous (#${Number(props.data.number.match(/[^A-Z]\d*/)) - 1})`;
    const nextNumChecked = `Next (#${Number(props.data.number.match(/[^A-Z]\d*/)) + 1})`;
    try {
        return (
            <div className="stats-container">
                <div className="stat">
                    <span className="stat-span-value stat-pokemon-name">{props.data.nationalPokedexNumbers && `#${props.data.nationalPokedexNumbers[0]}`} {props.data.name}</span>
                </div>
                <div className="stat">
                    <span className="stat-span-description">Average Value: </span>
                    <span className="state-span-value">${props.data.cardmarket.prices.averageSellPrice}</span>
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
                    <div className="stat-btn-left">
                        <div className="stat-btn-cycle">
                            <button className="main-button" onClick={props.handlePreviousPokemon}>{prevNumChecked}</button>
                            <button className="main-button" onClick={props.handleNextPokemon}>{nextNumChecked}</button>
                        </div>
                        <button type="button" className="main-button show-zoom-btn" onClick={() => props.toggleShowZoom(props.data.images.large)}>Zoom</button>
                    </div>
                    <div className="stat-btn-right">
                        <button className="main-button add-btn" onClick={props.handleAddToDeck}>Add to Deck</button>
                    </div>
                </div>
            </div>
        )
    } catch {
        console.log("Stats Did Not Load Properly!")
    }
}