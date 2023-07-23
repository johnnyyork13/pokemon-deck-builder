import React from 'react';

export default function Header(props) {

    return (
        <div className="main header">
            <div className="header-logo"></div>
            <nav>                
                <button type="button" onClick={props.toggleShowDeck}>Show Deck</button>
            </nav>
        </div>
    )
}