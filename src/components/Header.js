import React from 'react';
import logoDefault from '../assets/logo.png'

export default function Header(props) {

    return (
        <div className="main header">
            <img onClick={() => window.location.reload()}src={logoDefault} alt="Logo" className="header-logo" />
            <nav>               
                <button type="button" onClick={props.toggleShowDeck}>Show Deck</button>
                <button type="button" onClick={props.toggleShowHelp}>Help</button>
            </nav>
        </div>
    )
}