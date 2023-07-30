import React from 'react';
import logoDefault from '../assets/deck-logo.png'

export default function Header(props) {

    return (
        <div className="main header">
            <img src={logoDefault} alt="Logo" className="header-logo" />
            <nav>                
                <button type="button" onClick={props.toggleShowDeck}>Show Deck</button>
            </nav>
        </div>
    )
}