import React from 'react';

export default function Header(props) {

    return (
        <div className="main header">
            <div className="header-logo"></div>
            <nav>                
                <button type="button" onClick={props.toggleShowDeck}>{props.showDeck ? "Hide" : "Show"} Deck</button>
                <button type="button" onClick={() => props.setSaveDeck((prev) => !prev)}>Save Changes</button>
            </nav>
        </div>
    )
}