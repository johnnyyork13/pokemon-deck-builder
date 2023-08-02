import React from 'react';
import logoDefault from '../assets/logo.png'

export default function Header(props) {

    return (
        <div className="main header">
            <button className="help-btn" type="button" onClick={props.toggleShowHelp}>Need Help?</button>
            <img onClick={() => window.location.reload()}src={logoDefault} alt="Logo" className="header-logo" />
            <nav>               
                <button className="show-deck-btn" type="button" onClick={props.toggleShowDeck}>Show Deck</button>
            </nav>
        </div>
    )
}